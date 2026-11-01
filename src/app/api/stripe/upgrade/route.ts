import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

const PLAN_PRICE_IDS: Record<string, string> = {
  discipulus:
    process.env.STRIPE_DISCIPULUS_MONTHLY_PRICE_ID ||
    process.env.STRIPE_RECRUIT_MONTHLY_PRICE_ID ||
    "",
  miles:
    process.env.STRIPE_MILES_MONTHLY_PRICE_ID ||
    process.env.STRIPE_SOLDIER_MONTHLY_PRICE_ID ||
    "",
  excelsus:
    process.env.STRIPE_EXCELSUS_MONTHLY_PRICE_ID ||
    process.env.STRIPE_SPARTAN_MONTHLY_PRICE_ID ||
    "",
};

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();
    const priceId = PLAN_PRICE_IDS[plan];
    if (!priceId)
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    // If they already have a Stripe subscription, update it
    if (profile?.stripe_subscription_id) {
      const subscription = await stripe.subscriptions.retrieve(
        profile.stripe_subscription_id,
      );
      const updated = await stripe.subscriptions.update(
        profile.stripe_subscription_id,
        {
          items: [{ id: subscription.items.data[0].id, price: priceId }],
          proration_behavior: "create_prorations",
          metadata: { plan, supabase_user_id: user.id },
        },
      );
      // Update profile immediately
      await supabase
        .from("profiles")
        .update({
          membership_tier: plan,
          membership_status: "active",
        })
        .eq("user_id", user.id);

      return NextResponse.json({
        success: true,
        redirect: "/dashboard/upgrade?upgraded=true",
      });
    }

    // No existing subscription — create checkout
    const customerId = profile?.stripe_customer_id;
    const session = await stripe.checkout.sessions.create({
      ...(customerId
        ? { customer: customerId }
        : { customer_email: user.email }),
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade`,
      metadata: { supabase_user_id: user.id, plan },
      subscription_data: { metadata: { supabase_user_id: user.id, plan } },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Upgrade error:", err);
    return NextResponse.json({ error: "Upgrade failed" }, { status: 500 });
  }
}
