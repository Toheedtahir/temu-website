import type { Testimonial } from '@/lib/types'

interface Props {
  testimonials: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-[#FFD700]' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: Props) {
  if (!testimonials.length) return null

  return (
    <section className="py-20 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">Client Love</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
            What My Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-colors"
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-6">
                &ldquo;{t.message}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.client_name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.client_name}</p>
                  {t.client_store && (
                    <p className="text-gray-500 text-xs">{t.client_store}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
