const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    video: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));
      return config;
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
// module.exports = (on, config) => {
//   require("@cypress/code-coverage/task")(on, config);
//   on("file:preprocessor", require("@cypress/code-coverage/use-babelrc"));
//   return config;
// };
