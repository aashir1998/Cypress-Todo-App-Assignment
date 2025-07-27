/// <reference types="cypress" />
import TodoApi from '../../support/Todo-Api.js';

describe('PUT Todos API', { tags: '@API' }, () => {
  const api = new TodoApi();
  let testData;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  it('updates a todo fully', () => {
    api.createTestTodo().then((todo) => {
      const updateData = testData.todoData.updateData;

      api.updateTodo(todo.id, updateData).then((res) => {
        cy.assertSuccessResponse(res);
        expect(res.body.data.title).to.equal(updateData.title);
      });
    });
  });

  it('fails to update non-existent todo', () => {
    api.updateTodo(testData.todoData.testIds.invalidId, { title: 'Nope' }).then((res) => {
      cy.assertNotFoundError(res, 'Todo not found');
    });
  });
});
