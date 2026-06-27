const stats = [
  { value: '8+', label: 'Accounts Managed' },
  { value: '1,000+', label: 'Products Listed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '3+', label: 'Years Experience' },
]

export default function StatsBar() {
  return (
    <section className="bg-[#FF6B35] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-white">{stat.value}</div>
              <div className="text-orange-100 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
