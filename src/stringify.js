/**
 * Wrapper for JSON.stringify that truncates long strings.
 * 
 */

const MAX_STRING_LENGTH = 256;

function stringify(object) {
  return JSON.stringify(object, (key, value) => {
    if (typeof value === 'string' && value.length > MAX_STRING_LENGTH) {
      return '-truncated-';
    }
    return value;
  }, 2);
}

module.exports = stringify;