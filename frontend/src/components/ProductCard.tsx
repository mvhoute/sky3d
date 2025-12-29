import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { getImageUrl } from '../services/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const thumbnailUrl = product.Images?.[0]?.formats?.small?.url || product.Images?.[0]?.url;

  return (
    <Link
      to={`/producten/${product.documentId}`}
      className="group block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
    >
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 relative">
        {thumbnailUrl ? (
          <>
            <img
              src={getImageUrl(thumbnailUrl)}
              alt={product.Title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.Featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            ⭐ Populair
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {product.Title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            €{product.Price.toFixed(2)}
          </p>
          {!product.inStock && (
            <span className="text-sm text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full">
              Uitverkocht
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

