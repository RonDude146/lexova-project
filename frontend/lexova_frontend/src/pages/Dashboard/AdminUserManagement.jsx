import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Edit, 
  Trash2, 
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Star,
  Briefcase,
  Shield,
  AlertTriangle
} from 'lucide-react';

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      role: 'client',
      status: 'active',
      joinDate: '2024-10-15',
      lastLogin: '2024-12-18',
      totalCases: 3,
      totalSpent: 12500,
      location: 'New York, NY',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 987-6543',
      role: 'lawyer',
      status: 'active',
      joinDate: '2024-08-20',
      lastLogin: '2024-12-19',
      totalCases: 47,
      totalEarnings: 125000,
      specializations: ['Personal Injury', 'Motor Vehicle Accidents'],
      rating: 4.8,
      reviews: 156,
      location: 'New York, NY',
      verified: true,
      barNumber: 'NY12345'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      role: 'lawyer',
      status: 'pending',
      joinDate: '2024-12-01',
      lastLogin: '2024-12-17',
      totalCases: 0,
      totalEarnings: 0,
      specializations: ['Contract Law', 'Business Law'],
      rating: 0,
      reviews: 0,
      location: 'Los Angeles, CA',
      verified: false,
      barNumber: 'CA67890'
    },
    {
      id: 4,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 321-0987',
      role: 'client',
      status: 'suspended',
      joinDate: '2024-09-10',
      lastLogin: '2024-12-10',
      totalCases: 1,
      totalSpent: 2500,
      location: 'Chicago, IL',
      verified: true,
      suspensionReason: 'Payment dispute'
    },
    {
      id: 5,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      phone: '+1 (555) 654-3210',
      role: 'lawyer',
      status: 'active',
      joinDate: '2024-07-15',
      lastLogin: '2024-12-18',
      totalCases: 23,
      totalEarnings: 67500,
      specializations: ['Employment Law', 'Discrimination'],
      rating: 4.6,
      reviews: 89,
      location: 'Miami, FL',
      verified: true,
      barNumber: 'FL54321'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'lawyer':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4" />;
      case 'suspended':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const clients = users.filter(u => u.role === 'client');
  const lawyers = users.filter(u => u.role === 'lawyer');
  const pendingUsers = users.filter(u => u.status === 'pending');
  const suspendedUsers = users.filter(u => u.status === 'suspended');

  const handleUserAction = (userId, action) => {
    console.log(`Performing ${action} on user ${userId}`);
    // In real app, this would make API calls
  };

  return (
    <AdminDashboardLayout 
      title="User Management" 
      subtitle="Manage clients, lawyers, and user accounts"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Lawyers</p>
                  <p className="text-2xl font-bold text-green-600">{lawyers.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Clients</p>
                  <p className="text-2xl font-bold text-purple-600">{clients.length}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingUsers.length}</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
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
                    placeholder="Search users..."
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
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="client">Clients</SelectItem>
                    <SelectItem value="lawyer">Lawyers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
            <TabsTrigger value="lawyers">Lawyers ({lawyers.length})</TabsTrigger>
            <TabsTrigger value="clients">Clients ({clients.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingUsers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1">{user.status}</span>
                          </Badge>
                          {user.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {user.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined: {new Date(user.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                        {user.location && (
                          <p className="text-sm text-gray-500 mt-1">{user.location}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {user.role === 'lawyer' ? (
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            ${user.totalEarnings?.toLocaleString() || 0} earned
                          </p>
                          <p className="text-xs text-gray-500">{user.totalCases} cases</p>
                          {user.rating > 0 && (
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-gray-600">{user.rating} ({user.reviews} reviews)</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            ${user.totalSpent?.toLocaleString() || 0} spent
                          </p>
                          <p className="text-xs text-gray-500">{user.totalCases} cases</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Info for Lawyers */}
                  {user.role === 'lawyer' && user.specializations && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {user.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      {user.barNumber && (
                        <p className="text-xs text-gray-500 mt-2">Bar Number: {user.barNumber}</p>
                      )}
                    </div>
                  )}

                  {/* Suspension Reason */}
                  {user.status === 'suspended' && user.suspensionReason && (
                    <div className="mb-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-800">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        Suspended: {user.suspensionReason}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'view')}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'edit')}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {user.status === 'active' ? (
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600" onClick={() => handleUserAction(user.id, 'suspend')}>
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend
                      </Button>
                    ) : user.status === 'suspended' ? (
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600" onClick={() => handleUserAction(user.id, 'activate')}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Activate
                      </Button>
                    ) : null}
                    {user.status === 'pending' && (
                      <Button size="sm" onClick={() => handleUserAction(user.id, 'approve')}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="lawyers" className="space-y-4">
            {lawyers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                          <Badge className={getStatusColor(user.status)}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1">{user.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        {user.specializations && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {user.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${user.totalEarnings?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-gray-500">{user.totalCases} cases</p>
                      {user.rating > 0 && (
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs text-gray-600">{user.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            {clients.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                          <Badge className={getStatusColor(user.status)}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1">{user.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${user.totalSpent?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-gray-500">{user.totalCases} cases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied: {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleUserAction(user.id, 'approve')}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600" onClick={() => handleUserAction(user.id, 'reject')}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
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

export default AdminUserManagement;

