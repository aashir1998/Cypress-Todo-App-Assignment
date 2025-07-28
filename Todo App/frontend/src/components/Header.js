import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    onLogout();
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-gray-200"
      data-automation-id="header"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">T</span>
            </motion.div>
            <div data-automation-id="app-title">
              <h1 className="text-xl font-bold text-gray-900">
                Aashir's Todo App
              </h1>
              <p className="text-sm text-gray-600">React + Node.js</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2"
                  data-automation-id="user-info"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </motion.div>

                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                  title="Logout"
                  data-automation-id="logout-button"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                data-automation-id="signin-button"
              >
                <FiUser className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </motion.button>
            )}

            <motion.a
              href="https://github.com/aashir1998"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-automation-id="github-link"
            >
              <FiGithub className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">GitHub</span>
            </motion.a>

            <motion.a
              href="/api/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-automation-id="api-docs-link"
            >
              <FiExternalLink className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">API Docs</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
