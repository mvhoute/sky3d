import { useEffect } from 'react';

interface ImageLightboxProps {
  images: { url: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageLightbox = ({ images, currentIndex, onClose, onNext, onPrev }: ImageLightboxProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 z-10"
        aria-label="Sluiten"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 p-3 rounded-full"
          aria-label="Vorige afbeelding"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 p-3 rounded-full"
          aria-label="Volgende afbeelding"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-7xl max-h-[90vh] mx-auto px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
      </div>

      {/* Touch/Click hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-4 py-2 rounded-full">
        Klik buiten de afbeelding of druk op ESC om te sluiten
      </div>
    </div>
  );
};
