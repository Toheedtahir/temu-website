import Link from 'next/link'
import { Check } from 'lucide-react'
import type { Plan } from '@/lib/types'

interface Props {
  plans: Plan[]
}

export default function PlansSection({ plans }: Props) {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] mt-2">
            Flexible Plans for Every Stage
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Price is agreed on the spot based on your store needs. No hidden fees, no long-term contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.is_popular
                  ? 'bg-[#1A1A2E] text-white shadow-2xl scale-105'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                  ⭐ Most Popular
                </div>
              )}
              <div>
                <h3 className={`font-bold text-xl mb-1 ${plan.is_popular ? 'text-white' : 'text-[#1A1A2E]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.is_popular ? 'text-gray-400' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
                <div className="mb-2">
                  <span className={`text-3xl font-black ${plan.is_popular ? 'text-[#FF6B35]' : 'text-[#1A1A2E]'}`}>
                    {plan.price_display || `$${plan.price}`}
                  </span>
                  <span className={`text-sm ml-1 ${plan.is_popular ? 'text-gray-400' : 'text-gray-500'}`}>
                    / month
                  </span>
                </div>
                <p className={`text-xs mb-6 italic ${plan.is_popular ? 'text-gray-500' : 'text-gray-400'}`}>
                  * Final price agreed based on your store size & needs
                </p>
                {plan.features && (
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${plan.is_popular ? 'text-[#FF6B35]' : 'text-green-500'}`}
                        />
                        <span className={plan.is_popular ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-auto">
                <Link
                  href="/contact"
                  className={`block w-full text-center py-3 rounded-full font-bold transition-colors ${
                    plan.is_popular
                      ? 'bg-[#FF6B35] text-white hover:bg-orange-600'
                      : 'bg-[#1A1A2E] text-white hover:bg-[#FF6B35]'
                  }`}
                >
                  Book This Plan →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom plans note */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">Need Something Custom?</h3>
          <p className="text-gray-500 text-sm mb-4">
            Every store is unique. Contact us and we will build a plan tailored exactly to your catalog size and goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">🔍 One-time store audit: $50–$150</span>
            <span className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">📦 Bulk listing (one-time): Custom quote</span>
            <span className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">🖼️ Lifestyle image pack (10 images): $80–$200</span>
            <span className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">📢 Ad campaign setup: $100–$250</span>
          </div>
          <Link href="/contact" className="inline-block mt-4 bg-[#FF6B35] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-colors text-sm">
            Get a Custom Quote
          </Link>
        </div>
      </div>
    </section>
  )
}
