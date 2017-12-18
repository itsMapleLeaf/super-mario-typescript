import * as CopyPlugin from 'copy-webpack-plugin'
import * as HTMLPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'

const root = __dirname
const sourcePath = resolve(root, 'src')
const outputPath = resolve(root, 'build')

const config: webpack.Configuration = {
  entry: resolve(sourcePath, 'main'),
  output: {
    path: outputPath,
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [sourcePath],
        options: {
          compilerOptions: {
            module: 'esnext',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  plugins: [
    // new HTMLPlugin({ template: resolve(root, 'index.html') }),
    // new CopyPlugin([{ from: 'public', to: 'public' }]),
  ],
  devtool: '#source-map',
}

if (process.env.NODE_ENV === 'production') {
  config.plugins!.push(new webpack.optimize.ModuleConcatenationPlugin())
}

export default config
