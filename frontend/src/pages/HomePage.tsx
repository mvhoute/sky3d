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
            <span className="text-sm font-medium">🖨️ 3D Printing als Hobby</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Welkom bij <span className="bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent">Sky3D</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-primary-100 font-light">
            Een hobbyproject waar ik 3D prints maak voor mezelf en anderen.
            Heb je een leuk idee? Laat het me weten!
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
                Uitgelicht
              </span>
              <h2 className="text-4xl md:text-5xl font-bold pb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Recente Prints
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Een selectie van prints die ik recent heb gemaakt
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
            <h2 className="text-4xl md:text-5xl font-bold pb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Wat kan ik voor je maken?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/contact" className="group text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Op Maat</h3>
              <p className="text-gray-600 leading-relaxed">
                Heb je een specifiek idee of ontwerp? Ik kijk graag wat er mogelijk is
              </p>
            </Link>
            <Link to="/contact" className="group text-center p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-white border border-accent-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">📁</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Eigen Bestanden</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload je eigen STL of 3MF bestand en ik print het voor je
              </p>
            </Link>
            <Link to="/contact" className="group text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Persoonlijk Contact</h3>
              <p className="text-gray-600 leading-relaxed">
                Geen callcenter, gewoon direct contact voor vragen of overleg
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section - How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
              Hoe Werkt Het
            </span>
            <h2 className="text-4xl md:text-5xl font-bold pb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Eenvoudig proces
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              In een paar stappen van idee naar print
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Kies of Upload</h3>
                <p className="text-gray-600 text-sm">
                  Kies een product uit de collectie of upload je eigen 3D bestand
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
                <h3 className="text-xl font-bold mb-2 text-gray-900">Neem Contact Op</h3>
                <p className="text-gray-600 text-sm">
                  Stuur een berichtje via het contactformulier met je wensen
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
                <h3 className="text-xl font-bold mb-2 text-gray-900">Printen</h3>
                <p className="text-gray-600 text-sm">
                  Ik print je ontwerp en houd je op de hoogte van de voortgang
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
                <h3 className="text-xl font-bold mb-2 text-gray-900">Ontvangen</h3>
                <p className="text-gray-600 text-sm">
                  Je print wordt bezorgd of is klaar om opgehaald te worden
                </p>
              </div>
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
            Interesse of een <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">vraag</span>?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Kijk rond in de collectie of neem contact op als je iets speciaals wilt laten printen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/producten"
              className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
            >
              Bekijk Producten
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 hover:scale-105"
            >
              Neem Contact Op
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

