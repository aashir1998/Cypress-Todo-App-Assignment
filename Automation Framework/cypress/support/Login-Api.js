/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

class LoginApi {
  constructor() {
    this.baseUrl = Cypress.env('todoApiUrl') || 'http://localhost:3001/api';
    this.timeout = 10000;
  }

  makeRequest(method, endpoint, body = null) {
    return cy.api({
      method,
      url: `${this.baseUrl}${endpoint}`,
      body,
      headers: { 'Content-Type': 'application/json' },
      timeout: this.timeout,
      failOnStatusCode: false
    });
  }

  authenticateUser(credentials) {
    return this.makeRequest('POST', '/login', credentials);
  }

  generateValidLoginData() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 })
    };
  }

  generateInvalidLoginData() {
    return {
      email: 'invalid-email',
      password: ''
    };
  }
}

export default LoginApi;
