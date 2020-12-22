const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');

module.exports = override(
  fixBabelImports('antd', { libraryName: 'antd', style: true }),

  addWebpackAlias({
    ['@components']: path.resolve(__dirname, './src/app/components'),
    ['@data']: path.resolve(__dirname, './src/data'),
    ['@entities']: path.resolve(__dirname, './src/domain/entities'),
    ['@fixtures']: path.resolve(__dirname, './test/fixtures'),
    ['@pages']: path.resolve(__dirname, './src/app/pages'),
    ['@repositories']: path.resolve(__dirname, './src/domain/repositories'),
    ['@slices']: path.resolve(__dirname, './src/app/slices'),
    ['@store']: path.resolve(__dirname, './src/app/store'),
    ['@usecases']: path.resolve(__dirname, './src/domain/usecases'),
  }),

  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      rootpath: 'public',
    },
  }),
);
