export const InterestAggregation = (article) => {
  return [
    {
      $match: {
        usage: { $exists: true },
      },
    },
    {
      $addFields: {
        totalCat: {
          $sum: {
            $map: {
              input: { $objectToArray: "$usage.category" },
              as: "kv",
              in: "$$kv.v",
            },
          },
        },
        totalTags: {
          $sum: {
            $map: {
              input: { $objectToArray: "$usage.tags" },
              as: "kv",
              in: "$$kv.v",
            },
          },
        },
      },
    },

    {
      $match: {
        totalCat: { $gt: 20 },
        totalTags: { $gt: 20 },
      },
    },

    {
      $addFields: {
        suitable: {
          $cond: {
            if: {
              $and: [
                {
                  $gt: [
                    {
                      $divide: [
                        `$usage.category.${article.category}`,
                        "$totalCat",
                      ],
                    },
                    0.4,
                  ],
                },
                {
                  $gt: [
                    {
                      $divide: [
                        {
                          $sum: {
                            $map: {
                              input: {
                                $filter: {
                                  input: { $objectToArray: "$usage.tags" },
                                  cond: {
                                    $in: ["$$kv.k", article.tags],
                                  },
                                  as: "kv",
                                },
                              },
                              as: "kv",
                              in: "$$kv.v",
                            },
                          },
                        },
                        "$totalTags",
                      ],
                    },
                    0.1,
                  ],
                },
              ],
            },
            then: "true",
            else: "false",
          },
        },
      },
    },

    {
      $match: {
        suitable: { $eq: "true" },
      },
    },

    {
      $project: {
        _id: { $toString: "$_id" },
      },
    },

    // { $match: { "CategoryMatch": { $gte: {
    //   $cond: {
    //     if: {

    //     }
    //   }
    // } }}},
  ];
};
