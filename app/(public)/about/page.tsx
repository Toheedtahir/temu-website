import CTASection from '@/components/public/CTASection'

const skills = [
  { icon: '📦', label: 'Product Listing & SEO' },
  { icon: '📊', label: 'Analytics & Reporting' },
  { icon: '💬', label: 'Customer Service' },
  { icon: '🔍', label: 'Market Research' },
  { icon: '🏪', label: 'Store Management' },
  { icon: '📋', label: 'Order Processing' },
]

const whyMe = [
  { title: 'Temu-Specialized', desc: 'Unlike general VAs, I focus exclusively on Temu — I know the platform inside out.' },
  { title: 'Results-Driven', desc: 'Every decision I make is backed by data and aimed at growing your revenue.' },
  { title: 'Always Available', desc: 'Fast response times and proactive communication so you\'re never left wondering.' },
  { title: 'Proven Track Record', desc: 'I\'ve helped 50+ store owners increase their revenue and reduce their workload.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1A1A2E] pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">About Me</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
              Your Dedicated Temu VA
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              I&apos;m a Temu Virtual Assistant with 3+ years of hands-on experience helping store owners grow their business, optimize their listings, and deliver excellent customer experiences.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full flex items-center justify-center text-9xl">
              👤
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#1A1A2E] mb-6">My Story</h2>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed">
            <p>
              I started my journey as a Temu seller myself — struggling with the same challenges you face today: optimizing listings, managing customer inquiries, tracking orders, and trying to grow without burning out.
            </p>
            <p>
              After mastering the platform, I began helping other store owners do the same. Over the past 3 years, I&apos;ve worked with 50+ Temu sellers across categories like clothing, electronics, home goods, and more — generating over $500,000 in combined revenue.
            </p>
            <p>
              My goal is simple: take the operational burden off your plate so you can focus on the big picture while I handle the day-to-day management and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#1A1A2E] text-center mb-10">Core Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#FAFAF8] border border-gray-100 rounded-xl p-4">
                <span className="text-2xl">{skill.icon}</span>
                <span className="font-semibold text-[#1A1A2E] text-sm">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="py-20 bg-[#1A1A2E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-10">Why Choose Me?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyMe.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-[#FF6B35] mb-2">{item.title}</h3>
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
