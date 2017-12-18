module.exports = {
  entry: './src/main.ts',
  html: {
    template: './index.html',
  },
  staticFolder: './public',
  presets: [require('poi-preset-typescript')()],
}
