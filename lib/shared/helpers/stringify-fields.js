import forEach from 'lodash.foreach';

export default function stringifyFields (data, keys) {
  let result = data;
  if (data) {
    result = Object.assign({}, data);
    forEach(keys, (key) => {
      if (result[key]) {
        result[key] = JSON.stringify(result[key]);
      }
    });
  }
  return result;
}
