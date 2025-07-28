# Cypress Todo App Automation Framework

A comprehensive **automation testing framework** for a full-stack Todo application built with React frontend, Node.js backend, and Cypress E2E testing.

## 📋 **Test Plan & Strategy**

### **What is Being Tested**

This framework provides comprehensive testing coverage for a Todo application including:

- **🔐 Authentication**: Login functionality with valid/invalid credentials
- **🎨 UI Components**: React frontend interactions and user experience
- **🔌 API Endpoints**: REST API validation for CRUD operations
- **💨 Smoke Tests**: Critical functionality validation
- **🔄 Regression Tests**: Comprehensive feature testing

### **Test Coverage Areas**

| Test Category | Coverage | Tags |
|---------------|----------|------|
| **API Tests** | REST endpoints (GET, POST, PUT, PATCH, DELETE) | `@API` |
| **Login Tests** | Authentication scenarios | `@Login` |
| **Todo CRUD** | Create, Read, Update, Delete operations | `@Todo` |
| **Smoke Tests** | Critical path validation | `@Smoke` |
| **Regression Tests** | Full feature testing | `@Regression` |

### **Tools Used and Why**

- **Cypress**: Modern E2E testing framework with excellent debugging capabilities
- **@cypress/grep**: Test filtering and tagging for selective execution
- **cypress-mochawesome-reporter**: Professional HTML reporting with screenshots
- **@faker-js/faker**: Dynamic test data generation
- **cypress-plugin-api**: Enhanced API testing capabilities

## 📋 **Test Plan**

For detailed test planning and strategy documentation, please refer to my comprehensive test plan:

**[📄 Complete Test Plan Documentation](https://docs.google.com/document/d/12LPTQHIjd_M_Tqf4R7SxYhU4StdRD1C3Ns7RJ3K_Qzc/edit?tab=t.0)**



## 🏗️ **Project Structure**

This is a **monorepo** containing three main components:

```
├── Automation Framework/        # 🧪 Complete testing framework
│   ├── cypress/               # Cypress testing framework
│   │   ├── e2e/              # End-to-end tests
│   │   │   ├── api/          # API test suites
│   │   │   ├── login/        # Authentication tests
│   │   │   └── todo/         # Todo CRUD tests
│   │   ├── fixtures/         # Test data and configurations
│   │   ├── support/          # Custom commands and utilities
│   │   └── reports/          # Test execution reports
│   ├── cypress.config.js     # Cypress configuration
│   └── package.json          # Testing dependencies
├── Todo App/                    # 🎨 Demo application (for testing)
│   ├── frontend/               # React frontend application
│   └── backend/                # Node.js backend API
└── package.json               # Root package.json with unified scripts
```

## 🚀 **Setup & Installation**

### **Prerequisites**

- Node.js >= 16.0.0
- npm >= 8.0.0

### **Step-by-Step Setup**

```bash
# 1. Clone the repository
git clone https://github.com/aashir1998/Cypress-Todo-App-Assignment.git
cd Cypress-Todo-App-Assignment

# 2. Install all dependencies (Root, Frontend, Backend, Cypress)
npm run install:all

# 3. Verify Cypress installation
npm run cy:verify

# 4. Start both frontend and backend servers
npm start
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

### **Verification Steps**

After setup, verify everything is working:

```bash
# Check if servers are running
curl http://localhost:3000  # Frontend should respond
curl http://localhost:3001/health  # Backend health check

# Open Cypress Test Runner (GUI)
npm run cy:open
```

## 🧪 **Cypress Implementation Details**

### **Framework Architecture**

The testing framework follows modern automation best practices:

- **Page Object Model**: Maintainable and reusable test structure
- **Custom Commands**: Reusable test utilities and helpers
- **Data Automation IDs**: Stable selectors for reliable test execution
- **Environment Configuration**: Flexible setup for different environments
- **Error Handling**: Robust error management and retry mechanisms

### **Test Organization**

```
cypress/e2e/
├── api/                    # API test suites
│   ├── get-todos-api.cy.js
│   ├── post-todos-api.cy.js
│   ├── put-todos-api.cy.js
│   ├── patch-todos-api.cy.js
│   ├── delete-todos-api.cy.js
│   └── login-api.cy.js
├── login/                  # Authentication tests
│   ├── login-with-valid-user.cy.js
│   └── login-with-invalid-user.cy.js
└── todo/                   # Todo CRUD tests
    ├── create-todo.cy.js
    ├── edit-todo.cy.js
    ├── toggle-todo.cy.js
    └── delete-todo.cy.js
```

### **Custom Tags for Selective Testing**

The framework uses custom tags to organize and run specific test suites:

```javascript
// Example test with tags
describe('GET Todos API', { tags: '@API' }, () => {
  // Test implementation
});
```

**Available Tags:**
- `@API` - API endpoint tests
- `@Login` - Authentication tests
- `@Todo` - Todo CRUD operations
- `@Smoke` - Critical functionality
- `@Regression` - Comprehensive testing

## 🛠️ **Available Commands**

### **Application Commands**

```bash
npm start                    # Start both frontend and backend
npm run start:backend        # Start only the backend server
npm run start:frontend       # Start only the frontend server
```

### **Testing Commands**

```bash
# Cypress Test Runner
npm run cy:open              # Open Cypress test runner (GUI)
npm run cy:run               # Run Cypress tests in headless mode

# Specific Test Suites
npm run api:tests            # Run API test suite only
npm run e2e:smoke:tests      # Run smoke test suite
npm run e2e:regression:tests # Run regression test suite
```

### **Running Tests Based on Use Cases**

#### **🔌 API Testing**
```bash
npm run api:tests
```
**When to use:** 
- Testing backend API endpoints
- Validating data integrity
- Performance testing of API responses
- Integration testing with external services

#### **💨 Smoke Testing**
```bash
npm run e2e:smoke:tests
```
**When to use:**
- Quick validation of critical functionality
- Pre-deployment verification
- Daily health checks
- Fast feedback on core features

#### **🔄 Regression Testing**
```bash
npm run e2e:regression:tests
```
**When to use:**
- Comprehensive feature testing
- Full application validation
- Release candidate testing
- Complete user journey validation

#### **🎯 Complete Test Suite**
```bash
npm run cy:run
```
**When to use:**
- Running all tests together
- Full regression testing
- Pre-release validation
- Comprehensive quality assurance

### **Code Quality Commands**

```bash
npm run format               # Format code with Prettier
npm run cy:verify            # Verify Cypress installation
npm run format:check         # Check code formatting
npm run lint                 # Run linting for frontend and backend
npm run code:check           # Check both formatting and linting
```

## 🚀 **GitHub Actions Pipeline (Shift-Left Testing)**

The project implements a **shift-left testing strategy** with a comprehensive CI/CD pipeline that runs automatically on:

- **Push to master branch**
- **Pull requests to master branch**

### **Pipeline Strategy: Early Issue Detection**

The pipeline follows a **sequential execution strategy** to catch issues early and promote shift-left testing:

#### **Stage 1: API Tests** 🔌
```bash
npm run api:tests
```
- **Purpose**: Validate backend API endpoints first
- **Why Early**: API issues are fundamental and affect all other tests
- **Failure Impact**: If API tests fail, subsequent tests are blocked

#### **Stage 2: Smoke Tests** 💨 (Only if API passes)
```bash
npm run e2e:smoke:tests
```
- **Purpose**: Validate critical user functionality
- **Condition**: Only runs if all API tests pass
- **Why Sequential**: Ensures basic functionality before comprehensive testing

#### **Stage 3: Regression Tests** 🔄 (Only if Smoke passes)
```bash
npm run e2e:regression:tests
```
- **Purpose**: Comprehensive feature validation
- **Condition**: Only runs if all smoke tests pass
- **Why Last**: Most comprehensive and time-consuming tests

### **Shift-Left Benefits**

✅ **Early Issue Detection**: API problems caught before UI testing  
✅ **Faster Feedback**: Fail fast, fail early approach  
✅ **Resource Efficiency**: Prevents expensive tests when basics fail  
✅ **Quality Gates**: Each stage acts as a quality checkpoint  
✅ **Reduced Costs**: Issues caught earlier cost less to fix  

### **Pipeline Commands**

```bash
# Local pipeline simulation
npm run e2e:smoke:tests:ci      # Run smoke tests in CI mode
npm run e2e:regression:tests:ci # Run regression tests in CI mode
```

### **Pipeline Flow**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Tests     │───▶│  Smoke Tests    │───▶│ Regression Tests│
│   (Stage 1)     │    │   (Stage 2)     │    │   (Stage 3)     │
│                 │    │                 │    │                 │
│ • GET /todos    │    │ • Login         │    │ • Full CRUD     │
│ • POST /todos   │    │ • Create Todo   │    │ • Search/Filter │
│ • PUT /todos    │    │ • Basic UI      │    │ • All Features  │
│ • DELETE /todos │    │ • Navigation    │    │ • Edge Cases    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   ❌ Block if fail        ❌ Block if fail        ❌ Block if fail
   ✅ Continue if pass     ✅ Continue if pass     ✅ Continue if pass
```

## 📊 **Test Reports**

After running tests, comprehensive reports are generated in:

- **HTML Reports**: `Automation Framework/cypress/reports/html/`
- **Screenshots**: `Automation Framework/cypress/screenshots/`
- **Videos**: `Automation Framework/cypress/videos/`

## 🎨 **Demo Application Features**

The Todo App serves as a testing target and includes:

### **Frontend (React)**
- Modern UI with Tailwind CSS
- Real-time search and filtering
- Responsive design for all devices
- User authentication system
- Todo CRUD operations
- Statistics dashboard

### **Backend (Node.js)**
- RESTful API with Express.js
- Security middleware (Helmet, CORS, Rate Limiting)
- Input validation and error handling
- In-memory data storage with UUIDs
- Health check endpoints

## 🔧 **Framework Configuration**

### **Cypress Configuration**

- **Base URL**: http://localhost:3000
- **API Base URL**: http://localhost:3001/api
- **Viewport**: Responsive testing support
- **Timeouts**: Optimized for CI/CD environments
- **Retries**: Automatic retry on flaky tests

### **Environment Variables**

```bash
# Create .env file in Root directory
CYPRESS_BASE_URL=http://localhost:3000
CYPRESS_API_BASE_URL=http://localhost:3001/api
CYPRESS_VIDEO=true
CYPRESS_SCREENSHOTS=true
```

---

**Built  by Aashir Ahmed**
