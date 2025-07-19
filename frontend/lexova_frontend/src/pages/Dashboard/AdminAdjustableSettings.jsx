import React, { useState } from 'react';
import { AdminDashboardLayout } from '../../components/Dashboard/AdminDashboardLayout';

const AdminAdjustableSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Lexova',
    supportEmail: 'support@lexova.com',
    maintenanceMode: false,
    registrationEnabled: true,
    defaultLanguage: 'english',
    defaultTimezone: 'UTC-5',
    maxFileUploadSize: 10,
    sessionTimeout: 30
  });
  
  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecial: true,
    passwordExpiryDays: 90,
    twoFactorRequired: true,
    loginAttempts: 5,
    ipBlocking: true,
    blockDuration: 30
  });
  
  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    platformFeePercentage: 15,
    minimumWithdrawal: 50,
    payoutSchedule: 'biweekly',
    defaultCurrency: 'USD',
    allowedPaymentMethods: ['credit_card', 'paypal', 'bank_transfer'],
    automaticRefundsEnabled: true,
    refundPeriodDays: 14,
    taxRate: 7.5
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    adminAlerts: true,
    dailyDigest: true,
    weeklyReport: true,
    marketingEmails: true,
    notifyNewUsers: true,
    notifyNewCases: true,
    notifyDisputes: true
  });
  
  // Handle input changes for different setting types
  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
    setUnsavedChanges(true);
  };
  
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    });
    setUnsavedChanges(true);
  };
  
  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    });
    setUnsavedChanges(true);
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
    setUnsavedChanges(true);
  };
  
  const handlePaymentMethodToggle = (method) => {
    const currentMethods = [...paymentSettings.allowedPaymentMethods];
    if (currentMethods.includes(method)) {
      setPaymentSettings({
        ...paymentSettings,
        allowedPaymentMethods: currentMethods.filter(m => m !== method)
      });
    } else {
      setPaymentSettings({
        ...paymentSettings,
        allowedPaymentMethods: [...currentMethods, method]
      });
    }
    setUnsavedChanges(true);
  };
  
  const handleSaveSettings = () => {
    // This would typically connect to an API to save the settings
    alert('Settings saved successfully!');
    setUnsavedChanges(false);
  };
  
  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Adjustable System Settings</h1>
          <button 
            onClick={handleSaveSettings}
            disabled={!unsavedChanges}
            className={`px-4 py-2 rounded-md transition-colors ${
              unsavedChanges 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Changes
          </button>
        </div>
        
        {unsavedChanges && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You have unsaved changes. Click the "Save Changes" button to apply your modifications.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment
            </button>
            <button
              onClick={() => setActiveTab('notification')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notification'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>
        
        {/* Content based on active tab */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">General Platform Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    name="platformName"
                    value={generalSettings.platformName}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    name="supportEmail"
                    value={generalSettings.supportEmail}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Language
                  </label>
                  <select
                    name="defaultLanguage"
                    value={generalSettings.defaultLanguage}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Timezone
                  </label>
                  <select
                    name="defaultTimezone"
                    value={generalSettings.defaultTimezone}
                    onChange={handleGeneralChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max File Upload Size (MB)
                  </label>
                  <input
                    type="number"
                    name="maxFileUploadSize"
                    value={generalSettings.maxFileUploadSize}
                    onChange={handleGeneralChange}
                    min="1"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={generalSettings.sessionTimeout}
                    onChange={handleGeneralChange}
                    min="5"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onChange={handleGeneralChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">
                    Enable Maintenance Mode
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="registrationEnabled"
                    name="registrationEnabled"
                    checked={generalSettings.registrationEnabled}
                    onChange={handleGeneralChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="registrationEnabled" className="ml-2 block text-sm text-gray-900">
                    Enable User Registration
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    name="passwordMinLength"
                    value={securitySettings.passwordMinLength}
                    onChange={handleSecurityChange}
                    min="6"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    name="passwordExpiryDays"
                    value={securitySettings.passwordExpiryDays}
                    onChange={handleSecurityChange}
                    min="30"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    name="loginAttempts"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecurityChange}
                    min="3"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IP Block Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="blockDuration"
                    value={securitySettings.blockDuration}
                    onChange={handleSecurityChange}
                    min="15"
                    max="1440"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="passwordRequireUppercase"
                    name="passwordRequireUppercase"
                    checked={securitySettings.passwordRequireUppercase}
                    onChange={handleSecurityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="passwordRequireUppercase" className="ml-2 block text-sm text-gray-900">
                    Require Uppercase Letters in Passwords
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="passwordRequireNumbers"
                    name="passwordRequireNumbers"
                    checked={securitySettings.passwordRequireNumbers}
                    onChange={handleSecurityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="passwordRequireNumbers" className="ml-2 block text-sm text-gray-900">
                    Require Numbers in Passwords
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="passwordRequireSpecial"
                    name="passwordRequireSpecial"
                    checked={securitySettings.passwordRequireSpecial}
                    onChange={handleSecurityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="passwordRequireSpecial" className="ml-2 block text-sm text-gray-900">
                    Require Special Characters in Passwords
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="twoFactorRequired"
                    name="twoFactorRequired"
                    checked={securitySettings.twoFactorRequired}
                    onChange={handleSecurityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="twoFactorRequired" className="ml-2 block text-sm text-gray-900">
                    Require Two-Factor Authentication for Admins
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ipBlocking"
                    name="ipBlocking"
                    checked={securitySettings.ipBlocking}
                    onChange={handleSecurityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="ipBlocking" className="ml-2 block text-sm text-gray-900">
                    Enable IP Blocking After Failed Login Attempts
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform Fee Percentage
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="number"
                      name="platformFeePercentage"
                      value={paymentSettings.platformFeePercentage}
                      onChange={handlePaymentChange}
                      min="0"
                      max="50"
                      step="0.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Withdrawal Amount
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="minimumWithdrawal"
                      value={paymentSettings.minimumWithdrawal}
                      onChange={handlePaymentChange}
                      min="0"
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payout Schedule
                  </label>
                  <select
                    name="payoutSchedule"
                    value={paymentSettings.payoutSchedule}
                    onChange={handlePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Currency
                  </label>
                  <select
                    name="defaultCurrency"
                    value={paymentSettings.defaultCurrency}
                    onChange={handlePaymentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refund Period (days)
                  </label>
                  <input
                    type="number"
                    name="refundPeriodDays"
                    value={paymentSettings.refundPeriodDays}
                    onChange={handlePaymentChange}
                    min="1"
                    max="90"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="number"
                      name="taxRate"
                      value={paymentSettings.taxRate}
                      onChange={handlePaymentChange}
                      min="0"
                      max="30"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowed Payment Methods
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="method_credit_card"
                      checked={paymentSettings.allowedPaymentMethods.includes('credit_card')}
                      onChange={() => handlePaymentMethodToggle('credit_card')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="method_credit_card" className="ml-2 block text-sm text-gray-900">
                      Credit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="method_paypal"
                      checked={paymentSettings.allowedPaymentMethods.includes('paypal')}
                      onChange={() => handlePaymentMethodToggle('paypal')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="method_paypal" className="ml-2 block text-sm text-gray-900">
                      PayPal
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="method_bank_transfer"
                      checked={paymentSettings.allowedPaymentMethods.includes('bank_transfer')}
                      onChange={() => handlePaymentMethodToggle('bank_transfer')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="method_bank_transfer" className="ml-2 block text-sm text-gray-900">
                      Bank Transfer
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="method_crypto"
                      checked={paymentSettings.allowedPaymentMethods.includes('crypto')}
                      onChange={() => handlePaymentMethodToggle('crypto')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="method_crypto" className="ml-2 block text-sm text-gray-900">
                      Cryptocurrency
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="automaticRefundsEnabled"
                    name="automaticRefundsEnabled"
                    checked={paymentSettings.automaticRefundsEnabled}
                    onChange={handlePaymentChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="automaticRefundsEnabled" className="ml-2 block text-sm text-gray-900">
                    Enable Automatic Refunds for Eligible Disputes
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notification' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h2>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Communication Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                      Email Notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pushNotifications"
                      name="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-900">
                      Push Notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-900">
                      SMS Notifications
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Admin Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="adminAlerts"
                      name="adminAlerts"
                      checked={notificationSettings.adminAlerts}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="adminAlerts" className="ml-2 block text-sm text-gray-900">
                      Critical System Alerts
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="dailyDigest"
                      name="dailyDigest"
                      checked={notificationSettings.dailyDigest}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="dailyDigest" className="ml-2 block text-sm text-gray-900">
                      Daily Activity Digest
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="weeklyReport"
                      name="weeklyReport"
                      checked={notificationSettings.weeklyReport}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="weeklyReport" className="ml-2 block text-sm text-gray-900">
                      Weekly Performance Report
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Event Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifyNewUsers"
                      name="notifyNewUsers"
                      checked={notificationSettings.notifyNewUsers}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="notifyNewUsers" className="ml-2 block text-sm text-gray-900">
                      New User Registrations
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifyNewCases"
                      name="notifyNewCases"
                      checked={notificationSettings.notifyNewCases}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="notifyNewCases" className="ml-2 block text-sm text-gray-900">
                      New Case Submissions
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifyDisputes"
                      name="notifyDisputes"
                      checked={notificationSettings.notifyDisputes}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="notifyDisputes" className="ml-2 block text-sm text-gray-900">
                      New Dispute Filings
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketingEmails"
                      name="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-900">
                      Marketing and Promotional Emails
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAdjustableSettings;

