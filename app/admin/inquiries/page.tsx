'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Inquiry } from '@/lib/types'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-orange-100 text-orange-700',
  contacted: 'bg-blue-100 text-blue-700',
  closed: 'bg-gray-100 text-gray-600',
}

export default function AdminInquiriesPage() {
  const supabase = createClient()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Inquiry | null>(null)

  const load = async () => {
    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') query = query.eq('status', filter)
    const { data } = await query
    setInquiries(data ?? [])
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
    if (error) { toast.error(error.message) } else {
      toast.success('Status updated')
      load()
      if (selected?.id === id) setSelected({ ...selected, status: status as Inquiry['status'] })
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1A2E]">Inquiries / Leads</h1>
        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'closed'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === s ? 'bg-[#FF6B35] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF6B35]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Name', 'Email', 'WhatsApp', 'Store Type', 'Date', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(inq)}>
                <td className="px-4 py-3 font-medium">{inq.name}</td>
                <td className="px-4 py-3 text-gray-500">{inq.email}</td>
                <td className="px-4 py-3 text-gray-500">{inq.whatsapp || '—'}</td>
                <td className="px-4 py-3 text-gray-500">{inq.store_type || '—'}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(inq.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[inq.status]}`}
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="closed">closed</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(inq) }}
                    className="text-[#FF6B35] text-xs font-medium hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {!inquiries.length && <tr><td colSpan={7} className="text-center py-10 text-gray-400">No inquiries found</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-[#1A1A2E]">Inquiry Details</h2>
              <button onClick={() => setSelected(null)}><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-500 text-xs font-semibold uppercase mb-1">Name</p><p className="font-medium">{selected.name}</p></div>
                <div><p className="text-gray-500 text-xs font-semibold uppercase mb-1">Email</p><p className="font-medium">{selected.email}</p></div>
                <div><p className="text-gray-500 text-xs font-semibold uppercase mb-1">WhatsApp</p><p className="font-medium">{selected.whatsapp || '—'}</p></div>
                <div><p className="text-gray-500 text-xs font-semibold uppercase mb-1">Store Type</p><p className="font-medium">{selected.store_type || '—'}</p></div>
                <div><p className="text-gray-500 text-xs font-semibold uppercase mb-1">Date</p><p className="font-medium">{new Date(selected.created_at).toLocaleString()}</p></div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold uppercase mb-1">Status</p>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[selected.status]}`}
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="closed">closed</option>
                  </select>
                </div>
              </div>
              {selected.message && (
                <div>
                  <p className="text-gray-500 text-xs font-semibold uppercase mb-2">Message</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{selected.message}</div>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex-1 text-center bg-[#1A1A2E] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-[#FF6B35] transition-colors"
                >
                  📧 Email
                </a>
                {selected.whatsapp && (
                  <a
                    href={`https://wa.me/${selected.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#25D366] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
