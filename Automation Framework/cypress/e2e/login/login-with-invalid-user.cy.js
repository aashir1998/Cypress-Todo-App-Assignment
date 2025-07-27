/// <reference types="cypress" />

import Login from '../../support/Login';

describe('Login with Invalid User', { tags: ['@Login', '@Negative', '@Regression'] }, () => {
  let invalidCredentials;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      invalidCredentials = data.loginData.invalidCredentials;
    });
  });

  it('should display error message for invalid login', () => {
    const login = new Login();

    login.visitLoginPage();
    login.verifyLoginFormVisible();

    login.fillCredentials(invalidCredentials[0].email, invalidCredentials[0].password);
    login.submitLogin();

    login.verifyErrorMessage(invalidCredentials[0].expectedError);
  });
});
