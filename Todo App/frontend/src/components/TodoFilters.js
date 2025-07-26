import React from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiTrash2 } from 'react-icons/fi';

const TodoFilters = ({
  filter,
  onFilterChange,
  hasCompletedTodos,
  onClearCompleted,
  isLoading
}) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="card p-4" data-automation-id="todo-filters">
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
        data-automation-id="filters-container"
      >
        {/* Filters */}
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-400 w-4 h-4" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {filters.map((filterOption) => (
              <motion.button
                key={filterOption.id}
                onClick={() => onFilterChange(filterOption.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  filter === filterOption.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-automation-id={`filter-${filterOption.id}`}
              >
                {filterOption.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Clear Completed */}
        {hasCompletedTodos && (
          <motion.button
            onClick={onClearCompleted}
            disabled={isLoading}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-automation-id="clear-completed-button"
          >
            <FiTrash2 className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isLoading ? 'Clearing...' : 'Clear Completed'}
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default TodoFilters;
