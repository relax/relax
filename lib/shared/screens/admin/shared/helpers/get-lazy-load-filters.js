import forEach from 'lodash/forEach';
import shallowequal from 'shallowequal';

export default ({items, sort, order}) => {
  let op = order === 'asc' ? 'gt' : 'lt';
  const filters = [];
  const baseValue = items[items.length - 1][sort];
  const isBaseValueObject = typeof baseValue === 'object';

  if (sort !== '_id') {
    // if not _id there might be repetition
    op = `${op}e`; // gte || lte

    const excludes = [];
    for (let i = items.length - 1; i >= 0; i--) {
      if (isBaseValueObject) {
        if (shallowequal(items[i][sort], baseValue)) {
          excludes.push(items[i]._id);
        }
      } else {
        if (items[i][sort] === baseValue) {
          excludes.push(items[i]._id);
        }
      }
    }

    filters.push({
      property: '_id',
      op: {
        nin: excludes
      }
    });
  }

  if (isBaseValueObject) {
    // assuming it's an object of strings
    forEach(baseValue, (value, key) => {
      filters.push({
        property: `${sort}.${key}`,
        op: {
          [op]: value
        }
      });
    });
  } else {
    filters.push({
      property: sort,
      op: {
        [op]: baseValue
      }
    });
  }


  return filters;
};
