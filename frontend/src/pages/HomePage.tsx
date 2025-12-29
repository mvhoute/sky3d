import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Product, StrapiResponse } from '../types';
import { apiService } from '../services/api';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response: StrapiResponse<Product[]> = await apiService.getFeaturedProducts();
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white py-24 md:py-32 overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-diagonal-stripes"></div>
        <div className="absolute inset-0 bg-gradient-radial"></div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
            <span className="text-sm font-medium">✨ Professionele 3D Printing</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welkom bij <span className="bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent">Sky3D</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-primary-100 font-light">
            Hoogwaardige 3D prints op maat. Van prototype tot eindproduct,
            wij brengen uw ideeën tot leven met precisie en creativiteit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/producten"
              className="inline-block bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Bekijk Producten →
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 hover:scale-105"
            >
              Contact Opnemen
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                Meest Populair
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Uitgelichte Producten
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Onze meest populaire 3D prints, met zorg en precisie gemaakt
              </p>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/producten"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg group"
              >
                Bekijk alle producten
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Waarom Sky3D?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Op Maat</h3>
              <p className="text-gray-600 leading-relaxed">
                Elk product wordt met zorg en precisie voor u gemaakt, exact volgens uw wensen
              </p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-white border border-accent-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Snel Geleverd</h3>
              <p className="text-gray-600 leading-relaxed">
                Snelle productietijden zonder in te leveren op kwaliteit of precisie
              </p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">✨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Hoogwaardige Kwaliteit</h3>
              <p className="text-gray-600 leading-relaxed">
                Professionele 3D prints met een perfecte afwerking en materialen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
              Ons Proces
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Hoe het werkt
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Van idee tot afgewerkt product in 4 eenvoudige stappen
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Kies Product</h3>
                <p className="text-gray-600 text-sm">
                  Selecteer een product uit ons assortiment of neem contact op voor maatwerk
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Bestel</h3>
                <p className="text-gray-600 text-sm">
                  Plaats uw bestelling via ons contactformulier met uw specificaties
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Productie</h3>
                <p className="text-gray-600 text-sm">
                  Wij printen uw product met precisie en de hoogste kwaliteitsstandaarden
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Ontvang</h3>
                <p className="text-gray-600 text-sm">
                  Uw product wordt afgewerkt en bij u bezorgd of klaar voor ophalen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Poppins, sans-serif' }}>
                100+
              </div>
              <p className="text-primary-100 text-lg">Tevreden Klanten</p>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Poppins, sans-serif' }}>
                500+
              </div>
              <p className="text-primary-100 text-lg">Geprinte Producten</p>
            </div>
            <div className="group">
              <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform" style={{ fontFamily: 'Poppins, sans-serif' }}>
                99%
              </div>
              <p className="text-primary-100 text-lg">Kwaliteitsgarantie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Wat onze klanten zeggen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Fantastische kwaliteit! De telefoonhouder die ik heb besteld is perfect en precies zoals ik wilde. Snelle levering ook!"
              </p>
              <p className="font-semibold text-gray-900">- Jan de Vries</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Professionele service en prachtige afwerking. Sky3D denkt mee en levert maatwerk van topkwaliteit!"
              </p>
              <p className="font-semibold text-gray-900">- Lisa Bakker</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Voor mijn bedrijf laat ik regelmatig prototypes maken. Altijd on-time en perfecte kwaliteit. Aanrader!"
              </p>
              <p className="font-semibold text-gray-900">- Thomas Jansen</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        {/* Gradient overlay instead of background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-900/20"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Klaar om te <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">bestellen</span>?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Bekijk ons assortiment en vind het perfecte 3D geprinte product voor uw project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/producten"
              className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
            >
              Naar Producten
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 hover:scale-105"
            >
              Contact Opnemen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

