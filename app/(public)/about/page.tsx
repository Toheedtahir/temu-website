import CTASection from '@/components/public/CTASection'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Account } from '@/lib/types'

const whyUs = [
  { title: 'Real Experience, Not Theory', desc: 'We manage active accounts every single day. Everything we do for your store is battle-tested across 8 real Temu accounts.' },
  { title: 'End-to-End Service', desc: 'From first product upload to daily management and growth strategy — one team handles everything.' },
  { title: 'Transparent Pricing', desc: 'No hidden fees. Price is agreed upfront based on your store\'s actual needs.' },
  { title: 'Results-Focused', desc: 'We measure success by your store\'s performance metrics, not hours logged.' },
  { title: 'Dedicated Support', desc: 'You always have a direct line to your account manager. No ticket systems, no waiting.' },
  { title: 'Data-First Approach', desc: 'Our ad campaigns, listings, and decisions are driven by data — never guesswork.' },
]

const expertise = [
  { icon: '📦', title: 'Product Listings & SEO', desc: 'We combine SEO science with buyer psychology. Our listings consistently outperform generic copy because we understand exactly how Temu\'s algorithm works.' },
  { icon: '🖼️', title: 'Image Creation', desc: 'Great images are the #1 conversion driver on Temu. We produce professional infographics, lifestyle shots, and size/spec images in-house.' },
  { icon: '✅', title: 'Price Approval', desc: 'We have navigated Temu\'s price approval system dozens of times. We know what pricing ranges get approved and how to handle rejections fast.' },
  { icon: '🔍', title: 'Product Research', desc: 'Our research combines Temu trend data, competitor analysis, and demand signals to identify winning products before you invest in stock.' },
  { icon: '📢', title: 'Promotions & Ads', desc: 'We have run campaigns that generated measurable sales lifts. Our ad approach is data-first — we know what drives traffic and what wastes budget.' },
  { icon: '💬', title: 'Customer Support', desc: 'Our tested response templates, high dispute resolution rate, and daily management keep our stores at top ratings.' },
]

export default async function AboutPage() {
  let accounts: Account[] = []
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase.from('accounts').select('*').eq('is_active', true).order('account_name')
    accounts = data ?? []
  } catch {
    // Supabase not configured yet
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-[#1A1A2E] pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
            8 Accounts. Hundreds of Products. One Mission.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From a curious seller to a full-service Temu Virtual Assistant
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#1A1A2E] mb-6">How It All Began</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              It started with a single Temu store. Like most sellers, I was figuring things out on my own — learning how product titles work, why some listings rank and others disappear, how Temu&apos;s algorithm thinks, and what buyers actually respond to. Every mistake was a lesson. Every success was a system.
            </p>
            <p>
              What started as personal curiosity turned into mastery. After successfully managing my own store, other sellers started asking for help. Word spread. One store became two. Two became five. Today, we actively manage 8 accounts across different niches — and the number keeps growing.
            </p>
          </div>
          <div className="mt-8 bg-[#1A1A2E] rounded-2xl p-6 border-l-4 border-[#FF6B35]">
            <p className="text-white italic text-lg font-medium text-center">
              &ldquo;Every store we manage is treated like our own. We do not just upload products — we build systems that sell.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#1A1A2E] text-center mb-10">Our Experience Across Every Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, i) => (
              <div key={i} className="bg-[#FAFAF8] border border-gray-100 rounded-2xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8-Account Portfolio */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#1A1A2E]">Our 8-Account Portfolio</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
              We currently manage 8 active Temu seller accounts across multiple product categories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accounts.length > 0 ? accounts.map((acc) => (
              <div key={acc.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="text-2xl mb-2">🏪</div>
                <h3 className="font-bold text-[#1A1A2E] text-sm">{acc.account_name}</h3>
                <p className="text-[#FF6B35] text-xs font-medium mb-3">{acc.niche}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  {acc.products_count && <p>📦 {acc.products_count} products</p>}
                  {acc.monthly_sales && <p>💰 {acc.monthly_sales}/mo</p>}
                  {acc.rating && <p>⭐ {acc.rating} rating</p>}
                  {acc.highlight && <p className="text-green-600 font-medium mt-2">{acc.highlight}</p>}
                </div>
              </div>
            )) : (
              // Default cards when no DB data
              [
                { name: 'Account 1', niche: 'Clothing & Apparel' },
                { name: 'Account 2', niche: 'Home & Garden' },
                { name: 'Account 3', niche: 'Beauty & Personal Care' },
                { name: 'Account 4', niche: 'Electronics Accessories' },
                { name: 'Account 5', niche: 'Sports & Outdoors' },
                { name: 'Account 6', niche: 'Toys & Kids' },
                { name: 'Account 7', niche: 'Kitchen & Dining' },
                { name: 'Account 8', niche: 'General / Multi-niche' },
              ].map((acc, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="text-2xl mb-2">🏪</div>
                  <h3 className="font-bold text-[#1A1A2E] text-sm">{acc.name}</h3>
                  <p className="text-[#FF6B35] text-xs font-medium">{acc.niche}</p>
                  <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1A1A2E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-10">Why Choose Temu VA Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-[#FF6B35] mb-2">★ {item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
