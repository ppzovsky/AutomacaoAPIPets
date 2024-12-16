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
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/report/mochawesome-report",
      overwrite: false, 
      html: true,       
      json: true,       
      timestamp: "mm-dd-yyyy_HH-MM" 
    }
  },
});
