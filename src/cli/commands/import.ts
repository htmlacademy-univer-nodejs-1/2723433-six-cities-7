import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';
import chalk from 'chalk';

import type {
  Amenity,
  CityName,
  MockOffer,
  OfferType,
  UserType
} from '../../types/index.js';

const parseBoolean = (value: string): boolean => {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  throw new Error(`Некорректное логическое значение: ${value}`);
};

const parseNumber = (value: string): number => {
  const result = Number(value);

  if (!Number.isFinite(result)) {
    throw new Error(`Некорректное числовое значение: ${value}`);
  }

  return result;
};

const parseOffer = (line: string, lineNumber: number): MockOffer => {
  const columns = line.split('\t');

  if (columns.length !== 21) {
    throw new Error(
      `Строка ${lineNumber}: ожидалось 21 поле, получено ${columns.length}`
    );
  }

  const [
    title,
    description,
    publicationDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    rooms,
    guests,
    price,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorType,
    latitude,
    longitude
  ] = columns;

  const imageList = images.split(',');
  const amenityList = amenities.split(',') as Amenity[];

  if (imageList.length !== 6) {
    throw new Error(`Строка ${lineNumber}: должно быть ровно 6 изображений`);
  }

  const latitudeValue = parseNumber(latitude);
  const longitudeValue = parseNumber(longitude);

  const date = new Date(publicationDate);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Строка ${lineNumber}: некорректная дата`);
  }

  return {
    title,
    description,
    publicationDate: date,
    city: {
        name: city as CityName,
        location:  {
            latitude: latitudeValue,
            longitude: longitudeValue
        }
    },
    previewImage,
    images: imageList as MockOffer['images'],
    isPremium: parseBoolean(isPremium),
    isFavorite: parseBoolean(isFavorite),
    rating: parseNumber(rating),
    type: type as OfferType,
    rooms: parseNumber(rooms),
    guests: parseNumber(guests),
    price: parseNumber(price),
    amenities: amenityList,
    author: {
      name: authorName,
      email: authorEmail,
      avatarUrl: authorAvatar || undefined,
      password: authorPassword,
      type: authorType as UserType
    },
    location: {
      latitude: parseNumber(latitude),
      longitude: parseNumber(longitude)
    }
  };
};

export const importOffers = async (filePath: string): Promise<void> => {
  const absolutePath = resolve(process.cwd(), filePath);
  const fileStream = createReadStream(absolutePath, {
    encoding: 'utf-8'
  });

  const lineReader = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNumber = 0;
  let importedCount = 0;

  try {
    for await (const line of lineReader) {
      lineNumber += 1;

      if (!line.trim()) {
        continue;
      }

      const offer = parseOffer(line, lineNumber);

      // Не выводим пароль пользователя в консоль.
      console.log(chalk.green(`Предложение ${importedCount + 1}:`));
      console.log({
        ...offer,
        author: {
          name: offer.author.name,
          email: offer.author.email,
          avatarUrl: offer.author.avatarUrl,
          type: offer.author.type
        }
      });

      importedCount += 1;
    }

    console.log();
    console.log(chalk.bold.green(`Импортировано предложений: ${importedCount}`));
  } catch (error) {
    console.error(
      chalk.red(
        `Ошибка импорта на строке ${lineNumber}: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    );

    throw error;
  }
};
