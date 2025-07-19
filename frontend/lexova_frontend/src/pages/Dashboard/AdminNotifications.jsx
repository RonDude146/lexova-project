import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  Bell, 
  Search, 
  Filter, 
  Plus,
  Edit, 
  Trash,
  Eye,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Users,
  Send,
  Mail,
  AlertTriangle,
  MessageSquare,
  BellRing,
  BellOff,
  Settings,
  Save,
  BarChart,
  Briefcase,
  DollarSign,
  FileText,
  Info
} from 'lucide-react';

const AdminNotifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'system',
    recipients: 'all',
    userType: 'all',
    sendNow: true,
    scheduledDate: '',
    scheduledTime: ''
  });

  // Sample data for notifications
  const [notifications] = useState([
    {
      id: 'NOTIF-2024-001',
      title: 'Platform Maintenance',
      message: 'Lexova will be undergoing scheduled maintenance on December 25, 2024, from 2:00 AM to 4:00 AM EST. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.',
      type: 'system',
      status: 'scheduled',
      recipients: 'all',
      userCount: 795,
      createdBy: 'Admin',
      createdDate: '2024-12-15',
      scheduledDate: '2024-12-24',
      scheduledTime: '10:00 PM',
      sentDate: null,
      readCount: 0,
      deliveryRate: 0
    },
    {
      id: 'NOTIF-2024-002',
      title: 'New Feature: Enhanced AI Matching',
      message: 'We\'re excited to announce our enhanced AI matching system is now live! The updated algorithm provides more accurate lawyer recommendations based on your specific case details. Try it out for your next case!',
      type: 'feature',
      status: 'sent',
      recipients: 'clients',
      userCount: 680,
      createdBy: 'Admin',
      createdDate: '2024-12-10',
      scheduledDate: null,
      scheduledTime: null,
      sentDate: '2024-12-10',
      readCount: 542,
      deliveryRate: 100
    },
    {
      id: 'NOTIF-2024-003',
      title: 'Important: Update Your Profile',
      message: 'Please take a moment to update your professional profile with your latest credentials, experience, and availability. Complete profiles receive 3x more client matches!',
      type: 'important',
      status: 'sent',
      recipients: 'lawyers',
      userCount: 115,
      createdBy: 'Admin',
      createdDate: '2024-12-08',
      scheduledDate: null,
      scheduledTime: null,
      sentDate: '2024-12-08',
      readCount: 98,
      deliveryRate: 100
    },
    {
      id: 'NOTIF-2024-004',
      title: 'Holiday Hours',
      message: 'Lexova support will be operating on limited hours during the holiday season (December 24-26 and December 31-January 2). For urgent matters, please use the emergency contact form.',
      type: 'announcement',
      status: 'draft',
      recipients: 'all',
      userCount: 795,
      createdBy: 'Admin',
      createdDate: '2024-12-14',
      scheduledDate: null,
      scheduledTime: null,
      sentDate: null,
      readCount: 0,
      deliveryRate: 0
    },
    {
      id: 'NOTIF-2024-005',
      title: 'Payment System Update',
      message: 'We\'ve resolved the recent payment processing issue. All pending transactions have been processed successfully. If you continue to experience any issues, please contact support.',
      type: 'alert',
      status: 'sent',
      recipients: 'all',
      userCount: 795,
      createdBy: 'Admin',
      createdDate: '2024-12-12',
      scheduledDate: null,
      scheduledTime: null,
      sentDate: '2024-12-12',
      readCount: 623,
      deliveryRate: 100
    }
  ]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'system':
        return 'bg-blue-100 text-blue-800';
      case 'feature':
        return 'bg-green-100 text-green-800';
      case 'important':
        return 'bg-purple-100 text-purple-800';
      case 'announcement':
        return 'bg-yellow-100 text-yellow-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'feature':
        return <Info className="h-4 w-4" />;
      case 'important':
        return <AlertTriangle className="h-4 w-4" />;
      case 'announcement':
        return <BellRing className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />;
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      case 'sent':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getRecipientsIcon = (recipients) => {
    switch (recipients) {
      case 'all':
        return <Users className="h-4 w-4" />;
      case 'clients':
        return <User className="h-4 w-4" />;
      case 'lawyers':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesType;
  });

  const draftNotifications = notifications.filter(n => n.status === 'draft');
  const scheduledNotifications = notifications.filter(n => n.status === 'scheduled');
  const sentNotifications = notifications.filter(n => n.status === 'sent');

  const handleCreateNotification = () => {
    // In a real application, this would send the notification to the backend
    // For now, we'll just reset the form and exit create mode
    setCreateMode(false);
    setNewNotification({
      title: '',
      message: '',
      type: 'system',
      recipients: 'all',
      userType: 'all',
      sendNow: true,
      scheduledDate: '',
      scheduledTime: ''
    });
  };

  const handleSendNow = () => {
    if (!selectedNotification) return;
    
    // In a real application, this would send the notification immediately
    // For now, we'll just update the local state
    setSelectedNotification({
      ...selectedNotification,
      status: 'sent',
      sentDate: new Date().toISOString().split('T')[0],
      scheduledDate: null,
      scheduledTime: null
    });
  };

  return (
    <AdminDashboardLayout 
      title="Notification Management" 
      subtitle="Create and manage platform notifications"
    >
      <div className="space-y-6">
        {/* Notification Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Notifications</p>
                  <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                All platform notifications
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Draft</p>
                  <p className="text-2xl font-bold text-gray-600">{draftNotifications.length}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Unsent notifications
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-yellow-600">{scheduledNotifications.length}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Pending delivery
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sent</p>
                  <p className="text-2xl font-bold text-green-600">{sentNotifications.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Successfully delivered
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setCreateMode(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification List and Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notification List */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="draft" className="flex-1">Draft</TabsTrigger>
                <TabsTrigger value="scheduled" className="flex-1">Scheduled</TabsTrigger>
                <TabsTrigger value="sent" className="flex-1">Sent</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-0">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedNotification?.id === notification.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => { setSelectedNotification(notification); setCreateMode(false); }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTypeColor(notification.type)}>
                          {getTypeIcon(notification.type)}
                          <span className="ml-1 capitalize">{notification.type}</span>
                        </Badge>
                        <Badge className={getStatusColor(notification.status)}>
                          {getStatusIcon(notification.status)}
                          <span className="ml-1 capitalize">{notification.status}</span>
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{notification.title}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {getRecipientsIcon(notification.recipients)}
                          <span className="capitalize">{notification.recipients}</span>
                        </span>
                        <span>
                          {notification.status === 'sent' 
                            ? `Sent: ${notification.sentDate}` 
                            : notification.status === 'scheduled'
                            ? `Scheduled: ${notification.scheduledDate}`
                            : `Created: ${notification.createdDate}`
                          }
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredNotifications.length === 0 && (
                  <Card className="p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notifications found</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="draft" className="space-y-4 mt-0">
                {draftNotifications.filter(notification => 
                  notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.id.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedNotification?.id === notification.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => { setSelectedNotification(notification); setCreateMode(false); }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTypeColor(notification.type)}>
                          {getTypeIcon(notification.type)}
                          <span className="ml-1 capitalize">{notification.type}</span>
                        </Badge>
                        <Badge className="bg-gray-100 text-gray-800">
                          <FileText className="h-4 w-4 mr-1" />
                          Draft
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{notification.title}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {getRecipientsIcon(notification.recipients)}
                          <span className="capitalize">{notification.recipients}</span>
                        </span>
                        <span>Created: {notification.createdDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {draftNotifications.filter(notification => 
                  notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.id.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <Card className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No draft notifications</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4 mt-0">
                {scheduledNotifications.filter(notification => 
                  notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.id.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedNotification?.id === notification.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => { setSelectedNotification(notification); setCreateMode(false); }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTypeColor(notification.type)}>
                          {getTypeIcon(notification.type)}
                          <span className="ml-1 capitalize">{notification.type}</span>
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-4 w-4 mr-1" />
                          Scheduled
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{notification.title}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {getRecipientsIcon(notification.recipients)}
                          <span className="capitalize">{notification.recipients}</span>
                        </span>
                        <span>Scheduled: {notification.scheduledDate} {notification.scheduledTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {scheduledNotifications.filter(notification => 
                  notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.id.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <Card className="p-8 text-center">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No scheduled notifications</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="sent" className="space-y-4 mt-0">
                {sentNotifications.filter(notification => 
                  notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.id.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedNotification?.id === notification.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => { setSelectedNotification(notification); setCreateMode(false); }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTypeColor(notification.type)}>
                          {getTypeIcon(notification.type)}
                          <span className="ml-1 capitalize">{notification.type}</span>
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Sent
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{notification.title}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {getRecipientsIcon(notification.recipients)}
                          <span className="capitalize">{notification.recipients}</span>
                        </span>
                        <span>Sent: {notification.sentDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {sentNotifications.filter(notification => 
                  notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  notification.id.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <Card className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No sent notifications</p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Notification Detail View or Create Form */}
          <div className="lg:col-span-2">
            {createMode ? (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Notification</CardTitle>
                  <CardDescription>
                    Create and send notifications to platform users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Notification Title</label>
                      <Input 
                        value={newNotification.title} 
                        onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                        placeholder="Enter notification title"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Notification Message</label>
                      <Textarea 
                        value={newNotification.message} 
                        onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                        placeholder="Enter notification message"
                        rows={5}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Notification Type</label>
                        <Select 
                          value={newNotification.type}
                          onValueChange={(value) => setNewNotification({...newNotification, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="feature">Feature</SelectItem>
                            <SelectItem value="important">Important</SelectItem>
                            <SelectItem value="announcement">Announcement</SelectItem>
                            <SelectItem value="alert">Alert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Recipients</label>
                        <Select 
                          value={newNotification.recipients}
                          onValueChange={(value) => setNewNotification({...newNotification, recipients: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="clients">Clients Only</SelectItem>
                            <SelectItem value="lawyers">Lawyers Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Delivery Options</label>
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox 
                          id="send-now" 
                          checked={newNotification.sendNow}
                          onCheckedChange={(checked) => setNewNotification({...newNotification, sendNow: checked})}
                        />
                        <label
                          htmlFor="send-now"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Send immediately
                        </label>
                      </div>

                      {!newNotification.sendNow && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Schedule Date</label>
                            <Input 
                              type="date" 
                              value={newNotification.scheduledDate} 
                              onChange={(e) => setNewNotification({...newNotification, scheduledDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Schedule Time</label>
                            <Input 
                              type="time" 
                              value={newNotification.scheduledTime} 
                              onChange={(e) => setNewNotification({...newNotification, scheduledTime: e.target.value})}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setCreateMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateNotification} disabled={!newNotification.title || !newNotification.message}>
                      {newNotification.sendNow ? (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Notification
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {newNotification.scheduledDate && newNotification.scheduledTime ? 'Schedule Notification' : 'Save as Draft'}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : selectedNotification ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedNotification.title}
                        <Badge className={getTypeColor(selectedNotification.type)}>
                          {getTypeIcon(selectedNotification.type)}
                          <span className="ml-1 capitalize">{selectedNotification.type}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {selectedNotification.id}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {selectedNotification.status === 'draft' && (
                        <Button size="sm" onClick={handleSendNow}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Now
                        </Button>
                      )}
                      {selectedNotification.status === 'scheduled' && (
                        <Button size="sm" onClick={handleSendNow}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Now
                        </Button>
                      )}
                      {selectedNotification.status !== 'sent' && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Notification Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Notification Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <Badge className={getStatusColor(selectedNotification.status)}>
                            {getStatusIcon(selectedNotification.status)}
                            <span className="ml-1 capitalize">{selectedNotification.status}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Recipients:</span>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getRecipientsIcon(selectedNotification.recipients)}
                            <span className="capitalize">{selectedNotification.recipients}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">User Count:</span>
                          <span className="text-sm font-medium">{selectedNotification.userCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Created By:</span>
                          <span className="text-sm">{selectedNotification.createdBy}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Created Date:</span>
                          <span className="text-sm">{selectedNotification.createdDate}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Information</h3>
                      <div className="space-y-2">
                        {selectedNotification.status === 'scheduled' && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Scheduled Date:</span>
                              <span className="text-sm">{selectedNotification.scheduledDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Scheduled Time:</span>
                              <span className="text-sm">{selectedNotification.scheduledTime}</span>
                            </div>
                          </>
                        )}
                        {selectedNotification.status === 'sent' && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Sent Date:</span>
                              <span className="text-sm">{selectedNotification.sentDate}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Read Count:</span>
                              <span className="text-sm">{selectedNotification.readCount} of {selectedNotification.userCount} ({Math.round((selectedNotification.readCount / selectedNotification.userCount) * 100)}%)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Delivery Rate:</span>
                              <span className="text-sm">{selectedNotification.deliveryRate}%</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notification Content */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Notification Content</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-lg mb-2">{selectedNotification.title}</h4>
                      <p className="text-gray-700 whitespace-pre-line">{selectedNotification.message}</p>
                    </div>
                  </div>

                  {/* Notification Preview */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Notification Preview</h3>
                    <div className="border border-gray-200 rounded-lg p-4 max-w-md mx-auto bg-white shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          selectedNotification.type === 'system' ? 'bg-blue-100' :
                          selectedNotification.type === 'feature' ? 'bg-green-100' :
                          selectedNotification.type === 'important' ? 'bg-purple-100' :
                          selectedNotification.type === 'announcement' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          {getTypeIcon(selectedNotification.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{selectedNotification.title}</h4>
                          <p className="text-sm text-gray-700 mt-1 line-clamp-3">{selectedNotification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">Just now</span>
                            <Badge variant="outline" className="text-xs">
                              {selectedNotification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Read Analytics (if sent) */}
                  {selectedNotification.status === 'sent' && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Read Analytics</h3>
                      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(selectedNotification.readCount / selectedNotification.userCount) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{selectedNotification.readCount} read</span>
                        <span>{selectedNotification.userCount - selectedNotification.readCount} unread</span>
                        <span>{selectedNotification.userCount} total</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a notification</h3>
                  <p className="text-gray-600">
                    Choose a notification from the list to view details or create a new notification.
                  </p>
                  <Button className="mt-4" onClick={() => setCreateMode(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Notification
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Notification Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Analytics</CardTitle>
            <CardDescription>Overview of notification performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Notification Type Distribution</h3>
                <div className="space-y-3">
                  {['system', 'feature', 'important', 'announcement', 'alert'].map((type) => {
                    const count = notifications.filter(n => n.type === type).length;
                    const percentage = notifications.length > 0 ? (count / notifications.length) * 100 : 0;
                    
                    return (
                      <div key={type} className="flex items-center gap-2">
                        <div className="w-28">
                          <Badge className={getTypeColor(type)}>
                            {getTypeIcon(type)}
                            <span className="ml-1 capitalize">{type}</span>
                          </Badge>
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              type === 'system' ? 'bg-blue-500' : 
                              type === 'feature' ? 'bg-green-500' : 
                              type === 'important' ? 'bg-purple-500' :
                              type === 'announcement' ? 'bg-yellow-500' :
                              'bg-red-500'
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

              {/* Recipient Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Recipient Distribution</h3>
                <div className="space-y-3">
                  {['all', 'clients', 'lawyers'].map((recipients) => {
                    const count = notifications.filter(n => n.recipients === recipients).length;
                    const percentage = notifications.length > 0 ? (count / notifications.length) * 100 : 0;
                    
                    return (
                      <div key={recipients} className="flex items-center gap-2">
                        <div className="w-24">
                          <span className="text-sm font-medium capitalize">{recipients}</span>
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              recipients === 'all' ? 'bg-blue-500' : 
                              recipients === 'clients' ? 'bg-green-500' : 
                              'bg-purple-500'
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
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Read Rate by Type</h3>
                  <div className="space-y-3">
                    {['system', 'feature', 'important', 'announcement', 'alert'].map((type) => {
                      const typeNotifications = notifications.filter(n => n.type === type && n.status === 'sent');
                      if (typeNotifications.length === 0) return null;
                      
                      const totalUsers = typeNotifications.reduce((sum, n) => sum + n.userCount, 0);
                      const totalReads = typeNotifications.reduce((sum, n) => sum + n.readCount, 0);
                      const readRate = totalUsers > 0 ? (totalReads / totalUsers) * 100 : 0;
                      
                      return (
                        <div key={`read-${type}`} className="flex items-center gap-2">
                          <div className="w-28">
                            <Badge className={getTypeColor(type)}>
                              {getTypeIcon(type)}
                              <span className="ml-1 capitalize">{type}</span>
                            </Badge>
                          </div>
                          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${readRate}%` }}
                            />
                          </div>
                          <div className="w-16 text-right">
                            <span className="text-sm text-gray-600">{readRate.toFixed(0)}%</span>
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

export default AdminNotifications;

