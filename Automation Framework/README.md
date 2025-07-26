# Automation Framework

This folder contains the complete Cypress automation framework for testing Aashir's Todo App.

## 🏗️ Structure

```
Automation Framework/
├── cypress/                    # Cypress testing framework
│   ├── e2e/                   # End-to-end tests
│   │   ├── login/             # Login test specifications
│   │   └── ui/                # UI test specifications
│   ├── fixtures/              # Test data files
│   ├── support/               # Custom commands and utilities
│   ├── screenshots/           # Test screenshots
│   ├── reports/               # Test execution reports
│   └── downloads/             # Downloaded files
├── cypress.config.js          # Cypress configuration
├── eslint.config.js           # ESLint configuration
├── .prettierrc               # Prettier configuration
├── .prettierignore           # Prettier ignore rules
└── README.md                 # This file
```

## 🧪 Test Structure

### Login Tests (`cypress/e2e/login/`)
- **`login-with-valid-user.cy.js`** - Tests for successful login scenarios
- **`login-with-invalid-user.cy.js`** - Tests for failed login scenarios

### UI Tests (`cypress/e2e/ui/`)
- **`todo-app-ui.cy.js`** - Comprehensive UI tests for the Todo application

### Support Files (`cypress/support/`)
- **`Login.js`** - Page Object Model for login functionality
- **`commands.js`** - Custom Cypress commands
- **`e2e.js`** - Cypress support configuration

### Test Data (`cypress/fixtures/`)
- **`testData.json`** - Test data for login scenarios

## 🚀 Running Tests

### From Root Directory
```bash
# Run all tests
npm run test:all

# Open Cypress Test Runner
npm run cy:open

# Run specific test types
npm run e2e:smoke:tests
npm run e2e:regression:tests
npm run ui:tests
```

### From Automation Framework Directory
```bash
cd "Automation Framework"

# Run all tests
cypress run

# Open Cypress Test Runner
cypress open

# Run specific test files
cypress run --spec "cypress/e2e/login/**/*.cy.js"
cypress run --spec "cypress/e2e/ui/**/*.cy.js"
```

## 🎯 Test Features

### Login Testing
- ✅ Valid user login scenarios
- ✅ Invalid user login scenarios
- ✅ Form validation testing
- ✅ Error message verification
- ✅ Password visibility toggle
- ✅ Form state management

### UI Testing
- ✅ Todo creation, editing, deletion
- ✅ Todo completion and filtering
- ✅ Search functionality
- ✅ Bulk operations
- ✅ Statistics verification
- ✅ Responsive design testing

### Framework Features
- ✅ Page Object Model implementation
- ✅ Custom Cypress commands
- ✅ Data-driven testing
- ✅ Comprehensive error handling
- ✅ Stable selectors with data-automation-id
- ✅ Cross-browser testing support
- ✅ Mobile and tablet viewport testing

## 🔧 Configuration

### Cypress Configuration (`cypress.config.js`)
- Custom viewport settings
- Timeout configurations
- Reporter settings
- Environment variables
- Test retry logic

### ESLint Configuration (`eslint.config.js`)
- Code quality rules
- Cypress-specific linting
- Best practices enforcement

### Prettier Configuration (`.prettierrc`)
- Code formatting rules
- Consistent code style

## 📊 Test Reports

Cypress generates comprehensive test reports including:
- **Mochawesome Reports**: HTML-based detailed reports
- **Screenshots**: Failed test screenshots
- **Videos**: Test execution recordings
- **Console Logs**: Detailed execution logs

Reports are generated in the `cypress/reports/` directory.

## 🎯 Best Practices

### Page Object Model
- All page interactions are abstracted into reusable classes
- Selectors are centralized and maintainable
- Methods are descriptive and reusable

### Test Data Management
- Test data is externalized in JSON fixtures
- Data is organized by test scenarios
- Easy to maintain and update

### Custom Commands
- Reusable commands for common operations
- Consistent test implementation
- Reduced code duplication

### Error Handling
- Comprehensive error scenarios covered
- Clear error messages and assertions
- Robust test execution

## 🚀 Continuous Integration

The framework is designed to work seamlessly with CI/CD pipelines:
- Parallel test execution support
- Cross-browser testing
- Multiple viewport testing
- Comprehensive reporting

---

**Happy Testing! 🎉** 