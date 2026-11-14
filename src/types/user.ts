export type UserType = 'regular' | 'pro';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  passwordHash: string;
  type: UserType;
};
