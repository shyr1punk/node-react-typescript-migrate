module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  mode: 'development',

  context: __dirname,

  entry: {
    app: './app.jsx'
  },

  output: {
    path: require('path').resolve('./build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true
  },

  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      loader: 'babel-loader',
      options: {
        presets: ["@babel/react"],
        plugins: [
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }, {
      test: /(\.tsx?)$/,
      loader: "awesome-typescript-loader"
    }]
  }
};
