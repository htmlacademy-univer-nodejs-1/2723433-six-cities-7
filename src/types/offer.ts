import type { City } from './city.js';

export type OfferType = 'apartment' | 'house' | 'room' | 'hotel';

export type Amenity =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

export type Offer = {
  id: string;
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  images: [string, string, string, string, string, string];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  authorId: string;
  commentsCount: number;
  location: {
    latitude: number;
    longitude: number;
  };
};
