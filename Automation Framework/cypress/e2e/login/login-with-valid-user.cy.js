/// <reference types="cypress" />

import Login from '../../support/Login';

describe('Login with Valid User', { tags: ['@Login', '@Smoke', '@Regression'] }, () => {
  let validCredentials;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      validCredentials = data.loginData.validCredentials;
    });
  });

  it('should log in successfully with valid credentials', () => {
    const login = new Login();

    login.visitLoginPage();
    login.verifyLoginFormVisible();

    login.fillCredentials(validCredentials.email, validCredentials.password);
    login.submitLogin();

    login.verifySuccessfulLogin();
  });
});
