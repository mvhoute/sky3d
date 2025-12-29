import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ContactForm } from '../components/ContactForm';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type { Product, StrapiResponse } from '../types';
import { apiService } from '../services/api';

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const productDocumentId = searchParams.get('product');

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productDocumentId) return;

      try {
        setLoading(true);
        const response: StrapiResponse<Product> = await apiService.getProduct(productDocumentId);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productDocumentId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact & Bestellen</h1>
        <p className="text-gray-600 mb-8">
          Vul onderstaand formulier in om een product te bestellen of om contact met ons op te nemen.
          We nemen zo spoedig mogelijk contact met u op.
        </p>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <ContactForm
              productDocumentId={product?.documentId}
              productTitle={product?.Title}
            />
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Andere Contactmogelijkheden</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-2xl mr-3">📧</span>
                <div>
                  <p className="font-medium">E-mail</p>
                  <a href="mailto:info@sky3d.nl" className="text-blue-600 hover:underline">
                    info@sky3d.nl
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Veelgestelde Vragen</h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <strong>Hoe lang duurt de levertijd?</strong><br />
                Dit hangt af van het product en de huidige drukte. Gemiddeld 3-7 werkdagen.
              </p>
              <p className="text-gray-600">
                <strong>Kan ik een product op maat laten maken?</strong><br />
                Ja! Vermeld dit in het berichtenveld van het formulier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
