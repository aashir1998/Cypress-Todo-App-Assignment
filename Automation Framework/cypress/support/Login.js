/// <reference types="cypress" />

class Login {
  constructor() {
    // Locators for Todo App Login
    this.emailInput = '[data-automation-id="email-input"]';
    this.passwordInput = '[data-automation-id="password-input"]';
    this.loginSubmitButton = '[data-automation-id="login-submit-button"]';
    this.togglePasswordVisibility =
      '[data-automation-id="toggle-password-visibility"]';
    this.loginForm = '[data-automation-id="login-form"]';
    this.loginContainer = '[data-automation-id="login-container"]';
    this.errorMessage = '.text-red-600';
    this.demoCredentials = '.bg-gray-50';
  }

  visitLoginPage() {
    cy.visit('/login');
  }

  loginWithValidCredentials(email, password) {
    cy.get(this.emailInput).should('be.visible').clear().type(email);

    cy.get(this.passwordInput).should('be.visible').clear().type(password);

    cy.get(this.loginSubmitButton)
      .should('be.visible')
      .should('not.be.disabled')
      .click();
  }

  loginWithInvalidCredentials(email, password) {
    cy.get(this.emailInput).should('be.visible').clear().type(email);

    cy.get(this.passwordInput).should('be.visible').clear().type(password);

    cy.get(this.loginSubmitButton)
      .should('be.visible')
      .should('not.be.disabled')
      .click();
  }

  togglePasswordVisibility() {
    cy.get(this.togglePasswordVisibility).should('be.visible').click();
  }

  verifyLoginFormIsVisible() {
    cy.get(this.loginForm).should('be.visible');
    cy.get(this.loginContainer).should('be.visible');
  }

  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('be.visible').and('contain.text', message);
  }

  verifySuccessfulLogin() {
    // Should redirect to todos page
    cy.url().should('include', '/todos');

    // Should show the todo app header
    cy.get('[data-automation-id="todo-app"]').should('be.visible');
  }

  verifyDemoCredentialsAreVisible() {
    cy.get(this.demoCredentials)
      .should('be.visible')
      .and('contain.text', 'demo@example.com')
      .and('contain.text', 'password');
  }

  clearForm() {
    cy.get(this.emailInput).clear();
    cy.get(this.passwordInput).clear();
  }
}

export default Login;
