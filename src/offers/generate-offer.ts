import { CITY_COORDINATES } from '../const.js';
import {
  getRandomFloat,
  getRandomInteger,
  getRandomItem,
  getRandomItems
} from '../helpers/random.js';

import type { MockOffers } from '../types/mock-server-data.js';
import type { MockOffer } from '../types/mock.js';

const DAY_MS = 24 * 60 * 60 * 1000;
const PASSWORD_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';

function generatePassword(): string {
  const length = getRandomInteger(6, 12);

  return Array.from({ length }, () =>
    getRandomItem([...PASSWORD_CHARS])
  ).join('');
}

export function generateOffer(data: MockOffers): MockOffer {
  const mock = data;

  const cityName = getRandomItem(mock.cities);
  const cityLocation = CITY_COORDINATES[cityName];

  const location = {
    latitude: getRandomFloat(cityLocation.latitude - 0.05, cityLocation.latitude + 0.05, 6),
    longitude: getRandomFloat(cityLocation.longitude - 0.05, cityLocation.longitude + 0.05, 6)
  };

  const user = getRandomItem(mock.users);

  return {
    title: getRandomItem(mock.titles),
    description: getRandomItem(mock.descriptions),
    publicationDate: new Date(Date.now() - getRandomInteger(0, 365) * DAY_MS),

    city: {
      name: cityName,
      location: cityLocation
    },

    previewImage: getRandomItem(mock.previewImages),
    images: getRandomItems(mock.images, 6) as MockOffer['images'],

    isPremium: Math.random() >= 0.5,
    isFavorite: Math.random() >= 0.5,
    rating: getRandomFloat(1, 5),

    type: getRandomItem(mock.types),
    rooms: getRandomInteger(1, 8),
    guests: getRandomInteger(1, 10),
    price: getRandomInteger(100, 100000),

    amenities: getRandomItems(
      mock.amenities,
      getRandomInteger(1, mock.amenities.length)
    ),

    author: {
      ...user,
      password: generatePassword()
    },

    location
  };
}
