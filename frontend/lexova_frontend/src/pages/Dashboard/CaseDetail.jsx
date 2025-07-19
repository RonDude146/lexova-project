import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { 
  ArrowLeft,
  FileText, 
  Calendar, 
  Clock, 
  User, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Download,
  Upload,
  Phone,
  Video,
  Mail,
  Star,
  Edit,
  Send,
  Paperclip,
  Eye
} from 'lucide-react';

const CaseDetail = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  
  // Mock case data - in real app, this would be fetched based on ID
  const caseData = {
    id: 1,
    title: 'Personal Injury Claim',
    caseNumber: 'PI-2024-001',
    type: 'Personal Injury',
    status: 'In Progress',
    priority: 'High',
    progress: 65,
    createdDate: '2024-10-15',
    lastUpdate: '2024-12-18',
    nextAppointment: '2024-12-20T14:00:00',
    totalBilled: 8500,
    estimatedTotal: 15000,
    description: 'Motor vehicle accident case involving multiple parties and insurance claims. Client sustained injuries requiring ongoing medical treatment.',
    lawyer: {
      name: 'Sarah Johnson',
      firm: 'Johnson & Associates',
      email: 'sarah@johnsonlaw.com',
      phone: '+1 (555) 123-4567',
      avatar: '/api/placeholder/60/60',
      rating: 4.9,
      experience: 12
    },
    timeline: [
      {
        id: 1,
        date: '2024-12-18',
        title: 'Medical Records Received',
        description: 'Received complete medical records from treating physician.',
        type: 'document',
        user: 'Sarah Johnson'
      },
      {
        id: 2,
        date: '2024-12-15',
        title: 'Insurance Company Response',
        description: 'Received initial settlement offer from defendant\'s insurance company.',
        type: 'update',
        user: 'Sarah Johnson'
      },
      {
        id: 3,
        date: '2024-12-10',
        title: 'Client Meeting Completed',
        description: 'Discussed case strategy and next steps with client.',
        type: 'meeting',
        user: 'Sarah Johnson'
      },
      {
        id: 4,
        date: '2024-12-05',
        title: 'Expert Witness Consultation',
        description: 'Consulted with accident reconstruction expert.',
        type: 'consultation',
        user: 'Sarah Johnson'
      },
      {
        id: 5,
        date: '2024-11-28',
        title: 'Discovery Phase Initiated',
        description: 'Began formal discovery process with opposing counsel.',
        type: 'legal',
        user: 'Sarah Johnson'
      }
    ],
    documents: [
      {
        id: 1,
        name: 'Police Report.pdf',
        type: 'PDF',
        size: '2.4 MB',
        uploadDate: '2024-10-16',
        category: 'Evidence'
      },
      {
        id: 2,
        name: 'Medical Records - Dr. Smith.pdf',
        type: 'PDF',
        size: '1.8 MB',
        uploadDate: '2024-12-18',
        category: 'Medical'
      },
      {
        id: 3,
        name: 'Insurance Correspondence.pdf',
        type: 'PDF',
        size: '856 KB',
        uploadDate: '2024-12-15',
        category: 'Insurance'
      },
      {
        id: 4,
        name: 'Witness Statements.docx',
        type: 'DOCX',
        size: '1.2 MB',
        uploadDate: '2024-11-20',
        category: 'Evidence'
      },
      {
        id: 5,
        name: 'Accident Photos.zip',
        type: 'ZIP',
        size: '15.6 MB',
        uploadDate: '2024-10-16',
        category: 'Evidence'
      }
    ],
    messages: [
      {
        id: 1,
        sender: 'Sarah Johnson',
        message: 'I\'ve received the latest medical records from Dr. Smith. The documentation looks comprehensive and will strengthen our case significantly.',
        timestamp: '2024-12-18T10:30:00',
        isLawyer: true
      },
      {
        id: 2,
        sender: 'John Doe',
        message: 'Thank you for the update. When do you think we might hear back from the insurance company regarding our counter-offer?',
        timestamp: '2024-12-17T15:45:00',
        isLawyer: false
      },
      {
        id: 3,
        sender: 'Sarah Johnson',
        message: 'Based on my experience, we should expect a response within 2-3 weeks. I\'ll follow up if we don\'t hear back by then.',
        timestamp: '2024-12-17T16:20:00',
        isLawyer: true
      }
    ],
    billing: [
      {
        id: 1,
        date: '2024-12-15',
        description: 'Legal research and case preparation',
        hours: 4.5,
        rate: 350,
        amount: 1575
      },
      {
        id: 2,
        date: '2024-12-10',
        description: 'Client consultation and strategy meeting',
        hours: 2.0,
        rate: 350,
        amount: 700
      },
      {
        id: 3,
        date: '2024-12-05',
        description: 'Expert witness consultation',
        hours: 3.0,
        rate: 350,
        amount: 1050
      },
      {
        id: 4,
        date: '2024-11-28',
        description: 'Discovery document preparation',
        hours: 6.5,
        rate: 350,
        amount: 2275
      }
    ]
  };

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

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      case 'update':
        return <AlertCircle className="h-4 w-4" />;
      case 'consultation':
        return <User className="h-4 w-4" />;
      case 'legal':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout 
      title={caseData.title}
      subtitle={`Case ${caseData.caseNumber} - ${caseData.type}`}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <div>
          <Link to="/dashboard/cases">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cases
            </Button>
          </Link>
        </div>

        {/* Case Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{caseData.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {caseData.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(caseData.status)}>
                      {caseData.status}
                    </Badge>
                    <Badge className={getPriorityColor(caseData.priority)}>
                      {caseData.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Case Progress</span>
                      <span className="text-sm text-gray-500">{caseData.progress}%</span>
                    </div>
                    <Progress value={caseData.progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-gray-600">Created</p>
                      <p className="font-medium">{new Date(caseData.createdDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Update</p>
                      <p className="font-medium">{new Date(caseData.lastUpdate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Billed</p>
                      <p className="font-medium">${caseData.totalBilled.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Total</p>
                      <p className="font-medium">${caseData.estimatedTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lawyer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Your Lawyer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{caseData.lawyer.name}</h3>
                  <p className="text-sm text-gray-600">{caseData.lawyer.firm}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">{caseData.lawyer.rating} • {caseData.lawyer.experience} years</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call {caseData.lawyer.phone}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email {caseData.lawyer.email}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>

              {caseData.nextAppointment && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Next Appointment</p>
                  <p className="text-sm text-blue-700">
                    {new Date(caseData.nextAppointment).toLocaleDateString()} at{' '}
                    {new Date(caseData.nextAppointment).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents ({caseData.documents.length})</TabsTrigger>
            <TabsTrigger value="messages">Messages ({caseData.messages.length})</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
                <CardDescription>
                  Track all activities and updates for this case
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {caseData.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{event.description}</p>
                        <p className="text-xs text-gray-500 mt-2">by {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Case Documents</CardTitle>
                  <CardDescription>
                    All documents related to this case
                  </CardDescription>
                </div>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {caseData.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{doc.type}</span>
                            <span>{doc.size}</span>
                            <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {doc.category}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communication with your lawyer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {caseData.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isLawyer ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isLawyer 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isLawyer ? 'text-gray-500' : 'text-blue-100'
                        }`}>
                          {message.sender} • {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                      className="flex-1"
                    />
                    <div className="flex flex-col space-y-2">
                      <Button size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Detailed breakdown of legal fees and expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.billing.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{entry.description}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(entry.date).toLocaleDateString()} • {entry.hours} hours @ ${entry.rate}/hr
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${entry.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Billed:</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${caseData.totalBilled.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Estimated Remaining:</span>
                      <span className="text-sm text-gray-600">
                        ${(caseData.estimatedTotal - caseData.totalBilled).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CaseDetail;

