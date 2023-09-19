import { ResolverOptions } from '../interfaces/resolver-options.interface';

const locationFilter = (options: ResolverOptions, defaultDistance = 7000) => {
  return {
    $near: {
      $maxDistance: options.distance ?? defaultDistance,
      $geometry: {
        type: 'Point',
        coordinates: [options.longitude, options.latitude],
      },
    },
  };
};

const timeFilter = (daysAgo: number = 5) => {
  return {
    $gte: new Date(new Date().getTime() - daysAgo * 24 * 60 * 60 * 1000),
  };
};

export const FilterResolver = (path: string, options: ResolverOptions) => {
  const map: any = {
    '/favourites': { likes: options.id },
    '/self': { posted_by: options.id },
    '/new': {
      time: timeFilter(),
    },
    '/relevant': {
      location: locationFilter(options),
      time: timeFilter(30),
    },
    '/search': {
      ...(!!options.tags?.length ? { tags: { $all: options.tags } } : {}),
      ...(!!options.category ? { category: options.category } : {}),
      ...(!options.tags?.length && !options.category
        ? {
            location: locationFilter(options),
          }
        : {}),
    },
    '/like': [
      {
        $set: {
          likes: {
            $cond: [
              { $in: [options.id, '$likes'] },
              {
                $filter: {
                  input: '$likes',
                  cond: { $ne: ['$$this', options.id] },
                },
              },
              { $concatArrays: ['$likes', [options.id]] },
            ],
          },
        },
      },
    ],
  };

  return map[path];
};
