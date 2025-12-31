'use client';

import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  ReceiptRefundIcon,
  ChevronLeftIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

import JobPostForm from '../JobPostingComponent/JobPostForm';
import BlogPostForm from '../BlogPostComponent/BlogPostForm';
import Application from '../ApplicationComponent/Application';
import FeeReceptComponent from '../feeReceptComponent/FeeReceptComponent';
import ReceiptList from '../feeReceptComponent/FeeReceptTableComponent';

import { cardcontext } from '@/context/scrollcardcontext';
import { removeToken } from '@/utils/cookies';

const Sidebar = () => {
  const { showTable, setShowTable } = useContext(cardcontext);

  // Sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Active menu item state (lowercase)
  const [activeItem, setActiveItem] = useState('dashboard');

  // Role state, initially null to detect loading
  const [role, setRole] = useState(null);

  // Load role from cookies
  useEffect(() => {
    const storedRole = Cookies.get('role');
    setRole(storedRole || ''); // fallback empty string if cookie missing
  }, []);

  // All possible menu items
  const allMenuItems = [
    { id: 1, name: 'Job Posts', icon: HomeIcon },
    { id: 2, name: 'Blog Posts', icon: UserIcon },
    { id: 3, name: 'Applications', icon: ChartBarIcon },
    { id: 4, name: 'Receipts', icon: ReceiptRefundIcon },
  ];

  // Filter menu items based on role
  const filteredMenuItems = allMenuItems.filter((item) => {
    if (!role) return true; // Show all while role is loading
    if (role === 'admin') return true;
    if (role === 'hr') return item.name !== 'Blog Posts';
    if (role === 'seo') return item.name === 'Blog Posts';
    return false;
  });

  // Render main content based on activeItem
  const renderComponent = () => {
    switch (activeItem) {
      case 'job posts':
        return <JobPostForm />;
      case 'blog posts':
        return <BlogPostForm />;
      case 'applications':
        return <Application />;
      case 'receipts':
        return showTable ? <ReceiptList /> : <FeeReceptComponent />;
      default:
        return <div className="text-gray-500 text-sm">Select a section</div>;
    }
  };

  // Logout function
  const handleLogout = async () => {
    await removeToken();
    Cookies.remove('role');
    window.location.reload();
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-orange-100 via-white to-orange-200">
      
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 h-screen z-20 bg-white/30 backdrop-blur-lg border-r border-white/40 shadow-xl overflow-hidden"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-2xl font-extrabold text-orange-600"
              >
                Dashboard
              </motion.h2>
            )}
          </AnimatePresence>

          {/* Collapse/Expand button */}
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-orange-600 p-1 hover:bg-orange-100 rounded"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isSidebarOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center"
            >
              <ChevronLeftIcon className="h-6 w-6 hover:cursor-pointer" />
            </motion.div>
          </motion.button>
        </div>

        {/* Sidebar menu items */}
        <nav className="flex flex-col mt-2 space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name.toLowerCase();

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.name.toLowerCase());
                  if (item.name.toLowerCase() === 'receipts') {
                    setShowTable(false); // reset receipts table toggle
                  }
                }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 hover:cursor-pointer
                  ${isActive
                    ? 'bg-orange-100 text-orange-600 border-l-4 border-orange-500'
                    : 'text-gray-700 hover:bg-orange-50'
                  }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 hover:cursor-pointer
            text-gray-700 hover:bg-orange-50 mt-auto`}
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </motion.aside>

      {/* Main content */}
      <main
        className={`flex-1 ml-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
          } overflow-y-auto h-screen p-6`}
      >
        {/* Mobile toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-orange-200 text-orange-700 rounded-lg shadow"
          >
            ☰
          </button>
        </div>

        {/* Render selected component */}
        {renderComponent()}
      </main>
    </div>
  );
};

export default Sidebar;
