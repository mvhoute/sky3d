export const ProductCardSkeleton = () => (
  <div className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
    <div className="p-6">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="h-7 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-32 mb-6"></div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Image Gallery Skeleton */}
      <div>
        <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg h-96 mb-4"></div>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-300 rounded h-20"></div>
          ))}
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div>
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded w-40"></div>
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
