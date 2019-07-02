module.exports = {
  plugins: [
    'plugins/markdown'
  ],
  templates: {
    "systemName"            : "Haxroomie",
    "systemSummary"         : "Documentation and tutorials.",
    "copyright"             : "© Oskari Pöntinen 2019"
  },
  opts: {
    destination: 'docs/public',
    template: 'node_modules/foodoc/template',
    tutorials: 'docs/tutorials',
  },
  vjsdoc: {
    template: 'docs/vtemplates/haxroomie',
    version: 'latest',
    opts: {
      title: 'Haxroomie documentation'
    }
  }
};
