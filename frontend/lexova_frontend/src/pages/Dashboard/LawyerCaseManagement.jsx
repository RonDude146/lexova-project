import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LawyerDashboardLayout from '../../components/Dashboard/LawyerDashboardLayout';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  MessageCircle,
  FileText,
  Edit,
  Phone
} from 'lucide-react';

const LawyerCaseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [cases, setCases] = useState([
    {
      id: 1,
      title: 'Personal Injury Claim',
      caseNumber: 'PI-2024-001',
      type: 'Personal Injury',
      client: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567'
      },
      status: 'In Progress',
      priority: 'High',
      progress: 65,
      createdDate: '2024-10-15',
      lastUpdate: '2024-12-18',
      nextAppointment: '2024-12-20',
      hourlyRate: 350,
      hoursWorked: 24.5,
      totalBilled: 8575,
      description: 'Motor vehicle accident case involving multiple parties and insurance claims.',
      nextAction: 'Review medical records and prepare settlement demand',
      documents: 12,
      messages: 8
    },
    {
      id: 2,
      title: 'Contract Dispute',
      caseNumber: 'CD-2024-002',
      type: 'Contract Law',
      client: {
        name: 'ABC Corporation',
        email: 'legal@abccorp.com',
        phone: '+1 (555) 987-6543'
      },
      status: 'Pending Review',
      priority: 'Medium',
      progress: 30,
      createdDate: '2024-11-01',
      lastUpdate: '2024-12-15',
      nextAppointment: '2024-12-22',
      hourlyRate: 350,
      hoursWorked: 8.0,
      totalBilled: 2800,
      description: 'Commercial contract dispute regarding breach of service agreement.',
      nextAction: 'Client consultation to discuss settlement options',
      documents: 6,
      messages: 12
    },
    {
      id: 3,
      title: 'Employment Discrimination',
      caseNumber: 'ED-2024-003',
      type: 'Employment Law',
      client: {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1 (555) 456-7890'
      },
      status: 'In Progress',
      priority: 'High',
      progress: 80,
      createdDate: '2024-09-20',
      lastUpdate: '2024-12-17',
      nextAppointment: '2024-12-19',
      hourlyRate: 350,
      hoursWorked: 32.0,
      totalBilled: 11200,
      description: 'Workplace discrimination and wrongful termination case.',
      nextAction: 'Prepare settlement offer and negotiate with opposing counsel',
      documents: 18,
      messages: 24
    },
    {
      id: 4,
      title: 'Real Estate Transaction',
      caseNumber: 'RE-2024-004',
      type: 'Real Estate Law',
      client: {
        name: 'Michael Johnson',
        email: 'mjohnson@email.com',
        phone: '+1 (555) 321-0987'
      },
      status: 'Completed',
      priority: 'Low',
      progress: 100,
      createdDate: '2024-08-15',
      lastUpdate: '2024-12-01',
      nextAppointment: null,
      hourlyRate: 300,
      hoursWorked: 15.5,
      totalBilled: 4650,
      description: 'Commercial real estate purchase and due diligence.',
      nextAction: 'Case completed - final documents filed',
      documents: 25,
      messages: 15
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pending Review':
        return <AlertCircle className="h-4 w-4" />;
      case 'On Hold':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || case_.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const activeCases = cases.filter(c => c.status === 'In Progress' || c.status === 'Pending Review');
  const completedCases = cases.filter(c => c.status === 'Completed');
  const totalEarnings = cases.reduce((sum, c) => sum + c.totalBilled, 0);
  const totalHours = cases.reduce((sum, c) => sum + c.hoursWorked, 0);

  return (
    <LawyerDashboardLayout 
      title="Case Management" 
      subtitle="Manage all your legal cases and client matters"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold text-blue-600">{activeCases.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCases.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-purple-600">${totalEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hours Worked</p>
                  <p className="text-2xl font-bold text-orange-600">{totalHours}</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <Link to="/lawyer-dashboard/cases/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Case
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Cases ({filteredCases.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCases.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCases.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{case_.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {case_.caseNumber}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{case_.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {case_.client.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Created: {new Date(case_.createdDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {case_.hoursWorked}h worked
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(case_.status)}>
                          {getStatusIcon(case_.status)}
                          <span className="ml-1">{case_.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(case_.priority)}>
                          {case_.priority}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${case_.totalBilled.toLocaleString()} earned
                        </p>
                        <p className="text-xs text-gray-500">{case_.type}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {case_.status !== 'Completed' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">{case_.progress}%</span>
                      </div>
                      <Progress value={case_.progress} className="h-2" />
                    </div>
                  )}

                  {/* Next Action */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Next Action:</p>
                    <p className="text-sm text-blue-700">{case_.nextAction}</p>
                  </div>

                  {/* Case Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {case_.documents} documents
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {case_.messages} messages
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${case_.hourlyRate}/hr
                      </span>
                      {case_.nextAppointment && (
                        <span className="flex items-center gap-1 text-blue-600">
                          <Calendar className="h-4 w-4" />
                          Next: {new Date(case_.nextAppointment).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Link to={`/lawyer-dashboard/cases/${case_.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Client
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {case_.client.phone}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Update Case
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{case_.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {case_.caseNumber}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{case_.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {case_.client.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(case_.status)}>
                        {getStatusIcon(case_.status)}
                        <span className="ml-1">{case_.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{case_.progress}%</span>
                    </div>
                    <Progress value={case_.progress} className="h-2" />
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Next Action:</p>
                    <p className="text-sm text-blue-700">{case_.nextAction}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{case_.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {case_.caseNumber}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{case_.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {case_.client.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${case_.totalBilled.toLocaleString()} earned
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(case_.status)}>
                        {getStatusIcon(case_.status)}
                        <span className="ml-1">{case_.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No cases found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'You haven\'t been assigned any cases yet. Check back later for new client matches.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Link to="/lawyer-dashboard/profile">
                  <Button>
                    Update Profile to Get More Cases
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </LawyerDashboardLayout>
  );
};

export default LawyerCaseManagement;

