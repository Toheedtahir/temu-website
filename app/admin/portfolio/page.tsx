'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Portfolio } from '@/lib/types'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const emptyForm = {
  title: '', client_type: '', description: '', results: '', tags: [''], image_url: '', is_active: true, sort_order: 0,
}

export default function AdminPortfolioPage() {
  const supabase = createClient()
  const [items, setItems] = useState<Portfolio[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Portfolio | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('portfolio').select('*').order('sort_order')
    setItems(data ?? [])
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true) }
  const openEdit = (p: Portfolio) => {
    setEditing(p)
    setForm({ title: p.title, client_type: p.client_type ?? '', description: p.description ?? '', results: p.results ?? '', tags: p.tags ?? [''], image_url: p.image_url ?? '', is_active: p.is_active, sort_order: p.sort_order })
    setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const payload = { ...form, tags: form.tags.filter(Boolean) }
    const { error } = editing
      ? await supabase.from('portfolio').update(payload).eq('id', editing.id)
      : await supabase.from('portfolio').insert(payload)
    if (error) { toast.error(error.message) } else { toast.success('Saved!'); setShowForm(false); load() }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return
    await supabase.from('portfolio').delete().eq('id', id)
    toast.success('Deleted'); load()
  }

  const setTag = (i: number, val: string) => { const t = [...form.tags]; t[i] = val; setForm({ ...form, tags: t }) }
  const addTag = () => setForm({ ...form, tags: [...form.tags, ''] })
  const removeTag = (i: number) => setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1A2E]">Portfolio</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#FF6B35] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm">
          <Plus size={16} /> Add Case Study
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Title', 'Client Type', 'Tags', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-gray-500">{item.client_type || '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-xs bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={5} className="text-center py-10 text-gray-400">No portfolio items yet</td></tr>}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-[#1A1A2E]">{editing ? 'Edit Case Study' : 'Add Case Study'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Client Type</label>
                <input value={form.client_type} onChange={(e) => setForm({ ...form, client_type: e.target.value })} placeholder="e.g. Temu Clothing Store" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Results</label>
                <input value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} placeholder="e.g. Increased sales by 40%" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Tags</label>
                <div className="space-y-2">
                  {form.tags.map((t, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={t} onChange={(e) => setTag(i, e.target.value)} placeholder={`Tag ${i + 1}`} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
                      <button type="button" onClick={() => removeTag(i)} className="text-red-400 hover:text-red-600"><X size={16} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={addTag} className="text-[#FF6B35] text-sm font-medium hover:underline">+ Add tag</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-[#FF6B35]" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <button type="submit" disabled={loading} className="w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-60">
                {loading ? 'Saving...' : editing ? 'Update' : 'Add Case Study'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
