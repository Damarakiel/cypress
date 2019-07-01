// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs-extra')
const path = require('path')
const wp = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  // Code responsible for transpiling typescript
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    },
  }
  on('file:preprocessor', wp(options))


  // Code responsible for handling environment json
  const enviroment = config.env.configFile;
  const configForEnviroment = getConfigurationByFile(enviroment);

  return (configForEnviroment)
      ? configForEnviroment
      : config;
}

function getConfigurationByFile (file) {
  const pathToConfigFile = `cypress/config/${file}.json`;
  return fs.readJson(path.join(__dirname, '../../', pathToConfigFile))
}
