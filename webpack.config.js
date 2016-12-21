module.exports = {
  entry: "./lib/snackman.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  resolve: {
    extensions: ['', ',js']
  },
  devtool: 'source-map',
};
