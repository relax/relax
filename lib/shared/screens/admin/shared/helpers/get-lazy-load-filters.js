export default ({items, sort, order}) => {
  let op = order === 'asc' ? 'gt' : 'lt';
  const filters = [];
  const baseValue = items[items.length - 1][sort];

  if (sort !== '_id') {
    // if not _id there might be repetition
    op = `${op}e`; // gte || lte

    const excludes = [];
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i][sort] === baseValue) {
        excludes.push(items[i]._id);
      }
    }

    filters.push({
      property: '_id',
      op: {
        nin: excludes
      }
    });
  }

  filters.push({
    property: sort,
    op: {
      [op]: baseValue
    }
  });

  return filters;
};
