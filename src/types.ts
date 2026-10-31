export type Currency = 'DH' | 'USD' | 'EUR';

export interface AdventureTheme {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  coverImage: string;
  previewSpread: string;
  description: string;
  recommendedAges: string;
  accentColor: string;
}

export interface BookPackage {
  id: 'mini' | 'complete' | 'combo';
  name: string;
  pages: number;
  priceDH: number;
  priceUSD: number;
  priceEUR: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  badge?: string;
  features: string[];
}

export interface CustomBookOrder {
  id: string;
  childName: string;
  childAge: number;
  gender: 'boy' | 'girl' | 'neutral';
  themeId: string;
  packageId: 'mini' | 'complete' | 'combo';
  coverType: 'hardcover' | 'softcover';
  dedication: string;
  photoUrl: string;
  secondThemeId?: string; // For combo
  priceDH: number;
  priceUSD: number;
  priceEUR: number;
  quantity: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  childName: string;
  rating: number;
  review: string;
  bookTitle: string;
  date: string;
  verified: boolean;
}
