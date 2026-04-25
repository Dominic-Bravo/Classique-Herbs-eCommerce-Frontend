import { Droplets, Leaf, Pill, Waves } from 'lucide-react';
import type { ReactNode } from 'react';

export interface SidebarItem {
  id: string;
  name: string;
  icon: ReactNode;
  path: string;
  headline: string;
  description: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'teas',
    name: 'Teas',
    icon: <Leaf size={20} />,
    path: 'teas',
    headline: 'Fresh herbal teas for every mood',
    description:
      'Explore our carefully selected loose-leaf blends, wellness infusions, and soothing tea rituals.',
  },
  {
    id: 'capsules',
    name: 'Capsules',
    icon: <Pill size={20} />,
    path: 'capsules',
    headline: 'Daily herbal capsules made easy',
    description:
      'Browse remedy capsules for busy lifestyles, crafted to support rest, focus, and balance.',
  },
  {
    id: 'powders',
    name: 'Powders',
    icon: <Waves size={20} />,
    path: 'powders',
    headline: 'Plant-based powders for your rituals',
    description:
      'Discover adaptogenic powders, superfood blends, and culinary botanicals for everyday wellness.',
  },
  {
    id: 'oils',
    name: 'Oils',
    icon: <Droplets size={20} />,
    path: 'oils',
    headline: 'Nourishing botanicals and wellness oils',
    description:
      'Find calming massage oils, uplifting aromatherapy blends, and pure botanical extracts.',
  },
];
