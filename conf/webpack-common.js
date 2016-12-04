exports.loaders = [
  {
    test: /.json$/,
    loaders: [
      'json'
    ]
  },
  {
    test: /\.(svg|png|jpe?g|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url'
  },
  {
    test: /\.ts$/,
    exclude: /node_modules/,
    loaders: [
      'ng-annotate',
      'ts'
    ]
  },
  {
    test: /.html$/,
    loaders: [
      'html'
    ]
  }
];
