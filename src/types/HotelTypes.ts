export type Hotel = {
  name: string;
  country: string;
  address: string;
  stars: number;
  type: string;
  description: string;
  services: string[];
  min_price: number;
  currency: string;
  rating: number;
  reviews_amount: number;
  last_review: string;
};

export type Filter = {
  country: string;
  type: string[];
  stars: number[];
  reviews: string;
  maxPrice: number;
  minPrice: number;
}
