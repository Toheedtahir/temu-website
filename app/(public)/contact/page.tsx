'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

const storeTypes = ['Clothing', 'Electronics', 'Home & Garden', 'Beauty & Health', 'Sports & Outdoors', 'Other']

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', store_type: '', message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Message sent! I\'ll get back to you within 24 hours.')
      setForm({ name: '', email: '', whatsapp: '', store_type: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-[#1A1A2E] pt-28 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
            Let&apos;s Talk About Your Store
          </h1>
          <p className="text-gray-400 text-lg">
            Fill out the form below and I&apos;ll reach out within 24 hours.
          </p>
        </div>
      </div>

      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                  Full Name <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                  Email <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="+1 234 567 8900"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Store Type</label>
                <select
                  value={form.store_type}
                  onChange={(e) => setForm({ ...form, store_type: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors bg-white"
                >
                  <option value="">Select store type</option>
                  {storeTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                Message / What help do you need?
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your store and what challenges you're facing..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] text-white py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-60"
            >
              {loading ? 'Sending...' : '📩 Send Message'}
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
              <p className="text-2xl mb-2">⏰</p>
              <p className="font-semibold text-[#1A1A2E] text-sm">Fast Response</p>
              <p className="text-gray-500 text-xs mt-1">I reply within 24 hours</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
              <p className="text-2xl mb-2">💬</p>
              <p className="font-semibold text-[#1A1A2E] text-sm">Free Consultation</p>
              <p className="text-gray-500 text-xs mt-1">First call is always free</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
