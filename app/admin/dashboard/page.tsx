import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()

  const [
    { count: totalInquiries },
    { count: newInquiries },
    { count: activeServices },
    { count: portfolioItems },
    { count: testimonials },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('services').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('portfolio').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'New Inquiries', value: newInquiries ?? 0, sub: `${totalInquiries ?? 0} total`, color: 'bg-[#FF6B35]', icon: '📩' },
    { label: 'Active Services', value: activeServices ?? 0, sub: 'published', color: 'bg-[#1A1A2E]', icon: '⚙️' },
    { label: 'Portfolio Cases', value: portfolioItems ?? 0, sub: 'published', color: 'bg-purple-600', icon: '📁' },
    { label: 'Testimonials', value: testimonials ?? 0, sub: 'active', color: 'bg-green-600', icon: '⭐' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-black text-[#1A1A2E] mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${stat.color}`}>
                {stat.sub}
              </span>
            </div>
            <p className="text-3xl font-black text-[#1A1A2E]">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#1A1A2E]">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-[#FF6B35] text-sm font-medium hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Email', 'Store Type', 'Date', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(recentInquiries ?? []).map((inq) => (
                <tr key={inq.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium">{inq.name}</td>
                  <td className="px-4 py-3 text-gray-500">{inq.email}</td>
                  <td className="px-4 py-3 text-gray-500">{inq.store_type || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        inq.status === 'new'
                          ? 'bg-orange-100 text-orange-700'
                          : inq.status === 'contacted'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
              {!recentInquiries?.length && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">No inquiries yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
