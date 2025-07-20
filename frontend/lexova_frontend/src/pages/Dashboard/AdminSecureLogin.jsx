import React, { useState } from 'react';
import { AdminDashboardLayout } from '../../components/Dashboard/AdminDashboardLayout';
import { Eye, EyeOff, ClipboardCheck, ClipboardCopy } from 'lucide-react';

const AdminSecureLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const adminCredentials = [
    {
      id: 1,
      name: 'Ethan Miller',
      email: 'ethan.admin@lexova.com',
      password: 'Lex0va@Admin2025!',
      role: 'Super Admin',
      lastLogin: '2 hours ago',
    },
    {
      id: 2,
      name: 'Aron Johnson',
      email: 'aron.admin@lexova.com',
      password: 'Lex0va@Admin2025#',
      role: 'System Admin',
      lastLogin: 'Yesterday',
    },
    {
      id: 3,
      name: 'Aiden Smith',
      email: 'aiden.admin@lexova.com',
      password: 'Lex0va@Admin2025$',
      role: 'Content Admin',
      lastLogin: '3 days ago',
    },
  ];

  const handleCopy = (password, id) => {
    navigator.clipboard.writeText(password);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Secure Login Info</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-md text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Password</th>
                <th className="p-3">Role</th>
                <th className="p-3">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {adminCredentials.map((admin) => (
                <tr key={admin.id} className="border-t">
                  <td className="p-3">{admin.name}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3 flex items-center gap-2">
                    <span>{showPassword ? admin.password : '•••••••••••'}</span>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-black"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleCopy(admin.password, admin.id)}
                      className="text-gray-500 hover:text-black"
                    >
                      {copiedId === admin.id ? (
                        <ClipboardCheck size={16} className="text-green-500" />
                      ) : (
                        <ClipboardCopy size={16} />
                      )}
                    </button>
                  </td>
                  <td className="p-3">{admin.role}</td>
                  <td className="p-3">{admin.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Passwords are only visible for testing purposes. Do not share outside the secure environment.
        </p>
      <

  
const handleCopyCredentials = () => {
  const credText = adminCredentials
    .map(
      (cred) =>
        `Name: ${cred.name}\nEmail: ${cred.email}\nPassword: ${cred.password}\nRole: ${cred.role}\n\n`
    )
    .join('');

  navigator.clipboard.writeText(credText);
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 3000);
};

const handleCopy = (password) => {
  navigator.clipboard.writeText(password);
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 3000);
};

const generateNewPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};


  
  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Secure Admin Login Details</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handleCopyCredentials}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy All Credentials'}
            </button>
            <button 
              onClick={generateNewPassword}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Generate New Passwords
            </button>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Security Warning:</strong> This document contains sensitive login information. 
                Do not share this page or the credentials with unauthorized individuals.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-700">Admin Credentials</h2>
            <div className="flex items-center">
              <label className="flex items-center text-sm text-gray-600 mr-4">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Passwords
              </label>
              <span className="text-xs text-gray-500">Last Updated: July 19, 2025</span>
            </div>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Password
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adminCredentials.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {showPassword ? (
                        admin.password
                      ) : (
                        '••••••••••••••'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.role === 'Super Admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : admin.role === 'System Admin'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Guidelines</h2>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Change Default Passwords</p>
                  <p className="text-gray-600 text-sm">All administrators should change their default passwords immediately after their first login.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Enable Two-Factor Authentication</p>
                  <p className="text-gray-600 text-sm">All admin accounts must have 2FA enabled for additional security. Set this up in your account settings.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Regular Password Rotation</p>
                  <p className="text-gray-600 text-sm">Admin passwords should be changed every 90 days. The system will send reminders when rotation is due.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Secure Environment</p>
                  <p className="text-gray-600 text-sm">Only access the admin dashboard from secure, trusted devices and networks. Avoid public Wi-Fi.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Report Suspicious Activity</p>
                  <p className="text-gray-600 text-sm">If you notice any unusual activity or suspect a security breach, report it immediately to security@lexova.com.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminSecureLogin;

