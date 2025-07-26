# Cypress Todo App Assignment

A full-stack Todo application with React frontend, Node.js backend, and comprehensive Cypress testing framework.

## 🏗️ Project Structure

```
├── Todo App/                    # Main application code
│   ├── frontend/               # React frontend application
│   └── backend/                # Node.js backend API
├── Automation Framework/        # Complete testing framework
│   ├── cypress/               # Cypress testing framework
│   │   ├── e2e/              # End-to-end tests
│   │   ├── fixtures/         # Test data and configurations
│   │   ├── support/          # Custom commands and utilities
│   │   └── reports/          # Test execution reports
│   ├── cypress.config.js     # Cypress configuration
│   ├── eslint.config.js      # ESLint configuration
│   ├── .prettierrc          # Prettier configuration
│   └── README.md            # Framework documentation
├── package.json               # Root package.json with unified scripts
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aashir1998/Cypress-Todo-App-Assignment.git
   cd Cypress-Todo-App-Assignment
   ```

2. **Install all dependencies**
   ```bash
   npm install
   cd "Todo App/backend" && npm install
   cd "../frontend" && npm install
   cd ../..
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

This single command will start both the frontend (port 3000) and backend (port 3001) servers concurrently.

## 📱 Application Features

### Frontend (React)
- **Modern UI**: Built with React 18, Tailwind CSS, and Framer Motion
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: React Query for efficient data management
- **User Authentication**: Simple demo login system
- **Todo Management**: Create, edit, delete, and filter todos
- **Search Functionality**: Real-time search across todos
- **Bulk Operations**: Complete/uncomplete all todos
- **Statistics Dashboard**: Visual representation of todo statistics

### Backend (Node.js)
- **RESTful API**: Express.js with comprehensive endpoints
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Performance**: Compression and optimization middleware
- **Error Handling**: Robust error handling and logging
- **Data Persistence**: In-memory storage with UUID-based IDs

## 🧪 Testing Framework

The complete automation framework is located in the `Automation Framework/` directory and includes:

### Cypress E2E Testing
- **Comprehensive Coverage**: UI and login tests
- **Stable Selectors**: Data automation IDs for reliable test execution
- **Page Object Model**: Maintainable and reusable test structure
- **Cross-browser Testing**: Chrome, Firefox, Edge support
- **Mobile Testing**: Responsive design validation
- **Parallel Execution**: CI/CD optimized test runs

### Test Categories
- **Login Tests**: Valid and invalid user authentication scenarios
- **UI Tests**: Frontend component and user interaction testing
- **Smoke Tests**: Critical functionality validation
- **Regression Tests**: Comprehensive feature testing

## 🛠️ Available Scripts

### Application Commands
```bash
npm start                    # Start both frontend and backend
npm run dev                  # Start both servers in development mode
npm run start:backend        # Start only the backend server
npm run start:frontend       # Start only the frontend server
npm run build:frontend       # Build the frontend for production
```

### Testing Commands
```bash
npm run cy:open             # Open Cypress Test Runner
npm run cy:run              # Run all Cypress tests
npm run test:all            # Run all tests
npm run test:headed         # Run tests with browser visible
npm run test:chrome         # Run tests in Chrome
npm run test:firefox        # Run tests in Firefox
npm run test:edge           # Run tests in Edge
npm run test:mobile         # Run tests in mobile viewport
npm run test:tablet         # Run tests in tablet viewport
npm run test:desktop        # Run tests in desktop viewport
```

### Specialized Test Commands
```bash
npm run e2e:smoke:tests     # Run smoke tests only
npm run e2e:regression:tests # Run regression tests only
npm run api:tests           # Run API tests only
npm run ui:tests            # Run UI tests only
npm run test:parallel       # Run tests in parallel (CI/CD)
```

### Development Commands
```bash
npm run setup               # Complete project setup
npm run install:app         # Install app dependencies only
npm run prettier-format     # Format code with Prettier
```

## 🔧 Configuration

### Environment Variables
The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
# Backend Configuration
PORT=3001
NODE_ENV=development

# Frontend Configuration
REACT_APP_API_URL=http://localhost:3001/api

# Cypress Configuration
CYPRESS_TODO_API_URL=http://localhost:3001/api
CYPRESS_TODO_APP_URL=http://localhost:3000
```

### Cypress Configuration
The Cypress configuration is located in `cypress.config.js` and includes:
- Custom viewport settings
- Timeout configurations
- Reporter settings
- Environment variables
- Test retry logic

## 📊 Test Reports

Cypress generates comprehensive test reports including:
- **Mochawesome Reports**: HTML-based detailed reports
- **Screenshots**: Failed test screenshots
- **Videos**: Test execution recordings
- **Console Logs**: Detailed execution logs

Reports are generated in the `cypress/reports/` directory.

## 🎯 Demo Credentials

For testing the application:
- **Email**: `demo@example.com`
- **Password**: `password`

## 🔍 Data Automation IDs

The application includes comprehensive data automation IDs for stable test selectors:

### Key Selectors
- `data-automation-id="login-form"` - Login form
- `data-automation-id="todo-input"` - Todo input field
- `data-automation-id="add-todo-button"` - Add todo button
- `data-automation-id="todo-list"` - Todo list container
- `data-automation-id="search-input"` - Search input
- `data-automation-id="filter-all"` - All filter button
- `data-automation-id="github-link"` - GitHub profile link

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build:frontend
```
The built files will be in `Todo App/frontend/build/`

### Backend Deployment
The backend can be deployed to any Node.js hosting platform (Heroku, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Aashir Ahmed**
- GitHub: [@aashir1998](https://github.com/aashir1998)
- Portfolio: [Personal Website](https://aashir1998.github.io)

## 🙏 Acknowledgments

- React team for the amazing framework
- Cypress team for the excellent testing tool
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- All contributors and testers

---

**Happy Testing! 🎉**
