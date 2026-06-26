'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Plan } from '@/lib/types'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const emptyForm = {
  name: '', price: 0, duration: 'per month', description: '', features: [''], is_popular: false, is_active: true, sort_order: 0,
}

export default function AdminPlansPage() {
  const supabase = createClient()
  const [plans, setPlans] = useState<Plan[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Plan | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('plans').select('*').order('sort_order')
    setPlans(data ?? [])
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true) }
  const openEdit = (p: Plan) => {
    setEditing(p)
    setForm({ name: p.name, price: p.price, duration: p.duration, description: p.description ?? '', features: p.features ?? [''], is_popular: p.is_popular, is_active: p.is_active, sort_order: p.sort_order })
    setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    const payload = { ...form, features: form.features.filter(Boolean) }
    const { error } = editing
      ? await supabase.from('plans').update(payload).eq('id', editing.id)
      : await supabase.from('plans').insert(payload)
    if (error) { toast.error(error.message) } else { toast.success('Saved!'); setShowForm(false); load() }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this plan?')) return
    await supabase.from('plans').delete().eq('id', id)
    toast.success('Deleted'); load()
  }

  const setFeature = (i: number, val: string) => { const f = [...form.features]; f[i] = val; setForm({ ...form, features: f }) }
  const addFeature = () => setForm({ ...form, features: [...form.features, ''] })
  const removeFeature = (i: number) => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#1A1A2E]">Pricing Plans</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#FF6B35] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm">
          <Plus size={16} /> Add Plan
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Name', 'Price', 'Popular', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 font-bold text-[#FF6B35]">${p.price}<span className="text-gray-400 font-normal text-xs ml-1">{p.duration}</span></td>
                <td className="px-4 py-3">{p.is_popular && <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded-full">⭐ Popular</span>}</td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.is_active ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!plans.length && <tr><td colSpan={5} className="text-center py-10 text-gray-400">No plans yet</td></tr>}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-bold text-[#1A1A2E]">{editing ? 'Edit Plan' : 'Add Plan'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Starter" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Price (USD) *</label>
                  <input required type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Duration</label>
                <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="per month" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Features</label>
                <div className="space-y-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={f} onChange={(e) => setFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF6B35]" />
                      <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600"><X size={16} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={addFeature} className="text-[#FF6B35] text-sm font-medium hover:underline">+ Add feature</button>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_popular} onChange={(e) => setForm({ ...form, is_popular: e.target.checked })} className="w-4 h-4 accent-[#FF6B35]" />
                  <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-[#FF6B35]" />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#FF6B35] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-60">
                {loading ? 'Saving...' : editing ? 'Update Plan' : 'Add Plan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
