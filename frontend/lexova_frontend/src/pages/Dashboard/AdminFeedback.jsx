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
  MessageSquare, 
  Search, 
  Filter, 
  Eye,
  MessageCircle, 
  CheckCircle,
  Clock,
  Calendar,
  User,
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Send,
  Mail,
  AlertTriangle,
  BarChart
} from 'lucide-react';

const AdminFeedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Sample data for feedback
  const [feedbacks] = useState([
    {
      id: 'FB-2024-001',
      type: 'platform_feedback',
      subject: 'Suggestion for AI Matching Improvement',
      message: 'I think the AI matching system could be improved by adding more specific questions about case requirements. Currently, it feels a bit too general and I had to provide additional information to my lawyer after matching.',
      status: 'new',
      priority: 'medium',
      submittedBy: 'John Doe (Client)',
      submittedDate: '2024-12-18',
      email: 'john.doe@example.com',
      rating: 4,
      category: 'feature_suggestion',
      responses: []
    },
    {
      id: 'FB-2024-002',
      type: 'platform_feedback',
      subject: 'Dashboard UI Feedback',
      message: 'The client dashboard is great, but I find the case management section a bit confusing. It would be helpful to have a clearer visual indication of case progress and next steps.',
      status: 'in_progress',
      priority: 'low',
      submittedBy: 'Sarah Johnson (Client)',
      submittedDate: '2024-12-15',
      email: 'sarah.j@example.com',
      rating: 3,
      category: 'ui_ux',
      responses: [
        {
          responder: 'Admin',
          message: 'Thank you for your feedback, Sarah. Could you provide more specific details about what aspects of the case management section you find confusing?',
          date: '2024-12-16'
        }
      ]
    },
    {
      id: 'FB-2024-003',
      type: 'platform_feedback',
      subject: 'Payment System Issue',
      message: 'I encountered an error when trying to make a payment. After entering my credit card details and clicking submit, the page just refreshed without any confirmation or error message. I had to try three times before it worked.',
      status: 'resolved',
      priority: 'high',
      submittedBy: 'Michael Brown (Client)',
      submittedDate: '2024-12-10',
      email: 'michael.b@example.com',
      rating: 2,
      category: 'bug_report',
      responses: [
        {
          responder: 'Admin',
          message: 'We apologize for the inconvenience, Michael. Our team is investigating this issue. Could you please provide your browser type and version?',
          date: '2024-12-11'
        },
        {
          responder: 'Michael Brown',
          message: 'I was using Chrome version 119.0.6045.123 on Windows 11.',
          date: '2024-12-11'
        },
        {
          responder: 'Admin',
          message: 'Thank you for the information. We have identified and fixed the issue. The payment system should now work correctly. Please let us know if you encounter any further problems.',
          date: '2024-12-13'
        },
        {
          responder: 'Michael Brown',
          message: 'Just tested it again and it is working perfectly now. Thanks for the quick fix!',
          date: '2024-12-13'
        }
      ]
    },
    {
      id: 'FB-2024-004',
      type: 'lawyer_review',
      subject: 'Review for Emily Rodriguez',
      message: 'Emily was extremely professional and knowledgeable. She explained complex legal concepts in a way that was easy to understand and was always responsive to my questions. I highly recommend her services.',
      status: 'new',
      priority: 'medium',
      submittedBy: 'Jane Smith (Client)',
      submittedDate: '2024-12-17',
      email: 'jane.smith@example.com',
      rating: 5,
      lawyerId: 'LW-2024-003',
      lawyerName: 'Emily Rodriguez',
      caseId: 'ED-2024-003',
      responses: []
    },
    {
      id: 'FB-2024-005',
      type: 'lawyer_review',
      subject: 'Disappointed with Service',
      message: 'I was not satisfied with the service provided. Communication was poor and I often had to follow up multiple times to get responses. The legal advice provided was also very generic and did not seem tailored to my specific situation.',
      status: 'flagged',
      priority: 'high',
      submittedBy: 'Robert Wilson (Client)',
      submittedDate: '2024-12-14',
      email: 'robert.w@example.com',
      rating: 1,
      lawyerId: 'LW-2024-005',
      lawyerName: 'Jennifer Davis',
      caseId: 'FL-2024-005',
      responses: [
        {
          responder: 'Admin',
          message: 'We are sorry to hear about your experience, Robert. We take feedback seriously and would like to understand more about the issues you encountered. Could you provide specific examples of the communication problems?',
          date: '2024-12-15'
        },
        {
          responder: 'Jennifer Davis',
          message: 'I apologize for the experience, Mr. Wilson. There were some unexpected personal circumstances that affected my responsiveness, which I should have communicated better. I would be happy to discuss how we can resolve this situation.',
          date: '2024-12-16'
        }
      ],
      flagReason: 'Potential dispute case - lawyer has responded with explanation'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'flagged':
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'platform_feedback':
        return 'bg-purple-100 text-purple-800';
      case 'lawyer_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'feature_suggestion':
        return 'bg-green-100 text-green-800';
      case 'ui_ux':
        return 'bg-blue-100 text-blue-800';
      case 'bug_report':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <MessageCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'flagged':
        return <Flag className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
    const matchesType = filterType === 'all' || feedback.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const newFeedbacks = feedbacks.filter(f => f.status === 'new');
  const inProgressFeedbacks = feedbacks.filter(f => f.status === 'in_progress');
  const resolvedFeedbacks = feedbacks.filter(f => f.status === 'resolved');
  const flaggedFeedbacks = feedbacks.filter(f => f.status === 'flagged');

  const platformFeedbacks = feedbacks.filter(f => f.type === 'platform_feedback');
  const lawyerReviews = feedbacks.filter(f => f.type === 'lawyer_review');

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    // In a real application, this would send the reply to the backend
    // For now, we will just update the local state
    const updatedFeedback = {
      ...selectedFeedback,
      status: selectedFeedback.status === 'new' ? 'in_progress' : selectedFeedback.status,
      responses: [
        ...selectedFeedback.responses,
        {
          responder: 'Admin',
          message: replyText,
          date: new Date().toISOString().split('T')[0]
        }
      ]
    };
    
    setSelectedFeedback(updatedFeedback);
    setReplyText('');
  };

  const handleStatusChange = (newStatus) => {
    // In a real application, this would update the status in the backend
    // For now, we will just update the local state
    setSelectedFeedback({
      ...selectedFeedback,
      status: newStatus
    });
  };

  return (
    <AdminDashboardLayout 
      title="Feedback Management" 
      subtitle="Manage platform feedback and lawyer reviews"
    >
      <div className="space-y-6">
        {/* Feedback Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Feedback</p>
                  <p className="text-2xl font-bold text-blue-600">{feedbacks.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {platformFeedbacks.length} platform, {lawyerReviews.length} reviews
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Feedback</p>
                  <p className="text-2xl font-bold text-green-600">{newFeedbacks.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Awaiting response
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {(feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.filter(f => f.rating).length).toFixed(1)}
                  </p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                From {lawyerReviews.length} lawyer reviews
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Flagged Items</p>
                  <p className="text-2xl font-bold text-red-600">{flaggedFeedbacks.length}</p>
                </div>
                <div className="bg-red-50 p-2 rounded-full">
                  <Flag className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Require attention
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
                    placeholder="Search feedback..."
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="platform_feedback">Platform Feedback</SelectItem>
                    <SelectItem value="lawyer_review">Lawyer Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback List and Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feedback List */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="new" className="flex-1">New</TabsTrigger>
                <TabsTrigger value="in_progress" className="flex-1">In Progress</TabsTrigger>
                <TabsTrigger value="flagged" className="flex-1">Flagged</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-0">
                {filteredFeedbacks.map((feedback) => (
                  <Card 
                    key={feedback.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedFeedback?.id === feedback.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(feedback.type)}>
                            {feedback.type === 'platform_feedback' ? 'Feedback' : 'Review'}
                          </Badge>
                          <Badge className={getStatusColor(feedback.status)}>
                            {getStatusIcon(feedback.status)}
                            <span className="ml-1 capitalize">{feedback.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        {feedback.rating && (
                          <div className="flex items-center">
                            <Star className={`h-4 w-4 ${feedback.rating >= 4 ? 'text-yellow-500 fill-yellow-500' : feedback.rating >= 3 ? 'text-yellow-400 fill-yellow-400' : 'text-red-500 fill-red-500'}`} />
                            <span className="ml-1 text-sm font-medium">{feedback.rating}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{feedback.subject}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{feedback.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{feedback.submittedBy}</span>
                        <span>{feedback.submittedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredFeedbacks.length === 0 && (
                  <Card className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No feedback found</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="new" className="space-y-4 mt-0">
                {newFeedbacks.map((feedback) => (
                  <Card 
                    key={feedback.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedFeedback?.id === feedback.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTypeColor(feedback.type)}>
                          {feedback.type === 'platform_feedback' ? 'Feedback' : 'Review'}
                        </Badge>
                        {feedback.rating && (
                          <div className="flex items-center">
                            <Star className={`h-4 w-4 ${feedback.rating >= 4 ? 'text-yellow-500 fill-yellow-500' : feedback.rating >= 3 ? 'text-yellow-400 fill-yellow-400' : 'text-red-500 fill-red-500'}`} />
                            <span className="ml-1 text-sm font-medium">{feedback.rating}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{feedback.subject}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{feedback.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{feedback.submittedBy}</span>
                        <span>{feedback.submittedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {newFeedbacks.length === 0 && (
                  <Card className="p-8 text-center">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No new feedback</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="in_progress" className="space-y-4 mt-0">
                {inProgressFeedbacks.map((feedback) => (
                  <Card 
                    key={feedback.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedFeedback?.id === feedback.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTypeColor(feedback.type)}>
                          {feedback.type === 'platform_feedback' ? 'Feedback' : 'Review'}
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-4 w-4 mr-1" />
                          In Progress
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{feedback.subject}</h3>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{feedback.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{feedback.submittedBy}</span>
                        <span>{feedback.responses.length} responses</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {inProgressFeedbacks.length === 0 && (
                  <Card className="p-8 text-center">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No in-progress feedback</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="flagged" className="space-y-4 mt-0">
                {flaggedFeedbacks.map((feedback) => (
                  <Card 
                    key={feedback.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer border-red-200 ${selectedFeedback?.id === feedback.id ? 'border-red-500 shadow-md' : ''}`}
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getTypeColor(feedback.type)}>
                          {feedback.type === 'platform_feedback' ? 'Feedback' : 'Review'}
                        </Badge>
                        <Badge className="bg-red-100 text-red-800">
                          <Flag className="h-4 w-4 mr-1" />
                          Flagged
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{feedback.subject}</h3>
                      {feedback.flagReason && (
                        <p className="text-sm text-red-600 mb-2">{feedback.flagReason}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{feedback.submittedBy}</span>
                        <span>{feedback.submittedDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {flaggedFeedbacks.length === 0 && (
                  <Card className="p-8 text-center">
                    <Flag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No flagged feedback</p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Feedback Detail View */}
          <div className="lg:col-span-2">
            {selectedFeedback ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedFeedback.id}
                        <Badge className={getStatusColor(selectedFeedback.status)}>
                          {getStatusIcon(selectedFeedback.status)}
                          <span className="ml-1 capitalize">{selectedFeedback.status.replace('_', ' ')}</span>
                        </Badge>
                        <Badge className={getPriorityColor(selectedFeedback.priority)}>
                          {selectedFeedback.priority} priority
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {selectedFeedback.type === 'platform_feedback' ? 'Platform Feedback' : 'Lawyer Review'}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {selectedFeedback.status === 'new' && (
                        <Button size="sm" onClick={() => handleStatusChange('in_progress')}>
                          <Clock className="h-4 w-4 mr-2" />
                          Mark In Progress
                        </Button>
                      )}
                      {(selectedFeedback.status === 'new' || selectedFeedback.status === 'in_progress') && (
                        <Button size="sm" onClick={() => handleStatusChange('resolved')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Resolved
                        </Button>
                      )}
                      {selectedFeedback.status !== 'flagged' && (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleStatusChange('flagged')}>
                          <Flag className="h-4 w-4 mr-2" />
                          Flag
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Feedback Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Feedback Details</h3>
                      <div className="space-y-2">
                        <h4 className="text-base font-medium">{selectedFeedback.subject}</h4>
                        <p className="text-sm text-gray-700">{selectedFeedback.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Submitted: {selectedFeedback.submittedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Submitter Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedFeedback.submittedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedFeedback.email}</span>
                        </div>
                        {selectedFeedback.rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Rating:</span>
                            {getRatingStars(selectedFeedback.rating)}
                          </div>
                        )}
                        {selectedFeedback.category && (
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getCategoryColor(selectedFeedback.category)}>
                              {selectedFeedback.category.replace('_', ' ')}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Lawyer Information (if review) */}
                  {selectedFeedback.type === 'lawyer_review' && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Lawyer Information</h3>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{selectedFeedback.lawyerName}</h4>
                            <p className="text-sm text-gray-600">ID: {selectedFeedback.lawyerId}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                        </div>
                        {selectedFeedback.caseId && (
                          <div className="mt-2 pt-2 border-t border-blue-100">
                            <p className="text-sm text-gray-600">Related Case: {selectedFeedback.caseId}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Flag Reason (if flagged) */}
                  {selectedFeedback.status === 'flagged' && selectedFeedback.flagReason && (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h3 className="text-sm font-medium text-red-800 mb-2">Flag Reason</h3>
                      <p className="text-sm text-red-700">{selectedFeedback.flagReason}</p>
                    </div>
                  )}

                  {/* Communication History */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Communication History</h3>
                    {selectedFeedback.responses.length > 0 ? (
                      <div className="space-y-3 max-h-60 overflow-y-auto p-2">
                        {selectedFeedback.responses.map((response, index) => (
                          <div 
                            key={index} 
                            className={`flex ${response.responder === 'Admin' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] p-3 rounded-lg ${
                                response.responder === 'Admin' 
                                  ? 'bg-blue-50 text-blue-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium">{response.responder}</span>
                                <span className="text-xs text-gray-500">
                                  {response.date}
                                </span>
                              </div>
                              <p className="text-sm">{response.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">No responses yet</p>
                      </div>
                    )}
                  </div>

                  {/* Reply Form */}
                  {selectedFeedback.status !== 'resolved' && (
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Send Response</h3>
                      <div className="space-y-3">
                        <Textarea 
                          placeholder="Type your response here..."
                          className="min-h-24"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Response
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select feedback</h3>
                  <p className="text-gray-600">
                    Choose a feedback item from the list to view details and respond.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Feedback Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Analytics</CardTitle>
            <CardDescription>Overview of feedback trends and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rating Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = lawyerReviews.filter(r => r.rating === rating).length;
                    const percentage = lawyerReviews.length > 0 ? (count / lawyerReviews.length) * 100 : 0;
                    
                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center w-16">
                          <span className="text-sm font-medium">{rating}</span>
                          <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              rating >= 4 ? 'bg-green-500' : 
                              rating === 3 ? 'bg-yellow-500' : 
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

              {/* Feedback Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Feedback Categories</h3>
                <div className="space-y-3">
                  {['feature_suggestion', 'ui_ux', 'bug_report'].map((category) => {
                    const count = platformFeedbacks.filter(f => f.category === category).length;
                    const percentage = platformFeedbacks.length > 0 ? (count / platformFeedbacks.length) * 100 : 0;
                    
                    return (
                      <div key={category} className="flex items-center gap-2">
                        <div className="w-32">
                          <Badge className={getCategoryColor(category)}>
                            {category.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              category === 'feature_suggestion' ? 'bg-green-500' : 
                              category === 'ui_ux' ? 'bg-blue-500' : 
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
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminFeedback;

