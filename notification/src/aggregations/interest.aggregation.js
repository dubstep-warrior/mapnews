const threshold = {
  combinedUsage: 20,
  catUsage: 0.4,
  tagUsage: 0.1,
};

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
        totalCat: { $gt: threshold["combinedUsage"] },
        totalTags: { $gt: threshold["combinedUsage"] },
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
                    threshold["catUsage"],
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
                    threshold["tagUsage"],
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
  ];
};
