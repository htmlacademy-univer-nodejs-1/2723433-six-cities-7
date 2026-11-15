import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import got from 'got';

import type { MockOffers } from '../types/mock-server-data.js';
import { generateOffer } from './generate-offer.js';
import { serializeOffer } from './serialize-offer.js';

async function* offerGenerator(
  count: number,
  mockData: MockOffers
) {
  for (let i = 0; i < count; i++) {
    yield `${serializeOffer(generateOffer(mockData))}\n`;
  }
}

export const generateOffers = async (
  count: number,
  filepath: string,
  url: string
): Promise<void> => {
  const mockData = (await got(url).json<MockOffers>());

  await pipeline(
    Readable.from(offerGenerator(count, mockData)),
    createWriteStream(filepath, { encoding: 'utf-8' })
  );
};
