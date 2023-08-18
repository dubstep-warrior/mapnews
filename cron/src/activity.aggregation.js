export const ActivityAggregation = (article) => {
  return [
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [
            article.location.coordinates[0],
            article.location.coordinates[1],
          ],
        },
        distanceField: "dist.calculated",
        maxDistance: 2,
        spherical: true,
      },
    },
  ];
};
