exports.loaders = [
  {
    test: /.json$/,
    loaders: [
      'json'
    ]
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
