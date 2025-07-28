/// <reference types="cypress" />
import TodoApi from '../../support/Todo-Api.js';

describe('PATCH Todos API', { tags: '@API' }, () => {
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

  it('patches todo title', () => {
    // Use existing todo ID instead of creating a new one
    expect(existingTodoId).to.exist;
    api.patchTodo(existingTodoId, testData.todoData.patchData).then((res) => {
      cy.assertSuccessResponse(res);
      expect(res.body.data.title).to.equal(testData.todoData.patchData.title);
    });
  });

  it('fails to patch with empty title', () => {
    // Use existing todo ID instead of creating a new one
    expect(existingTodoId).to.exist;
    api.patchTodo(existingTodoId, { title: '' }).then((res) => {
      cy.assertValidationError(res, false);
    });
  });
});
