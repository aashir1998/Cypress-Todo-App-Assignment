/// <reference types="cypress" />
import TodoApi from '../../support/Todo-Api.js';

describe('PUT Todos API', { tags: '@API' }, () => {
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

  it('updates a todo fully', () => {
    // Use existing todo ID instead of creating a new one
    expect(existingTodoId).to.exist;
    const updateData = testData.todoData.updateData;

    api.updateTodo(existingTodoId, updateData).then((res) => {
      cy.assertSuccessResponse(res);
      expect(res.body.data.title).to.equal(updateData.title);
    });
  });

  it('fails to update non-existent todo', () => {
    api.updateTodo(testData.todoData.testIds.invalidId, { title: 'Nope' }).then((res) => {
      cy.assertNotFoundError(res, 'Todo not found');
    });
  });
});
