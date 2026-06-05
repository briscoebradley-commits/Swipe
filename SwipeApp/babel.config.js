module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // babel-preset-expo automatically adds react-native-worklets/plugin
    // (required by react-native-reanimated v4) when the package is installed.
  };
};
