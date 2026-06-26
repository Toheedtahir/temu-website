const steps = [
  {
    step: '01',
    title: 'Book a Free Call',
    description: 'Schedule a quick discovery call so I can understand your store, goals, and challenges.',
    icon: '📞',
  },
  {
    step: '02',
    title: 'I Analyze Your Store',
    description: 'I do a full audit of your Temu store — listings, performance, competitors, and opportunities.',
    icon: '🔍',
  },
  {
    step: '03',
    title: 'I Start Managing & Growing',
    description: 'We kick off with an action plan and I take over the day-to-day management to drive results.',
    icon: '🚀',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-2/3 w-full h-0.5 bg-[#FF6B35]/20" />
              )}
              <div className="relative">
                <div className="w-24 h-24 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-xs font-black w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                  {step.step}
                </div>
              </div>
              <h3 className="font-bold text-xl text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
