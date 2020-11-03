module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          components: './src/components',
          constants: './src/constants',
          navigation: './src/navigation',
          reducers: './src/reducers',
          styles: './src/styles',
          theme: './src/theme',
          util: './src/util',
          views: './src/views',
          sagas: './src/sagas',
          assets: './src/assets',
          context: './src/context',
        },
      },
    ],
  ],
};
