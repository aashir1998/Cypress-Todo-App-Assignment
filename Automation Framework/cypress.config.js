require('dotenv').config();

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
  requestTimeout: 120000,
  responseTimeout: 120000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  numTestsKeptInMemory: 3,

  env: {
    // Our Todo App API
    todoApiUrl: 'http://localhost:3001/api',

    // Our Todo App Frontend
    todoAppUrl: 'http://localhost:3000',

    // Test data
    testUser: {
      username: 'testuser',
      email: 'demo@example.com',
      password: 'password'
    },

    // Reporting and filtering
    grepFilterSpecs: true,
    grepOmitFiltered: true,

    // Visual testing
    visualRegressionType: 'regression',

    // Performance testing
    performanceThreshold: 3000
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      require('cypress-mochawesome-reporter/plugin')(on);

      // Visual regression plugin
      require('cypress-visual-regression/dist/plugin')(on, config);

      // Terminal reporter
      require('cypress-terminal-report/src/installLogsPrinter')(on);

      return config;
    },

    retries: {
      runMode: 1,
      openMode: 0
    },

    baseUrl: 'http://localhost:3000',

    // Test file patterns
    specPattern: ['cypress/e2e/login/**/*.cy.js', 'cypress/e2e/ui/**/*.cy.js']
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    specPattern: 'cypress/component/**/*.cy.js'
  }
});
