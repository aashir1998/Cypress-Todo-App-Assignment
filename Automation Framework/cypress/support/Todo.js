/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

class Todo {
  constructor() {
    this.todoForm = '[data-automation-id="todo-form"]';
    this.todoInput = '[data-automation-id="todo-input"]';
    this.addTodoButton = '[data-automation-id="add-todo-button"]';
    this.todoItem = '[data-automation-id^="todo-item-"]';
    this.todoToggle = '[data-automation-id^="todo-toggle-"]';
    this.todoEditButton = '[data-automation-id^="todo-edit-button-"]';
    this.todoDeleteButton = '[data-automation-id^="todo-delete-button-"]';
    this.todoEditInput = '[data-automation-id^="todo-edit-input-"]';
    this.todoApp = '[data-automation-id="todo-app"]';
    this.successToast = '.go3958317564';
    this.timeout = 10000;
  }

  generateTodoTitle() {
    return faker.lorem.sentence({ min: 3, max: 8 });
  }

  generateUpdatedTodoTitle() {
    return faker.lorem.sentence({ min: 3, max: 8 });
  }

  visitTodoApp() {
    cy.visit('/todos', { timeout: this.timeout });
    cy.get(this.todoApp, { timeout: this.timeout }).should('be.visible');
  }

  createTodo(title) {
    cy.get(this.todoInput, { timeout: this.timeout })
      .should('be.visible')
      .clear()
      .type(title);

    cy.get(this.addTodoButton, { timeout: this.timeout })
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.get(this.todoItem, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', title);

    cy.get(this.successToast, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', 'Todo created successfully!');
  }

  editTodo(title) {
    cy.get(this.todoItem, { timeout: this.timeout })
      .first()
      .trigger('mouseover');
    cy.get(this.todoEditButton, { timeout: this.timeout }).first().click();
    cy.get(this.todoEditInput, { timeout: this.timeout })
      .should('be.visible')
      .clear()
      .type(title)
      .type('{enter}');

    cy.get(this.todoItem, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', title);

    cy.get(this.successToast, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', 'Todo updated successfully!');
  }

  deleteTodo(title) {
    cy.get(this.todoItem, { timeout: this.timeout })
      .contains(title)
      .closest(this.todoItem)
      .trigger('mouseover');

    cy.get(this.todoDeleteButton, { timeout: this.timeout })
      .first()
      .should('be.visible')
      .click();

    cy.get(this.successToast, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', 'Todo deleted successfully!');

    cy.get(this.todoItem, { timeout: this.timeout })
      .contains(title)
      .should('not.exist');
  }

  toggleTodo() {
    cy.get(this.todoToggle, { timeout: this.timeout }).first().click();

    cy.get(this.todoItem, { timeout: this.timeout }).should(
      'have.class',
      'bg-gray-50'
    );

    cy.get(this.successToast, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', 'Todo updated successfully!');
  }

  verifyTodoFormVisible() {
    cy.get(this.todoForm, { timeout: this.timeout }).should('be.visible');
    cy.get(this.todoInput, { timeout: this.timeout }).should('be.visible');
    cy.get(this.addTodoButton, { timeout: this.timeout }).should('be.visible');
  }

  verifyTodoCreated(title) {
    cy.get(this.todoItem, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', title);
  }

  verifyTodoUpdated(title) {
    cy.get(this.todoItem, { timeout: this.timeout })
      .should('be.visible')
      .and('contain.text', title);
  }

  verifyTodoDeletedByTitle(title) {
    cy.get(this.todoItem, { timeout: this.timeout })
      .contains(title)
      .should('not.exist');
  }

  verifyTodoCompleted() {
    cy.get(this.todoItem, { timeout: this.timeout }).should(
      'have.class',
      'bg-gray-50'
    );
  }
}

export default Todo;
