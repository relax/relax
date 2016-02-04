import forEach from 'lodash.foreach';

export default function parseFields (data, keys) {
  let result = data;
  if (data) {
    result = Object.assign({}, data);
    forEach(keys, (key) => {
      if (result[key] && typeof result[key] === 'string') {
        result[key] = JSON.parse(result[key]);
      }
    });
  }
  return result;
}
