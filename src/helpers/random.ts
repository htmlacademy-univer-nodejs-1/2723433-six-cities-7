export function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(
  min: number,
  max: number,
  precision = 1
): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(precision));
}

export function getRandomItem<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot select an item from an empty array');
  }

  return items[getRandomInteger(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[], count: number): T[] {
  if (count < 0 || count > items.length) {
    throw new Error('Invalid number of items to select');
  }

  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
