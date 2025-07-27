const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const compression = require('compression');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage (in production, use a database)
let todos = [
  {
    id: '1',
    title: 'Learn Node.js',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Build Todo API',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Test the API',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Rate limiting - very lenient for testing
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 2000, // allow 2000 requests per minute (very high for testing)
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Speed limiting - disabled for testing
// Removed speed limiting to prevent delays during testing

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
const apiRouter = express.Router();

// Validation middleware
const validateTodo = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Title must be between 1 and 500 characters')
    .escape(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean')
];

// GET /api/todos - Get all todos
apiRouter.get('/todos', (req, res) => {
  try {
    const { completed, search, sort = 'createdAt', order = 'desc' } = req.query;

    let filteredTodos = [...todos];

    // Filter by completion status
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      filteredTodos = filteredTodos.filter(
        (todo) => todo.completed === isCompleted
      );
    }

    // Search by title
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filteredTodos = filteredTodos.filter((todo) =>
        searchRegex.test(todo.title)
      );
    }

    // Sort todos
    filteredTodos.sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    res.json({
      success: true,
      data: filteredTodos,
      count: filteredTodos.length,
      total: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// GET /api/todos/:id - Get a specific todo
apiRouter.get('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
        message: `Todo with id ${id} does not exist`
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// POST /api/todos - Create a new todo
apiRouter.post('/todos', validateTodo, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errors.array()
      });
    }

    const { title, completed = false } = req.body;

    const newTodo = {
      id: uuidv4(),
      title: title.trim(),
      completed: Boolean(completed),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);

    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// PUT /api/todos/toggle-all - Toggle all todos completion status
apiRouter.put('/todos/toggle-all', (req, res) => {
  try {
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Completed must be a boolean'
      });
    }

    todos = todos.map((todo) => ({
      ...todo,
      completed,
      updatedAt: new Date().toISOString()
    }));

    res.json({
      success: true,
      data: todos,
      message: `All todos ${completed ? 'completed' : 'uncompleted'} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// PUT /api/todos/:id - Update a todo
apiRouter.put('/todos/:id', validateTodo, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const { title, completed } = req.body;

    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
        message: `Todo with id ${id} does not exist`
      });
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(completed !== undefined && { completed: Boolean(completed) }),
      updatedAt: new Date().toISOString()
    };

    todos[todoIndex] = updatedTodo;

    res.json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// PATCH /api/todos/:id - Partially update a todo
apiRouter.patch('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
        message: `Todo with id ${id} does not exist`
      });
    }

    // Validate updates
    if (updates.title !== undefined) {
      if (
        typeof updates.title !== 'string' ||
        updates.title.trim().length === 0
      ) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          message: 'Title must be a non-empty string'
        });
      }
    }

    if (
      updates.completed !== undefined &&
      typeof updates.completed !== 'boolean'
    ) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        message: 'Completed must be a boolean'
      });
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...(updates.title !== undefined && { title: updates.title.trim() }),
      ...(updates.completed !== undefined && { completed: updates.completed }),
      updatedAt: new Date().toISOString()
    };

    todos[todoIndex] = updatedTodo;

    res.json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// DELETE /api/todos/:id - Delete a todo
apiRouter.delete('/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found',
        message: `Todo with id ${id} does not exist`
      });
    }

    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);

    res.json({
      success: true,
      data: deletedTodo,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// DELETE /api/todos - Delete all completed todos
apiRouter.delete('/todos', (req, res) => {
  try {
    const completedTodos = todos.filter((todo) => todo.completed);
    todos = todos.filter((todo) => !todo.completed);

    res.json({
      success: true,
      data: completedTodos,
      message: `${completedTodos.length} completed todos deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// GET /api/stats - Get todo statistics
apiRouter.get('/stats', (req, res) => {
  try {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    res.json({
      success: true,
      data: {
        total,
        completed,
        active,
        completionRate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Mount API routes
app.use('/api', apiRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);

  res.status(error.status || 500).json({
    success: false,
    error: 'Internal server error',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong'
        : error.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base URL: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
