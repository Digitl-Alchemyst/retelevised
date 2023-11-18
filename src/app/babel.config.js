const { devDependencies } = require('../package.json');

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            electron: devDependencies.electron.replace(/^\^|~/, ''),
          },
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'babel-plugin-styled-components',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
      },
    ],
  ],
};
