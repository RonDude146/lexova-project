import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  BarChart, 
  PieChart,
  LineChart,
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

const AdminReports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  // Sample data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [42000, 38000, 45000, 50000, 52000, 48000, 55000, 58000, 62000, 65000, 70000, 75000]
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    clients: [120, 150, 180, 210, 250, 290, 340, 390, 450, 520, 600, 680],
    lawyers: [30, 35, 42, 48, 55, 62, 70, 78, 85, 95, 105, 115]
  };

  const caseStatusData = {
    labels: ['Active', 'Completed', 'Pending', 'Disputed'],
    values: [45, 35, 15, 5]
  };

  const caseTypeData = {
    labels: ['Family Law', 'Criminal Defense', 'Personal Injury', 'Real Estate', 'Corporate', 'Immigration', 'Other'],
    values: [25, 15, 20, 12, 10, 8, 10]
  };

  const lawyerPerformanceData = [
    { name: 'Sarah Johnson', rating: 4.9, cases: 45, earnings: 78500, disputeRate: 0.02 },
    { name: 'Michael Chen', rating: 4.8, cases: 38, earnings: 65000, disputeRate: 0.03 },
    { name: 'Emily Rodriguez', rating: 4.7, cases: 42, earnings: 72000, disputeRate: 0.02 },
    { name: 'David Wilson', rating: 4.6, cases: 36, earnings: 61000, disputeRate: 0.05 },
    { name: 'Jennifer Davis', rating: 4.5, cases: 40, earnings: 68000, disputeRate: 0.04 }
  ];

  const platformMetrics = [
    { metric: 'Total Revenue', value: '$750,000', change: '+15%', trend: 'up' },
    { metric: 'Active Users', value: '795', change: '+22%', trend: 'up' },
    { metric: 'Case Success Rate', value: '92%', change: '+3%', trend: 'up' },
    { metric: 'Avg. Resolution Time', value: '18 days', change: '-12%', trend: 'up' },
    { metric: 'Client Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
    { metric: 'Dispute Rate', value: '4.2%', change: '-1.5%', trend: 'up' }
  ];

  // Helper function to render bar chart
  const renderBarChart = (data, height = 200) => (
    <div className="h-full w-full">
      <div className="flex h-full items-end space-x-2">
        {data.labels.map((label, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
              style={{ 
                height: `${(data.values[index] / Math.max(...data.values)) * height}px`,
                minHeight: '20px'
              }}
            />
            <div className="text-xs text-gray-600 mt-2 truncate max-w-full">
              {label}
            </div>
            <div className="text-xs font-medium text-gray-900">
              {typeof data.values[index] === 'number' && data.values[index] >= 1000 
                ? `${(data.values[index] / 1000).toFixed(0)}k`
                : data.values[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Helper function to render line chart
  const renderLineChart = (data) => (
    <div className="h-64 w-full relative">
      <svg className="w-full h-full" viewBox="0 0 1000 300">
        {/* Client line */}
        <path
          d={`M ${data.labels.map((_, i) => `${(i / (data.labels.length - 1)) * 1000} ${300 - (data.clients[i] / Math.max(...data.clients)) * 250}`).join(' L ')}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
        />
        {/* Lawyer line */}
        <path
          d={`M ${data.labels.map((_, i) => `${(i / (data.labels.length - 1)) * 1000} ${300 - (data.lawyers[i] / Math.max(...data.clients)) * 250}`).join(' L ')}`}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
        />
        
        {/* Data points for clients */}
        {data.labels.map((_, i) => (
          <circle
            key={`client-${i}`}
            cx={`${(i / (data.labels.length - 1)) * 1000}`}
            cy={`${300 - (data.clients[i] / Math.max(...data.clients)) * 250}`}
            r="4"
            fill="#3b82f6"
          />
        ))}
        
        {/* Data points for lawyers */}
        {data.labels.map((_, i) => (
          <circle
            key={`lawyer-${i}`}
            cx={`${(i / (data.labels.length - 1)) * 1000}`}
            cy={`${300 - (data.lawyers[i] / Math.max(...data.clients)) * 250}`}
            r="4"
            fill="#10b981"
          />
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex items-center gap-4 bg-white p-2 rounded-lg">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs">Clients</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs">Lawyers</span>
        </div>
      </div>
    </div>
  );

  // Helper function to render pie chart
  const renderPieChart = (data) => {
    const total = data.values.reduce((sum, value) => sum + value, 0);
    let cumulativePercent = 0;
    
    return (
      <div className="h-64 w-full flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.values.map((value, index) => {
              const percent = (value / total) * 100;
              const startPercent = cumulativePercent;
              cumulativePercent += percent;
              
              const startX = Math.cos(2 * Math.PI * startPercent / 100);
              const startY = Math.sin(2 * Math.PI * startPercent / 100);
              const endX = Math.cos(2 * Math.PI * cumulativePercent / 100);
              const endY = Math.sin(2 * Math.PI * cumulativePercent / 100);
              
              const largeArcFlag = percent > 50 ? 1 : 0;
              
              const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];
              
              return (
                <path
                  key={index}
                  d={`M 50 50 L ${50 + 40 * startX} ${50 + 40 * startY} A 40 40 0 ${largeArcFlag} 1 ${50 + 40 * endX} ${50 + 40 * endY} Z`}
                  fill={colors[index % colors.length]}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="ml-8 space-y-2">
          {data.labels.map((label, index) => {
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];
            const percent = ((data.values[index] / total) * 100).toFixed(1);
            
            return (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></div>
                <span className="text-xs">{label} ({percent}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <AdminDashboardLayout 
      title="Reports & Analytics" 
      subtitle="Comprehensive platform performance metrics and insights"
    >
      <div className="space-y-6">
        {/* Report Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full sm:w-auto">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Platform Overview</SelectItem>
                    <SelectItem value="financial">Financial Reports</SelectItem>
                    <SelectItem value="users">User Analytics</SelectItem>
                    <SelectItem value="cases">Case Analytics</SelectItem>
                    <SelectItem value="lawyers">Lawyer Performance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Overview Report */}
        {reportType === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {platformMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.metric}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className={`p-2 rounded-full ${metric.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                        {metric.trend === 'up' ? (
                          <TrendingUp className={`h-5 w-5 ${metric.metric === 'Avg. Resolution Time' || metric.metric === 'Dispute Rate' ? 'text-red-600' : 'text-green-600'}`} />
                        ) : (
                          <TrendingDown className={`h-5 w-5 ${metric.metric === 'Avg. Resolution Time' || metric.metric === 'Dispute Rate' ? 'text-green-600' : 'text-red-600'}`} />
                        )}
                      </div>
                    </div>
                    <div className={`mt-2 flex items-center text-xs ${
                      (metric.metric === 'Avg. Resolution Time' || metric.metric === 'Dispute Rate') 
                        ? (metric.trend === 'up' ? 'text-red-600' : 'text-green-600')
                        : (metric.trend === 'up' ? 'text-green-600' : 'text-red-600')
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change} from previous {timeRange}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Monthly revenue for the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderBarChart(revenueData)}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    User Growth
                  </CardTitle>
                  <CardDescription>Monthly user growth for the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderLineChart(userGrowthData)}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Case Status Distribution
                  </CardTitle>
                  <CardDescription>Current case status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderPieChart(caseStatusData)}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Case Type Distribution
                  </CardTitle>
                  <CardDescription>Cases by practice area</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderPieChart(caseTypeData)}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Financial Reports */}
        {reportType === 'financial' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-600">$750,000</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Platform Fees</p>
                      <p className="text-2xl font-bold text-blue-600">$75,000</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    10% of total revenue
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg. Case Value</p>
                      <p className="text-2xl font-bold text-purple-600">$2,850</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-full">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-purple-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Monthly revenue for the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {renderBarChart(revenueData, 300)}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Practice Area</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderPieChart({
                    labels: ['Family Law', 'Criminal Defense', 'Personal Injury', 'Real Estate', 'Corporate', 'Immigration', 'Other'],
                    values: [180000, 120000, 160000, 90000, 85000, 65000, 50000]
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Earning Lawyers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lawyerPerformanceData.sort((a, b) => b.earnings - a.earnings).map((lawyer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{lawyer.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${lawyer.earnings.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{lawyer.cases} cases</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* User Analytics */}
        {reportType === 'users' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-blue-600">795</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-full">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-blue-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +22% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Clients</p>
                      <p className="text-2xl font-bold text-green-600">680</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-full">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +25% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Lawyers</p>
                      <p className="text-2xl font-bold text-purple-600">115</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-full">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-purple-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>Monthly user growth for the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {renderLineChart(userGrowthData)}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderPieChart({
                    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                    values: [5, 25, 30, 20, 15, 5]
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lawyer Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderPieChart({
                    labels: ['Family Law', 'Criminal Defense', 'Personal Injury', 'Real Estate', 'Corporate', 'Immigration', 'Other'],
                    values: [25, 15, 20, 12, 10, 8, 10]
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Case Analytics */}
        {reportType === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Cases</p>
                      <p className="text-2xl font-bold text-blue-600">265</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-full">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-blue-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Cases</p>
                      <p className="text-2xl font-bold text-green-600">120</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    45% of total cases
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-purple-600">92%</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-purple-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Dispute Rate</p>
                      <p className="text-2xl font-bold text-red-600">4.2%</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -1.5% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderPieChart(caseStatusData)}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderPieChart(caseTypeData)}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Case Resolution Time</CardTitle>
                <CardDescription>Average days to resolution by case type</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                {renderBarChart({
                  labels: ['Family Law', 'Criminal Defense', 'Personal Injury', 'Real Estate', 'Corporate', 'Immigration', 'Other'],
                  values: [45, 60, 90, 30, 75, 50, 55]
                })}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lawyer Performance */}
        {reportType === 'lawyers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Lawyers</p>
                      <p className="text-2xl font-bold text-blue-600">115</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-full">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-blue-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from previous {timeRange}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg. Rating</p>
                      <p className="text-2xl font-bold text-yellow-600">4.7</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-full">
                      <Star className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-yellow-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.2 from previous {timeRange}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg. Cases/Lawyer</p>
                      <p className="text-2xl font-bold text-purple-600">2.3</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-full">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-purple-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.5 from previous {timeRange}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Lawyers</CardTitle>
                <CardDescription>Based on ratings, case volume, and earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {lawyerPerformanceData.sort((a, b) => b.rating - a.rating).map((lawyer, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <h3 className="font-medium">{lawyer.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{lawyer.rating}</span>
                          <span className="text-xs text-gray-500 ml-2">({lawyer.cases} cases)</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6">
                        <div>
                          <p className="text-xs text-gray-500">Earnings</p>
                          <p className="font-medium">${lawyer.earnings.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Cases</p>
                          <p className="font-medium">{lawyer.cases}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Dispute Rate</p>
                          <p className="font-medium">{(lawyer.disputeRate * 100).toFixed(1)}%</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lawyer Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderPieChart({
                    labels: ['Family Law', 'Criminal Defense', 'Personal Injury', 'Real Estate', 'Corporate', 'Immigration', 'Other'],
                    values: [25, 15, 20, 12, 10, 8, 10]
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderBarChart({
                    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
                    values: [45, 35, 15, 4, 1]
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminReports;

