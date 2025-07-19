import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  FileText,
  Calendar,
  CreditCard,
  Star,
  MessageCircle,
  Settings,
  LogOut,
  Scale,
  Briefcase
} from 'lucide-react';

const LawyerSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/lawyer-dashboard',
      description: 'Overview and quick actions'
    },
    {
      icon: Briefcase,
      label: 'My Cases',
      path: '/lawyer-dashboard/cases',
      description: 'Manage assigned legal cases'
    },
    {
      icon: Calendar,
      label: 'Availability',
      path: '/lawyer-dashboard/availability',
      description: 'Manage your schedule'
    },
    {
      icon: CreditCard,
      label: 'Payments',
      path: '/lawyer-dashboard/payments',
      description: 'View earnings and invoices'
    },
    {
      icon: Star,
      label: 'Reviews',
      path: '/lawyer-dashboard/reviews',
      description: 'Client feedback and ratings'
    },
    {
      icon: MessageCircle,
      label: 'Messages',
      path: '/lawyer-dashboard/messages',
      description: 'Communicate with clients'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/lawyer-dashboard/profile',
      description: 'Manage your professional profile'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/lawyer-dashboard/settings',
      description: 'Account preferences'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Lexova</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-colors group
                ${isActive(item.path) 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }
              `}
            >
              <item.icon className={`
                h-5 w-5 mr-3 
                ${isActive(item.path) ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}
              `} />
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <LogOut className="h-5 w-5 mr-3 text-gray-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LawyerSidebar;

