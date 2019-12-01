module.exports = {
  plugins: ['plugins/markdown'],
  templates: {
    systemName: 'Haxroomie',
    systemSummary: 'Documentation and tutorials.',
    copyright: '© Oskari Pöntinen 2019',
  },
  opts: {
    destination: 'docs',
    template: 'node_modules/foodoc/template',
    tutorials: 'assets/docs/tutorials',
  },
};
