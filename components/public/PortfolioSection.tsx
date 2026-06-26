import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Portfolio } from '@/lib/types'

interface Props {
  items: Portfolio[]
  preview?: boolean
}

export default function PortfolioSection({ items, preview = false }: Props) {
  const displayed = preview ? items.slice(0, 3) : items

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Results</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] mt-2">
            Real Results for Real Stores
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            See how I&apos;ve helped Temu store owners grow their revenue and streamline operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAFAF8] border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-br from-[#1A1A2E] to-[#FF6B35]/30 h-40 flex items-center justify-center">
                <span className="text-6xl">🏪</span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-lg text-[#1A1A2E] mb-1">{item.title}</h3>
                {item.client_type && (
                  <p className="text-gray-500 text-xs mb-3">📌 {item.client_type}</p>
                )}
                {item.description && (
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                )}
                {item.results && (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <p className="text-green-700 text-sm font-semibold">📈 Results</p>
                    <p className="text-green-600 text-sm mt-1">{item.results}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {preview && (
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-[#1A1A2E] text-white px-8 py-4 rounded-full font-bold hover:bg-[#FF6B35] transition-colors"
            >
              View All Case Studies <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
