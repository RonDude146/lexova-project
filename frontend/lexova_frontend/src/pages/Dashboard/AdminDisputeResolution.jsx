import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye,
  MessageSquare, 
  CheckCircle,
  Clock,
  Calendar,
  User,
  Scale,
  FileText,
  Briefcase,
  Shield,
  XCircle,
  ArrowRight
} from 'lucide-react';

const AdminDisputeResolution = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState(null);

  const [disputes] = useState([
    {
      id: 'DSP-2024-001',
      caseId: 'PI-2024-001',
      caseTitle: 'Motor Vehicle Accident Claim',
      client: 'John Doe',
      lawyer: 'Sarah Johnson',
      type: 'service_quality',
      status: 'open',
      priority: 'high',
      createdDate: '2024-12-15',
      lastUpdate: '2024-12-18',
      description: 'Client claims lawyer is not responsive and has missed scheduled meetings twice.',
      clientStatement: 'I have tried to reach my lawyer multiple times but received no response for over a week. Additionally, she missed our scheduled consultation on Dec 10 and Dec 14 without any notice.',
      lawyerStatement: 'I was hospitalized from Dec 9-15 due to an emergency and was unable to access my work communications. I have since reached out to the client to reschedule.',
      evidence: [
        { type: 'message_log', description: 'Chat history showing unanswered messages', date: '2024-12-16' },
        { type: 'document', description: 'Missed appointment confirmation emails', date: '2024-12-16' }
      ],
      messages: [
        { sender: 'client', text: 'I would like to file a complaint about my lawyer\'s responsiveness.', date: '2024-12-15T10:30:00' },
        { sender: 'admin', text: 'We\'re sorry to hear about your experience. Could you provide more details about the issue?', date: '2024-12-15T11:15:00' },
        { sender: 'client', text: 'I\'ve sent multiple messages and my lawyer has missed two scheduled meetings without notice.', date: '2024-12-15T11:30:00' },
        { sender: 'admin', text: 'Thank you for the information. We\'ll contact your lawyer and investigate this matter.', date: '2024-12-15T11:45:00' },
        { sender: 'lawyer', text: 'I sincerely apologize for the lack of communication. I was hospitalized from Dec 9-15 due to an emergency.', date: '2024-12-18T09:20:00' }
      ]
    },
    {
      id: 'DSP-2024-002',
      caseId: 'CD-2024-002',
      caseTitle: 'Contract Dispute Resolution',
      client: 'ABC Corporation',
      lawyer: 'Michael Chen',
      type: 'billing',
      status: 'under_review',
      priority: 'medium',
      createdDate: '2024-12-10',
      lastUpdate: '2024-12-17',
      description: 'Client disputes the number of billable hours charged for contract review.',
      clientStatement: 'The invoice shows 8 hours for contract review, but our agreement was that it would take approximately 4-5 hours. This seems excessive for a standard 10-page agreement.',
      lawyerStatement: 'The contract contained several non-standard clauses that required additional research and consultation with a specialist. I have detailed time logs available for review.',
      evidence: [
        { type: 'document', description: 'Original invoice with time breakdown', date: '2024-12-10' },
        { type: 'document', description: 'Lawyer\'s detailed time logs', date: '2024-12-12' },
        { type: 'document', description: 'Initial service agreement', date: '2024-12-10' }
      ],
      messages: [
        { sender: 'client', text: 'I\'m disputing the hours billed on invoice INV-2024-002.', date: '2024-12-10T14:20:00' },
        { sender: 'admin', text: 'We\'ve received your dispute. Could you clarify which aspects of the billing you find excessive?', date: '2024-12-10T15:05:00' },
        { sender: 'client', text: 'The 8 hours charged for contract review seems excessive for a standard agreement.', date: '2024-12-10T15:30:00' },
        { sender: 'lawyer', text: 'I\'ve submitted my detailed time logs showing the additional research required for the non-standard clauses.', date: '2024-12-12T11:15:00' },
        { sender: 'admin', text: 'We\'re reviewing the submitted documentation and will provide a determination shortly.', date: '2024-12-17T10:30:00' }
      ]
    },
    {
      id: 'DSP-2024-003',
      caseId: 'FL-2024-005',
      caseTitle: 'Family Law Custody Case',
      client: 'Lisa Brown',
      lawyer: 'Jennifer Davis',
      type: 'case_handling',
      status: 'resolved',
      resolution: 'partial_refund',
      priority: 'high',
      createdDate: '2024-12-05',
      lastUpdate: '2024-12-16',
      resolvedDate: '2024-12-16',
      description: 'Client claims lawyer failed to submit important evidence before court deadline.',
      clientStatement: 'My lawyer failed to submit critical character witness statements before the court deadline, which has negatively impacted my custody case.',
      lawyerStatement: 'The witness statements were received only one day before the deadline, and there were issues with notarization that needed to be addressed. I should have communicated this challenge more clearly to the client.',
      resolution_details: 'Lawyer acknowledged communication failure. Partial refund of $800 issued to client. Lawyer will continue representation with additional preparation time at no cost.',
      evidence: [
        { type: 'document', description: 'Email correspondence regarding witness statements', date: '2024-12-05' },
        { type: 'document', description: 'Court filing deadline notice', date: '2024-12-05' },
        { type: 'document', description: 'Witness statement submission timestamps', date: '2024-12-05' }
      ],
      messages: [
        { sender: 'client', text: 'I\'m filing a complaint because my lawyer missed an important court filing deadline.', date: '2024-12-05T09:15:00' },
        { sender: 'admin', text: 'We take this matter seriously. Could you provide details about the missed deadline?', date: '2024-12-05T10:00:00' },
        { sender: 'lawyer', text: 'I\'ve reviewed the situation and acknowledge that I should have communicated the notarization issues sooner.', date: '2024-12-07T14:30:00' },
        { sender: 'admin', text: 'Based on our investigation, we\'re proposing a partial refund and additional services at no cost.', date: '2024-12-12T11:20:00' },
        { sender: 'client', text: 'I accept the proposed resolution.', date: '2024-12-14T15:45:00' },
        { sender: 'admin', text: 'The dispute has been resolved with a partial refund of $800. The refund has been processed.', date: '2024-12-16T10:15:00' }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'awaiting_response':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'billing':
        return 'bg-purple-100 text-purple-800';
      case 'service_quality':
        return 'bg-orange-100 text-orange-800';
      case 'case_handling':
        return 'bg-blue-100 text-blue-800';
      case 'ethics':
        return 'bg-red-100 text-red-800';
      case 'platform_issue':
        return 'bg-green-100 text-green-800';
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
      case 'open':
        return <AlertTriangle className="h-4 w-4" />;
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'awaiting_response':
        return <MessageSquare className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'billing':
        return 'Billing Dispute';
      case 'service_quality':
        return 'Service Quality';
      case 'case_handling':
        return 'Case Handling';
      case 'ethics':
        return 'Ethical Concern';
      case 'platform_issue':
        return 'Platform Issue';
      default:
        return type;
    }
  };

  const getResolutionLabel = (resolution) => {
    switch (resolution) {
      case 'full_refund':
        return 'Full Refund';
      case 'partial_refund':
        return 'Partial Refund';
      case 'service_credit':
        return 'Service Credit';
      case 'lawyer_replaced':
        return 'Lawyer Replaced';
      case 'no_action':
        return 'No Action Required';
      default:
        return resolution;
    }
  };

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.lawyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.caseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || dispute.status === filterStatus;
    const matchesType = filterType === 'all' || dispute.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const openDisputes = disputes.filter(d => d.status === 'open');
  const underReviewDisputes = disputes.filter(d => d.status === 'under_review');
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved');

  return (
    <AdminDashboardLayout 
      title="Dispute Resolution" 
      subtitle="Manage and resolve client-lawyer disputes"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Disputes</p>
                  <p className="text-2xl font-bold text-blue-600">{disputes.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {openDisputes.length} open, {resolvedDisputes.length} resolved
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Disputes</p>
                  <p className="text-2xl font-bold text-red-600">{openDisputes.length}</p>
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

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{underReviewDisputes.length}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                In progress
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedDisputes.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Successfully closed
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
                    placeholder="Search disputes..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="awaiting_response">Awaiting Response</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="service_quality">Service Quality</SelectItem>
                    <SelectItem value="case_handling">Case Handling</SelectItem>
                    <SelectItem value="ethics">Ethics</SelectItem>
                    <SelectItem value="platform_issue">Platform Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disputes List and Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Disputes List */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="open" className="flex-1">Open</TabsTrigger>
                <TabsTrigger value="under_review" className="flex-1">In Review</TabsTrigger>
                <TabsTrigger value="resolved" className="flex-1">Resolved</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-0">
                {filteredDisputes.map((dispute) => (
                  <Card 
                    key={dispute.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedDispute?.id === dispute.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{dispute.id}</h3>
                        <Badge className={getStatusColor(dispute.status)}>
                          {getStatusIcon(dispute.status)}
                          <span className="ml-1 capitalize">{dispute.status.replace('_', ' ')}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(dispute.type)}>
                          {getTypeLabel(dispute.type)}
                        </Badge>
                        <Badge className={getPriorityColor(dispute.priority)}>
                          {dispute.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{dispute.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(dispute.lastUpdate).toLocaleDateString()}</span>
                        <span className="flex items-center">
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="open" className="space-y-4 mt-0">
                {openDisputes.map((dispute) => (
                  <Card 
                    key={dispute.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedDispute?.id === dispute.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{dispute.id}</h3>
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Open
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{dispute.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(dispute.lastUpdate).toLocaleDateString()}</span>
                        <span className="flex items-center">
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="under_review" className="space-y-4 mt-0">
                {underReviewDisputes.map((dispute) => (
                  <Card 
                    key={dispute.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedDispute?.id === dispute.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{dispute.id}</h3>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-4 w-4 mr-1" />
                          Under Review
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{dispute.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(dispute.lastUpdate).toLocaleDateString()}</span>
                        <span className="flex items-center">
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4 mt-0">
                {resolvedDisputes.map((dispute) => (
                  <Card 
                    key={dispute.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedDispute?.id === dispute.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{dispute.id}</h3>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolved
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{dispute.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(dispute.lastUpdate).toLocaleDateString()}</span>
                        <span className="flex items-center">
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Dispute Detail View */}
          <div className="lg:col-span-2">
            {selectedDispute ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedDispute.id}
                        <Badge className={getStatusColor(selectedDispute.status)}>
                          {getStatusIcon(selectedDispute.status)}
                          <span className="ml-1 capitalize">{selectedDispute.status.replace('_', ' ')}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Case: {selectedDispute.caseId} - {selectedDispute.caseTitle}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {selectedDispute.status === 'open' && (
                        <Button size="sm">
                          <Clock className="h-4 w-4 mr-2" />
                          Start Review
                        </Button>
                      )}
                      {selectedDispute.status === 'under_review' && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dispute Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Dispute Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(selectedDispute.type)}>
                            {getTypeLabel(selectedDispute.type)}
                          </Badge>
                          <Badge className={getPriorityColor(selectedDispute.priority)}>
                            {selectedDispute.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{selectedDispute.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Created: {new Date(selectedDispute.createdDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Updated: {new Date(selectedDispute.lastUpdate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Parties Involved</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Client: {selectedDispute.client}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Scale className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Lawyer: {selectedDispute.lawyer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Case: {selectedDispute.caseId}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statements */}
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-800 mb-2">Client Statement</h3>
                      <p className="text-sm text-gray-700">{selectedDispute.clientStatement}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="text-sm font-medium text-purple-800 mb-2">Lawyer Statement</h3>
                      <p className="text-sm text-gray-700">{selectedDispute.lawyerStatement}</p>
                    </div>
                  </div>

                  {/* Resolution Details (if resolved) */}
                  {selectedDispute.status === 'resolved' && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="text-sm font-medium text-green-800 mb-2">Resolution</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-100 text-green-800">
                          {getResolutionLabel(selectedDispute.resolution)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Resolved on {new Date(selectedDispute.resolvedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{selectedDispute.resolution_details}</p>
                    </div>
                  )}

                  {/* Evidence */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Evidence Submitted</h3>
                    <div className="space-y-2">
                      {selectedDispute.evidence.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{item.description}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Communication History */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Communication History</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto p-2">
                      {selectedDispute.messages.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'client' 
                                ? 'bg-blue-50 text-blue-800' 
                                : message.sender === 'lawyer'
                                  ? 'bg-purple-50 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium capitalize">{message.sender}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(message.date).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Form (if not resolved) */}
                  {selectedDispute.status !== 'resolved' && (
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Take Action</h3>
                      <div className="space-y-3">
                        <Textarea 
                          placeholder="Add your response or notes..."
                          className="min-h-24"
                        />
                        <div className="flex gap-2">
                          <Button>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                          {selectedDispute.status === 'under_review' && (
                            <Button variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Propose Resolution
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a dispute</h3>
                  <p className="text-gray-600">
                    Choose a dispute from the list to view details and take action.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDisputeResolution;

