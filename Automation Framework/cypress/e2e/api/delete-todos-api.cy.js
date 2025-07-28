/// <reference types="cypress" />
import TodoApi from '../../support/Todo-Api.js';

describe('DELETE Todos API', { tags: '@API' }, () => {
  const api = new TodoApi();
  let testData;
  let existingTodoId;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
    // Get an existing todo ID for testing
    api.getExistingTodoId().then((id) => {
      existingTodoId = id;
    });
  });

  it('deletes a todo by ID', () => {
    // Use existing todo ID instead of creating a new one
    expect(existingTodoId).to.exist;
    api.deleteTodo(existingTodoId).then((res) => {
      cy.assertSuccessResponse(res);
      expect(res.body.message).to.include('deleted successfully');
    });
  });

  it('fails to delete non-existent todo', () => {
    api.deleteTodo(testData.todoData.testIds.invalidId).then((res) => cy.assertNotFoundError(res, 'Todo not found'));
  });

  it('deletes all completed todos', () => {
    api.deleteCompletedTodos().then((res) => {
      cy.assertSuccessResponse(res);
      expect(res.body.data).to.be.an('array');
    });
  });
});
