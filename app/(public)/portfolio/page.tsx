import { createServerSupabaseClient } from '@/lib/supabase/server'
import PortfolioSection from '@/components/public/PortfolioSection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import CTASection from '@/components/public/CTASection'

export default async function PortfolioPage() {
  const supabase = await createServerSupabaseClient()
  const [{ data: portfolio }, { data: testimonials }] = await Promise.all([
    supabase.from('portfolio').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('testimonials').select('*').eq('is_active', true).order('created_at', { ascending: false }),
  ])

  return (
    <>
      <div className="bg-[#1A1A2E] pt-28 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Portfolio</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
            Real Results for Real Clients
          </h1>
          <p className="text-gray-400 text-lg">
            Explore case studies from Temu store owners I&apos;ve helped grow their revenue.
          </p>
        </div>
      </div>
      <PortfolioSection items={portfolio ?? []} />
      <TestimonialsSection testimonials={testimonials ?? []} />
      <CTASection />
    </>
  )
}
