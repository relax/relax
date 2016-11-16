import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';

const getIds = (option) => {
  let ids = [];
  const deepKeys = ['options', 'unlocks'];

  if (isString(option.id) && !includes(ids, option.id)) {
    ids.push(option.id);
  }
  if (isArray(option)) {
    forEach(option, (value) => {
      if (isPlainObject(value)) {
        ids = ids.concat(getIds(value));
      }
    });
  }
  forEach(deepKeys, (deepKey) => {
    if (isArray(option[deepKey]) || isPlainObject(option[deepKey])) {
      ids = ids.concat(getIds(option[deepKey]));
    }
  });
  return ids;
};

export default (options) => {
  let ids = [];
  if (isArray(options)) {
    forEach(options, (option) => {
      if (!isPlainObject(option)) {return;}
      ids = ids.concat(getIds(option));
    });
  }
  return uniq(ids);
};
