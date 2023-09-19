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
    {
      $match: {
        $expr: {
          $gte: [
            "$time",
            {
              $subtract: ["$$NOW", 3600000],
            },
          ],
        },
      },
    },

    { $project: { tags: 1 } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    {
      $group: {
        _id: null,
        sum: { $sum: "$count" },
        avg: { $avg: "$count" },
        match: {
          $sum: {
            $cond: {
              if: {
                $in: ["$_id", article.tags],
              },
              then: "$count",
              else: 0,
            },
          },
        },
      },
    },
    {
      // cleanup
      $project: {
        _id: false,
      },
    },
    {
      $match: {
        $expr: {
          $gt: [
            { $divide: ["$match", "$sum"] },
            {
              $multiply: [
                { $divide: ["$avg", "$sum"] },
                article.tags?.length ?? 0,
              ],
            },
          ],
        },
      },
    },
  ];
};
