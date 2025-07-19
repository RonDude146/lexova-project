import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const PaymentManagement = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true,
      brand: 'visa'
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      brand: 'mastercard'
    }
  ];

  const invoices = [
    {
      id: 'INV-2024-001',
      caseTitle: 'Personal Injury Claim',
      lawyer: 'Sarah Johnson',
      amount: 1575,
      dueDate: '2024-12-25',
      issueDate: '2024-12-15',
      status: 'Pending',
      description: 'Legal research and case preparation - 4.5 hours',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-002',
      caseTitle: 'Personal Injury Claim',
      lawyer: 'Sarah Johnson',
      amount: 700,
      dueDate: '2024-12-20',
      issueDate: '2024-12-10',
      status: 'Paid',
      description: 'Client consultation and strategy meeting - 2.0 hours',
      paymentMethod: 'Visa ****4242',
      paidDate: '2024-12-18'
    },
    {
      id: 'INV-2024-003',
      caseTitle: 'Employment Dispute',
      lawyer: 'Emily Rodriguez',
      amount: 450,
      dueDate: '2024-12-30',
      issueDate: '2024-12-20',
      status: 'Pending',
      description: 'Initial case review and documentation - 1.5 hours',
      paymentMethod: 'Mastercard ****8888'
    },
    {
      id: 'INV-2024-004',
      caseTitle: 'Contract Review',
      lawyer: 'Michael Chen',
      amount: 875,
      dueDate: '2024-12-15',
      issueDate: '2024-12-05',
      status: 'Overdue',
      description: 'Contract analysis and revision - 2.5 hours',
      paymentMethod: 'Visa ****4242'
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2024-12-18',
      amount: 700,
      invoice: 'INV-2024-002',
      caseTitle: 'Personal Injury Claim',
      lawyer: 'Sarah Johnson',
      method: 'Visa ****4242',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-12-10',
      amount: 1050,
      invoice: 'INV-2024-005',
      caseTitle: 'Personal Injury Claim',
      lawyer: 'Sarah Johnson',
      method: 'Visa ****4242',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-11-28',
      amount: 2275,
      invoice: 'INV-2024-006',
      caseTitle: 'Personal Injury Claim',
      lawyer: 'Sarah Johnson',
      method: 'Visa ****4242',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Overdue':
      case 'Failed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const totalPending = invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const thisMonthPaid = paymentHistory
    .filter(payment => new Date(payment.date).getMonth() === new Date().getMonth())
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <DashboardLayout 
      title="Payment Management" 
      subtitle="Manage your payments, invoices, and billing information"
    >
      <div className="space-y-6">
        {/* Payment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {invoices.filter(inv => inv.status === 'Pending').length} invoices
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</p>
                </div>
                <div className="bg-red-50 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {invoices.filter(inv => inv.status === 'Overdue').length} invoices
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                All time
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-blue-600">${thisMonthPaid.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                December 2024
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Invoices ({invoices.length})</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{invoice.id}</h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1">{invoice.status}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{invoice.caseTitle}</p>
                      <p className="text-sm text-gray-500">{invoice.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span>Lawyer: {invoice.lawyer}</span>
                        <span>Issued: {new Date(invoice.issueDate).toLocaleDateString()}</span>
                        <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {invoice.paymentMethod}
                      </p>
                      {invoice.paidDate && (
                        <p className="text-sm text-green-600 mt-1">
                          Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    {invoice.status === 'Pending' && (
                      <Button size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                    {invoice.status === 'Overdue' && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Pay Overdue
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Complete record of all your payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-50 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{payment.invoice}</h4>
                          <p className="text-sm text-gray-600">{payment.caseTitle}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>Lawyer: {payment.lawyer}</span>
                            <span>Method: {payment.method}</span>
                            <span>Date: {new Date(payment.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${payment.amount.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(payment.status)} size="sm">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="methods" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your saved payment methods
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddCard(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {method.type} ending in {method.last4}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                          {method.isDefault && (
                            <Badge variant="outline" className="mt-1">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Card Form */}
                {showAddCard && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Add New Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="setDefault" className="rounded" />
                          <Label htmlFor="setDefault" className="text-sm">
                            Set as default payment method
                          </Label>
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit">Add Card</Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowAddCard(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
                <CardDescription>
                  Address used for billing and invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingStreet">Street Address</Label>
                    <Input id="billingStreet" defaultValue="123 Main Street" />
                  </div>
                  <div>
                    <Label htmlFor="billingCity">City</Label>
                    <Input id="billingCity" defaultValue="New York" />
                  </div>
                  <div>
                    <Label htmlFor="billingState">State</Label>
                    <Input id="billingState" defaultValue="NY" />
                  </div>
                  <div>
                    <Label htmlFor="billingZip">ZIP Code</Label>
                    <Input id="billingZip" defaultValue="10001" />
                  </div>
                </div>
                <Button className="mt-4">
                  Update Billing Address
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PaymentManagement;

