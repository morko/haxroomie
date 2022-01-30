const MAX_STRING_LENGTH = 256;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stringify(object) {
  return JSON.stringify(
    object,
    (key, value) => {
      if (typeof value === 'string' && value.length > MAX_STRING_LENGTH) {
        return '-truncated-';
      }
      return value;
    },
    2
  );
}

module.exports = {
  sleep,
  stringify,
};
