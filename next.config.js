// @generated: @expo/next-adapter@3.1.17
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withRNWeb = require("next-transpile-modules")(["react-native-web"]);


module.exports = withPlugins([
  withRNWeb,
  [
    withExpo,
    {
      projectRoot: __dirname,
      webpack5: true,
    },
  ],
]);
