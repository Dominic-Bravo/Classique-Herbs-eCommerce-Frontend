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
        {product.badge?.trim() && product.badge.trim().toLowerCase() !== 'none' && (
          <span className="absolute left-6 top-6 z-10 inline-flex rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
            {product.badge.trim()}
          </span>
        )}

        <button
          type="button"
          onClick={() => openViewer(0)}
          className="relative w-full overflow-hidden rounded-t-[32px]"
          aria-label={`Open ${product.name} image viewer`}
        >
          <div className="relative h-64 overflow-hidden bg-slate-100 transition duration-300 group-hover:opacity-95">
            <img
              src={previewImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </button>

        {product.images.length > 1 && (
          <div className="grid grid-cols-2 gap-2 border-y border-gray-200 bg-white px-4 py-3">
            {product.images.slice(0, 2).map((image, index) => (
              <button
                key={`${product.id}-thumb-${index}`}
                type="button"
                onClick={() => openViewer(index)}
                className="overflow-hidden rounded-3xl border border-gray-200 transition hover:border-emerald-400"
              >
                <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="space-y-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 px-4 py-2 text-right text-lg font-semibold text-emerald-700 shadow-sm">
              {product.price}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="rounded-3xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
            <span>{product.images.length} image{product.images.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductCard;
