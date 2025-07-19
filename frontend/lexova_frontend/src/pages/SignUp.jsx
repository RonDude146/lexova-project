import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, User, Briefcase, Mail, Lock, Phone, MapPin, GraduationCap } from 'lucide-react';
import axios from 'axios';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Client form state
  const [clientForm, setClientForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    }
  });

  // Lawyer form state
  const [lawyerForm, setLawyerForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    lawFirm: '',
    barNumber: '',
    specializations: [],
    experienceYears: '',
    education: '',
    bio: '',
    hourlyRate: '',
    consultationFee: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    }
  });

  const specializations = [
    'Criminal Law',
    'Family Law',
    'Personal Injury',
    'Corporate Law',
    'Real Estate Law',
    'Immigration Law',
    'Employment Law',
    'Intellectual Property',
    'Tax Law',
    'Bankruptcy Law',
    'Environmental Law',
    'Healthcare Law',
    'Entertainment Law',
    'Sports Law',
    'Civil Rights Law'
  ];

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (clientForm.password !== clientForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (clientForm.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: clientForm.email,
        password: clientForm.password,
        role: 'client',
        first_name: clientForm.firstName,
        last_name: clientForm.lastName,
        phone: clientForm.phone,
        address: clientForm.address
      });

      // Store token and redirect
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLawyerSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (lawyerForm.password !== lawyerForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (lawyerForm.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: lawyerForm.email,
        password: lawyerForm.password,
        role: 'lawyer',
        first_name: lawyerForm.firstName,
        last_name: lawyerForm.lastName,
        phone: lawyerForm.phone,
        law_firm: lawyerForm.lawFirm,
        bar_number: lawyerForm.barNumber,
        specializations: lawyerForm.specializations,
        experience_years: parseInt(lawyerForm.experienceYears),
        education: [lawyerForm.education],
        bio: lawyerForm.bio,
        hourly_rate: parseFloat(lawyerForm.hourlyRate),
        consultation_fee: parseFloat(lawyerForm.consultationFee),
        address: lawyerForm.address
      });

      // Store token and redirect
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/lawyer-dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSpecializationChange = (specialization) => {
    setLawyerForm(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">Lexova</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Lexova</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>I need a lawyer</span>
                </TabsTrigger>
                <TabsTrigger value="lawyer" className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>I am a lawyer</span>
                </TabsTrigger>
              </TabsList>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-4">
                  {error}
                </div>
              )}

              <TabsContent value="client">
                <CardHeader>
                  <CardTitle>Client Registration</CardTitle>
                  <CardDescription>
                    Sign up to find and connect with qualified lawyers for your legal needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleClientSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client-firstName">First Name</Label>
                        <Input
                          id="client-firstName"
                          type="text"
                          required
                          value={clientForm.firstName}
                          onChange={(e) => setClientForm(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="client-lastName">Last Name</Label>
                        <Input
                          id="client-lastName"
                          type="text"
                          required
                          value={clientForm.lastName}
                          onChange={(e) => setClientForm(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="client-email">Email</Label>
                      <Input
                        id="client-email"
                        type="email"
                        required
                        value={clientForm.email}
                        onChange={(e) => setClientForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="client-phone">Phone Number</Label>
                      <Input
                        id="client-phone"
                        type="tel"
                        value={clientForm.phone}
                        onChange={(e) => setClientForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client-password">Password</Label>
                        <Input
                          id="client-password"
                          type="password"
                          required
                          value={clientForm.password}
                          onChange={(e) => setClientForm(prev => ({ ...prev, password: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="client-confirmPassword">Confirm Password</Label>
                        <Input
                          id="client-confirmPassword"
                          type="password"
                          required
                          value={clientForm.confirmPassword}
                          onChange={(e) => setClientForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Address Information</h3>
                      <div>
                        <Label htmlFor="client-street">Street Address</Label>
                        <Input
                          id="client-street"
                          type="text"
                          value={clientForm.address.street}
                          onChange={(e) => setClientForm(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, street: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="client-city">City</Label>
                          <Input
                            id="client-city"
                            type="text"
                            value={clientForm.address.city}
                            onChange={(e) => setClientForm(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, city: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="client-state">State</Label>
                          <Input
                            id="client-state"
                            type="text"
                            value={clientForm.address.state}
                            onChange={(e) => setClientForm(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, state: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="client-zipCode">ZIP Code</Label>
                          <Input
                            id="client-zipCode"
                            type="text"
                            value={clientForm.address.zipCode}
                            onChange={(e) => setClientForm(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, zipCode: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Client Account'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              <TabsContent value="lawyer">
                <CardHeader>
                  <CardTitle>Lawyer Registration</CardTitle>
                  <CardDescription>
                    Join our network of qualified lawyers and connect with clients who need your expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLawyerSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lawyer-firstName">First Name</Label>
                        <Input
                          id="lawyer-firstName"
                          type="text"
                          required
                          value={lawyerForm.firstName}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lawyer-lastName">Last Name</Label>
                        <Input
                          id="lawyer-lastName"
                          type="text"
                          required
                          value={lawyerForm.lastName}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lawyer-email">Email</Label>
                        <Input
                          id="lawyer-email"
                          type="email"
                          required
                          value={lawyerForm.email}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lawyer-phone">Phone Number</Label>
                        <Input
                          id="lawyer-phone"
                          type="tel"
                          required
                          value={lawyerForm.phone}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lawyer-password">Password</Label>
                        <Input
                          id="lawyer-password"
                          type="password"
                          required
                          value={lawyerForm.password}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, password: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lawyer-confirmPassword">Confirm Password</Label>
                        <Input
                          id="lawyer-confirmPassword"
                          type="password"
                          required
                          value={lawyerForm.confirmPassword}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lawyer-lawFirm">Law Firm</Label>
                        <Input
                          id="lawyer-lawFirm"
                          type="text"
                          required
                          value={lawyerForm.lawFirm}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, lawFirm: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lawyer-barNumber">Bar Number</Label>
                        <Input
                          id="lawyer-barNumber"
                          type="text"
                          required
                          value={lawyerForm.barNumber}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, barNumber: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Legal Specializations</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {specializations.map((spec) => (
                          <label key={spec} className="flex items-center space-x-2 text-sm">
                            <input
                              type="checkbox"
                              checked={lawyerForm.specializations.includes(spec)}
                              onChange={() => handleSpecializationChange(spec)}
                              className="rounded border-gray-300"
                            />
                            <span>{spec}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lawyer-experienceYears">Years of Experience</Label>
                        <Input
                          id="lawyer-experienceYears"
                          type="number"
                          min="0"
                          required
                          value={lawyerForm.experienceYears}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, experienceYears: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lawyer-education">Education</Label>
                        <Input
                          id="lawyer-education"
                          type="text"
                          placeholder="Law School, Degree"
                          required
                          value={lawyerForm.education}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, education: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lawyer-hourlyRate">Hourly Rate ($)</Label>
                        <Input
                          id="lawyer-hourlyRate"
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          value={lawyerForm.hourlyRate}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, hourlyRate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lawyer-consultationFee">Consultation Fee ($)</Label>
                        <Input
                          id="lawyer-consultationFee"
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          value={lawyerForm.consultationFee}
                          onChange={(e) => setLawyerForm(prev => ({ ...prev, consultationFee: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lawyer-bio">Professional Bio</Label>
                      <Textarea
                        id="lawyer-bio"
                        placeholder="Tell clients about your experience and expertise..."
                        value={lawyerForm.bio}
                        onChange={(e) => setLawyerForm(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Lawyer Account'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

