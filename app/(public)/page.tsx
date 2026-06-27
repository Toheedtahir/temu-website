import { createServerSupabaseClient } from '@/lib/supabase/server'
import HeroSection from '@/components/public/HeroSection'
import StatsBar from '@/components/public/StatsBar'
import ServicesSection from '@/components/public/ServicesSection'
import HowItWorks from '@/components/public/HowItWorks'
import PlansSection from '@/components/public/PlansSection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import PortfolioSection from '@/components/public/PortfolioSection'
import CTASection from '@/components/public/CTASection'

export default async function HomePage() {
  let services: any[] = [], plans: any[] = [], testimonials: any[] = [], portfolio: any[] = []

  try {
    const supabase = await createServerSupabaseClient()
    const [s, p, t, pf] = await Promise.all([
      supabase.from('services').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('plans').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('testimonials').select('*').eq('is_active', true).order('created_at', { ascending: false }),
      supabase.from('portfolio').select('*').eq('is_active', true).order('sort_order'),
    ])
    services = s.data ?? []
    plans = p.data ?? []
    testimonials = t.data ?? []
    portfolio = pf.data ?? []
  } catch {
    // Supabase not configured yet
  }

  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection services={services} preview />
      <HowItWorks />
      <PlansSection plans={plans} />
      <PortfolioSection items={portfolio} preview />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  )
}
