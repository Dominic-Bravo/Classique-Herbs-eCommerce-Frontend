import sampleProductImage from '../assets/hero.png';

export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  tags?: string[];
  images: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'sunrise-mint-blend',
    category: 'teas',
    name: 'Sunrise Mint Blend',
    price: '$14.99',
    description: 'A calming herbal tea with peppermint, chamomile, and lavender for gentle mornings.',
    features: ['Relaxing', 'Caffeine-free', 'Cooling mint'],
    tags: ['wellness', 'morning', 'herbal'],
    images: [sampleProductImage, sampleProductImage, sampleProductImage, sampleProductImage],
    badge: 'Best seller',
  },
  {
    id: 'evening-digest',
    category: 'teas',
    name: 'Evening Digest',
    price: '$16.50',
    description: 'A soothing blend of fennel, ginger, and cinnamon to support digestion after dinner.',
    features: ['Dinner-friendly', 'Warm spices', 'Gut support'],
    tags: ['digestive', 'evening', 'calming'],
    images: [sampleProductImage, sampleProductImage],
  },
  {
    id: 'focus-capsules',
    category: 'capsules',
    name: 'Focus Capsules',
    price: '$24.99',
    description: 'Plant-powered capsules designed to support concentration and mental clarity.',
    features: ['Lion’s mane', 'Rhodiola', 'Daily support'],
    tags: ['focus', 'cognitive', 'energy'],
    images: [sampleProductImage, sampleProductImage],
    badge: 'Popular',
  },
  {
    id: 'sleep-well-capsules',
    category: 'capsules',
    name: 'Sleep Well Capsules',
    price: '$22.00',
    description: 'A gentle nightly formula with valerian and passionflower for restful sleep.',
    features: ['Night formula', 'Deep rest', 'Herbal calm'],
    tags: ['sleep', 'relaxation', 'night'],
    images: [sampleProductImage, sampleProductImage],
  },
  {
    id: 'golden-matcha',
    category: 'powders',
    name: 'Golden Matcha',
    price: '$18.99',
    description: 'A smooth herbal powder with turmeric and matcha to support energy and balance.',
    features: ['Anti-inflammatory', 'Energy lift', 'Superfood blend'],
    tags: ['energy', 'superfood', 'turmeric'],
    images: [sampleProductImage, sampleProductImage],
  },
  {
    id: 'berry-protein',
    category: 'powders',
    name: 'Berry Protein Powder',
    price: '$27.50',
    description: 'A fruity plant powder with protein, antioxidants, and adaptogens.',
    features: ['Plant protein', 'Antioxidants', 'Vegan friendly'],
    tags: ['protein', 'berry', 'vegan'],
    images: [sampleProductImage, sampleProductImage],
  },
  {
    id: 'calming-ritual-oil',
    category: 'oils',
    name: 'Calming Ritual Oil',
    price: '$19.99',
    description: 'A botanical blend for massage and aromatherapy to help unwind after a long day.',
    features: ['Aromatherapy', 'Skin-nourishing', 'Lavender-rich'],
    tags: ['aromatherapy', 'relaxation', 'massage'],
    images: [sampleProductImage, sampleProductImage],
    badge: 'New',
  },
  {
    id: 'renewal-body-oil',
    category: 'oils',
    name: 'Renewal Body Oil',
    price: '$21.99',
    description: 'A restorative oil with jojoba and rosemary for soft, hydrated skin.',
    features: ['Moisturizing', 'Botanical extracts', 'Daily care'],
    tags: ['skincare', 'restorative', 'herbal'],
    images: [sampleProductImage, sampleProductImage],
  },
  {
    id: 'renewal-body-oil',
    category: 'oils',
    name: 'Renewal Body Oil',
    price: '$21.99',
    description: 'A restorative oil with jojoba and rosemary for soft, hydrated skin.',
    features: ['Moisturizing', 'Botanical extracts', 'Daily care'],
    tags: ['skincare', 'restorative', 'herbal'],
    images: [sampleProductImage, sampleProductImage],
  },
  {
    id: 'renewal-body-oil',
    category: 'oils',
    name: 'Renewal Body Oil',
    price: '$21.99',
    description: 'A restorative oil with jojoba and rosemary for soft, hydrated skin.',
    features: ['Moisturizing', 'Botanical extracts', 'Daily care'],
    tags: ['skincare', 'restorative', 'herbal'],
    images: [sampleProductImage, sampleProductImage],
  },
];
