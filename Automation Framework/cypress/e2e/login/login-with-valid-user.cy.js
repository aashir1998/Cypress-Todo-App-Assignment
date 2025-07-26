/// <reference types="cypress" />

import Login from '../../support/Login.js';

describe('Login with Valid User', () => {
  const login = new Login();

  beforeEach(() => {
    // Visit the login page before each test
    login.visitLoginPage();
  });

  it('should display login form correctly', () => {
    // Verify login form elements are visible
    login.verifyLoginFormIsVisible();

    // Verify demo credentials are displayed
    login.verifyDemoCredentialsAreVisible();
  });

  it('should login successfully with valid credentials', () => {
    // Load test data
    cy.fixture('testData.json').then((data) => {
      const { email, password } = data.loginData.validCredentials;

      // Perform login with valid credentials
      login.loginWithValidCredentials(email, password);

      // Verify successful login
      login.verifySuccessfulLogin();
    });
  });

  it('should handle password visibility toggle', () => {
    // Initially password should be hidden (type="password")
    cy.get('[data-automation-id="password-input"]').should(
      'have.attr',
      'type',
      'password'
    );

    // Toggle password visibility
    login.togglePasswordVisibility();

    // Password should now be visible (type="text")
    cy.get('[data-automation-id="password-input"]').should(
      'have.attr',
      'type',
      'text'
    );

    // Toggle back to hidden
    login.togglePasswordVisibility();

    // Password should be hidden again
    cy.get('[data-automation-id="password-input"]').should(
      'have.attr',
      'type',
      'password'
    );
  });

  it('should enable submit button when form is filled', () => {
    // Initially submit button should be disabled
    cy.get('[data-automation-id="login-submit-button"]').should('be.disabled');

    // Fill in email
    cy.get('[data-automation-id="email-input"]').type('demo@example.com');

    // Submit button should still be disabled (password required)
    cy.get('[data-automation-id="login-submit-button"]').should('be.disabled');

    // Fill in password
    cy.get('[data-automation-id="password-input"]').type('password');

    // Submit button should now be enabled
    cy.get('[data-automation-id="login-submit-button"]').should(
      'not.be.disabled'
    );
  });

  it('should handle Enter key submission', () => {
    cy.fixture('testData.json').then((data) => {
      const { email, password } = data.loginData.validCredentials;

      // Fill in credentials
      cy.get('[data-automation-id="email-input"]').type(email);
      cy.get('[data-automation-id="password-input"]').type(password);

      // Press Enter key on password field
      cy.get('[data-automation-id="password-input"]').type('{enter}');

      // Should login successfully
      login.verifySuccessfulLogin();
    });
  });

  it('should clear form fields when cleared', () => {
    // Fill in some data
    cy.get('[data-automation-id="email-input"]').type('test@example.com');
    cy.get('[data-automation-id="password-input"]').type('testpassword');

    // Clear the form
    login.clearForm();

    // Fields should be empty
    cy.get('[data-automation-id="email-input"]').should('have.value', '');
    cy.get('[data-automation-id="password-input"]').should('have.value', '');
  });

  it('should maintain form state during interaction', () => {
    // Fill in email
    cy.get('[data-automation-id="email-input"]')
      .type('demo@example.com')
      .should('have.value', 'demo@example.com');

    // Toggle password visibility (should not affect email)
    login.togglePasswordVisibility();

    // Email should still be there
    cy.get('[data-automation-id="email-input"]').should(
      'have.value',
      'demo@example.com'
    );

    // Fill in password
    cy.get('[data-automation-id="password-input"]')
      .type('password')
      .should('have.value', 'password');
  });
});
