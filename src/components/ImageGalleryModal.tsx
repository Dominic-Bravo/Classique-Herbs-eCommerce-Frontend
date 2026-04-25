import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface ImageGalleryModalProps {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowLeft') {
        onPrevious();
      }
      if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition hover:bg-gray-100"
          aria-label="Close image viewer"
        >
          <X size={22} />
        </button>

        <div className="relative flex items-center justify-center bg-black/90 p-6">
          <img
            src={images[activeIndex]}
            alt={`Product image ${activeIndex + 1}`}
            className="max-h-[80vh] w-full max-w-full object-contain rounded-3xl"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrevious}
                className="absolute left-4 rounded-full bg-white/90 p-3 text-gray-700 shadow hover:bg-white"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-4 rounded-full bg-white/90 p-3 text-gray-700 shadow hover:bg-white"
                aria-label="Next image"
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 bg-gray-50 px-6 py-4">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => onSelect(index)}
                className={`h-16 w-16 overflow-hidden rounded-3xl border p-1 transition ${
                  index === activeIndex ? 'border-green-500 ring-2 ring-green-200' : 'border-transparent hover:ring-2 hover:ring-gray-200'
                }`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryModal;
