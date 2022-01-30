/**
 * This module overrides the default LocalStorage with a Proxy that adds a
 * prefix to every item and allows the browser tab to only control the items
 * with the given prefix. For IndexedDB the open function is overriden so that
 * it will add the given `id` as a prefix also.
 *
 * this makes possible for different tabs under same domain to store data with
 * the same key or database name and prevent the tabs to overwrite each other.
 *
 * Example of evaluating the file in browsers context from puppeteer:
 * ```
 * let ss = require('./shared-storage');
 * page.evaluate(ss, id);
 * ```
 */

/**
 * Modifies the localStorage and IndexedDB functions so that a tab under the
 * same domain can only control its own entries.
 *
 * @param {string|number} id - String or number to prefix the storage
 *    keys and database names with.
 */
function enableSharedStorage(id) {
  if (!id) throw new Error(`missing value: id`);

  function createLocalStorageProxyHandler(id) {
    let _localStorage = window.localStorage;
    let length = 0;
    let items = new Map();
    let itemKeys = [];
    let itemKeysDirty = true;

    for (let i = 0; i < _localStorage.length; i++) {
      let key = _localStorage.key(i);
      if (key.startsWith(`${id}_`)) {
        items.set(key.slice(id.length + 1), _localStorage.getItem(key));
        length++;
      }
    }

    return {
      get,
    };

    function lsSetItem(key, value) {
      if ((key !== 0 && !key) || !value)
        throw new TypeError(`invalid arguments`);
      if (key === `loglevel`) {
        return _localStorage.setItem(key, value);
      }
      if (!items.has(key)) {
        itemKeysDirty = true;
        length++;
      }
      items.set(key, value);
      let modifiedKey = `${id}_${key}`;
      return _localStorage.setItem(modifiedKey, value);
    }

    function lsGetItem(key) {
      if (key === `loglevel`) {
        return _localStorage.getItem(key);
      }
      let modifiedKey = `${id}_${key}`;
      let value = _localStorage.getItem(modifiedKey);
      return value;
    }

    function lsRemoveItem(key) {
      if (key !== 0 && !key) throw new TypeError(`invalid arguments`);
      if (key === `loglevel`) {
        return _localStorage.removeItem(key);
      }
      if (!items.has(key)) return;
      itemKeysDirty = true;
      items.delete(key);
      length--;
      let modifiedKey = `${id}_${key}`;
      return _localStorage.removeItem(modifiedKey);
    }

    function lsKey(index) {
      if (index !== 0 && !index) {
        throw new TypeError(`invalid arguments`);
      }
      if (itemKeysDirty) {
        itemKeys = [];
        for (let key of items.keys()) itemKeys.push(key);
        itemKeysDirty = false;
      }
      return itemKeys[index];
    }

    function lsClear() {
      for (let key of items.keys()) {
        let modifiedKey = `${id}_${key}`;
        _localStorage.removeItem(modifiedKey);
      }
      length = 0;
      items = new Map();
      itemKeys = [];
      itemKeysDirty = false;
    }

    function get(target, property) {
      if (property === `length`) {
        return length;
      } else if (property === `getItem`) {
        return lsGetItem;
      } else if (property === `setItem`) {
        return lsSetItem;
      } else if (property === `removeItem`) {
        return lsRemoveItem;
      } else if (property === `key`) {
        return lsKey;
      } else if (property === `clear`) {
        return lsClear;
      } else if (
        property !== `hasOwnProperty` &&
        property !== `toLocaleString` &&
        property !== `toString`
      ) {
        return target[`${id}_${property}`];
      } else {
        return target[property];
      }
    }
  }

  return new Promise((resolve) => {
    let localStorageProxy = new Proxy(
      window.localStorage,
      createLocalStorageProxyHandler(id)
    );

    Object.defineProperty(window, 'localStorage', {
      value: localStorageProxy,
      writable: false,
    });

    function enableIDBPrefix() {
      const _open = IDBFactory.prototype.open;
      IDBFactory.prototype.open = function (name, version) {
        let modifiedName = `${id}_${name}`;
        return _open.call(this, modifiedName, version);
      };
    }

    enableIDBPrefix();
    resolve();
  });
}

module.exports = enableSharedStorage;
