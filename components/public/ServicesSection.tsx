import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/lib/types'

interface Props {
  services: Service[]
  preview?: boolean
}

export default function ServicesSection({ services, preview = false }: Props) {
  const displayed = preview ? services.slice(0, 3) : services

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">What I Do</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] mt-2">
            Complete Temu Store Management
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            From setup to scaling — I handle every aspect of your Temu store so you can focus on what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#FF6B35]/20 transition-all group"
            >
              <div className="text-4xl mb-4">{service.icon || '⚙️'}</div>
              <h3 className="font-bold text-lg text-[#1A1A2E] mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
              {service.features && service.features.length > 0 && (
                <ul className="space-y-1 mb-4">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-[#FF6B35]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {preview && (
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#1A1A2E] text-white px-8 py-4 rounded-full font-bold hover:bg-[#FF6B35] transition-colors"
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
