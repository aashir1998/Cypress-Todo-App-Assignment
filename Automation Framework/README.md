# Automation Framework - Technical Documentation

This directory contains the Cypress automation framework for testing the Todo application. 

## 🏗️ **Framework Architecture**

```
Automation Framework/
├── cypress/
│   ├── e2e/                   # Test specifications
│   │   ├── api/              # API test suites
│   │   ├── login/            # Authentication tests
│   │   └── todo/             # Todo CRUD tests
│   ├── fixtures/             # Test data and configurations
│   ├── support/              # Custom commands and utilities
│   ├── reports/              # Test execution reports
│   └── screenshots/          # Failure screenshots
├── cypress.config.js         # Cypress configuration
├── package.json              # Framework dependencies
└── README.md                 # This file
```

## 🧪 **Test Organization**

### **API Tests** (`cypress/e2e/api/`)
- **`get-todos-api.cy.js`** - GET endpoint validation
- **`post-todos-api.cy.js`** - POST endpoint validation
- **`put-todos-api.cy.js`** - PUT endpoint validation
- **`patch-todos-api.cy.js`** - PATCH endpoint validation
- **`delete-todos-api.cy.js`** - DELETE endpoint validation
- **`login-api.cy.js`** - Authentication API validation

### **Login Tests** (`cypress/e2e/login/`)
- **`login-with-valid-user.cy.js`** - Successful authentication flows
- **`login-with-invalid-user.cy.js`** - Failed authentication scenarios

### **Todo Tests** (`cypress/e2e/todo/`)
- **`create-todo.cy.js`** - Todo creation workflows
- **`edit-todo.cy.js`** - Todo editing functionality
- **`toggle-todo.cy.js`** - Todo completion toggling
- **`delete-todo.cy.js`** - Todo deletion workflows

## 🔧 **Framework Components**

### **Support Files** (`cypress/support/`)
- **`Login.js`** - Login page object model
- **`Todo-Api.js`** - API interaction utilities
- **`Todo.js`** - Todo page object model
- **`commands.js`** - Custom Cypress commands
- **`e2e.js`** - Cypress support configuration

### **Test Data** (`cypress/fixtures/`)
- **`testData.json`** - Centralized test data for all scenarios

## 🎯 **Framework Features**

### **Page Object Model**
```javascript
// Example: Login.js
export default class Login {
  constructor() {
    this.emailInput = '[data-automation-id="email-input"]';
    this.passwordInput = '[data-automation-id="password-input"]';
    this.loginButton = '[data-automation-id="login-button"]';
  }

  login(email, password) {
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(password);
    cy.get(this.loginButton).click();
  }
}
```

### **Custom Commands**
```javascript
// Example: commands.js
Cypress.Commands.add('assertSuccessResponse', (response) => {
  expect(response.status).to.equal(200);
  expect(response.body.success).to.be.true;
});

Cypress.Commands.add('assertTodoStructure', (todo) => {
  expect(todo).to.have.property('id');
  expect(todo).to.have.property('title');
  expect(todo).to.have.property('completed');
});
```

### **Test Tagging System**
```javascript
// Example test with tags
describe('GET Todos API', { tags: '@API' }, () => {
  it('retrieves all todos successfully', { tags: '@Smoke' }, () => {
    // Test implementation
  });
});
```

## 🚀 **Local Development Commands**

### **From Automation Framework Directory**
```bash
cd "Automation Framework"

# Open Cypress Test Runner (GUI)
cypress open

# Run all tests (headless)
cypress run

# Run specific test suites
cypress run --spec "cypress/e2e/api/**/*.cy.js"
cypress run --spec "cypress/e2e/login/**/*.cy.js"
cypress run --spec "cypress/e2e/todo/**/*.cy.js"

# Run with specific tags
cypress run --env grepTags=@API
cypress run --env grepTags=@Smoke
cypress run --env grepTags=@Regression
```

### **Environment Variables**
```bash
# Create .env file in Automation Framework/
CYPRESS_BASE_URL=http://localhost:3000
CYPRESS_API_BASE_URL=http://localhost:3001/api
CYPRESS_VIDEO=true
CYPRESS_SCREENSHOTS=true
```

## 📊 **Test Reports & Artifacts**

### **Report Locations**
- **HTML Reports**: `cypress/reports/html/`
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`

### **Report Features**
- **Mochawesome Reports**: Detailed HTML reports with screenshots
- **Test Execution Videos**: Recorded test runs for debugging
- **Failure Screenshots**: Automatic capture on test failures
- **Console Logs**: Detailed execution logs

## 🔧 **Configuration Details**

### **Cypress Configuration** (`cypress.config.js`)
```javascript
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 1,
    openMode: 0
  },
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true
  }
});
```

### **Test Retry Logic**
- **Run Mode**: 1 retry for flaky tests
- **Open Mode**: 0 retries for interactive debugging

### **Timeout Settings**
- **Page Load**: 120 seconds
- **Default Command**: 10 seconds
- **Request Timeout**: 120 seconds

## 🎯 **Best Practices**

### **Selector Strategy**
- **Data Automation IDs**: Primary selector strategy
- **Stable Selectors**: Avoid CSS classes that change frequently
- **Descriptive Names**: Clear, meaningful automation IDs

### **Test Data Management**
- **Externalized Data**: All test data in JSON fixtures
- **Scenario-Based**: Organized by test scenarios
- **Maintainable**: Easy to update and extend

### **Error Handling**
- **Comprehensive Coverage**: All error scenarios tested
- **Clear Assertions**: Descriptive error messages
- **Robust Execution**: Graceful handling of failures

### **Code Quality**
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent formatting
- **Custom Rules**: Cypress-specific linting

## 🚀 **CI/CD Integration**

### **Pipeline Support**
- **Parallel Execution**: Optimized for CI environments
- **Cross-Browser Testing**: Chrome, Firefox, Edge support
- **Multiple Viewports**: Mobile and tablet testing
- **Conditional Execution**: Shift-left testing strategy

### **Environment Variables for CI**
```bash
CI=true
CYPRESS_BASE_URL=http://localhost:3000
CYPRESS_API_BASE_URL=http://localhost:3001/api
```

---

**For setup instructions and usage, see the main [README.md](../README.md) in the root directory.**
