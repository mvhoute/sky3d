import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useRef } from 'react';
import { apiService } from '../services/api';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = ['.stl', '.3mf', '.zip'];

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError('Bestand is te groot. Maximaal 50MB toegestaan.');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_FILE_TYPES.includes(fileExtension)) {
      setFileError('Ongeldig bestandstype. Alleen STL, 3MF en ZIP bestanden zijn toegestaan.');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
        file: selectedFile || undefined,
      });

      setSubmitSuccess(true);
      reset();
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

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
        <h3 className="text-2xl font-bold text-green-900 mb-2">Bedankt voor uw bericht!</h3>
        <p className="text-green-700 mb-6">
          We hebben uw aanvraag ontvangen en nemen zo spoedig mogelijk contact met u op.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-green-600 hover:text-green-800 font-semibold"
        >
          Nieuw bericht versturen
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

      {/* File Upload Field */}
      <div>
        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">
          3D Bestand uploaden <span className="text-gray-400">(optioneel)</span>
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Heeft u een eigen ontwerp? Upload uw STL, 3MF of ZIP bestand (max. 50MB).
        </p>

        {!selectedFile ? (
          <div className="relative">
            <input
              type="file"
              id="fileUpload"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".stl,.3mf,.zip"
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-gray-600">Klik om bestand te selecteren</span>
              <span className="text-xs text-gray-400 mt-1">STL, 3MF of ZIP</span>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                <p className="text-xs text-blue-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-blue-600 hover:text-blue-800 p-1"
              title="Bestand verwijderen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {fileError && (
          <p className="mt-2 text-sm text-red-600">{fileError}</p>
        )}
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
            'Versturen'
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Door dit formulier in te dienen gaat u akkoord met het opslaan van uw gegevens.
      </p>
    </form>
  );
};
