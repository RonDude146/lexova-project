import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { 
  Brain, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  MessageCircle,
  Star,
  Plus,
  ArrowRight
} from 'lucide-react';

const ClientDashboard = () => {
  const [stats, setStats] = useState({
    activeCases: 2,
    completedCases: 5,
    pendingPayments: 1,
    totalSpent: 12500
  });

  const [recentCases, setRecentCases] = useState([
    {
      id: 1,
      title: 'Personal Injury Claim',
      lawyer: 'Sarah Johnson',
      status: 'In Progress',
      lastUpdate: '2 days ago',
      progress: 65
    },
    {
      id: 2,
      title: 'Contract Review',
      lawyer: 'Michael Chen',
      status: 'Completed',
      lastUpdate: '1 week ago',
      progress: 100
    },
    {
      id: 3,
      title: 'Employment Dispute',
      lawyer: 'Emily Rodriguez',
      status: 'Pending Review',
      lastUpdate: '3 days ago',
      progress: 30
    }
  ]);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      title: 'Case Review Meeting',
      lawyer: 'Sarah Johnson',
      date: '2024-12-20',
      time: '2:00 PM',
      type: 'Video Call'
    },
    {
      id: 2,
      title: 'Document Signing',
      lawyer: 'Michael Chen',
      date: '2024-12-22',
      time: '10:00 AM',
      type: 'In Person'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah Johnson',
      description: 'Updates on your personal injury case',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment due',
      description: 'Invoice #1234 is due in 3 days',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'case',
      title: 'Case status updated',
      description: 'Contract Review case marked as completed',
      time: '1 day ago',
      unread: false
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'text-blue-600 bg-blue-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'Pending Review':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'payment':
        return AlertCircle;
      case 'case':
        return FileText;
      default:
        return AlertCircle;
    }
  };

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Welcome back! Here is what is happening with your cases."
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeCases}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+2 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.completedCases}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-gray-600">4.8 avg rating</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingPayments}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/dashboard/payments" className="text-sm text-blue-600 hover:text-blue-500">
                  View details →
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">This year</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/dashboard/matching">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Brain className="h-6 w-6" />
                  <span>Find a Lawyer</span>
                </Button>
              </Link>
              
              <Link to="/dashboard/cases/new">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>New Case</span>
                </Button>
              </Link>
              
              <Link to="/dashboard/messages">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <MessageCircle className="h-6 w-6" />
                  <span>Messages</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Cases */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Cases</CardTitle>
                <CardDescription>Your latest legal matters</CardDescription>
              </div>
              <Link to="/dashboard/cases">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_) => (
                  <div key={case_.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{case_.title}</h4>
                      <p className="text-sm text-gray-600">Lawyer: {case_.lawyer}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(case_.status)}`}>
                        {case_.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{case_.lastUpdate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled meetings</CardDescription>
              </div>
              <Link to="/dashboard/calendar">
                <Button variant="ghost" size="sm">
                  View Calendar
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <div className="bg-blue-50 p-2 rounded-lg mr-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                      <p className="text-sm text-gray-600">with {appointment.lawyer}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{appointment.date} at {appointment.time}</span>
                        <span className="mx-2">•</span>
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated on your cases</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <div key={notification.id} className={`flex items-start p-3 rounded-lg ${notification.unread ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <div className={`p-2 rounded-full mr-3 ${notification.unread ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <IconComponent className={`h-4 w-4 ${notification.unread ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;

