/// <reference types="cypress" />

import Login from '../../support/Login';
import Todo from '../../support/Todo';

describe('Edit Todo', { tags: ['@Todo', '@Regression'] }, () => {
  let validCredentials;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      validCredentials = data.loginData.validCredentials;
    });
  });

  it('should edit an existing todo item successfully', () => {
    const login = new Login();
    const todo = new Todo();
    const originalTitle = todo.generateTodoTitle();
    const updatedTitle = todo.generateUpdatedTodoTitle();

    login.loginWithValidUser(validCredentials);
    todo.visitTodoApp();
    todo.verifyTodoFormVisible();
    todo.createTodo(originalTitle);
    todo.verifyTodoCreated(originalTitle);
    todo.editTodo(updatedTitle);
    todo.verifyTodoUpdated(updatedTitle);
  });
});
