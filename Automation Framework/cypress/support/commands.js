/// <reference types="cypress" />

Cypress.Commands.add('assertSuccessResponse', (response, expectedStatus = 200) => {
  expect(response.status).to.equal(expectedStatus);
  expect(response.body).to.have.property('success', true);
  expect(response.body).to.have.property('data');
});

Cypress.Commands.add('assertValidationError', (response, hasDetails = false) => {
  expect(response.status).to.equal(400);
  expect(response.body).to.have.property('success', false);
  expect(response.body).to.have.property('error', 'Validation error');
  if (hasDetails) {
    expect(response.body.details).to.be.an('array');
  }
});

Cypress.Commands.add('assertNotFoundError', (response, expectedError = 'Not found') => {
  expect(response.status).to.equal(404);
  expect(response.body).to.have.property('success', false);
  expect(response.body).to.have.property('error', expectedError);
});

Cypress.Commands.add('assertTodoStructure', (todo) => {
  // Ensure todo object exists before checking properties
  expect(todo).to.exist;
  expect(todo).to.be.an('object');
  expect(todo).to.have.keys(['id', 'title', 'completed', 'createdAt', 'updatedAt']);
  expect(todo.id).to.be.a('string');
  expect(todo.title).to.be.a('string');
  expect(todo.completed).to.be.a('boolean');
  expect(todo.createdAt).to.be.a('string');
  expect(todo.updatedAt).to.be.a('string');
});
