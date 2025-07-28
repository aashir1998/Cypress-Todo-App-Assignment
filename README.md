# Cypress Todo App Assignment

A comprehensive **automation testing framework** for a full-stack Todo application built with React frontend, Node.js backend, and Cypress E2E testing.

## 🎯 **Project Focus: Automation Framework**

This project is primarily designed as a **complete automation testing framework** that demonstrates:

- **End-to-End Testing** with Cypress
- **API Testing** for REST endpoints
- **UI Testing** for React components
- **Cross-browser Testing** (Chrome, Firefox, Edge)
- **Mobile & Tablet Testing**
- **Parallel Test Execution**
- **Comprehensive Test Reporting**

## 🏗️ **Project Structure**

```
├── Automation Framework/        # 🧪 Complete testing framework
│   ├── cypress/               # Cypress testing framework
│   │   ├── e2e/              # End-to-end tests
│   │   │   ├── api/          # API test suites
│   │   │   ├── ui/           # UI test suites
│   │   │   └── login/        # Authentication tests
│   │   ├── fixtures/         # Test data and configurations
│   │   ├── support/          # Custom commands and utilities
│   │   └── reports/          # Test execution reports
│   ├── cypress.config.js     # Cypress configuration
│   ├── eslint.config.js      # ESLint configuration
│   └── .prettierrc          # Prettier configuration
├── Todo App/                    # 🎨 Demo application (for testing)
│   ├── frontend/               # React frontend application
│   └── backend/                # Node.js backend API
└── package.json               # Root package.json with unified scripts
```

## 🚀 **Quick Start**

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/aashir1998/Cypress-Todo-App-Assignment.git
cd Cypress-Todo-App-Assignment

# Install all dependencies (Cypress, Backend, Frontend)
npm install
```

### Start the Application

```bash
# Start both frontend and backend servers
npm start
```

This will start:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## 🧪 **Automation Framework Features**

### **Test Categories**

- **🔐 Login Tests**: Authentication scenarios and user flows
- **🎨 UI Tests**: Frontend component interactions and user experience
- **🔌 API Tests**: REST API endpoint validation and data integrity
- **💨 Smoke Tests**: Critical functionality validation
- **🔄 Regression Tests**: Comprehensive feature testing

### **Testing Capabilities**

- **Cross-browser Testing**: Chrome, Firefox, Edge support
- **Responsive Testing**: Mobile (375x667) and Tablet (768x1024) viewports
- **Parallel Execution**: CI/CD optimized test runs
- **Visual Regression**: Screenshot comparison testing
- **API Testing**: RESTful API validation with custom commands
- **Data Management**: Faker.js for dynamic test data
- **Reporting**: Mochawesome HTML reports with screenshots

### **Framework Architecture**

- **Page Object Model**: Maintainable and reusable test structure
- **Custom Commands**: Reusable test utilities and helpers
- **Data Automation IDs**: Stable selectors for reliable test execution
- **Environment Configuration**: Flexible setup for different environments
- **Error Handling**: Robust error management and retry mechanisms

## 🛠️ **Available Scripts**

### **Application Commands**

```bash
npm start                    # Start both frontend and backend
npm run start:backend        # Start only the backend server
npm run start:frontend       # Start only the frontend server
```

### **Testing Commands**

```bash
npm run cy:open              # Open Cypress test runner (GUI)
npm run cy:run               # Run Cypress tests in headless mode
npm run test:all             # Run all Cypress tests
npm run test:headed          # Run tests with browser visible
npm run test:chrome          # Run tests in Chrome browser
npm run test:firefox         # Run tests in Firefox browser
npm run test:edge            # Run tests in Edge browser
npm run test:mobile          # Run tests with mobile viewport
npm run test:tablet          # Run tests with tablet viewport
npm run test:parallel        # Run tests in parallel mode
```

### **Test Suite Commands**

```bash
npm run e2e:smoke:tests      # Run smoke test suite
npm run e2e:regression:tests # Run regression test suite
npm run api:tests            # Run API test suite only
npm run ui:tests             # Run UI test suite only
```

### **Code Quality**

```bash
npm run prettier-format      # Format code with Prettier
npm run cy:verify            # Verify Cypress installation
```

## 📊 **Test Reports**

After running tests, comprehensive reports are generated in:

- **HTML Reports**: `Automation Framework/cypress/reports/`
- **Screenshots**: `Automation Framework/cypress/screenshots/`
- **Videos**: `Automation Framework/cypress/videos/`

## 🎨 **Demo Application Features**

The Todo App serves as a testing target and includes:

### **Frontend (React)**

- Modern UI with Tailwind CSS and Framer Motion
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
# Create .env file in Automation Framework/
CYPRESS_BASE_URL=http://localhost:3000
CYPRESS_API_BASE_URL=http://localhost:3001/api
CYPRESS_VIDEO=true
CYPRESS_SCREENSHOTS=true
```

## 🚀 **CI/CD Integration**

The framework is optimized for continuous integration:

- **Parallel execution** support
- **Cross-browser testing** in CI environments
- **Video recording** for debugging
- **Screenshot capture** on failures
- **HTML reporting** for test results

## 📝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 **License**

This project is licensed under the ISC License.

---

**Built with ❤️ by Aashir Ahmed**
