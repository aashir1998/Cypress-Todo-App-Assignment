/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

class TodoApi {
  constructor() {
    this.baseUrl = Cypress.env('todoApiUrl');
    this.timeout = 10000;
  }

  makeRequest(method, endpoint, body = null) {
    return cy.api({
      method,
      url: `${this.baseUrl}${endpoint}`,
      body,
      headers: { 'Content-Type': 'application/json' },
      timeout: this.timeout,
      failOnStatusCode: false
    });
  }

  // CRUD methods
  getAllTodos(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.makeRequest('GET', query ? `/todos?${query}` : '/todos');
  }

  getTodoById(id) {
    return this.makeRequest('GET', `/todos/${id}`);
  }

  createTodo(todoData) {
    return this.makeRequest('POST', '/todos', todoData);
  }

  updateTodo(id, data) {
    return this.makeRequest('PUT', `/todos/${id}`, data);
  }

  patchTodo(id, data) {
    return this.makeRequest('PATCH', `/todos/${id}`, data);
  }

  deleteTodo(id) {
    return this.makeRequest('DELETE', `/todos/${id}`);
  }

  deleteCompletedTodos() {
    return this.makeRequest('DELETE', '/todos');
  }

  // Helpers
  generateValidTodoData() {
    return {
      title: faker.lorem.words(3),
      completed: faker.datatype.boolean()
    };
  }

  createTestTodo() {
    const data = this.generateValidTodoData();
    return this.createTodo(data).then((res) => {
      expect(res.status).to.equal(201);
      // Ensure the response has the expected structure
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('id');
      return res.body.data;
    });
  }

  getExistingTodoId() {
    return this.getAllTodos().then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.greaterThan(0);
      return res.body.data[0].id;
    });
  }
}

export default TodoApi;

