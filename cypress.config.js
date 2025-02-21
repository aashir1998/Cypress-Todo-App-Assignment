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
    apiurl: process.env.MAILER_LITE_API_URL,
    email: process.env.MAILER_LITE_EMAIL,
    password: process.env.MAILER_LITE_PASSWORD,
    grepFilterSpecs: true,
    grepOmitFiltered: true,
    MAILOSAUR_API_KEY: process.env.CYPRESS_MAILOSAUR_API_KEY,
    mailosaurServerId: process.env.CYPRESS_MAILOSAUR_SERVER_ID,
    baseurl: process.env.MAILER_LITE_BASE_URL,
    AUTH_TOKEN: process.env.MAILER_LITE__AUTH_TOKEN,
    emailDomain: process.env.MAILER_LITE_EMAIL_DOMAIN
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },

    retries: {
      runMode: 1,
      openMode: 0
    },

    baseUrl: process.env.MAILER_LITE_BASE_URL
  }
});
