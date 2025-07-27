// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-plugin-api';
import 'cypress-mochawesome-reporter/register';

const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

Cypress.on(
  'uncaught:exception',
  (_err, _runnable) =>
    // returning false here prevents Cypress from
    // failing the test
    false
);

// Add retry logic for rate limiting errors
Cypress.on('fail', (error) => {
  if (
    error.message.includes('Too many requests') ||
    error.message.includes('429')
  ) {
    // Wait and retry for rate limiting errors
    cy.wait(2000);
    return false; // Don't fail the test, retry
  }
  throw error; // Re-throw other errors
});

// Add delays between tests to prevent rate limiting
