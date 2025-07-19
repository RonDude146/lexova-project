import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  CreditCard, 
  DollarSign,
  Search, 
  Eye,
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  XCircle,
  FileText,
  Banknote
} from 'lucide-react';

const AdminPaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const [payments] = useState([
    {
      id: 'PAY-2024-001',
      invoice: 'INV-2024-001',
      client: 'John Doe',
      lawyer: 'Sarah Johnson',
      amount: 1575,
      platformFee: 157.5,
      lawyerPayout: 1417.5,
      status: 'completed',
      method: 'Credit Card',
      date: '2024-12-18',
      caseId: 'PI-2024-001',
      caseTitle: 'Motor Vehicle Accident Claim',
      transactionId: 'txn_1234567890',
      description: 'Legal consultation and case preparation'
    },
    {
      id: 'PAY-2024-002',
      invoice: 'INV-2024-002',
      client: 'ABC Corporation',
      lawyer: 'Michael Chen',
      amount: 2800,
      platformFee: 280,
      lawyerPayout: 2520,
      status: 'pending',
      method: 'Bank Transfer',
      date: '2024-12-17',
      caseId: 'CD-2024-002',
      caseTitle: 'Contract Dispute Resolution',
      transactionId: 'txn_0987654321',
      description: 'Contract review and legal consultation'
    },
    {
      id: 'PAY-2024-003',
      invoice: 'INV-2024-003',
      client: 'Jane Smith',
      lawyer: 'Emily Rodriguez',
      amount: 1050,
      platformFee: 105,
      lawyerPayout: 945,
      status: 'failed',
      method: 'Credit Card',
      date: '2024-12-15',
      caseId: 'ED-2024-003',
      caseTitle: 'Employment Discrimination Case',
      transactionId: 'txn_1122334455',
      description: 'Case preparation and client consultation',
      failureReason: 'Insufficient funds'
    },
    {
      id: 'PAY-2024-004',
      invoice: 'INV-2024-004',
      client: 'Michael Johnson',
      lawyer: 'David Wilson',
      amount: 900,
      platformFee: 90,
      lawyerPayout: 810,
      status: 'completed',
      method: 'PayPal',
      date: '2024-12-10',
      caseId: 'RE-2024-004',
      caseTitle: 'Real Estate Transaction',
      transactionId: 'txn_5566778899',
      description: 'Document review and closing assistance'
    },
    {
      id: 'PAY-2024-005',
      invoice: 'INV-2024-005',
      client: 'Lisa Brown',
      lawyer: 'Jennifer Davis',
      amount: 2100,
      platformFee: 210,
      lawyerPayout: 1890,
      status: 'refunded',
      method: 'Credit Card',
      date: '2024-12-08',
      caseId: 'FL-2024-005',
      caseTitle: 'Family Law Custody Case',
      transactionId: 'txn_9988776655',
      description: 'Family law consultation',
      refundReason: 'Client requested refund',
      refundDate: '2024-12-12'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 animate-spin" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard className="h-4 w-4" />;
      case 'Bank Transfer':
        return <Banknote className="h-4 w-4" />;
      case 'PayPal':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.lawyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesType = filterType === 'all' || payment.method === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const failedPayments = payments.filter(p => p.status === 'failed');
  const refundedPayments = payments.filter(p => p.status === 'refunded');

  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPlatformFees = completedPayments.reduce((sum, p) => sum + p.platformFee, 0);
  const totalPayouts = completedPayments.reduce((sum, p) => sum + p.lawyerPayout, 0);
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <AdminDashboardLayout 
      title="Payment Management" 
      subtitle="Monitor and manage all platform payments and transactions"
    >
      <div className="space-y-6">
        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Platform Fees</p>
                  <p className="text-2xl font-bold text-blue-600">${totalPlatformFees.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {((totalPlatformFees / totalRevenue) * 100).toFixed(1)}% of total revenue
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {pendingPayments.length} transactions
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Failed Payments</p>
                  <p className="text-2xl font-bold text-red-600">{failedPayments.length}</p>
                </div>
                <div className="bg-red-50 p-2 rounded-full">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Require attention
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Platform revenue over the past 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[28, 32, 35, 42, 38, 45, 52, 48, 41, 39, 43, 47].map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-green-500 rounded-t w-full transition-all hover:bg-green-600"
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

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search payments..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
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

        {/* Payments List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Payments ({filteredPayments.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingPayments.length})</TabsTrigger>
            <TabsTrigger value="failed">Failed ({failedPayments.length})</TabsTrigger>
            <TabsTrigger value="refunded">Refunded ({refundedPayments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredPayments.map((payment) => (
              <Card key={payment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{payment.id}</h3>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-1">{payment.status}</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getMethodIcon(payment.method)}
                          {payment.method}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              Client: {payment.client}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              Lawyer: {payment.lawyer}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{payment.caseTitle}</p>
                          <p className="text-sm text-gray-500">{payment.description}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Total Amount:</span>
                              <span className="font-medium">${payment.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Platform Fee:</span>
                              <span className="text-blue-600">${payment.platformFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Lawyer Payout:</span>
                              <span className="text-green-600">${payment.lawyerPayout.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Invoice: {payment.invoice}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          {payment.transactionId}
                        </span>
                      </div>

                      {/* Status-specific information */}
                      {payment.status === 'failed' && payment.failureReason && (
                        <div className="p-3 bg-red-50 rounded-lg mb-3">
                          <p className="text-sm text-red-800">
                            <XCircle className="h-4 w-4 inline mr-1" />
                            Failure Reason: {payment.failureReason}
                          </p>
                        </div>
                      )}

                      {payment.status === 'refunded' && payment.refundReason && (
                        <div className="p-3 bg-purple-50 rounded-lg mb-3">
                          <p className="text-sm text-purple-800">
                            <RefreshCw className="h-4 w-4 inline mr-1" />
                            Refunded on {new Date(payment.refundDate).toLocaleDateString()}: {payment.refundReason}
                          </p>
                        </div>
                      )}

                      {payment.status === 'pending' && (
                        <div className="p-3 bg-yellow-50 rounded-lg mb-3">
                          <p className="text-sm text-yellow-800">
                            <Clock className="h-4 w-4 inline mr-1" />
                            Payment is being processed and will be completed within 1-3 business days.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Receipt
                    </Button>
                    {payment.status === 'failed' && (
                      <Button size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry Payment
                      </Button>
                    )}
                    {payment.status === 'completed' && (
                      <Button variant="outline" size="sm" className="text-purple-600 border-purple-600">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Process Refund
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingPayments.map((payment) => (
              <Card key={payment.id} className="border-yellow-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{payment.id}</h3>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {payment.client} → {payment.lawyer}
                      </p>
                      <p className="text-sm text-gray-700">{payment.caseTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{payment.method}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="failed" className="space-y-4">
            {failedPayments.map((payment) => (
              <Card key={payment.id} className="border-red-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{payment.id}</h3>
                        <Badge className="bg-red-100 text-red-800">
                          <XCircle className="h-4 w-4 mr-1" />
                          Failed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {payment.client} → {payment.lawyer}
                      </p>
                      <div className="p-3 bg-red-50 rounded-lg mb-3">
                        <p className="text-sm text-red-800">
                          <AlertTriangle className="h-4 w-4 inline mr-1" />
                          {payment.failureReason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <Button size="sm" className="mt-2">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="refunded" className="space-y-4">
            {refundedPayments.map((payment) => (
              <Card key={payment.id} className="border-purple-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{payment.id}</h3>
                        <Badge className="bg-purple-100 text-purple-800">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Refunded
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {payment.client} → {payment.lawyer}
                      </p>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-800">
                          Refunded on {new Date(payment.refundDate).toLocaleDateString()}: {payment.refundReason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{payment.method}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {filteredPayments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No payments found</h3>
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

export default AdminPaymentManagement;

