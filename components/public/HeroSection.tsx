import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#1A1A2E] flex items-center overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF6B35] opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 Temu Virtual Assistant — Full Store Management
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Your Temu Store,{' '}
            <span className="text-[#FF6B35]">Fully Managed</span>{' '}
            by a Pro
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8">
            We handle everything your Temu store needs — from SEO-optimized product listings and professional images to price approvals, daily management, promotions, and customer support.{' '}
            <span className="text-[#FFD700] font-semibold">You focus on growing. We handle the rest.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#FF6B35] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors text-center shadow-lg shadow-orange-500/30"
            >
              📞 Book a Free Call
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#1A1A2E] transition-colors text-center"
            >
              See Our Services
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">🛒</div>
              <h3 className="text-white font-bold text-xl">Temu VA Pro</h3>
              <p className="text-gray-400 text-sm">Complete end-to-end store management</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '✅', text: 'SEO-optimized product listings' },
                { icon: '✅', text: 'Professional image creation' },
                { icon: '✅', text: 'Price approval & submission' },
                { icon: '✅', text: 'Promotions, ads & daily management' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-[#FF6B35]/20 border border-[#FF6B35]/30 rounded-2xl p-4 text-center">
              <p className="text-[#FF6B35] font-bold text-lg">Starting at $150/mo</p>
              <p className="text-gray-400 text-xs mt-1">Price agreed based on your store needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
