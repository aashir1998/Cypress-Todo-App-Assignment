import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import TodoStats from "./TodoStats";
import SearchBar from "./SearchBar";
import { todoApi } from "../services/todoApi";

const TodoApp = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  // Fetch todos
  const {
    data: todos = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["todos", filter, searchTerm], () =>
    todoApi.getTodos({
      completed: filter !== "all" ? filter === "completed" : undefined,
      search: searchTerm,
    }),
  );

  // Fetch stats
  const { data: stats } = useQuery("stats", todoApi.getStats);

  // Mutations
  const createTodoMutation = useMutation(todoApi.createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("stats");
      toast.success("Todo created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create todo");
    },
  });

  const updateTodoMutation = useMutation(
    ({ id, updates }) => todoApi.updateTodo(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        queryClient.invalidateQueries("stats");
        toast.success("Todo updated successfully!");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to update todo");
      },
    },
  );

  const patchTodoMutation = useMutation(
    ({ id, updates }) => todoApi.patchTodo(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        queryClient.invalidateQueries("stats");
        toast.success("Todo updated successfully!");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to update todo");
      },
    },
  );

  const deleteTodoMutation = useMutation(todoApi.deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("stats");
      toast.success("Todo deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete todo");
    },
  });

  const toggleAllMutation = useMutation(todoApi.toggleAllTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("stats");
      toast.success("All todos updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update todos");
    },
  });

  const clearCompletedMutation = useMutation(todoApi.clearCompleted, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("stats");
      toast.success("Completed todos cleared!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to clear completed todos",
      );
    },
  });

  // Handlers
  const handleCreateTodo = (title) => {
    createTodoMutation.mutate({ title });
  };

  const handleToggleTodo = (id, completed) => {
    // Use PATCH for partial updates like toggling completion
    patchTodoMutation.mutate({ id, updates: { completed: !completed } });
  };

  const handleUpdateTodo = (id, title) => {
    updateTodoMutation.mutate({ id, updates: { title } });
  };

  const handleDeleteTodo = (id) => {
    deleteTodoMutation.mutate(id);
  };

  const handleToggleAll = (completed) => {
    toggleAllMutation.mutate(completed);
  };

  const handleClearCompleted = () => {
    clearCompletedMutation.mutate();
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Error handling
  if (error) {
    return (
      <div className="todo-app">
        <div className="card p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Error loading todos
          </h2>
          <p className="text-gray-600 mb-4">
            {error.response?.data?.message || error.message}
          </p>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const hasTodos = todos.length > 0;
  const hasCompletedTodos = completedTodos.length > 0;

  return (
    <div className="todo-app max-w-4xl mx-auto" data-automation-id="todo-app">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-automation-id="todo-app-container"
      >
        {/* Header */}
        <div className="text-center mb-8" data-automation-id="todo-app-header">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Aashir's Todo App
          </h1>
          <p className="text-gray-600">
            Organize your tasks with our modern todo application
          </p>
        </div>

        {/* Stats */}
        {stats && <TodoStats stats={stats} />}

        {/* Todo Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
          data-automation-id="todo-form-container"
        >
          <TodoForm
            onSubmit={handleCreateTodo}
            isLoading={createTodoMutation.isLoading}
          />
        </motion.div>

        {/* Search Bar */}
        <div data-automation-id="search-bar-container">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
          />
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
          data-automation-id="todo-filters-container"
        >
          <TodoFilters
            filter={filter}
            onFilterChange={handleFilterChange}
            hasCompletedTodos={hasCompletedTodos}
            onClearCompleted={handleClearCompleted}
            isLoading={clearCompletedMutation.isLoading}
          />
        </motion.div>

        {/* Todo List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="loading-spinner"></div>
                <span className="text-gray-600">Loading todos...</span>
              </div>
            </motion.div>
          ) : hasTodos ? (
            <motion.div
              key="todos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TodoList
                todos={todos}
                onToggle={handleToggleTodo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                isLoading={
                  updateTodoMutation.isLoading || deleteTodoMutation.isLoading
                }
              />

              {/* Bulk Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="card p-4 mt-4"
                data-automation-id="bulk-actions"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {activeTodos.length} active, {completedTodos.length}{" "}
                      completed
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleAll(true)}
                      disabled={toggleAllMutation.isLoading}
                      className="btn-secondary text-sm"
                      data-automation-id="complete-all-button"
                    >
                      {toggleAllMutation.isLoading
                        ? "Updating..."
                        : "Complete All"}
                    </button>
                    <button
                      onClick={() => handleToggleAll(false)}
                      disabled={toggleAllMutation.isLoading}
                      className="btn-secondary text-sm"
                      data-automation-id="uncomplete-all-button"
                    >
                      {toggleAllMutation.isLoading
                        ? "Updating..."
                        : "Uncomplete All"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card p-12 text-center"
            >
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No todos yet
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? `No todos found matching "${searchTerm}"`
                  : "Get started by creating your first todo"}
              </p>
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="btn-primary text-sm"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TodoApp;
