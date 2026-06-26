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
  const supabase = await createServerSupabaseClient()

  const [{ data: services }, { data: plans }, { data: testimonials }, { data: portfolio }] =
    await Promise.all([
      supabase.from('services').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('plans').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('testimonials').select('*').eq('is_active', true).order('created_at', { ascending: false }),
      supabase.from('portfolio').select('*').eq('is_active', true).order('sort_order'),
    ])

  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection services={services ?? []} preview />
      <HowItWorks />
      <PlansSection plans={plans ?? []} />
      <PortfolioSection items={portfolio ?? []} preview />
      <TestimonialsSection testimonials={testimonials ?? []} />
      <CTASection />
    </>
  )
}
