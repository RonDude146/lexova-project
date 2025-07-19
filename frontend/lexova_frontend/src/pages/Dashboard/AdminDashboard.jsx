import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Activity,
  Shield,
  Bell,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalLawyers: 156,
    totalClients: 1091,
    activeCases: 89,
    completedCases: 234,
    totalRevenue: 485000,
    monthlyRevenue: 42500,
    pendingVerifications: 12,
    activeDisputes: 3,
    systemUptime: 99.8,
    averageRating: 4.7,
    totalReviews: 892
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'user_registration',
      message: 'New client registered: John Smith',
      timestamp: '2 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'case_completed',
      message: 'Case PI-2024-001 marked as completed',
      timestamp: '15 minutes ago',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'Payment of $2,500 received from ABC Corp',
      timestamp: '1 hour ago',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'dispute_opened',
      message: 'New dispute opened for case CD-2024-002',
      timestamp: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'lawyer_verification',
      message: 'Lawyer verification completed: Sarah Johnson',
      timestamp: '3 hours ago',
      icon: Shield,
      color: 'text-purple-600'
    }
  ]);

  const [quickStats, setQuickStats] = useState([
    { label: 'New Users Today', value: 23, change: '+12%', trend: 'up' },
    { label: 'Cases This Week', value: 45, change: '+8%', trend: 'up' },
    { label: 'Revenue This Month', value: '$42.5K', change: '+15%', trend: 'up' },
    { label: 'Active Disputes', value: 3, change: '-25%', trend: 'down' }
  ]);

  const [systemHealth, setSystemHealth] = useState([
    { metric: 'Server Uptime', value: 99.8, status: 'excellent' },
    { metric: 'Database Performance', value: 95.2, status: 'good' },
    { metric: 'API Response Time', value: 87.5, status: 'good' },
    { metric: 'User Satisfaction', value: 94.1, status: 'excellent' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const monthlyGrowth = ((stats.monthlyRevenue - 37000) / 37000 * 100).toFixed(1);

  return (
    <AdminDashboardLayout 
      title="Admin Dashboard" 
      subtitle="Welcome back! Here is what is happening on your platform."
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeCases}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+{monthlyGrowth}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Issues</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingVerifications + stats.activeDisputes}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">{stats.pendingVerifications} verifications, {stats.activeDisputes} disputes</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link to="/admin-dashboard/users">
                <Button className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Users</span>
                </Button>
              </Link>
              
              <Link to="/admin-dashboard/verification">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Shield className="h-6 w-6" />
                  <span>Verify Lawyers</span>
                </Button>
              </Link>
              
              <Link to="/admin-dashboard/disputes">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <AlertTriangle className="h-6 w-6" />
                  <span>Handle Disputes</span>
                </Button>
              </Link>

              <Link to="/admin-dashboard/reports">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>View Reports</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Platform performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                          {item.value}%
                        </span>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </div>
              <Link to="/admin-dashboard/audit">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="bg-gray-50 p-2 rounded-full">
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Clients</span>
                  <span className="text-sm font-medium">{stats.totalClients}</span>
                </div>
                <Progress value={(stats.totalClients / stats.totalUsers) * 100} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lawyers</span>
                  <span className="text-sm font-medium">{stats.totalLawyers}</span>
                </div>
                <Progress value={(stats.totalLawyers / stats.totalUsers) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.completedCases}</p>
                <p className="text-sm text-gray-600 mt-2">Cases Completed</p>
                <div className="mt-4 flex items-center justify-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">96% success rate</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platform Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-3xl font-bold text-yellow-600">{stats.averageRating}</p>
                  <Star className="h-8 w-8 text-yellow-500 fill-current" />
                </div>
                <p className="text-sm text-gray-600 mt-2">{stats.totalReviews} reviews</p>
                <div className="mt-4 flex items-center justify-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+0.2 this month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[32, 28, 35, 42, 38, 45, 52, 48, 41, 39, 43, 47].map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
                    style={{ 
                      height: `${(value / 52) * 200}px`,
                      minHeight: '20px'
                    }}
                  />
                  <div className="text-xs text-gray-600 mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </div>
                  <div className="text-xs font-medium text-gray-900">${value}K</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;

