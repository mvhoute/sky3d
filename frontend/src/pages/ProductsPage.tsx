import { useEffect, useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { ProductSort } from '../components/ProductSort';
import { ProductGridSkeleton } from '../components/Skeletons';
import type { Product, StrapiResponse } from '../types';
import { apiService } from '../services/api';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response: StrapiResponse<Product[]> = await apiService.getProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Kon producten niet laden. Probeer het later opnieuw.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof product.Description === 'string' &&
         product.Description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.Title.localeCompare(b.Title, 'nl');
        case 'name-desc':
          return b.Title.localeCompare(a.Title, 'nl');
        case 'price-asc':
          return a.Price - b.Price;
        case 'price-desc':
          return b.Price - a.Price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchQuery, sortOption]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold mb-1">Er is een fout opgetreden</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Onze Producten
      </h1>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl">
        <div className="flex-1 sm:max-w-md">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Zoek producten..."
          />
        </div>
        <div className="sm:w-56">
          <ProductSort onSort={setSortOption} />
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-gray-600 mb-6">
          {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'producten'} gevonden
        </p>
      )}

      {/* Loading State */}
      {loading && <ProductGridSkeleton />}

      {/* Empty State - No Products */}
      {!loading && products.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Nog geen producten</h2>
          <p className="text-gray-500">Er zijn momenteel geen producten beschikbaar.</p>
        </div>
      )}

      {/* Empty State - No Search Results */}
      {!loading && products.length > 0 && filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Geen resultaten gevonden</h2>
          <p className="text-gray-500 mb-4">Probeer een andere zoekopdracht of filter.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Wis zoekopdracht
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredAndSortedProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

