import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import LawyerDashboardLayout from '../../components/Dashboard/LawyerDashboardLayout';
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  Star,
  TrendingUp,
  Calendar,
  MessageCircle,
  Users,
  Plus,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';

const LawyerDashboard = () => {
  const [stats, setStats] = useState({
    activeCases: 8,
    completedCases: 47,
    totalEarnings: 125000,
    monthlyEarnings: 18500,
    averageRating: 4.8,
    totalReviews: 156,
    responseTime: '2.3 hours',
    clientSatisfaction: 96
  });

  const [recentCases, setRecentCases] = useState([
    {
      id: 1,
      title: 'Personal Injury Claim',
      client: 'John Doe',
      status: 'In Progress',
      priority: 'High',
      lastUpdate: '2 hours ago',
      progress: 65,
      nextAction: 'Review medical records',
      dueDate: '2024-12-20'
    },
    {
      id: 2,
      title: 'Contract Dispute',
      client: 'ABC Corporation',
      status: 'Pending Review',
      priority: 'Medium',
      lastUpdate: '1 day ago',
      progress: 30,
      nextAction: 'Client consultation',
      dueDate: '2024-12-22'
    },
    {
      id: 3,
      title: 'Employment Law Case',
      client: 'Jane Smith',
      status: 'In Progress',
      priority: 'High',
      lastUpdate: '3 hours ago',
      progress: 80,
      nextAction: 'Prepare settlement offer',
      dueDate: '2024-12-18'
    }
  ]);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      title: 'Client Consultation',
      client: 'John Doe',
      date: '2024-12-20',
      time: '2:00 PM',
      type: 'Video Call',
      duration: '1 hour'
    },
    {
      id: 2,
      title: 'Court Hearing',
      client: 'ABC Corporation',
      date: '2024-12-22',
      time: '10:00 AM',
      type: 'In Person',
      duration: '2 hours'
    },
    {
      id: 3,
      title: 'Settlement Meeting',
      client: 'Jane Smith',
      date: '2024-12-23',
      time: '3:00 PM',
      type: 'In Person',
      duration: '1.5 hours'
    }
  ]);

  const [recentMessages, setRecentMessages] = useState([
    {
      id: 1,
      client: 'John Doe',
      message: 'Thank you for the update on my case. When can we schedule the next meeting?',
      time: '30 minutes ago',
      unread: true
    },
    {
      id: 2,
      client: 'ABC Corporation',
      message: 'We have additional documents to share regarding the contract dispute.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 3,
      client: 'Jane Smith',
      message: 'I agree with the proposed settlement terms. Please proceed.',
      time: '4 hours ago',
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
      case 'On Hold':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <LawyerDashboardLayout 
      title="Dashboard" 
      subtitle="Welcome back, Sarah! Here's your practice overview."
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
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+3 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.monthlyEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
                    <Star className="h-6 w-6 text-yellow-500 fill-current" />
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">{stats.totalReviews} reviews</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.responseTime}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Average response</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link to="/lawyer-dashboard/cases/new">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>New Case</span>
                </Button>
              </Link>
              
              <Link to="/lawyer-dashboard/availability">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Set Availability</span>
                </Button>
              </Link>
              
              <Link to="/lawyer-dashboard/messages">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <MessageCircle className="h-6 w-6" />
                  <span>Messages</span>
                </Button>
              </Link>

              <Link to="/lawyer-dashboard/profile">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Update Profile</span>
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
                <CardDescription>Your active legal matters</CardDescription>
              </div>
              <Link to="/lawyer-dashboard/cases">
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
                      <p className="text-sm text-gray-600">Client: {case_.client}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{case_.progress}%</span>
                        </div>
                        <Progress value={case_.progress} className="h-2" />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Next: {case_.nextAction}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(case_.status)}`}>
                          {case_.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(case_.priority)}`}>
                          {case_.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Due: {new Date(case_.dueDate).toLocaleDateString()}</p>
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
              <Link to="/lawyer-dashboard/calendar">
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
                      <p className="text-sm text-gray-600">with {appointment.client}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{appointment.date} at {appointment.time}</span>
                        <span className="mx-2">•</span>
                        <span>{appointment.type}</span>
                        <span className="mx-2">•</span>
                        <span>{appointment.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest client communications</CardDescription>
            </div>
            <Link to="/lawyer-dashboard/messages">
              <Button variant="ghost" size="sm">
                View All Messages
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div key={message.id} className={`flex items-start p-3 rounded-lg ${message.unread ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className={`p-2 rounded-full mr-3 ${message.unread ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <MessageCircle className={`h-4 w-4 ${message.unread ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.client}
                      </h4>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                  </div>
                  {message.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray={`${stats.clientSatisfaction}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{stats.clientSatisfaction}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">${stats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-2">This year</p>
                <div className="mt-4 flex items-center justify-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+18% from last year</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">94%</p>
                <p className="text-sm text-gray-600 mt-2">Successful outcomes</p>
                <div className="mt-4 flex items-center justify-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-gray-600">{stats.completedCases} cases completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LawyerDashboardLayout>
  );
};

export default LawyerDashboard;

