import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white border-t border-gray-200 mt-auto"
      data-automation-id="footer"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © 2024 Aashir's Todo App. Built with React and Node.js
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
