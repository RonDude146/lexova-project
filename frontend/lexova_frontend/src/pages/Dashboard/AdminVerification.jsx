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
  Search, 
  Filter, 
  Eye,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Shield,
  FileCheck,
  X,
  AlertTriangle,
  FileText,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Download,
  CheckSquare,
  XSquare,
  BarChart,
  Hourglass
} from 'lucide-react';

const AdminVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  // Sample data for lawyers pending verification
  const [lawyers] = useState([
    {
      id: 'LW-2024-101',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      specialization: 'Criminal Defense',
      status: 'pending',
      submittedDate: '2024-12-15',
      documents: [
        { id: 'doc-1', name: 'Bar Association Certificate', type: 'license', status: 'pending', path: '/documents/bar_certificate.pdf' },
        { id: 'doc-2', name: 'Professional Liability Insurance', type: 'insurance', status: 'pending', path: '/documents/liability_insurance.pdf' },
        { id: 'doc-3', name: 'Law Degree', type: 'education', status: 'pending', path: '/documents/law_degree.pdf' },
        { id: 'doc-4', name: 'Government ID', type: 'identity', status: 'pending', path: '/documents/government_id.pdf' }
      ],
      education: [
        { institution: 'Harvard Law School', degree: 'Juris Doctor', year: '2015' },
        { institution: 'University of Pennsylvania', degree: 'Bachelor of Arts, Political Science', year: '2012' }
      ],
      experience: [
        { position: 'Associate Attorney', company: 'Smith & Associates', years: '2015-2020' },
        { position: 'Senior Attorney', company: 'Wilson Legal Group', years: '2020-Present' }
      ],
      barNumber: 'NY123456',
      notes: []
    },
    {
      id: 'LW-2024-102',
      name: 'Jennifer Davis',
      email: 'jennifer.davis@example.com',
      phone: '(555) 234-5678',
      location: 'Chicago, IL',
      specialization: 'Family Law',
      status: 'pending',
      submittedDate: '2024-12-14',
      documents: [
        { id: 'doc-5', name: 'Bar Association Certificate', type: 'license', status: 'pending', path: '/documents/bar_certificate_jd.pdf' },
        { id: 'doc-6', name: 'Professional Liability Insurance', type: 'insurance', status: 'pending', path: '/documents/liability_insurance_jd.pdf' },
        { id: 'doc-7', name: 'Law Degree', type: 'education', status: 'pending', path: '/documents/law_degree_jd.pdf' },
        { id: 'doc-8', name: 'Government ID', type: 'identity', status: 'pending', path: '/documents/government_id_jd.pdf' }
      ],
      education: [
        { institution: 'University of Chicago Law School', degree: 'Juris Doctor', year: '2010' },
        { institution: 'Northwestern University', degree: 'Bachelor of Science, Psychology', year: '2007' }
      ],
      experience: [
        { position: 'Family Law Attorney', company: 'Chicago Legal Aid', years: '2010-2015' },
        { position: 'Partner', company: 'Davis Family Law', years: '2015-Present' }
      ],
      barNumber: 'IL789012',
      notes: []
    },
    {
      id: 'LW-2024-103',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '(555) 345-6789',
      location: 'San Francisco, CA',
      specialization: 'Intellectual Property',
      status: 'in_review',
      submittedDate: '2024-12-10',
      documents: [
        { id: 'doc-9', name: 'Bar Association Certificate', type: 'license', status: 'approved', path: '/documents/bar_certificate_mc.pdf' },
        { id: 'doc-10', name: 'Professional Liability Insurance', type: 'insurance', status: 'approved', path: '/documents/liability_insurance_mc.pdf' },
        { id: 'doc-11', name: 'Law Degree', type: 'education', status: 'approved', path: '/documents/law_degree_mc.pdf' },
        { id: 'doc-12', name: 'Government ID', type: 'identity', status: 'in_review', path: '/documents/government_id_mc.pdf' }
      ],
      education: [
        { institution: 'Stanford Law School', degree: 'Juris Doctor', year: '2013' },
        { institution: 'MIT', degree: 'Bachelor of Science, Computer Science', year: '2010' }
      ],
      experience: [
        { position: 'Patent Attorney', company: 'Tech Law Partners', years: '2013-2018' },
        { position: 'IP Counsel', company: 'Silicon Valley Legal', years: '2018-Present' }
      ],
      barNumber: 'CA456789',
      notes: [
        { author: 'Admin', date: '2024-12-12', text: 'Bar certificate and insurance documentation verified. Awaiting final ID verification.' }
      ]
    },
    {
      id: 'LW-2024-104',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '(555) 456-7890',
      location: 'Boston, MA',
      specialization: 'Corporate Law',
      status: 'approved',
      submittedDate: '2024-12-05',
      approvedDate: '2024-12-08',
      documents: [
        { id: 'doc-13', name: 'Bar Association Certificate', type: 'license', status: 'approved', path: '/documents/bar_certificate_sj.pdf' },
        { id: 'doc-14', name: 'Professional Liability Insurance', type: 'insurance', status: 'approved', path: '/documents/liability_insurance_sj.pdf' },
        { id: 'doc-15', name: 'Law Degree', type: 'education', status: 'approved', path: '/documents/law_degree_sj.pdf' },
        { id: 'doc-16', name: 'Government ID', type: 'identity', status: 'approved', path: '/documents/government_id_sj.pdf' }
      ],
      education: [
        { institution: 'Harvard Law School', degree: 'Juris Doctor', year: '2011' },
        { institution: 'Boston University', degree: 'Bachelor of Arts, Economics', year: '2008' }
      ],
      experience: [
        { position: 'Corporate Attorney', company: 'Boston Legal Partners', years: '2011-2016' },
        { position: 'Senior Counsel', company: 'Johnson Corporate Law', years: '2016-Present' }
      ],
      barNumber: 'MA234567',
      notes: [
        { author: 'Admin', date: '2024-12-07', text: 'All documents verified. Professional standing confirmed with MA Bar Association.' },
        { author: 'Admin', date: '2024-12-08', text: 'Verification complete. Approved for platform access.' }
      ]
    },
    {
      id: 'LW-2024-105',
      name: 'Robert Taylor',
      email: 'robert.taylor@example.com',
      phone: '(555) 567-8901',
      location: 'Miami, FL',
      specialization: 'Real Estate Law',
      status: 'rejected',
      submittedDate: '2024-12-03',
      rejectedDate: '2024-12-06',
      documents: [
        { id: 'doc-17', name: 'Bar Association Certificate', type: 'license', status: 'rejected', path: '/documents/bar_certificate_rt.pdf' },
        { id: 'doc-18', name: 'Professional Liability Insurance', type: 'insurance', status: 'approved', path: '/documents/liability_insurance_rt.pdf' },
        { id: 'doc-19', name: 'Law Degree', type: 'education', status: 'approved', path: '/documents/law_degree_rt.pdf' },
        { id: 'doc-20', name: 'Government ID', type: 'identity', status: 'approved', path: '/documents/government_id_rt.pdf' }
      ],
      education: [
        { institution: 'University of Miami School of Law', degree: 'Juris Doctor', year: '2014' },
        { institution: 'Florida State University', degree: 'Bachelor of Science, Business', year: '2011' }
      ],
      experience: [
        { position: 'Real Estate Attorney', company: 'Miami Property Law', years: '2014-2019' },
        { position: 'Principal Attorney', company: 'Taylor Real Estate Legal', years: '2019-Present' }
      ],
      barNumber: 'FL567890',
      notes: [
        { author: 'Admin', date: '2024-12-05', text: 'Bar certificate appears to be expired. Contacted applicant for updated documentation.' },
        { author: 'Admin', date: '2024-12-06', text: 'No response from applicant. Bar Association confirms license is currently suspended. Application rejected.' }
      ],
      rejectionReason: 'Bar license currently suspended. Applicant may reapply when license is reinstated.'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in_review':
        return <Eye className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lawyer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingLawyers = lawyers.filter(l => l.status === 'pending');
  const inReviewLawyers = lawyers.filter(l => l.status === 'in_review');
  const approvedLawyers = lawyers.filter(l => l.status === 'approved');
  const rejectedLawyers = lawyers.filter(l => l.status === 'rejected');

  const handleDocumentStatusChange = (docId, newStatus) => {
    if (!selectedLawyer) return;
    
    // In a real application, this would update the backend
    // For now, we'll just update the local state
    const updatedDocs = selectedLawyer.documents.map(doc => 
      doc.id === docId ? { ...doc, status: newStatus } : doc
    );
    
    setSelectedLawyer({
      ...selectedLawyer,
      documents: updatedDocs
    });
  };

  const handleAddNote = () => {
    if (!verificationNotes.trim() || !selectedLawyer) return;
    
    // In a real application, this would send the note to the backend
    // For now, we'll just update the local state
    const newNote = {
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      text: verificationNotes
    };
    
    setSelectedLawyer({
      ...selectedLawyer,
      notes: [...selectedLawyer.notes, newNote]
    });
    
    setVerificationNotes('');
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedLawyer) return;
    
    // In a real application, this would update the status in the backend
    // For now, we'll just update the local state
    const statusUpdate = {
      status: newStatus
    };
    
    if (newStatus === 'approved') {
      statusUpdate.approvedDate = new Date().toISOString().split('T')[0];
    } else if (newStatus === 'rejected') {
      statusUpdate.rejectedDate = new Date().toISOString().split('T')[0];
    }
    
    setSelectedLawyer({
      ...selectedLawyer,
      ...statusUpdate
    });
  };

  const allDocsVerified = (lawyer) => {
    return lawyer.documents.every(doc => doc.status === 'approved');
  };

  return (
    <AdminDashboardLayout 
      title="Lawyer Verification" 
      subtitle="Verify lawyer credentials and approve platform access"
    >
      <div className="space-y-6">
        {/* Verification Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-blue-600">{lawyers.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Lawyer verification requests
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingLawyers.length}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Awaiting initial review
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{inReviewLawyers.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Currently under review
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{approvedLawyers.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Verified and active
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
                    placeholder="Search lawyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification List and Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lawyer List */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
                <TabsTrigger value="in_review" className="flex-1">In Review</TabsTrigger>
                <TabsTrigger value="approved" className="flex-1">Approved</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-0">
                {filteredLawyers.map((lawyer) => (
                  <Card 
                    key={lawyer.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedLawyer?.id === lawyer.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedLawyer(lawyer)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getStatusColor(lawyer.status)}>
                          {getStatusIcon(lawyer.status)}
                          <span className="ml-1 capitalize">{lawyer.status.replace('_', ' ')}</span>
                        </Badge>
                        <span className="text-xs text-gray-500">{lawyer.id}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{lawyer.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">{lawyer.specialization}</p>
                      <p className="text-xs text-gray-500 mb-2">{lawyer.location}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Submitted: {lawyer.submittedDate}</span>
                        <span>{lawyer.documents.filter(d => d.status === 'approved').length}/{lawyer.documents.length} verified</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredLawyers.length === 0 && (
                  <Card className="p-8 text-center">
                    <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No lawyers found</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-0">
                {pendingLawyers.filter(lawyer => 
                  lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((lawyer) => (
                  <Card 
                    key={lawyer.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedLawyer?.id === lawyer.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedLawyer(lawyer)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </Badge>
                        <span className="text-xs text-gray-500">{lawyer.id}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{lawyer.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">{lawyer.specialization}</p>
                      <p className="text-xs text-gray-500 mb-2">{lawyer.location}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Submitted: {lawyer.submittedDate}</span>
                        <span>{lawyer.documents.filter(d => d.status === 'approved').length}/{lawyer.documents.length} verified</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {pendingLawyers.filter(lawyer => 
                  lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <Card className="p-8 text-center">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No pending applications</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="in_review" className="space-y-4 mt-0">
                {inReviewLawyers.filter(lawyer => 
                  lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((lawyer) => (
                  <Card 
                    key={lawyer.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedLawyer?.id === lawyer.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedLawyer(lawyer)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          <Eye className="h-4 w-4 mr-1" />
                          In Review
                        </Badge>
                        <span className="text-xs text-gray-500">{lawyer.id}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{lawyer.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">{lawyer.specialization}</p>
                      <p className="text-xs text-gray-500 mb-2">{lawyer.location}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Submitted: {lawyer.submittedDate}</span>
                        <span>{lawyer.documents.filter(d => d.status === 'approved').length}/{lawyer.documents.length} verified</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {inReviewLawyers.filter(lawyer => 
                  lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <Card className="p-8 text-center">
                    <Eye className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No applications in review</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4 mt-0">
                {approvedLawyers.filter(lawyer => 
                  lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((lawyer) => (
                  <Card 
                    key={lawyer.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedLawyer?.id === lawyer.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => setSelectedLawyer(lawyer)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approved
                        </Badge>
                        <span className="text-xs text-gray-500">{lawyer.id}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{lawyer.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">{lawyer.specialization}</p>
                      <p className="text-xs text-gray-500 mb-2">{lawyer.location}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Approved: {lawyer.approvedDate}</span>
                        <span>{lawyer.documents.length}/{lawyer.documents.length} verified</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {approvedLawyers.filter(lawyer => 
                  lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <Card className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No approved lawyers</p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Verification Detail View */}
          <div className="lg:col-span-2">
            {selectedLawyer ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedLawyer.name}
                        <Badge className={getStatusColor(selectedLawyer.status)}>
                          {getStatusIcon(selectedLawyer.status)}
                          <span className="ml-1 capitalize">{selectedLawyer.status.replace('_', ' ')}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {selectedLawyer.id} • {selectedLawyer.specialization}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {selectedLawyer.status === 'pending' && (
                        <Button size="sm" onClick={() => handleStatusChange('in_review')}>
                          <Eye className="h-4 w-4 mr-2" />
                          Start Review
                        </Button>
                      )}
                      {selectedLawyer.status === 'in_review' && allDocsVerified(selectedLawyer) && (
                        <Button size="sm" onClick={() => handleStatusChange('approved')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      )}
                      {(selectedLawyer.status === 'pending' || selectedLawyer.status === 'in_review') && (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleStatusChange('rejected')}>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Lawyer Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedLawyer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedLawyer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{selectedLawyer.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Bar Number: {selectedLawyer.barNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Application Status</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Submitted: {selectedLawyer.submittedDate}</span>
                        </div>
                        {selectedLawyer.status === 'approved' && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Approved: {selectedLawyer.approvedDate}</span>
                          </div>
                        )}
                        {selectedLawyer.status === 'rejected' && (
                          <div className="flex items-center gap-2">
                            <X className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Rejected: {selectedLawyer.rejectedDate}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Documents: {selectedLawyer.documents.filter(d => d.status === 'approved').length}/{selectedLawyer.documents.length} verified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Verification */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Document Verification</h3>
                    <div className="space-y-3">
                      {selectedLawyer.documents.map((doc) => (
                        <Card key={doc.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-xs text-gray-500">{doc.type}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getDocStatusColor(doc.status)}>
                                  {getStatusIcon(doc.status)}
                                  <span className="ml-1 capitalize">{doc.status.replace('_', ' ')}</span>
                                </Badge>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </div>
                            </div>
                            {(selectedLawyer.status === 'in_review' || selectedLawyer.status === 'pending') && doc.status !== 'approved' && doc.status !== 'rejected' && (
                              <div className="flex justify-end gap-2 mt-3">
                                <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleDocumentStatusChange(doc.id, 'approved')}>
                                  <CheckSquare className="h-4 w-4 mr-2" />
                                  Verify
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDocumentStatusChange(doc.id, 'rejected')}>
                                  <XSquare className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Education & Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Education</h3>
                      <div className="space-y-3">
                        {selectedLawyer.education.map((edu, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium">{edu.institution}</h4>
                            <p className="text-sm text-gray-700">{edu.degree}</p>
                            <p className="text-xs text-gray-500">Graduated: {edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Experience</h3>
                      <div className="space-y-3">
                        {selectedLawyer.experience.map((exp, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium">{exp.position}</h4>
                            <p className="text-sm text-gray-700">{exp.company}</p>
                            <p className="text-xs text-gray-500">{exp.years}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rejection Reason (if rejected) */}
                  {selectedLawyer.status === 'rejected' && selectedLawyer.rejectionReason && (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h3 className="text-sm font-medium text-red-800 mb-2">Rejection Reason</h3>
                      <p className="text-sm text-red-700">{selectedLawyer.rejectionReason}</p>
                    </div>
                  )}

                  {/* Verification Notes */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Verification Notes</h3>
                    {selectedLawyer.notes.length > 0 ? (
                      <div className="space-y-3 max-h-60 overflow-y-auto p-2">
                        {selectedLawyer.notes.map((note, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium">{note.author}</span>
                              <span className="text-xs text-gray-500">{note.date}</span>
                            </div>
                            <p className="text-sm text-gray-700">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">No notes yet</p>
                      </div>
                    )}
                  </div>

                  {/* Add Note Form */}
                  {(selectedLawyer.status === 'in_review' || selectedLawyer.status === 'pending') && (
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Add Verification Note</h3>
                      <div className="space-y-3">
                        <Textarea 
                          placeholder="Add notes about verification process..."
                          className="min-h-24"
                          value={verificationNotes}
                          onChange={(e) => setVerificationNotes(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button onClick={handleAddNote} disabled={!verificationNotes.trim()}>
                            Add Note
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
                  <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a lawyer to verify</h3>
                  <p className="text-gray-600">
                    Choose a lawyer from the list to review their credentials and verify their account.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Verification Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Analytics</CardTitle>
            <CardDescription>Overview of lawyer verification process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Application Status Distribution</h3>
                <div className="space-y-3">
                  {[
                    { status: 'pending', label: 'Pending', count: pendingLawyers.length },
                    { status: 'in_review', label: 'In Review', count: inReviewLawyers.length },
                    { status: 'approved', label: 'Approved', count: approvedLawyers.length },
                    { status: 'rejected', label: 'Rejected', count: rejectedLawyers.length }
                  ].map((item) => {
                    const percentage = lawyers.length > 0 ? (item.count / lawyers.length) * 100 : 0;
                    
                    return (
                      <div key={item.status} className="flex items-center gap-2">
                        <div className="w-24">
                          <Badge className={getStatusColor(item.status)}>
                            {item.label}
                          </Badge>
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.status === 'approved' ? 'bg-green-500' : 
                              item.status === 'in_review' ? 'bg-blue-500' : 
                              item.status === 'pending' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-16 text-right">
                          <span className="text-sm text-gray-600">{item.count} ({percentage.toFixed(0)}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verification Metrics */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Verification Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Avg. Time to Approve</p>
                          <p className="text-xl font-bold text-blue-600">3.2 days</p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-full">
                          <Hourglass className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Approval Rate</p>
                          <p className="text-xl font-bold text-green-600">78%</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded-full">
                          <BarChart className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Pending > 7 Days</p>
                          <p className="text-xl font-bold text-yellow-600">2</p>
                        </div>
                        <div className="bg-yellow-50 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600">Document Rejection Rate</p>
                          <p className="text-xl font-bold text-red-600">12%</p>
                        </div>
                        <div className="bg-red-50 p-2 rounded-full">
                          <XSquare className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminVerification;

