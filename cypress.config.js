const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
    specPattern: [
      'cypress/e2e/cucumber_tests/*.feature',
      'cypress/e2e/*.cy.js'
    ],
    "reporter": "junit",
    "reporterOptions": {
    "mochaFile": "results/junit-[hash].xml",
    "toConsole": false
  }
  },
});
