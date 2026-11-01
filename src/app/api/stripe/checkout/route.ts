export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getStripe, PLANS } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const { plan, userId, email } = await req.json()
    const planConfig = PLANS[plan as keyof typeof PLANS]
    if (!planConfig) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const stripe = getStripe()
    const customer = await stripe.customers.create({ email, metadata: { supabase_user_id: userId } })

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?welcome=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup`,
      metadata: { supabase_user_id: userId, plan },
      subscription_data: { metadata: { supabase_user_id: userId, plan } },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
