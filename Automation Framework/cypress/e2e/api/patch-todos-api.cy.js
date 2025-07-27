/// <reference types="cypress" />
import TodoApi from '../../support/Todo-Api.js';

describe('PATCH Todos API', { tags: '@API' }, () => {
  const api = new TodoApi();
  let testData;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  it('patches todo title', () => {
    api.createTestTodo().then((todo) => {
      api.patchTodo(todo.id, testData.todoData.patchData).then((res) => {
        cy.assertSuccessResponse(res);
        expect(res.body.data.title).to.equal(testData.todoData.patchData.title);
      });
    });
  });

  it('fails to patch with empty title', () => {
    api.createTestTodo().then((todo) => {
      api.patchTodo(todo.id, { title: '' }).then((res) => {
        cy.assertValidationError(res, false);
      });
    });
  });
});
