import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LawyerDashboardLayout from '../../components/Dashboard/LawyerDashboardLayout';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar, 
  Clock, 
  FileText,
  Download,
  Plus,
  Edit,
  Eye,
  Send,
  CreditCard,
  Banknote,
  PieChart,
  BarChart3
} from 'lucide-react';

const LawyerPayments = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);

  const earnings = {
    thisMonth: 18500,
    lastMonth: 15200,
    thisYear: 125000,
    lastYear: 98000,
    pending: 4200,
    totalEarnings: 125000
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      client: 'John Doe',
      caseTitle: 'Personal Injury Claim',
      amount: 1575,
      hoursWorked: 4.5,
      hourlyRate: 350,
      issueDate: '2024-12-15',
      dueDate: '2024-12-25',
      status: 'Sent',
      description: 'Legal research and case preparation'
    },
    {
      id: 'INV-2024-002',
      client: 'ABC Corporation',
      caseTitle: 'Contract Dispute',
      amount: 2800,
      hoursWorked: 8.0,
      hourlyRate: 350,
      issueDate: '2024-12-10',
      dueDate: '2024-12-20',
      status: 'Paid',
      paidDate: '2024-12-18',
      description: 'Contract review and legal consultation'
    },
    {
      id: 'INV-2024-003',
      client: 'Jane Smith',
      caseTitle: 'Employment Discrimination',
      amount: 1050,
      hoursWorked: 3.0,
      hourlyRate: 350,
      issueDate: '2024-12-05',
      dueDate: '2024-12-15',
      status: 'Overdue',
      description: 'Case preparation and client consultation'
    },
    {
      id: 'INV-2024-004',
      client: 'Michael Johnson',
      caseTitle: 'Real Estate Transaction',
      amount: 900,
      hoursWorked: 3.0,
      hourlyRate: 300,
      issueDate: '2024-11-28',
      dueDate: '2024-12-08',
      status: 'Paid',
      paidDate: '2024-12-05',
      description: 'Document review and closing assistance'
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2024-12-18',
      client: 'ABC Corporation',
      invoice: 'INV-2024-002',
      amount: 2800,
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-12-05',
      client: 'Michael Johnson',
      invoice: 'INV-2024-004',
      amount: 900,
      method: 'Credit Card',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-11-28',
      client: 'Sarah Wilson',
      invoice: 'INV-2024-005',
      amount: 2100,
      method: 'Bank Transfer',
      status: 'Completed'
    },
    {
      id: 4,
      date: '2024-11-15',
      client: 'Tech Startup Inc',
      invoice: 'INV-2024-006',
      amount: 4200,
      method: 'Wire Transfer',
      status: 'Completed'
    }
  ];

  const monthlyEarnings = [
    { month: 'Jan', amount: 8500 },
    { month: 'Feb', amount: 9200 },
    { month: 'Mar', amount: 10800 },
    { month: 'Apr', amount: 11500 },
    { month: 'May', amount: 9800 },
    { month: 'Jun', amount: 12200 },
    { month: 'Jul', amount: 13500 },
    { month: 'Aug', amount: 11800 },
    { month: 'Sep', amount: 10500 },
    { month: 'Oct', amount: 12800 },
    { month: 'Nov', amount: 15200 },
    { month: 'Dec', amount: 18500 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const monthlyGrowth = ((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth * 100).toFixed(1);
  const yearlyGrowth = ((earnings.thisYear - earnings.lastYear) / earnings.lastYear * 100).toFixed(1);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
  const pendingInvoices = invoices.filter(inv => inv.status === 'Sent');
  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue');

  return (
    <LawyerDashboardLayout 
      title="Payments & Earnings" 
      subtitle="Track your income, manage invoices, and view payment history"
    >
      <div className="space-y-6">
        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">${earnings.thisMonth.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {monthlyGrowth >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Year</p>
                  <p className="text-3xl font-bold text-gray-900">${earnings.thisYear.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {yearlyGrowth >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={yearlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {yearlyGrowth >= 0 ? '+' : ''}{yearlyGrowth}% from last year
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-3xl font-bold text-gray-900">${earnings.pending.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">{pendingInvoices.length + overdueInvoices.length} invoices</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Hourly Rate</p>
                  <p className="text-3xl font-bold text-gray-900">$340</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-full">
                  <PieChart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Across all cases</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Monthly earnings for the current year</CardDescription>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="quarter">Quarterly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyEarnings.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
                    style={{ 
                      height: `${(data.amount / Math.max(...monthlyEarnings.map(d => d.amount))) * 200}px`,
                      minHeight: '20px'
                    }}
                  />
                  <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                  <div className="text-xs font-medium text-gray-900">${(data.amount / 1000).toFixed(1)}k</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Invoices ({invoices.length})</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="settings">Payment Settings</TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Invoice Management</CardTitle>
                  <CardDescription>Create and manage client invoices</CardDescription>
                </div>
                <Button onClick={() => setShowCreateInvoice(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{invoice.id}</h4>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{invoice.client} - {invoice.caseTitle}</p>
                        <p className="text-sm text-gray-500">{invoice.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Issued: {new Date(invoice.issueDate).toLocaleDateString()}</span>
                          <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                          <span>{invoice.hoursWorked}h @ ${invoice.hourlyRate}/hr</span>
                          {invoice.paidDate && (
                            <span className="text-green-600">Paid: {new Date(invoice.paidDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${invoice.amount.toLocaleString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          {invoice.status === 'Draft' && (
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          )}
                          {invoice.status === 'Overdue' && (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                              <Send className="h-4 w-4 mr-1" />
                              Remind
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Create Invoice Form */}
                {showCreateInvoice && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Create New Invoice</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="client">Client</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select client" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="john-doe">John Doe</SelectItem>
                                <SelectItem value="abc-corp">ABC Corporation</SelectItem>
                                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="case">Case</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select case" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pi-001">Personal Injury Claim</SelectItem>
                                <SelectItem value="cd-002">Contract Dispute</SelectItem>
                                <SelectItem value="ed-003">Employment Discrimination</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="hours">Hours Worked</Label>
                            <Input id="hours" type="number" step="0.5" placeholder="0.0" />
                          </div>
                          <div>
                            <Label htmlFor="rate">Hourly Rate</Label>
                            <Input id="rate" type="number" placeholder="350" />
                          </div>
                          <div>
                            <Label htmlFor="total">Total Amount</Label>
                            <Input id="total" type="number" placeholder="0.00" readOnly />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Input id="description" placeholder="Brief description of work performed" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="issueDate">Issue Date</Label>
                            <Input id="issueDate" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input id="dueDate" type="date" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit">
                            <FileText className="h-4 w-4 mr-2" />
                            Create Invoice
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowCreateInvoice(false)}
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
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Record of all received payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-50 p-2 rounded-full">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{payment.client}</h4>
                          <p className="text-sm text-gray-600">Invoice: {payment.invoice}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>Date: {new Date(payment.date).toLocaleDateString()}</span>
                            <span>Method: {payment.method}</span>
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

          {/* Payment Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bank Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Bank Account Information</CardTitle>
                  <CardDescription>Where you receive payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" defaultValue="Chase Bank" />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" defaultValue="****1234" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input id="routingNumber" defaultValue="021000021" />
                    </div>
                    <div>
                      <Label htmlFor="accountType">Account Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>
                      <Banknote className="h-4 w-4 mr-2" />
                      Update Bank Info
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Invoice Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Settings</CardTitle>
                  <CardDescription>Default settings for new invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="defaultRate">Default Hourly Rate</Label>
                      <Input id="defaultRate" type="number" defaultValue="350" />
                    </div>
                    <div>
                      <Label htmlFor="paymentTerms">Payment Terms (Days)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">Net 15</SelectItem>
                          <SelectItem value="30">Net 30</SelectItem>
                          <SelectItem value="45">Net 45</SelectItem>
                          <SelectItem value="60">Net 60</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="autoReminder" className="rounded" />
                      <Label htmlFor="autoReminder" className="text-sm">
                        Send automatic payment reminders
                      </Label>
                    </div>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      Update Settings
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LawyerDashboardLayout>
  );
};

export default LawyerPayments;

