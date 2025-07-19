import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  Settings, 
  Save,
  RefreshCw,
  Shield,
  DollarSign,
  Mail,
  Bell,
  Users,
  Briefcase,
  FileText,
  Globe,
  Server,
  Database,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  Percent,
  Sliders,
  BarChart
} from 'lucide-react';

const AdminSettings = () => {
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Lexova',
    supportEmail: 'support@lexova.com',
    contactPhone: '(555) 123-4567',
    maintenanceMode: false,
    allowRegistration: true,
    defaultLanguage: 'en',
    timezone: 'America/New_York'
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    requireTwoFactor: false,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    ipBlocking: true
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    platformFeePercentage: 10,
    minimumWithdrawalAmount: 50,
    paymentProcessingDays: 3,
    allowInstantWithdrawal: false,
    instantWithdrawalFee: 2.5,
    defaultCurrency: 'USD',
    acceptedPaymentMethods: ['credit_card', 'paypal', 'bank_transfer']
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    adminAlerts: true,
    dailyDigest: true,
    weeklyReport: true
  });

  // Legal Settings
  const [legalSettings, setLegalSettings] = useState({
    termsLastUpdated: '2024-10-15',
    privacyLastUpdated: '2024-10-15',
    cookiePolicyLastUpdated: '2024-09-30',
    requireTermsAcceptance: true,
    dataRetentionPeriod: 730, // days
    gdprCompliance: true,
    ccpaCompliance: true
  });

  // AI Settings
  const [aiSettings, setAiSettings] = useState({
    enableAIMatching: true,
    aiMatchingConfidenceThreshold: 75,
    enableAICaseAssistant: true,
    aiResponseTime: 'standard',
    aiModelVersion: 'v2.1',
    aiLogRetention: 30, // days
    aiPrivacyMode: 'enhanced'
  });

  // Handle form submissions
  const handleGeneralSettingsSave = () => {
    // In a real application, this would save to the backend
    console.log('Saving general settings:', generalSettings);
    // Show success message
  };

  const handleSecuritySettingsSave = () => {
    // In a real application, this would save to the backend
    console.log('Saving security settings:', securitySettings);
    // Show success message
  };

  const handlePaymentSettingsSave = () => {
    // In a real application, this would save to the backend
    console.log('Saving payment settings:', paymentSettings);
    // Show success message
  };

  const handleNotificationSettingsSave = () => {
    // In a real application, this would save to the backend
    console.log('Saving notification settings:', notificationSettings);
    // Show success message
  };

  const handleLegalSettingsSave = () => {
    // In a real application, this would save to the backend
    console.log('Saving legal settings:', legalSettings);
    // Show success message
  };

  const handleAISettingsSave = () => {
    // In a real application, this would save to the backend
    console.log('Saving AI settings:', aiSettings);
    // Show success message
  };

  return (
    <AdminDashboardLayout 
      title="System Settings" 
      subtitle="Configure platform settings and preferences"
    >
      <div className="space-y-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden md:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="notification" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notification</span>
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Legal</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span className="hidden md:inline">AI</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure basic platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Platform Name</label>
                    <Input 
                      value={generalSettings.platformName} 
                      onChange={(e) => setGeneralSettings({...generalSettings, platformName: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">The name displayed throughout the platform</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Support Email</label>
                    <Input 
                      value={generalSettings.supportEmail} 
                      onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">Primary contact email for support inquiries</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Contact Phone</label>
                    <Input 
                      value={generalSettings.contactPhone} 
                      onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">Support phone number (optional)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Default Language</label>
                    <Select 
                      value={generalSettings.defaultLanguage}
                      onValueChange={(value) => setGeneralSettings({...generalSettings, defaultLanguage: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Default language for new users</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Timezone</label>
                    <Select 
                      value={generalSettings.timezone}
                      onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Default timezone for platform operations</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Maintenance Mode</h4>
                      <p className="text-xs text-gray-500">Temporarily disable access to the platform</p>
                    </div>
                    <Switch 
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Allow Registration</h4>
                      <p className="text-xs text-gray-500">Enable new user registration</p>
                    </div>
                    <Switch 
                      checked={generalSettings.allowRegistration}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, allowRegistration: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleGeneralSettingsSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure platform security and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Require Two-Factor Authentication</h4>
                      <p className="text-xs text-gray-500">Force all users to set up 2FA for their accounts</p>
                    </div>
                    <Switch 
                      checked={securitySettings.requireTwoFactor}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireTwoFactor: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password Minimum Length</label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        value={[securitySettings.passwordMinLength]} 
                        min={6} 
                        max={16} 
                        step={1}
                        onValueChange={(value) => setSecuritySettings({...securitySettings, passwordMinLength: value[0]})}
                        className="flex-1"
                      />
                      <span className="w-8 text-center">{securitySettings.passwordMinLength}</span>
                    </div>
                    <p className="text-xs text-gray-500">Minimum number of characters required for passwords</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Require Special Characters</h4>
                        <p className="text-xs text-gray-500">Passwords must include special characters</p>
                      </div>
                      <Switch 
                        checked={securitySettings.passwordRequireSpecial}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireSpecial: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Require Numbers</h4>
                        <p className="text-xs text-gray-500">Passwords must include numbers</p>
                      </div>
                      <Switch 
                        checked={securitySettings.passwordRequireNumbers}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireNumbers: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Require Uppercase</h4>
                        <p className="text-xs text-gray-500">Passwords must include uppercase letters</p>
                      </div>
                      <Switch 
                        checked={securitySettings.passwordRequireUppercase}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordRequireUppercase: checked})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                    <Input 
                      type="number" 
                      value={securitySettings.sessionTimeout} 
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value) || 0})}
                    />
                    <p className="text-xs text-gray-500">Time before inactive users are automatically logged out</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Maximum Login Attempts</label>
                    <Input 
                      type="number" 
                      value={securitySettings.maxLoginAttempts} 
                      onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value) || 0})}
                    />
                    <p className="text-xs text-gray-500">Number of failed attempts before account is temporarily locked</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">IP Blocking</h4>
                      <p className="text-xs text-gray-500">Block suspicious IP addresses after multiple failed attempts</p>
                    </div>
                    <Switch 
                      checked={securitySettings.ipBlocking}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipBlocking: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSecuritySettingsSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment Settings
                </CardTitle>
                <CardDescription>
                  Configure payment processing and fee structure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Platform Fee Percentage</label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        value={[paymentSettings.platformFeePercentage]} 
                        min={0} 
                        max={30} 
                        step={0.5}
                        onValueChange={(value) => setPaymentSettings({...paymentSettings, platformFeePercentage: value[0]})}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{paymentSettings.platformFeePercentage}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Percentage fee charged on each transaction</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Minimum Withdrawal Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="number" 
                        value={paymentSettings.minimumWithdrawalAmount} 
                        onChange={(e) => setPaymentSettings({...paymentSettings, minimumWithdrawalAmount: parseFloat(e.target.value) || 0})}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Minimum amount lawyers can withdraw from their balance</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Payment Processing Days</label>
                    <Input 
                      type="number" 
                      value={paymentSettings.paymentProcessingDays} 
                      onChange={(e) => setPaymentSettings({...paymentSettings, paymentProcessingDays: parseInt(e.target.value) || 0})}
                    />
                    <p className="text-xs text-gray-500">Number of days to process standard withdrawals</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Default Currency</label>
                    <Select 
                      value={paymentSettings.defaultCurrency}
                      onValueChange={(value) => setPaymentSettings({...paymentSettings, defaultCurrency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                        <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                        <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Primary currency for platform transactions</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Allow Instant Withdrawal</h4>
                      <p className="text-xs text-gray-500">Enable lawyers to withdraw funds instantly for a fee</p>
                    </div>
                    <Switch 
                      checked={paymentSettings.allowInstantWithdrawal}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, allowInstantWithdrawal: checked})}
                    />
                  </div>
                  
                  {paymentSettings.allowInstantWithdrawal && (
                    <div className="space-y-2 pl-6">
                      <label className="text-sm font-medium text-gray-700">Instant Withdrawal Fee (%)</label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          value={[paymentSettings.instantWithdrawalFee]} 
                          min={0} 
                          max={10} 
                          step={0.1}
                          onValueChange={(value) => setPaymentSettings({...paymentSettings, instantWithdrawalFee: value[0]})}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{paymentSettings.instantWithdrawalFee}%</span>
                      </div>
                      <p className="text-xs text-gray-500">Fee percentage for instant withdrawals</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 pt-4">
                  <label className="text-sm font-medium text-gray-700">Accepted Payment Methods</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="credit_card" 
                        checked={paymentSettings.acceptedPaymentMethods.includes('credit_card')}
                        onChange={(e) => {
                          const methods = e.target.checked 
                            ? [...paymentSettings.acceptedPaymentMethods, 'credit_card']
                            : paymentSettings.acceptedPaymentMethods.filter(m => m !== 'credit_card');
                          setPaymentSettings({...paymentSettings, acceptedPaymentMethods: methods});
                        }}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="credit_card" className="text-sm">Credit/Debit Card</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="paypal" 
                        checked={paymentSettings.acceptedPaymentMethods.includes('paypal')}
                        onChange={(e) => {
                          const methods = e.target.checked 
                            ? [...paymentSettings.acceptedPaymentMethods, 'paypal']
                            : paymentSettings.acceptedPaymentMethods.filter(m => m !== 'paypal');
                          setPaymentSettings({...paymentSettings, acceptedPaymentMethods: methods});
                        }}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="paypal" className="text-sm">PayPal</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="bank_transfer" 
                        checked={paymentSettings.acceptedPaymentMethods.includes('bank_transfer')}
                        onChange={(e) => {
                          const methods = e.target.checked 
                            ? [...paymentSettings.acceptedPaymentMethods, 'bank_transfer']
                            : paymentSettings.acceptedPaymentMethods.filter(m => m !== 'bank_transfer');
                          setPaymentSettings({...paymentSettings, acceptedPaymentMethods: methods});
                        }}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="bank_transfer" className="text-sm">Bank Transfer</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handlePaymentSettingsSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notification">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure platform notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Email Notifications</h4>
                      <p className="text-xs text-gray-500">Send platform notifications via email</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Push Notifications</h4>
                      <p className="text-xs text-gray-500">Send in-app push notifications</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">SMS Notifications</h4>
                      <p className="text-xs text-gray-500">Send important alerts via SMS (additional charges may apply)</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Admin Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Admin Alerts</h4>
                      <p className="text-xs text-gray-500">Receive notifications for important platform events</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.adminAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Daily Digest</h4>
                      <p className="text-xs text-gray-500">Receive daily summary of platform activity</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.dailyDigest}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, dailyDigest: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Weekly Report</h4>
                      <p className="text-xs text-gray-500">Receive weekly platform performance report</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.weeklyReport}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReport: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleNotificationSettingsSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Legal Settings */}
          <TabsContent value="legal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Legal Settings
                </CardTitle>
                <CardDescription>
                  Configure legal compliance and policy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Terms of Service Last Updated</label>
                    <Input 
                      type="date" 
                      value={legalSettings.termsLastUpdated} 
                      onChange={(e) => setLegalSettings({...legalSettings, termsLastUpdated: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">Date when Terms of Service were last updated</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Privacy Policy Last Updated</label>
                    <Input 
                      type="date" 
                      value={legalSettings.privacyLastUpdated} 
                      onChange={(e) => setLegalSettings({...legalSettings, privacyLastUpdated: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">Date when Privacy Policy was last updated</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cookie Policy Last Updated</label>
                    <Input 
                      type="date" 
                      value={legalSettings.cookiePolicyLastUpdated} 
                      onChange={(e) => setLegalSettings({...legalSettings, cookiePolicyLastUpdated: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">Date when Cookie Policy was last updated</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Data Retention Period (days)</label>
                    <Input 
                      type="number" 
                      value={legalSettings.dataRetentionPeriod} 
                      onChange={(e) => setLegalSettings({...legalSettings, dataRetentionPeriod: parseInt(e.target.value) || 0})}
                    />
                    <p className="text-xs text-gray-500">Number of days to retain user data after account deletion</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Require Terms Acceptance</h4>
                      <p className="text-xs text-gray-500">Force users to accept terms before using the platform</p>
                    </div>
                    <Switch 
                      checked={legalSettings.requireTermsAcceptance}
                      onCheckedChange={(checked) => setLegalSettings({...legalSettings, requireTermsAcceptance: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">GDPR Compliance</h4>
                      <p className="text-xs text-gray-500">Enable features required for GDPR compliance</p>
                    </div>
                    <Switch 
                      checked={legalSettings.gdprCompliance}
                      onCheckedChange={(checked) => setLegalSettings({...legalSettings, gdprCompliance: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">CCPA Compliance</h4>
                      <p className="text-xs text-gray-500">Enable features required for CCPA compliance</p>
                    </div>
                    <Switch 
                      checked={legalSettings.ccpaCompliance}
                      onCheckedChange={(checked) => setLegalSettings({...legalSettings, ccpaCompliance: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleLegalSettingsSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  AI Settings
                </CardTitle>
                <CardDescription>
                  Configure AI-powered features and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Enable AI Lawyer Matching</h4>
                      <p className="text-xs text-gray-500">Use AI to match clients with appropriate lawyers</p>
                    </div>
                    <Switch 
                      checked={aiSettings.enableAIMatching}
                      onCheckedChange={(checked) => setAiSettings({...aiSettings, enableAIMatching: checked})}
                    />
                  </div>
                  
                  {aiSettings.enableAIMatching && (
                    <div className="space-y-2 pl-6">
                      <label className="text-sm font-medium text-gray-700">AI Matching Confidence Threshold (%)</label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          value={[aiSettings.aiMatchingConfidenceThreshold]} 
                          min={50} 
                          max={95} 
                          step={5}
                          onValueChange={(value) => setAiSettings({...aiSettings, aiMatchingConfidenceThreshold: value[0]})}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{aiSettings.aiMatchingConfidenceThreshold}%</span>
                      </div>
                      <p className="text-xs text-gray-500">Minimum confidence level required for AI lawyer matches</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Enable AI Case Assistant</h4>
                      <p className="text-xs text-gray-500">Use AI to provide case insights and assistance</p>
                    </div>
                    <Switch 
                      checked={aiSettings.enableAICaseAssistant}
                      onCheckedChange={(checked) => setAiSettings({...aiSettings, enableAICaseAssistant: checked})}
                    />
                  </div>
                  
                  {aiSettings.enableAICaseAssistant && (
                    <div className="space-y-2 pl-6">
                      <label className="text-sm font-medium text-gray-700">AI Response Time</label>
                      <Select 
                        value={aiSettings.aiResponseTime}
                        onValueChange={(value) => setAiSettings({...aiSettings, aiResponseTime: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fast">Fast (Lower Quality)</SelectItem>
                          <SelectItem value="standard">Standard (Balanced)</SelectItem>
                          <SelectItem value="thorough">Thorough (Higher Quality)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">Balance between response speed and quality</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">AI Model Version</label>
                    <Select 
                      value={aiSettings.aiModelVersion}
                      onValueChange={(value) => setAiSettings({...aiSettings, aiModelVersion: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v1.0">v1.0 (Legacy)</SelectItem>
                        <SelectItem value="v2.0">v2.0 (Stable)</SelectItem>
                        <SelectItem value="v2.1">v2.1 (Latest)</SelectItem>
                        <SelectItem value="v3.0-beta">v3.0 (Beta)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">AI model version used for platform features</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">AI Log Retention (days)</label>
                    <Input 
                      type="number" 
                      value={aiSettings.aiLogRetention} 
                      onChange={(e) => setAiSettings({...aiSettings, aiLogRetention: parseInt(e.target.value) || 0})}
                    />
                    <p className="text-xs text-gray-500">Number of days to retain AI interaction logs</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">AI Privacy Mode</label>
                    <Select 
                      value={aiSettings.aiPrivacyMode}
                      onValueChange={(value) => setAiSettings({...aiSettings, aiPrivacyMode: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="enhanced">Enhanced</SelectItem>
                        <SelectItem value="maximum">Maximum</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Level of privacy protection for AI data processing</p>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleAISettingsSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminSettings;

