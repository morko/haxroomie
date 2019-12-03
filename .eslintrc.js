module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    },
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "globals": {
        "HHM": "writable",
        "hroomie": "writable",
        "hrConfig": "readonly",
        "HBInit": "readonly",
        "describe": "readonly",
        "it": "readonly",
        "beforeEach": "readonly",
        "afterEach": "readonly",
        "before": "readonly",
        "after": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
};