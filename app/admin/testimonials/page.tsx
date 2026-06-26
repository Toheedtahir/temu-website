'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Testimonial } from '@/lib/types'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const emptyForm = { client_name: '', client_store: '', message: '', rating: 5, is_active: true }

export default function AdminTestimonialsPage() {
  const supabase = createClient()
  const [items, setItems] = useState<Testimonial[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true) }
  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setForm({ client_name: t.client_name, client_store: t.client_store ?? '', message: t.message, rating: t.rating, is_active: t.is_active })
    setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const { error } = editing
      ? await supabase.from('testimonials').update(form).eq('id', editing.id)
      : await supabase.from('testimonials').insert(form)
    if (error) { toast.error(error.message) } else { toast.success('Saved!'); setShowForm(false); load() }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    toast.success('Deleted'); load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1A2E]">Testimonials</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#FF6B35] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Client', 'Store', 'Rating', 'Message', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{t.client_name}</td>
                <td className="px-4 py-3 text-gray-500">{t.client_store || '—'}</td>
                <td className="px-4 py-3 text-[#FFD700]">{'★'.repeat(t.rating)}</td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{t.message}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={6} className="text-center py-10 text-gray-400">No testimonials yet</td></tr>}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-[#1A1A2E]">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Client Name *</label>
                  <input required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Store / Role</label>
                  <input value={form.client_store} onChange={(e) => setForm({ ...form, client_store: e.target.value })} placeholder="e.g. Temu Store Owner" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Message *</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })}
                      className={`text-2xl transition-transform ${r <= form.rating ? 'text-[#FFD700]' : 'text-gray-300'} hover:scale-110`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-[#FF6B35]" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <button type="submit" disabled={loading} className="w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-60">
                {loading ? 'Saving...' : editing ? 'Update' : 'Add Testimonial'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
