/// <reference types="cypress" />

import Login from '../../support/Login';

describe('Login with Invalid User', { tags: ['@Login', '@Regression'] }, () => {
  let invalidCredentials;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      invalidCredentials = data.loginData.invalidCredentials;
    });
  });

  it('should display error message for invalid login', () => {
    const login = new Login();

    login.loginWithInvalidUser(invalidCredentials);
  });
});
