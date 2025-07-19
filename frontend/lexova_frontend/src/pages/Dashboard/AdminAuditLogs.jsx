import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Clock,
  Calendar,
  User,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Settings,
  LogIn,
  LogOut,
  Edit,
  Trash,
  DollarSign,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Database,
  Server,
  RefreshCw
} from 'lucide-react';

const AdminAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sample data for audit logs
  const [auditLogs] = useState([
    {
      id: 'LOG-2024-001',
      timestamp: '2024-12-15T14:32:45',
      user: 'Ethan Miller',
      userId: 'ADMIN-001',
      userRole: 'admin',
      category: 'authentication',
      action: 'login',
      description: 'Admin user logged in successfully',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      details: {
        method: 'password',
        location: 'New York, USA',
        device: 'Desktop - Windows 10'
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-002',
      timestamp: '2024-12-15T15:10:22',
      user: 'Ethan Miller',
      userId: 'ADMIN-001',
      userRole: 'admin',
      category: 'user_management',
      action: 'update_user',
      description: 'Updated lawyer verification status',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      details: {
        targetUser: 'David Wilson',
        targetUserId: 'LW-2024-101',
        changes: {
          status: {
            from: 'pending',
            to: 'approved'
          }
        }
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-003',
      timestamp: '2024-12-15T16:45:12',
      user: 'Sarah Johnson',
      userId: 'CLIENT-001',
      userRole: 'client',
      category: 'case_management',
      action: 'create_case',
      description: 'New legal case created',
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      details: {
        caseId: 'CASE-2024-056',
        caseType: 'Divorce',
        priority: 'medium'
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-004',
      timestamp: '2024-12-15T17:22:33',
      user: 'David Wilson',
      userId: 'LW-2024-101',
      userRole: 'lawyer',
      category: 'case_management',
      action: 'update_case',
      description: 'Case status updated',
      ipAddress: '198.51.100.78',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      details: {
        caseId: 'CASE-2024-042',
        changes: {
          status: {
            from: 'in_progress',
            to: 'review'
          },
          notes: 'Added draft settlement agreement for review'
        }
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-005',
      timestamp: '2024-12-15T18:05:47',
      user: 'System',
      userId: 'SYSTEM',
      userRole: 'system',
      category: 'payment',
      action: 'process_payment',
      description: 'Client payment processed',
      ipAddress: 'internal',
      userAgent: 'Lexova Payment System/1.0',
      details: {
        paymentId: 'PAY-2024-089',
        amount: 750.00,
        currency: 'USD',
        clientId: 'CLIENT-001',
        lawyerId: 'LW-2024-101',
        caseId: 'CASE-2024-042'
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-006',
      timestamp: '2024-12-15T19:12:18',
      user: 'Aron Davis',
      userId: 'ADMIN-002',
      userRole: 'admin',
      category: 'system_settings',
      action: 'update_settings',
      description: 'Platform settings updated',
      ipAddress: '192.168.1.5',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      details: {
        section: 'payment',
        changes: {
          platformFeePercentage: {
            from: 12,
            to: 10
          },
          minimumWithdrawalAmount: {
            from: 100,
            to: 50
          }
        }
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-007',
      timestamp: '2024-12-15T20:30:55',
      user: 'Jennifer Davis',
      userId: 'LW-2024-102',
      userRole: 'lawyer',
      category: 'authentication',
      action: 'login_failed',
      description: 'Failed login attempt',
      ipAddress: '209.85.231.104',
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
      details: {
        method: 'password',
        reason: 'incorrect_password',
        attemptNumber: 2
      },
      status: 'failed'
    },
    {
      id: 'LOG-2024-008',
      timestamp: '2024-12-15T21:45:22',
      user: 'System',
      userId: 'SYSTEM',
      userRole: 'system',
      category: 'notification',
      action: 'send_notification',
      description: 'System notification sent',
      ipAddress: 'internal',
      userAgent: 'Lexova Notification System/1.0',
      details: {
        notificationId: 'NOTIF-2024-005',
        recipients: 'all',
        recipientCount: 795,
        title: 'Payment System Update'
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-009',
      timestamp: '2024-12-15T22:10:33',
      user: 'Michael Chen',
      userId: 'LW-2024-103',
      userRole: 'lawyer',
      category: 'document',
      action: 'upload_document',
      description: 'Document uploaded to case',
      ipAddress: '172.16.254.1',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      details: {
        documentId: 'DOC-2024-156',
        documentName: 'Patent Application Draft.pdf',
        caseId: 'CASE-2024-051',
        size: '2.4 MB',
        documentType: 'application'
      },
      status: 'success'
    },
    {
      id: 'LOG-2024-010',
      timestamp: '2024-12-15T23:05:47',
      user: 'Aiden Thompson',
      userId: 'ADMIN-003',
      userRole: 'admin',
      category: 'user_management',
      action: 'suspend_user',
      description: 'User account suspended',
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      details: {
        targetUser: 'Robert Taylor',
        targetUserId: 'LW-2024-105',
        reason: 'Bar license currently suspended',
        duration: 'indefinite'
      },
      status: 'success'
    }
  ]);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'authentication':
        return 'bg-blue-100 text-blue-800';
      case 'user_management':
        return 'bg-purple-100 text-purple-800';
      case 'case_management':
        return 'bg-green-100 text-green-800';
      case 'payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'system_settings':
        return 'bg-gray-100 text-gray-800';
      case 'notification':
        return 'bg-pink-100 text-pink-800';
      case 'document':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'lawyer':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-green-100 text-green-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'authentication':
        return <Shield className="h-4 w-4" />;
      case 'user_management':
        return <User className="h-4 w-4" />;
      case 'case_management':
        return <FileText className="h-4 w-4" />;
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      case 'system_settings':
        return <Settings className="h-4 w-4" />;
      case 'notification':
        return <Bell className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'login':
        return <LogIn className="h-4 w-4" />;
      case 'login_failed':
        return <Lock className="h-4 w-4" />;
      case 'logout':
        return <LogOut className="h-4 w-4" />;
      case 'update_user':
        return <Edit className="h-4 w-4" />;
      case 'create_case':
        return <FileText className="h-4 w-4" />;
      case 'update_case':
        return <Edit className="h-4 w-4" />;
      case 'process_payment':
        return <DollarSign className="h-4 w-4" />;
      case 'update_settings':
        return <Settings className="h-4 w-4" />;
      case 'send_notification':
        return <Bell className="h-4 w-4" />;
      case 'upload_document':
        return <FileText className="h-4 w-4" />;
      case 'suspend_user':
        return <UserMinus className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filterLogs = () => {
    return auditLogs.filter(log => {
      // Search term filter
      const matchesSearch = 
        log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
      
      // User role filter
      const matchesUser = filterUser === 'all' || log.userRole === filterUser;
      
      // Date range filter
      let matchesDate = true;
      if (filterDateRange === 'custom') {
        if (startDate && endDate) {
          const logDate = new Date(log.timestamp);
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999); // Set to end of day
          matchesDate = logDate >= start && logDate <= end;
        }
      } else if (filterDateRange === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const logDate = new Date(log.timestamp);
        matchesDate = logDate >= today;
      } else if (filterDateRange === 'yesterday') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const logDate = new Date(log.timestamp);
        matchesDate = logDate >= yesterday && logDate < today;
      } else if (filterDateRange === 'week') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const logDate = new Date(log.timestamp);
        matchesDate = logDate >= weekAgo;
      }
      
      return matchesSearch && matchesCategory && matchesUser && matchesDate;
    });
  };

  const filteredLogs = filterLogs();

  const handleExportLogs = () => {
    // In a real application, this would generate a CSV or JSON file for download
    console.log('Exporting logs:', filteredLogs);
    // Show success message
  };

  return (
    <AdminDashboardLayout 
      title="Audit Logs" 
      subtitle="Track and monitor all platform activities"
    >
      <div className="space-y-6">
        {/* Audit Log Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Logs</p>
                  <p className="text-2xl font-bold text-blue-600">{auditLogs.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                All recorded activities
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Authentication</p>
                  <p className="text-2xl font-bold text-purple-600">{auditLogs.filter(log => log.category === 'authentication').length}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Login and security events
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">User Actions</p>
                  <p className="text-2xl font-bold text-green-600">{auditLogs.filter(log => log.category === 'user_management' || log.category === 'case_management').length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <User className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                User and case management
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Events</p>
                  <p className="text-2xl font-bold text-yellow-600">{auditLogs.filter(log => log.category === 'system_settings' || log.category === 'notification' || log.category === 'payment').length}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Settings className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                System and payment events
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 gap-4 w-full sm:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleExportLogs}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="authentication">Authentication</SelectItem>
                      <SelectItem value="user_management">User Management</SelectItem>
                      <SelectItem value="case_management">Case Management</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="system_settings">System Settings</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">User Type</label>
                  <Select value={filterUser} onValueChange={setFilterUser}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="admin">Administrators</SelectItem>
                      <SelectItem value="lawyer">Lawyers</SelectItem>
                      <SelectItem value="client">Clients</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Date Range</label>
                  <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {filterDateRange === 'custom' && (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
                      <Input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">End Date</label>
                      <Input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Log List and Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Audit Log List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Audit Log Entries</CardTitle>
                <CardDescription>
                  {filteredLogs.length} entries found
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 max-h-[600px] overflow-y-auto">
                <div className="space-y-1">
                  {filteredLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${selectedLog?.id === log.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getCategoryColor(log.category)}>
                          {getCategoryIcon(log.category)}
                          <span className="ml-1 capitalize">{log.category.replace('_', ' ')}</span>
                        </Badge>
                        <Badge className={getStatusColor(log.status)}>
                          {getStatusIcon(log.status)}
                          <span className="ml-1 capitalize">{log.status}</span>
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{log.description}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{log.user}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(log.timestamp)}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                  {filteredLogs.length === 0 && (
                    <div className="p-8 text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No audit logs found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Log Detail View */}
          <div className="lg:col-span-2">
            {selectedLog ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedLog.description}
                        <Badge className={getStatusColor(selectedLog.status)}>
                          {getStatusIcon(selectedLog.status)}
                          <span className="ml-1 capitalize">{selectedLog.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {selectedLog.id} • {formatDate(selectedLog.timestamp)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Log Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Event Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Category:</span>
                          <Badge className={getCategoryColor(selectedLog.category)}>
                            {getCategoryIcon(selectedLog.category)}
                            <span className="ml-1 capitalize">{selectedLog.category.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Action:</span>
                          <span className="text-sm font-medium capitalize">{selectedLog.action.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <Badge className={getStatusColor(selectedLog.status)}>
                            {getStatusIcon(selectedLog.status)}
                            <span className="ml-1 capitalize">{selectedLog.status}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Timestamp:</span>
                          <span className="text-sm">{formatDate(selectedLog.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">User Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">User:</span>
                          <span className="text-sm font-medium">{selectedLog.user}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">User ID:</span>
                          <span className="text-sm">{selectedLog.userId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Role:</span>
                          <Badge className={getRoleColor(selectedLog.userRole)}>
                            <span className="capitalize">{selectedLog.userRole}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">IP Address:</span>
                          <span className="text-sm">{selectedLog.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Detailed Information</h3>
                    <Card>
                      <CardContent className="p-4">
                        <pre className="text-xs bg-gray-50 p-4 rounded-md overflow-x-auto">
                          {JSON.stringify(selectedLog.details, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>

                  {/* User Agent */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">User Agent</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {selectedLog.userAgent}
                    </p>
                  </div>

                  {/* Related Actions */}
                  {selectedLog.category === 'user_management' && selectedLog.details.targetUserId && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Related Actions</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          View User Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View User Logs
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedLog.category === 'case_management' && selectedLog.details.caseId && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Related Actions</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Case Details
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedLog.category === 'payment' && selectedLog.details.paymentId && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Related Actions</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <DollarSign className="h-4 w-4 mr-2" />
                          View Payment Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an audit log</h3>
                  <p className="text-gray-600">
                    Choose a log entry from the list to view detailed information.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Audit Log Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Log Analytics</CardTitle>
            <CardDescription>Overview of platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Activity by Category</h3>
                <div className="space-y-3">
                  {['authentication', 'user_management', 'case_management', 'payment', 'system_settings', 'notification', 'document'].map((category) => {
                    const count = auditLogs.filter(log => log.category === category).length;
                    const percentage = auditLogs.length > 0 ? (count / auditLogs.length) * 100 : 0;
                    
                    return (
                      <div key={category} className="flex items-center gap-2">
                        <div className="w-32">
                          <Badge className={getCategoryColor(category)}>
                            {getCategoryIcon(category)}
                            <span className="ml-1 capitalize">{category.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              category === 'authentication' ? 'bg-blue-500' : 
                              category === 'user_management' ? 'bg-purple-500' : 
                              category === 'case_management' ? 'bg-green-500' :
                              category === 'payment' ? 'bg-yellow-500' :
                              category === 'system_settings' ? 'bg-gray-500' :
                              category === 'notification' ? 'bg-pink-500' :
                              'bg-indigo-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-16 text-right">
                          <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* User Role Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Activity by User Role</h3>
                <div className="space-y-3">
                  {['admin', 'lawyer', 'client', 'system'].map((role) => {
                    const count = auditLogs.filter(log => log.userRole === role).length;
                    const percentage = auditLogs.length > 0 ? (count / auditLogs.length) * 100 : 0;
                    
                    return (
                      <div key={role} className="flex items-center gap-2">
                        <div className="w-24">
                          <Badge className={getRoleColor(role)}>
                            <span className="capitalize">{role}</span>
                          </Badge>
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              role === 'admin' ? 'bg-purple-500' : 
                              role === 'lawyer' ? 'bg-blue-500' : 
                              role === 'client' ? 'bg-green-500' :
                              'bg-gray-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-16 text-right">
                          <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Status Distribution</h3>
                  <div className="space-y-3">
                    {['success', 'failed', 'warning'].map((status) => {
                      const count = auditLogs.filter(log => log.status === status).length;
                      const percentage = auditLogs.length > 0 ? (count / auditLogs.length) * 100 : 0;
                      
                      if (count === 0) return null;
                      
                      return (
                        <div key={status} className="flex items-center gap-2">
                          <div className="w-24">
                            <Badge className={getStatusColor(status)}>
                              {getStatusIcon(status)}
                              <span className="ml-1 capitalize">{status}</span>
                            </Badge>
                          </div>
                          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                status === 'success' ? 'bg-green-500' : 
                                status === 'failed' ? 'bg-red-500' : 
                                'bg-yellow-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="w-16 text-right">
                            <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAuditLogs;

