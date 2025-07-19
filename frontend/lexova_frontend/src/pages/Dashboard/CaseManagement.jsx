import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { 
  FileText, 
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
  Download,
  Upload
} from 'lucide-react';

const CaseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [cases, setCases] = useState([
    {
      id: 1,
      title: 'Personal Injury Claim',
      caseNumber: 'PI-2024-001',
      type: 'Personal Injury',
      lawyer: {
        name: 'Sarah Johnson',
        firm: 'Johnson & Associates',
        avatar: '/api/placeholder/40/40'
      },
      status: 'In Progress',
      priority: 'High',
      progress: 65,
      createdDate: '2024-10-15',
      lastUpdate: '2024-12-18',
      nextAppointment: '2024-12-20',
      totalBilled: 8500,
      description: 'Motor vehicle accident case involving multiple parties and insurance claims.',
      documents: 12,
      messages: 8
    },
    {
      id: 2,
      title: 'Contract Review',
      caseNumber: 'CR-2024-002',
      type: 'Contract Law',
      lawyer: {
        name: 'Michael Chen',
        firm: 'Chen Legal Group',
        avatar: '/api/placeholder/40/40'
      },
      status: 'Completed',
      priority: 'Medium',
      progress: 100,
      createdDate: '2024-11-01',
      lastUpdate: '2024-12-10',
      nextAppointment: null,
      totalBilled: 2500,
      description: 'Review and negotiation of employment contract terms.',
      documents: 6,
      messages: 4
    },
    {
      id: 3,
      title: 'Employment Dispute',
      caseNumber: 'ED-2024-003',
      type: 'Employment Law',
      lawyer: {
        name: 'Emily Rodriguez',
        firm: 'Rodriguez Law Firm',
        avatar: '/api/placeholder/40/40'
      },
      status: 'Pending Review',
      priority: 'High',
      progress: 30,
      createdDate: '2024-12-01',
      lastUpdate: '2024-12-15',
      nextAppointment: '2024-12-22',
      totalBilled: 1200,
      description: 'Wrongful termination and discrimination case.',
      documents: 8,
      messages: 12
    },
    {
      id: 4,
      title: 'Divorce Proceedings',
      caseNumber: 'DP-2024-004',
      type: 'Family Law',
      lawyer: {
        name: 'David Wilson',
        firm: 'Wilson Family Law',
        avatar: '/api/placeholder/40/40'
      },
      status: 'On Hold',
      priority: 'Medium',
      progress: 45,
      createdDate: '2024-09-20',
      lastUpdate: '2024-11-30',
      nextAppointment: '2024-12-28',
      totalBilled: 6800,
      description: 'Uncontested divorce with asset division and custody arrangements.',
      documents: 15,
      messages: 20
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
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || case_.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const activeCases = cases.filter(c => c.status === 'In Progress' || c.status === 'Pending Review');
  const completedCases = cases.filter(c => c.status === 'Completed');
  const onHoldCases = cases.filter(c => c.status === 'On Hold');

  return (
    <DashboardLayout 
      title="Case Management" 
      subtitle="Track and manage all your legal cases in one place"
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
                  <FileText className="h-5 w-5 text-blue-600" />
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
                  <p className="text-sm text-gray-600">On Hold</p>
                  <p className="text-2xl font-bold text-gray-600">{onHoldCases.length}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-full">
                  <XCircle className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Billed</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${cases.reduce((sum, c) => sum + c.totalBilled, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-purple-50 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-purple-600" />
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
              <Link to="/dashboard/cases/new">
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
                          {case_.lawyer.name} - {case_.lawyer.firm}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Created: {new Date(case_.createdDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Updated: {new Date(case_.lastUpdate).toLocaleDateString()}
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
                          ${case_.totalBilled.toLocaleString()} billed
                        </p>
                        <p className="text-xs text-gray-500">{case_.type}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{case_.progress}%</span>
                    </div>
                    <Progress value={case_.progress} className="h-2" />
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
                    <Link to={`/dashboard/cases/${case_.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Lawyer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Documents
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
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
                  {/* Same card content as above */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{case_.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {case_.caseNumber}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{case_.description}</p>
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
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No cases found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'You haven\'t created any cases yet. Start by finding a lawyer for your legal needs.'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <div className="flex gap-4 justify-center">
                  <Link to="/dashboard/matching">
                    <Button>
                      Find a Lawyer
                    </Button>
                  </Link>
                  <Link to="/dashboard/cases/new">
                    <Button variant="outline">
                      Create New Case
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CaseManagement;

