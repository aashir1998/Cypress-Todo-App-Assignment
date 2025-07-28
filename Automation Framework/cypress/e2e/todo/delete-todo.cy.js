/// <reference types="cypress" />

import Login from '../../support/Login';
import Todo from '../../support/Todo';

describe('Delete Todo', { tags: ['@Todo', '@Regression'] }, () => {
  let validCredentials;

  before(() => {
    cy.fixture('testData.json').then((data) => {
      validCredentials = data.loginData.validCredentials;
    });
  });

  it('should delete a todo item successfully', () => {
    const login = new Login();
    const todo = new Todo();
    const todoTitle = todo.generateTodoTitle();

    login.loginWithValidUser(validCredentials);
    todo.visitTodoApp();
    todo.verifyTodoFormVisible();
    todo.createTodo(todoTitle);
    todo.verifyTodoCreated(todoTitle);
    todo.deleteTodo(todoTitle);
    todo.verifyTodoDeletedByTitle(todoTitle);
  });
});
