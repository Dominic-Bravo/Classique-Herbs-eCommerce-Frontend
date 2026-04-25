import { useState } from 'react';
import type { Product } from '../data/products';
import ImageGalleryModal from './ImageGalleryModal';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openViewer = (index: number) => {
    setActiveImageIndex(index);
    setIsViewerOpen(true);
  };

  const previousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? product.images.length - 1 : current - 1,
    );
  };

  const nextImage = () => {
    setActiveImageIndex((current) => (current + 1) % product.images.length);
  };

  const previewImage = product.images[0];

  return (
    <>
      {isViewerOpen && (
        <ImageGalleryModal
          images={product.images}
          activeIndex={activeImageIndex}
          onClose={() => setIsViewerOpen(false)}
          onPrevious={previousImage}
          onNext={nextImage}
          onSelect={setActiveImageIndex}
        />
      )}

      <article className="relative group overflow-hidden rounded-[32px] border border-gray-200 bg-gradient-to-b from-white to-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
  
        {/* Badge logic remains strong */}
        {product.badge?.trim() && product.badge.trim().toLowerCase() !== 'none' && (
            <span className="absolute left-6 top-6 z-20 inline-flex rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
            {product.badge.trim()}
            </span>
        )}

        {/* Main Image with Zoom Effect */}
        <button
            type="button"
            onClick={() => openViewer(0)}
            className="relative w-full overflow-hidden rounded-t-[32px] block"
            aria-label={`Open ${product.name} image viewer`}
        >
            <div className="relative h-64 overflow-hidden bg-slate-100">
            <img
                src={previewImage}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
            </div>
        </button>

        {/* Thumbnails */}
        {product.images.length > 1 && (
            <div className="grid grid-cols-2 gap-2 border-y border-gray-200 bg-white px-4 py-3">
            {product.images.slice(0, 2).map((image, index) => (
                <button
                key={`${product.id}-thumb-${index}`}
                type="button"
                onClick={() => openViewer(index)}
                className="overflow-hidden rounded-2xl border border-gray-100 transition hover:border-emerald-400"
                >
                <img src={image} alt="" className="h-16 w-full object-cover" />
                </button>
            ))}
            </div>
        )}

        {/* Content Area */}
        <div className="space-y-5 p-6">
            <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">
                {product.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                {product.description}
                </p>
            </div>
            
            {/* Price Tag - Fixed Shrink */}
            <div className="flex-shrink-0"> 
                <span 
                className="
                    inline-flex items-center justify-center rounded-2xl px-4 py-2 
                    min-w-[90px] text-lg font-bold
                    bg-emerald-50 text-emerald-700 border border-emerald-100
                    transition-all duration-300 cursor-pointer
                    hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:-translate-y-1
                "
                >
                {product.price}
                </span>
            </div>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
            {product.features.map((feature) => (
                <span
                key={feature}
                className="
                    inline-flex items-center justify-center rounded-full px-3 py-1.5 
                    text-[10px] font-bold uppercase tracking-wider
                    bg-slate-100 text-slate-600 
                    transition-all duration-200
                    hover:bg-slate-200 hover:text-slate-900 cursor-default
                "
                >
                {feature}
                </span>
            ))}
            </div>
        </div>
        </article>
    </>
  );
};

export default ProductCard;
