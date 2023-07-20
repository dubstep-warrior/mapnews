
export const FilterResolver = (path: string, options: any) => {
  const map: any = {
    "/favourites": { likes: options.id },
    "/self": { posted_by: options.id },
    "/new": {
      time: {
        $gte: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
      },
    },
    "/relevant": { _id: { $exists: true } },
  };

  return map[path];
};
