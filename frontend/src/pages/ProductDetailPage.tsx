import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductDetailSkeleton } from '../components/Skeletons';
import { ImageLightbox } from '../components/ImageLightbox';
import type { Product, StrapiResponse } from '../types';
import { apiService, getImageUrl } from '../services/api';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response: StrapiResponse<Product> = await apiService.getProduct(id);
        setProduct(response.data);
      } catch (err) {
        setError('Kon product niet laden. Probeer het later opnieuw.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold mb-1">Er is een fout opgetreden</p>
          <p className="text-sm">{error || 'Product niet gevonden'}</p>
        </div>
        <Link to="/producten" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Terug naar producten
        </Link>
      </div>
    );
  }

  const mainImage = product.Images?.[selectedImage];
  const imageUrl = mainImage?.formats?.large?.url || mainImage?.url;

  // Prepare images for lightbox
  const lightboxImages = product.Images?.map(img => ({
    url: getImageUrl(img.formats?.large?.url || img.url),
    alt: product.Title
  })) || [];

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.Images.length);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.Images.length) % product.Images.length);
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  // Convert Strapi rich text blocks to HTML string
  const getDescriptionHtml = () => {
    if (!product.Description) return '';
    if (typeof product.Description === 'string') return product.Description;

    // Handle rich text blocks from Strapi
    return product.Description.map((block: any) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map((child: any) => child.text || '').join('') || '';
        return `<p>${text}</p>`;
      }
      return '';
    }).join('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link to="/producten" className="text-blue-600 hover:underline">
          ← Terug naar producten
        </Link>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {imageUrl ? (
            <>
              <div
                className="bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-zoom-in group relative"
                onClick={() => openLightbox(selectedImage)}
              >
                <img
                  loading="lazy"
                  src={getImageUrl(imageUrl)}
                  alt={product.Title}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
              {product.Images && product.Images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.Images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      onDoubleClick={() => openLightbox(index)}
                      className={`bg-gray-100 rounded overflow-hidden transition-all cursor-pointer hover:ring-2 hover:ring-primary-400 ${
                        selectedImage === index ? 'ring-2 ring-primary-600' : ''
                      }`}
                      title="Klik om te selecteren, dubbelklik voor groot beeld"
                    >
                      <img
                        loading="lazy"
                        src={getImageUrl(image.formats?.thumbnail?.url || image.url)}
                        alt={`${product.Title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center text-gray-400">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.Title}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">€{product.Price.toFixed(2)}</p>

          {!product.inStock && (
            <div className="bg-amber-50 border-l-4 border-amber-500 px-6 py-4 rounded-r-lg mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Tijdelijk niet op voorraad</h3>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Dit product is momenteel niet beschikbaar, maar u kunt het nog steeds aanvragen!
                    We nemen contact met u op over de levertijd en beschikbaarheid.
                    Mogelijk hebben we dit product in een andere kleur of kunnen we het speciaal voor u maken.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="prose max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: getDescriptionHtml() }} />
          </div>

          <Link
            to={`/contact?product=${product.documentId}`}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {product.inStock ? 'Bestellen' : 'Product Aanvragen'}
          </Link>
          {!product.inStock && (
            <p className="text-sm text-gray-500 mt-3">
              Vul het contactformulier in en wij nemen zo snel mogelijk contact met u op over de beschikbaarheid.
            </p>
          )}
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxOpen && product.Images && product.Images.length > 0 && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={selectedImage}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
    </div>
  );
};

