/// <reference types="cypress" />

import Login from '../../support/Login.js';

describe('Login with Invalid User', () => {
  const login = new Login();

  beforeEach(() => {
    // Visit the login page before each test
    login.visitLoginPage();
  });

  it('should show error message for invalid email and password', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[0];

      // Attempt login with invalid credentials
      login.loginWithInvalidCredentials(
        invalidCredential.email,
        invalidCredential.password
      );

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);
    });
  });

  it('should show error message for valid email but wrong password', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[1];

      // Attempt login with valid email but wrong password
      login.loginWithInvalidCredentials(
        invalidCredential.email,
        invalidCredential.password
      );

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);
    });
  });

  it('should show error message for invalid email but valid password', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[2];

      // Attempt login with invalid email but valid password
      login.loginWithInvalidCredentials(
        invalidCredential.email,
        invalidCredential.password
      );

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);
    });
  });

  it('should show error message for empty email', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[3];

      // Attempt login with empty email
      login.loginWithInvalidCredentials(
        invalidCredential.email,
        invalidCredential.password
      );

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);
    });
  });

  it('should show error message for empty password', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[4];

      // Attempt login with empty password
      login.loginWithInvalidCredentials(
        invalidCredential.email,
        invalidCredential.password
      );

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);
    });
  });

  it('should show error message for empty email and password', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[5];

      // Attempt login with empty email and password
      login.loginWithInvalidCredentials(
        invalidCredential.email,
        invalidCredential.password
      );

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);
    });
  });

  it('should clear error message when user starts typing', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[0];

      // First, attempt login with invalid credentials to show error
      login.loginWithInvalidCredentials(
        invalidCredential.email,
        invalidCredential.password
      );

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);

      // Start typing in email field
      cy.get('[data-automation-id="email-input"]')
        .clear()
        .type('demo@example.com');

      // Error message should be cleared
      cy.get('.text-red-600').should('not.exist');
    });
  });

  it('should handle multiple failed login attempts', () => {
    cy.fixture('testData.json').then((data) => {
      // Try multiple invalid credentials
      data.loginData.invalidCredentials.forEach((invalidCredential) => {
        // Clear form before each attempt
        login.clearForm();

        // Attempt login with invalid credentials
        login.loginWithInvalidCredentials(
          invalidCredential.email,
          invalidCredential.password
        );

        // Verify error message is displayed
        login.verifyErrorMessage(invalidCredential.expectedError);
      });
    });
  });

  it('should not allow login with whitespace-only credentials', () => {
    // Attempt login with whitespace-only credentials
    login.loginWithInvalidCredentials('   ', '   ');

    // Verify error message is displayed
    login.verifyErrorMessage(
      'Invalid email or password. Use demo@example.com / password'
    );
  });

  it('should handle special characters in credentials', () => {
    // Attempt login with special characters
    login.loginWithInvalidCredentials('test@#$%^&*().com', 'pass@#$%^&*()');

    // Verify error message is displayed
    login.verifyErrorMessage(
      'Invalid email or password. Use demo@example.com / password'
    );
  });

  it('should handle very long credentials', () => {
    const longEmail = 'a'.repeat(100) + '@example.com';
    const longPassword = 'a'.repeat(100);

    // Attempt login with very long credentials
    login.loginWithInvalidCredentials(longEmail, longPassword);

    // Verify error message is displayed
    login.verifyErrorMessage(
      'Invalid email or password. Use demo@example.com / password'
    );
  });

  it('should maintain form state after failed login', () => {
    cy.fixture('testData.json').then((data) => {
      const invalidCredential = data.loginData.invalidCredentials[0];

      // Fill in invalid credentials
      cy.get('[data-automation-id="email-input"]').type(
        invalidCredential.email
      );
      cy.get('[data-automation-id="password-input"]').type(
        invalidCredential.password
      );

      // Attempt login
      cy.get('[data-automation-id="login-submit-button"]').click();

      // Verify error message is displayed
      login.verifyErrorMessage(invalidCredential.expectedError);

      // Form fields should still contain the entered values
      cy.get('[data-automation-id="email-input"]').should(
        'have.value',
        invalidCredential.email
      );
      cy.get('[data-automation-id="password-input"]').should(
        'have.value',
        invalidCredential.password
      );
    });
  });
});
