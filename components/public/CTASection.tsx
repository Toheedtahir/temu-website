export default function CTASection() {
  return (
    <section className="py-20 bg-[#FF6B35]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Ready to Scale Your Temu Store?
        </h2>
        <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
          Let&apos;s talk about your store goals and how I can help you achieve them — completely free, no commitment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-white text-[#FF6B35] px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
          >
            📞 Book a Free Call
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
          >
            💬 WhatsApp Me
          </a>
        </div>
      </div>
    </section>
  )
}
