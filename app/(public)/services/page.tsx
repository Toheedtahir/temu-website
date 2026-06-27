import { createServerSupabaseClient } from '@/lib/supabase/server'
import ServicesSection from '@/components/public/ServicesSection'
import CTASection from '@/components/public/CTASection'

const faqs = [
  { q: 'How quickly can you start managing my store?', a: 'After our initial call and onboarding, we can typically start within 48–72 hours.' },
  { q: 'Do I need to give you access to my Temu account?', a: 'Yes, you\'ll need to share access credentials or add us as a collaborator. Everything is kept strictly confidential.' },
  { q: 'Can I cancel anytime?', a: 'Yes, there are no long-term contracts. You can cancel with 30 days notice.' },
  { q: 'Are prices fixed or can they vary?', a: 'Prices are agreed on the spot based on your store\'s actual needs — catalog size, current stage, and goals. The ranges shown are starting points.' },
  { q: 'Do you only work with Temu stores?', a: 'Yes — we are 100% Temu-focused. This specialization means we understand the platform deeply and deliver better results.' },
  { q: 'What if I only need one specific service?', a: 'We offer custom and one-time packages. Contact us and we can build a plan tailored to exactly what you need.' },
]

export default async function ServicesPage() {
  let services: any[] = []
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase.from('services').select('*').eq('is_active', true).order('sort_order')
    services = data ?? []
  } catch {
    // Supabase not configured yet
  }

  return (
    <>
      <div className="bg-[#1A1A2E] pt-28 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Services</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
            Everything Your Temu Store Needs
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We provide end-to-end Temu store management — from product listings to customer support. We handle it all professionally.
          </p>
        </div>
      </div>

      <ServicesSection services={services} />

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#1A1A2E] text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#1A1A2E] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
