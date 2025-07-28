/// <reference types="cypress" />
import TodoApi from '../../support/Todo-Api.js';

describe('POST Todos API', { tags: '@API' }, () => {
  const api = new TodoApi();
  let testData;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  it('creates a valid todo', () => {
    const todoData = testData.todoData.validTodo;

    api.createTodo(todoData).then((res) => {
      cy.assertSuccessResponse(res, 201);
      // Ensure response has the expected structure before asserting
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('title');
      cy.assertTodoStructure(res.body.data);
      expect(res.body.data.title).to.equal(todoData.title);
    });
  });

  it('fails when title is empty', () => {
    api.createTodo(testData.todoData.invalidTodo).then((res) => {
      cy.assertValidationError(res, true);
    });
  });
});
