const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const path = require('path')

const generatePlugins = (templateDir, script, src = '') => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))

  return templateFiles
    .map((templateFile) => {
      const parts = templateFile.split('.')
      const name = parts[0]
      const extension = parts[1]

      if (extension !== 'html') return null

      return new HtmlWebpackPlugin({
        inject: script,
        scriptLoading: 'blocking',
        filename: `${src}${name}.html`,
        template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),

        minify: {
          collapseWhitespace: false,
        },
      })
    })
    .filter((templateFile) => templateFile !== null)
}

module.exports = {
  mode: 'production',

  entry: {
    filename: path.resolve(__dirname, 'src/webpack.ts'),
  },

  resolve: {
    extensions: ['.js', '.ts'],

    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/application.js',
    clean: true,
  },

  devtool: 'source-map',

  plugins: [
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    ...generatePlugins('src', 'head'),
    ...generatePlugins('src/dialogs', false, 'dialogs/'),

    new CopyPlugin({
      patterns: [
        {
          from: 'src/img/',
          to: 'img/',
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        include: [path.resolve(__dirname, 'src/includes'), path.resolve(__dirname, 'src/components')],
        use: ['raw-loader'],
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },

      {
        test: /\.m?[jt]s$/i,
        exclude: /(node_modules|bower_components)/,

        use: {
          loader: 'babel-loader',

          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',

        generator: {
          filename: 'img/pictures/[name][ext]',
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',

        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },

  devServer: {
    port: 9000,
    compress: false,
    hot: true,
    historyApiFallback: true,

    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
}
