import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#1A1A2E] flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF6B35] opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 Professional Temu Virtual Assistant
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Your Temu Store,{' '}
            <span className="text-[#FF6B35]">Managed</span>{' '}
            by a Pro
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8">
            I handle everything — product listings, customer service, orders, and growth — so you can focus on{' '}
            <span className="text-[#FFD700] font-semibold">scaling your business</span>.
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
              See My Services
            </Link>
          </div>
        </div>

        {/* Visual Card */}
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">🛒</div>
              <h3 className="text-white font-bold text-xl">Temu Store Expert</h3>
              <p className="text-gray-400 text-sm">Full-service virtual assistant</p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '✅', text: 'Product listing optimization' },
                { icon: '✅', text: 'Customer service management' },
                { icon: '✅', text: 'Order & inventory tracking' },
                { icon: '✅', text: 'Analytics & growth strategy' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-[#FF6B35]/20 border border-[#FF6B35]/30 rounded-2xl p-4 text-center">
              <p className="text-[#FF6B35] font-bold text-lg">Starting at $150/mo</p>
              <p className="text-gray-400 text-xs mt-1">No long-term contracts required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
