/** Shared domain types. Shaped so products can move to a DB/admin panel later. */

export type Sport =
  | 'football'
  | 'cricket'
  | 'basketball'
  | 'badminton'
  | 'volleyball'
  | 'running'
  | 'training'
  | 'multi';

export type CategorySlug =
  | 'custom-jerseys'
  | 'custom-tshirts'
  | 'sportswear'
  | 'equipment'
  | 'footwear'
  | 'accessories'
  | 'protection';

export type Gender = 'men' | 'women' | 'unisex' | 'kids';

/** Drives the generated product artwork (see components/product/ProductMedia). */
export type ArtKind =
  | 'jersey'
  | 'tshirt'
  | 'polo'
  | 'bat'
  | 'ball'
  | 'football'
  | 'basketball'
  | 'racket'
  | 'shuttle'
  | 'net'
  | 'shoe'
  | 'lower'
  | 'tracksuit'
  | 'cap'
  | 'support'
  | 'gloves'
  | 'pads'
  | 'helmet'
  | 'shorts'
  | 'socks'
  | 'shinguard';

export interface ProductArt {
  kind: ArtKind;
  /** Primary + secondary colours used by the generated artwork. */
  colors: [string, string];
  pattern?: 'solid' | 'stripes' | 'sash' | 'hoops' | 'chevron' | 'camo';
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  sport: Sport;
  brand: string;
  gender: Gender;
  description: string;
  /** Long-form copy for the product page. */
  details?: string;
  price: number;
  salePrice?: number;
  /**
   * Real photography goes here (paths under /public/products/...).
   * While empty, the UI renders premium generated artwork instead so the
   * site never shows a broken or placeholder-grey image.
   */
  images: string[];
  art: ProductArt;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  customizable: boolean;
  featured: boolean;
  newArrival: boolean;
  bestSeller?: boolean;
  rating: number;
  reviewCount: number;
  specifications: ProductSpec[];
  material?: string;
  care?: string;
  tags: string[];
}

export interface CartCustomisation {
  sport?: string;
  jerseyType?: string;
  pattern?: string;
  /** Hex values — used to render the colour swatches in the cart. */
  primaryColor?: string;
  secondaryColor?: string;
  /** Human-readable equivalents, preferred in the WhatsApp message. */
  primaryColorName?: string;
  secondaryColorName?: string;
  teamName?: string;
  playerName?: string;
  playerNumber?: string;
  logoFileName?: string;
  sponsorFileName?: string;
  notes?: string;
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  art: ProductArt;
  size?: string;
  color?: string;
  quantity: number;
  customisation?: CartCustomisation;
}
