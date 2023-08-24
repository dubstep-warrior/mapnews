export const FilterResolver = (path: string, options: any) => {
  const map: any = {
    "/favourites": { likes: options.id },
    "/self": { posted_by: options.id },
    "/new": {
      time: {
        $gte: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
      },
    },
    "/relevant": {
      location: {
        $near: {
          $maxDistance: options.distance ?? 7000,
          $geometry: {
            type: "Point",
            coordinates: [options.longtitude, options.latitude],
          },
        },
      },
    },
    "/search": {
      ...(!!options.tags?.length ? { tags: { $all: options.tags } } : {}),
      ...(!!options.category ? { category: options.category } : {}),
      ...(!options.tags?.length && !options.category
        ? {
            location: {
              $near: {
                $maxDistance: options.distance ?? 7000,
                $geometry: {
                  type: "Point",
                  coordinates: [options.longtitude, options.latitude],
                },
              },
            },
          }
        : {}),
    },
    "/like": [
      {
        $set: {
          likes: {
            $cond: [
              { $in: [options.id, "$likes"] },
              {
                $filter: {
                  input: "$likes",
                  cond: { $ne: ["$$this", options.id] },
                },
              },
              { $concatArrays: ["$likes", [options.id]] },
            ],
          },
        },
      },
    ],
  };

  return map[path];
};
