/// <reference types="cypress" />

class Login {
  constructor() {
    this.emailInput = '[data-automation-id="email-input"]';
    this.passwordInput = '[data-automation-id="password-input"]';
    this.submitButton = '[data-automation-id="login-submit-button"]';
    this.loginForm = '[data-automation-id="login-form"]';
    this.loginContainer = '[data-automation-id="login-container"]';
    this.loginPage = '[data-automation-id="login-page"]';
    this.errorMessage = '.text-red-600';
    this.todoApp = '[data-automation-id="todo-app"]';
    this.timeout = 10000;
  }

  visitLoginPage() {
    cy.visit('/login', { timeout: this.timeout });
    cy.get(this.loginPage, { timeout: this.timeout }).should('be.visible');
    cy.get(this.loginContainer, { timeout: this.timeout }).should('be.visible');
  }

  fillCredentials(email, password) {
    cy.get(this.emailInput, { timeout: this.timeout })
      .should('be.visible')
      .clear()
      .type(email);

    cy.get(this.passwordInput, { timeout: this.timeout })
      .should('be.visible')
      .clear()
      .type(password);
  }

  submitLogin() {
    cy.get(this.submitButton, { timeout: this.timeout })
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  verifyLoginFormVisible() {
    cy.get(this.loginForm, { timeout: this.timeout }).should('be.visible');
    cy.get(this.loginContainer, { timeout: this.timeout }).should('be.visible');
    cy.get(this.emailInput, { timeout: this.timeout }).should('be.visible');
    cy.get(this.passwordInput, { timeout: this.timeout }).should('be.visible');
    cy.get(this.submitButton, { timeout: this.timeout }).should('be.visible');
  }

  verifyErrorMessage(expectedError) {
    cy.get(this.errorMessage, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', expectedError);
  }

  verifySuccessfulLogin() {
    cy.url({ timeout: this.timeout }).should('include', '/todos');
    cy.get(this.todoApp, { timeout: this.timeout }).should('be.visible');
  }
}

export default Login;
