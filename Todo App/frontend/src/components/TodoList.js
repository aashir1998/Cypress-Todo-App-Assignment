import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onUpdate, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="loading-spinner"></div>
          <span className="text-gray-600">Updating...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden" data-automation-id="todo-list">
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
