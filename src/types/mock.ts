import type { Offer } from './offer.js';
import type { User } from './user.js';

export type MockUser = Pick<
  User,
  'name' | 'email' | 'avatarUrl' | 'type'
> & {
  password: string;
};

export type MockOffer = Omit<
  Offer,
  'id' | 'authorId' | 'commentsCount'
> & {
  author: MockUser;
};
