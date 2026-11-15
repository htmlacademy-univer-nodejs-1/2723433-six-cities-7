import type { CityName } from './city.js';
import type { Amenity, OfferType } from './offer.js';
import type { MockUser } from './mock.js';

export type MockOffers = {
  titles: string[];
  descriptions: string[];
  cities: CityName[];
  previewImages: string[];
  images: string[];
  types: OfferType[];
  amenities: Amenity[];
  users: Omit<MockUser, 'password'>[];
};
