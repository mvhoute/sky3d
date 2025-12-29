export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Sky3D ✨
            </h3>
            <p className="text-gray-400">
              Professionele 3D prints op maat voor uw unieke projecten
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Snelle Links</h4>
            <ul className="space-y-2">
              <li><a href="/producten" className="text-gray-400 hover:text-primary-400 transition-colors">Producten</a></li>
              <li><a href="/over-ons" className="text-gray-400 hover:text-primary-400 transition-colors">Over Ons</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <a href="mailto:info@sky3d.nl" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@sky3d.nl
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sky3D. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
};

