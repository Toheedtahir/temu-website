import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛒</span>
              <span className="font-bold text-xl">
                Temu <span className="text-[#FF6B35]">VA Pro</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional Temu Virtual Assistant services. I help store owners scale their business with expert management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#FF6B35] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>📧 Contact via our form</p>
              <p>💬 WhatsApp available</p>
              <p>⏰ Response within 24 hours</p>
            </div>
            <a
              href="/contact"
              className="inline-block mt-4 bg-[#FF6B35] text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors text-sm"
            >
              Book a Free Call
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Temu VA Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
