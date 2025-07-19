import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Briefcase,
  DollarSign,
  AlertTriangle,
  BarChart3,
  FileText,
  MessageSquare,
  Shield,
  Bell,
  Settings,
  LogOut,
  Scale,
  UserCheck,
  CreditCard,
  Activity,
  Lock,
  BarChart,
  Sliders
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/admin-dashboard',
      description: 'Overview and analytics'
    },
    {
      icon: Users,
      label: 'User Management',
      path: '/admin-dashboard/users',
      description: 'Manage clients and lawyers'
    },
    {
      icon: Briefcase,
      label: 'Case Monitoring',
      path: '/admin-dashboard/cases',
      description: 'Monitor all legal cases'
    },
    {
      icon: CreditCard,
      label: 'Payment Management',
      path: '/admin-dashboard/payments',
      description: 'Track payments and billing'
    },
    {
      icon: AlertTriangle,
      label: 'Dispute Resolution',
      path: '/admin-dashboard/disputes',
      description: 'Handle disputes and issues'
    },
    {
      icon: BarChart3,
      label: 'Reports',
      path: '/admin-dashboard/reports',
      description: 'Analytics and insights'
    },
    {
      icon: FileText,
      label: 'CMS',
      path: '/admin-dashboard/cms',
      description: 'Content management'
    },
    {
      icon: MessageSquare,
      label: 'Feedback',
      path: '/admin-dashboard/feedback',
      description: 'User feedback and reviews'
    },
    {
      icon: UserCheck,
      label: 'Verification',
      path: '/admin-dashboard/verification',
      description: 'Verify lawyers and documents'
    },
    {
      icon: Bell,
      label: 'Notifications',
      path: '/admin-dashboard/notifications',
      description: 'System notifications'
    },
    {
      icon: Settings,
      label: 'System Settings',
      path: '/admin-dashboard/settings',
      description: 'Platform configuration'
    },
    {
      icon: Activity,
      label: 'Audit Logs',
      path: '/admin-dashboard/audit',
      description: 'System activity logs'
    },
    {
      icon: Lock,
      label: 'Secure Login',
      path: '/admin/secure-login',
      description: 'Admin credentials'
    },
    {
      icon: BarChart,
      label: 'Visual Tools',
      path: '/admin/visual-tools',
      description: 'Data visualization'
    },
    {
      icon: Sliders,
      label: 'Adjustable Settings',
      path: '/admin/adjustable-settings',
      description: 'Fine-tune platform settings'
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
            <span className="text-xl font-bold text-gray-900">Lexova Admin</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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

export default AdminSidebar;

