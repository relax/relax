const EMPTY_OBJECT = {};
const EMPTY_STRING = '';
const DEFAULT_TRUNCATE_SYMBOL = '...';
const EXCLUDE_TAGS = ['img'];
const KEY_VALUE_REGEX = '([\\w|-]+\\s*(=\\s*"[^"]*")?\\s*)*';
const IS_CLOSE_REGEX = '\\s*\\/?\\s*';
const CLOSE_REGEX = '\\s*\\/\\s*';
const IMAGE_TAG_REGEX = new RegExp(`<img\\s*${KEY_VALUE_REGEX}${IS_CLOSE_REGEX}>`);
const SELF_CLOSE_REGEX = new RegExp(`<\\/?\\w+\\s*${KEY_VALUE_REGEX}${CLOSE_REGEX}>`);
const HTML_TAG_REGEX = new RegExp(`<\\/?\\w+\\s*${KEY_VALUE_REGEX}${IS_CLOSE_REGEX}>`);
const URL_REGEX =
  /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w\-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
const WORD_BREAK_REGEX = new RegExp('\\W+', 'g');

/**
* Remove image tag
*
* @private
* @method removeImageTag
* @param {String} string not-yet-processed string
* @return {String} string without image tags
*/
function removeImageTag (string) {
  const match = IMAGE_TAG_REGEX.exec(string);

  if (!match) {
    return string;
  }

  const index = match.index;
  const len = match[0].length;

  return string.substring(0, index) + string.substring(index + len);
}

/**
* Process tag string to get pure tag name
*
* @private
* @method getTag
* @param {String} string original html
* @return {String} tag name
*/
function getTag (string) {
  let tail = string.indexOf(' ');

  // TODO:
  // we have to figure out how to handle non-well-formatted HTML case
  if (tail === -1) {
    tail = string.indexOf('>');

    if (tail === -1) {
      throw new Error(`HTML tag is not well-formed : ${string}`);
    }
  }

  return string.substring(1, tail);
}

/**
* Dump all close tags and append to truncated content while reaching upperbound
*
* @private
* @method dumpCloseTag
* @param {String[]} tags a list of tags which should be closed
* @return {String} well-formatted html
*/
function dumpCloseTag (tags) {
  let html = '';

  tags.reverse().forEach((tag) => {
    // dump non-excluded tags only
    if (EXCLUDE_TAGS.indexOf(tag) === -1) {
      html += `</${tag}>`;
    }
  });

  return html;
}

/**
* Get the end position for String#substring()
*
* If options.truncateLastWord is FALSE, we try to the end position up to
* options.slop characters to avoid breaking in the middle of a word.
*
* @private
* @method getEndPosition
* @param {String} string original html
* @param {Number} tailPos (optional) provided to avoid extending the slop into trailing HTML tag
* @return {Number} maxLength
*/
function getEndPosition ({string, tailPos, maxLength, total, options}) {
  const defaultPos = maxLength - total;
  const isShort = defaultPos < options.slop;
  const slopPos = isShort ? defaultPos : options.slop - 1;
  const startSlice = isShort ? 0 : defaultPos - options.slop;
  const endSlice = tailPos || (defaultPos + options.slop);

  let position = defaultPos;
  let substr;
  let result;

  if (!options.truncateLastWord) {
    substr = string.slice(startSlice, endSlice);

    if (tailPos && substr.length <= tailPos) {
      position = substr.length;
    } else {
      result = WORD_BREAK_REGEX.exec(substr);
      while (result !== null) {
        // a natural break position before the hard break position
        if (result.index < slopPos) {
          position = defaultPos - (slopPos - result.index);
          // keep seeking closer to the hard break position
          // unless a natural break is at position 0
          if (result.index === 0 && defaultPos <= 1) break;
        } else if (result.index === slopPos) {
          // a natural break position exactly at the hard break position
          position = defaultPos;
          break; // seek no more
        } else {
          // a natural break position after the hard break position
          position = defaultPos + (result.index - slopPos);
          break;  // seek no more
        }

        result = WORD_BREAK_REGEX.exec(substr);
      }
    }

    if (string.charAt(position - 1).match(/\s$/)) {
      position--;
    }
  }

  return position;
}

/**
 * Truncate HTML string and keep tag safe.
 *
 * @method truncate
 * @param {String} string string needs to be truncated
 * @param {Number} maxLength length of truncated string
 * @param {Object} options (optional)
 * @param {Boolean} [options.keepImageTag] flag to specify if keep image tag, false by default
 * @param {Boolean} [options.truncateLastWord] truncates last word, true by default
 * @param {Number} [options.slop] tolerance when options.truncateLastWord is false before
 *  we give up and just truncate at the maxLength position, 10 by default (but not greater than maxLength)
 * @param {Boolean|String} [options.ellipsis] omission symbol for truncated string, '...' by default
 * @return {String} truncated string
 */
export default (_string, maxLength, _options) => {
  const items = [];
  const DEFAULT_SLOP = maxLength < 10 ? maxLength : 10;
  let total = 0;
  let content = EMPTY_STRING;
  let matches = true;
  let result;
  let index;
  let tag;
  let selfClose;
  let options = _options;
  let string = _string;

  options = options || EMPTY_OBJECT;
  options.ellipsis = (undefined !== options.ellipsis) ? options.ellipsis : DEFAULT_TRUNCATE_SYMBOL;
  options.truncateLastWord = (undefined !== options.truncateLastWord) ? options.truncateLastWord : true;
  options.slop = (undefined !== options.slop) ? options.slop : DEFAULT_SLOP;

  while (matches) {
    matches = HTML_TAG_REGEX.exec(string);

    if (!matches) {
      if (total >= maxLength) { break; }

      matches = URL_REGEX.exec(string);
      if (!matches || matches.index >= maxLength) {
        content += string.substring(0, getEndPosition({string, options, maxLength, total}));
        break;
      }

      while (matches) {
        result = matches[0];
        index = matches.index;
        content += string.substring(0, (index + result.length) - total);
        string = string.substring(index + result.length);
        matches = URL_REGEX.exec(string);
      }
      break;
    }

    result = matches[0];
    index = matches.index;

    if (total + index > maxLength) {
      // exceed given `maxLength`, dump everything to clear stack
      content += string.substring(0, getEndPosition({
        string,
        tailPos: index,
        options,
        maxLength,
        total
      }));
      break;
    } else {
      total += index;
      content += string.substring(0, index);
    }

    if (result[1] === '/') {
      // move out open tag
      items.pop();
      selfClose = null;
    } else {
      selfClose = SELF_CLOSE_REGEX.exec(result);

      if (!selfClose) {
        tag = getTag(result);
        items.push(tag);
      }
    }

    if (selfClose) {
      content += selfClose[0];
    } else {
      content += result;
    }
    string = string.substring(index + result.length);
  }

  if (string.length > maxLength - total && options.ellipsis) {
    content += options.ellipsis;
  }
  content += dumpCloseTag(items);

  if (!options.keepImageTag) {
    content = removeImageTag(content);
  }

  return content;
};
