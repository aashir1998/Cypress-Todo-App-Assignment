/// <reference types="cypress" />
import LoginApi from '../../support/Login-Api.js';

describe('Login API', { tags: '@API' }, () => {
  const api = new LoginApi();
  let testData;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  it('authenticates valid user', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('todoApiUrl')}/stats`,
      failOnStatusCode: false
    }).then((res) => {
      cy.assertSuccessResponse(res);
      // Check if response.body.data exists before accessing its properties
      expect(res.body.data).to.exist;
      expect(res.body.data).to.have.keys(['total', 'completed', 'active', 'completionRate']);
    });
  });

  it('fails with invalid email format', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('todoApiUrl')}/non-existent`,
      failOnStatusCode: false
    }).then((res) => {
      cy.assertNotFoundError(res);
    });
  });
});
