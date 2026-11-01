import Stripe from 'stripe'

// Lazy singleton — never instantiated at module load time (prevents build crash)
let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-05-27.dahlia',
      typescript: true,
    })
  }
  return _stripe
}

// Keep the named export for any existing imports that use `stripe` directly
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export const PLANS = {
  recruit: {
    name: 'Discipulus',
    price: 29,
    priceId: process.env.STRIPE_RECRUIT_MONTHLY_PRICE_ID ?? '',
    features: [
      'Full curriculum access',
      'Brotherhood community',
      'Weekly challenges',
      'Progress tracking',
      'Mobile app access',
    ],
    locked: ['Accountability cells', 'Live mentor calls', 'Private deal network'],
  },
  soldier: {
    name: 'Miles',
    price: 79,
    priceId: process.env.STRIPE_SOLDIER_MONTHLY_PRICE_ID ?? '',
    features: [
      'Everything in Discipulus',
      'Accountability cell (5-man)',
      'Monthly live group call',
      'Wealth track deep access',
      'Member deal network',
      'Psychology mastery courses',
    ],
    locked: ['1-on-1 mentorship'],
  },
  spartan: {
    name: 'Excelsus',
    price: 197,
    priceId: process.env.STRIPE_SPARTAN_MONTHLY_PRICE_ID ?? '',
    features: [
      'Everything in Miles',
      '1-on-1 mentor sessions',
      'Private Excelsus Council',
      'Early access + beta programs',
      'Mastermind events (IRL)',
      'Direct network introductions',
    ],
    locked: [],
  },
} as const
