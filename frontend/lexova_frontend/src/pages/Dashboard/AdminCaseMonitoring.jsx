import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  Briefcase, 
  Search, 
  Eye,
  Edit, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  Scale,
  FileText,
  MessageSquare,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminCaseMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const [cases] = useState([
    {
      id: 'PI-2024-001',
      title: 'Motor Vehicle Accident Claim',
      client: 'John Doe',
      lawyer: 'Sarah Johnson',
      type: 'Personal Injury',
      status: 'active',
      priority: 'high',
      createdDate: '2024-11-15',
      lastUpdate: '2024-12-18',
      dueDate: '2024-12-25',
      totalBilled: 3500,
      hoursWorked: 12.5,
      progress: 65,
      description: 'Client injured in rear-end collision, seeking compensation for medical expenses and lost wages.',
      nextAction: 'Schedule medical examination',
      documents: 8,
      messages: 15
    },
    {
      id: 'CD-2024-002',
      title: 'Contract Dispute Resolution',
      client: 'ABC Corporation',
      lawyer: 'Michael Chen',
      type: 'Contract Law',
      status: 'pending',
      priority: 'medium',
      createdDate: '2024-12-01',
      lastUpdate: '2024-12-17',
      dueDate: '2024-12-30',
      totalBilled: 2800,
      hoursWorked: 8.0,
      progress: 30,
      description: 'Breach of contract dispute between ABC Corp and supplier regarding delivery terms.',
      nextAction: 'Review contract amendments',
      documents: 12,
      messages: 8
    },
    {
      id: 'ED-2024-003',
      title: 'Employment Discrimination Case',
      client: 'Jane Smith',
      lawyer: 'Emily Rodriguez',
      type: 'Employment Law',
      status: 'completed',
      priority: 'high',
      createdDate: '2024-10-20',
      lastUpdate: '2024-12-10',
      completedDate: '2024-12-10',
      totalBilled: 4200,
      hoursWorked: 18.5,
      progress: 100,
      description: 'Workplace discrimination case resulting in successful settlement.',
      outcome: 'Settled for $45,000',
      documents: 22,
      messages: 31
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'disputed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.lawyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || caseItem.status === filterStatus;
    const matchesType = filterType === 'all' || caseItem.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const activeCases = cases.filter(c => c.status === 'active');
  const pendingCases = cases.filter(c => c.status === 'pending');
  const completedCases = cases.filter(c => c.status === 'completed');
  const disputedCases = cases.filter(c => c.status === 'disputed');

  const totalBilled = cases.reduce((sum, c) => sum + c.totalBilled, 0);
  const totalHours = cases.reduce((sum, c) => sum + c.hoursWorked, 0);
  const averageProgress = cases.reduce((sum, c) => sum + c.progress, 0) / cases.length;

  return (
    <AdminDashboardLayout 
      title="Case Monitoring" 
      subtitle="Monitor and manage all legal cases on the platform"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cases</p>
                  <p className="text-2xl font-bold text-blue-600">{cases.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {activeCases.length} active, {completedCases.length} completed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Billed</p>
                  <p className="text-2xl font-bold text-green-600">${totalBilled.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {totalHours.toFixed(1)} hours worked
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                  <p className="text-2xl font-bold text-purple-600">{averageProgress.toFixed(0)}%</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Across all active cases
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Disputes</p>
                  <p className="text-2xl font-bold text-red-600">{disputedCases.length}</p>
                </div>
                <div className="bg-red-50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Require immediate attention
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
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Personal Injury">Personal Injury</SelectItem>
                    <SelectItem value="Contract Law">Contract Law</SelectItem>
                    <SelectItem value="Employment Law">Employment Law</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Family Law">Family Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{caseItem.title}</h3>
                      <Badge className={getStatusColor(caseItem.status)}>
                        {getStatusIcon(caseItem.status)}
                        <span className="ml-1">{caseItem.status}</span>
                      </Badge>
                      <Badge className={getPriorityColor(caseItem.priority)}>
                        {caseItem.priority} priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Client: {caseItem.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <Scale className="h-4 w-4" />
                        Lawyer: {caseItem.lawyer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {caseItem.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{caseItem.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{caseItem.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${caseItem.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created: {new Date(caseItem.createdDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Updated: {new Date(caseItem.lastUpdate).toLocaleDateString()}
                      </span>
                      {caseItem.dueDate && (
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          Due: {new Date(caseItem.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {caseItem.documents} docs
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {caseItem.messages} messages
                      </span>
                    </div>

                    {/* Next Action or Outcome */}
                    {caseItem.status === 'completed' && caseItem.outcome ? (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <CheckCircle className="h-4 w-4 inline mr-1" />
                          Outcome: {caseItem.outcome}
                        </p>
                      </div>
                    ) : caseItem.nextAction ? (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Next Action: {caseItem.nextAction}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="text-right ml-6">
                    <p className="text-lg font-semibold text-gray-900">
                      ${caseItem.totalBilled.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{caseItem.hoursWorked}h worked</p>
                    <p className="text-xs text-gray-400 mt-1">Case ID: {caseItem.id}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Case
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No cases found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCaseMonitoring;

