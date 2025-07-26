import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const TodoForm = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Please enter a todo title');
      return;
    }

    if (trimmedTitle.length > 500) {
      setError('Todo title must be less than 500 characters');
      return;
    }

    setError('');
    onSubmit(trimmedTitle);
    setTitle('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    // Clear error when user starts typing
    if (error && value.trim()) {
      setError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
      data-automation-id="todo-form"
    >
      <form
        onSubmit={handleSubmit}
        className="p-6"
        data-automation-id="todo-form-element"
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className={`input ${error ? 'input-error' : ''}`}
              disabled={isLoading}
              maxLength={500}
              aria-label="Todo title"
              data-automation-id="todo-input"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-automation-id="add-todo-button"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <FiPlus className="w-5 h-5" />
            )}
            <span className="ml-2 hidden sm:inline">Add Todo</span>
          </motion.button>
        </div>

        {title.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-xs text-gray-500"
          >
            {title.length}/500 characters
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TodoForm;
