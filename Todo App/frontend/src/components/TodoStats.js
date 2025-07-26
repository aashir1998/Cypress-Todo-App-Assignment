import React from 'react';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiBarChart
} from 'react-icons/fi';

const TodoStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total',
      value: stats.total,
      icon: FiBarChart,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: FiCheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      label: 'Active',
      value: stats.active,
      icon: FiClock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: FiTrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      data-automation-id="todo-stats"
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="card p-4 text-center"
          data-automation-id={`stat-${item.label.toLowerCase().replace(' ', '-')}`}
        >
          <div className="flex items-center justify-center mb-2">
            <div className={`p-2 rounded-full ${item.color} text-white`}>
              <item.icon className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold ${item.textColor}`}>
            {item.value}
          </div>
          <div className="text-sm text-gray-600">{item.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TodoStats;
