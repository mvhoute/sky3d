import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        // Don't close if clicking the hamburger button
        if (!target.closest('button[aria-label="Toggle menu"]')) {
          closeMobileMenu();
        }
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <header className="glass sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent" onClick={closeMobileMenu} style={{ fontFamily: 'Poppins, sans-serif' }}>
            Sky3D ✨
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 transition-all font-medium hover:scale-105 inline-block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/producten"
                className="text-gray-700 hover:text-primary-600 transition-all font-medium hover:scale-105 inline-block"
              >
                Producten
              </Link>
            </li>
            <li>
              <Link
                to="/over-ons"
                className="text-gray-700 hover:text-primary-600 transition-all font-medium hover:scale-105 inline-block"
              >
                Over Ons
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden focus:outline-none hover:text-primary-600 transition-colors p-2 rounded-lg ${
              mobileMenuOpen ? 'bg-primary-100 text-primary-600' : 'text-gray-700'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation - Overlay */}
        {mobileMenuOpen && (
          <div ref={menuRef} className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-2xl z-50 animate-slide-down border-b border-gray-200">
            <ul className="container mx-auto px-4 py-6 space-y-3">
              <li>
                <Link
                  to="/"
                  className="block py-3 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/producten"
                  className="block py-3 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium"
                  onClick={closeMobileMenu}
                >
                  Producten
                </Link>
              </li>
              <li>
                <Link
                  to="/over-ons"
                  className="block py-3 px-4 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all font-medium"
                  onClick={closeMobileMenu}
                >
                  Over Ons
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 rounded-lg font-medium text-center hover:shadow-lg transition-all"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

