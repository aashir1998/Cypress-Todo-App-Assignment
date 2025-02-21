/// <reference types="cypress" />
class Login {
  constructor() {
    // Locators

    this.email = '#email';
    this.password = '#password';
    this.loginButton = '#login-form > .button';
  }

  visitPage() {
    cy.visit('/');
  }

  loginUsingUi() {
    const defaultTimeout = 8000;
    const email = Cypress.env('email');
    const password = Cypress.env('password');

    cy.get(this.email, { timeout: defaultTimeout })
      .should('be.visible')
      .click()
      .type(email);
    cy.get(this.password, { timeout: defaultTimeout })
      .should('be.visible')
      .click()
      .type(password);
    cy.get(this.loginButton, { timeout: defaultTimeout })
      .should('be.visible')
      .click();
  }
}
export default Login;
