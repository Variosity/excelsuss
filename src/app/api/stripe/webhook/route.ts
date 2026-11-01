export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  // Lazy init supabase admin to avoid build-time errors
  const { createClient } = await import('@supabase/supabase-js')
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id
      const plan = session.metadata?.plan
      if (userId && plan) {
        await supabaseAdmin.from('profiles').upsert({
          user_id: userId, membership_tier: plan,
          membership_status: 'active',
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        }, { onConflict: 'user_id' })
      }
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.supabase_user_id
      if (userId) await supabaseAdmin.from('profiles').update({ membership_status: 'canceled' }).eq('user_id', userId)
      break
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.supabase_user_id
      const plan = sub.metadata?.plan
      if (userId) await supabaseAdmin.from('profiles').update({ membership_status: sub.status, membership_tier: plan || 'recruit' }).eq('user_id', userId)
      break
    }
  }

  return NextResponse.json({ received: true })
}
