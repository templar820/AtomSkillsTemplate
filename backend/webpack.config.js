const path = require('path');

const getBabelOptions = prop => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], '@babel/plugin-proposal-class-properties'],
  };
  if (prop) {
    options.presets.push(prop);
  }
  return options;
};

const jsLoaders = p => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: getBabelOptions(p),
    },
    {
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
      },
    },
  ];
  return loaders;
};


module.exports = {
  entry: './src/index.js',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-react'),
      },
    ],
  },
  resolve: {
    extensions: ['.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  }
};