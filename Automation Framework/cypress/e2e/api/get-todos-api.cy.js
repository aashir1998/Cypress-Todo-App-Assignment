/// <reference types="cypress" />
import TodoApi from '../../support/Todo-Api.js';

describe('GET Todos API', { tags: '@API' }, () => {
  const api = new TodoApi();
  let testData;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      testData = data;
    });
  });

  it('retrieves all todos successfully', () => {
    api.getAllTodos().then((res) => {
      cy.assertSuccessResponse(res);
      expect(res.body.data).to.be.an('array');
      res.body.data.forEach(todo => cy.assertTodoStructure(todo));
    });
  });

  it('retrieves todo by ID', () => {
    api.getExistingTodoId().then((id) => {
      api.getTodoById(id).then((res) => {
        cy.assertSuccessResponse(res);
        cy.assertTodoStructure(res.body.data);
        expect(res.body.data.id).to.equal(id);
      });
    });
  });

  it('returns 404 for non-existent ID', () => {
    api.getTodoById(testData.todoData.testIds.invalidId).then((res) => cy.assertNotFoundError(res, 'Todo not found'));
  });
});
