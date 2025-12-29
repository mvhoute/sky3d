import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { apiService } from '../services/api';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Naam moet minimaal 2 karakters bevatten'),
  customerEmail: z.string().email('Ongeldig e-mailadres'),
  customerPhone: z.string().optional(),
  customerMessage: z.string().optional(),
  productDocumentId: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface ContactFormProps {
  productDocumentId?: string;
  productTitle?: string;
}

export const ContactForm = ({ productDocumentId, productTitle }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productDocumentId: productDocumentId,
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await apiService.submitOrder({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerMessage: data.customerMessage,
        product: data.productDocumentId,
      });

      setSubmitSuccess(true);
      reset();

      // Scroll to success message
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError('Er is iets misgegaan. Probeer het later opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Bedankt voor uw bestelling!</h3>
        <p className="text-green-700 mb-6">
          We hebben uw aanvraag ontvangen en nemen zo spoedig mogelijk contact met u op.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-green-600 hover:text-green-800 font-semibold"
        >
          Nieuwe bestelling plaatsen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      {productTitle && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Product:</strong> {productTitle}
          </p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
          Naam <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="customerName"
          {...register('customerName')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.customerName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Uw naam"
        />
        {errors.customerName && (
          <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
          E-mail <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="customerEmail"
          {...register('customerEmail')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.customerEmail ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="uw.email@voorbeeld.nl"
        />
        {errors.customerEmail && (
          <p className="mt-1 text-sm text-red-600">{errors.customerEmail.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
          Telefoonnummer <span className="text-gray-400">(optioneel)</span>
        </label>
        <input
          type="tel"
          id="customerPhone"
          {...register('customerPhone')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="06 12345678"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="customerMessage" className="block text-sm font-medium text-gray-700 mb-2">
          Bericht <span className="text-gray-400">(optioneel)</span>
        </label>
        <textarea
          id="customerMessage"
          {...register('customerMessage')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Heeft u specifieke wensen of vragen? Laat het ons weten..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verzenden...
            </span>
          ) : (
            'Bestelling Plaatsen'
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Door dit formulier in te dienen gaat u akkoord met het opslaan van uw gegevens.
      </p>
    </form>
  );
};
