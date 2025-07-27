import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
import { format } from "date-fns";

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSave = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle && trimmedTitle !== todo.title) {
      onUpdate(todo.id, trimmedTitle);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <motion.div
      className={`todo-item border-b border-gray-100 last:border-b-0 ${
        todo.completed ? "bg-gray-50" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ backgroundColor: todo.completed ? "#f9fafb" : "#f8fafc" }}
      layout
      data-automation-id={`todo-item-${todo.id}`}
    >
      <div className="flex items-center space-x-3 p-4">
        {/* Checkbox */}
        <motion.button
          onClick={() => onToggle(todo.id, todo.completed)}
          className="flex-shrink-0"
          whileTap={{ scale: 0.9 }}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
          data-automation-id={`todo-toggle-${todo.id}`}
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
              todo.completed
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {todo.completed && <FiCheck className="w-3 h-3 text-white" />}
          </div>
        </motion.button>

        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={500}
              data-automation-id={`todo-edit-input-${todo.id}`}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-sm font-medium leading-5 ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {format(new Date(todo.createdAt), "MMM dd, yyyy • HH:mm")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <AnimatePresence>
          {isHovered && !isEditing && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center space-x-1"
            >
              <motion.button
                onClick={handleEdit}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit todo"
                data-automation-id={`todo-edit-button-${todo.id}`}
              >
                <FiEdit2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleDelete}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete todo"
                data-automation-id={`todo-delete-button-${todo.id}`}
              >
                <FiTrash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Badge */}
        <div className="flex-shrink-0">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              todo.completed
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {todo.completed ? "Completed" : "Active"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;
