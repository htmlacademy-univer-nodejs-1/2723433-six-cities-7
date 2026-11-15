import type { MockOffer } from '../types/mock.js';

export function serializeOffer(offer: MockOffer): string {
  return [
    offer.title,
    offer.description,
    offer.publicationDate.toISOString(),
    offer.city.name,
    offer.previewImage,
    offer.images.join(','),
    offer.isPremium,
    offer.isFavorite,
    offer.rating,
    offer.type,
    offer.rooms,
    offer.guests,
    offer.price,
    offer.amenities.join(','),
    offer.author.name,
    offer.author.email,
    offer.author.avatarUrl ?? '',
    offer.author.password,
    offer.author.type,
    offer.location.latitude,
    offer.location.longitude
  ].join('\t');
}
