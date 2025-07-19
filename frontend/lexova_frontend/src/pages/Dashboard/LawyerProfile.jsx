import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import LawyerDashboardLayout from '../../components/Dashboard/LawyerDashboardLayout';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Star,
  Edit,
  Save,
  Upload
} from 'lucide-react';

const LawyerProfile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Legal Ave, Suite 400',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '10001',
    bio: 'Experienced personal injury lawyer with a strong track record of securing favorable settlements for clients. Dedicated to providing compassionate and effective legal representation.',
    specializations: ['Personal Injury', 'Motor Vehicle Accidents', 'Wrongful Death'],
    yearsExperience: 12,
    barAdmissions: ['New York Bar', 'Federal District Court, Southern District of NY'],
    education: [
      { degree: 'J.D.', institution: 'Columbia Law School', year: 2012 },
      { degree: 'B.A. Political Science', institution: 'NYU', year: 2009 }
    ],
    awards: ['Top 100 Lawyers in New York (2023)', 'Rising Star Award (2018)'],
    hourlyRate: 350,
    consultationFee: 150,
    profilePicture: '/api/placeholder/100/100',
    availability: 'Monday-Friday, 9 AM - 5 PM',
    languages: ['English', 'Spanish'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarahjohnsonlaw',
      twitter: 'https://twitter.com/sarahjohnsonlaw'
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real application, this would send the updated profile to the backend
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  const handleAddSpecialization = () => {
    const newSpec = prompt('Enter new specialization:');
    if (newSpec) {
      setProfile(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpec]
      }));
    }
  };

  const handleRemoveSpecialization = (specToRemove) => {
    setProfile(prev => ({
      ...prev,
      specializations: prev.specializations.filter(spec => spec !== specToRemove)
    }));
  };

  return (
    <LawyerDashboardLayout
      title="My Profile"
      subtitle="Manage your professional information and public listing"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={profile.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              <div>
                <CardTitle className="text-2xl">{profile.firstName} {profile.lastName}</CardTitle>
                <CardDescription className="mt-1">{profile.specializations.join(', ')}</CardDescription>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>4.8 (156 reviews)</span>
                  <span className="mx-2">•</span>
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{profile.yearsExperience} years experience</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={profile.email} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={profile.address} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={profile.city} onChange={handleChange} readOnly={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={profile.state} onChange={handleChange} readOnly={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" name="zipCode" value={profile.zipCode} onChange={handleChange} readOnly={!isEditing} />
                  </div>
                </div>
                {isEditing && (
                  <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input id="profilePicture" type="file" />
                  </div>
                )}
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Information</h3>
                <div>
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} readOnly={!isEditing} rows={5} />
                </div>
                <div>
                  <Label htmlFor="specializations">Specializations</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {spec}
                        {isEditing && (
                          <button type="button" onClick={() => handleRemoveSpecialization(spec)} className="ml-1 text-red-500 hover:text-red-700">
                            &times;
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button type="button" variant="outline" size="sm" onClick={handleAddSpecialization}>
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input id="yearsExperience" name="yearsExperience" type="number" value={profile.yearsExperience} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input id="hourlyRate" name="hourlyRate" type="number" value={profile.hourlyRate} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="consultationFee">Consultation Fee</Label>
                  <Input id="consultationFee" name="consultationFee" type="number" value={profile.consultationFee} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="languages">Languages</Label>
                  <Input id="languages" name="languages" value={profile.languages.join(', ')} onChange={(e) => setProfile(prev => ({ ...prev, languages: e.target.value.split(',').map(lang => lang.trim()) }))} readOnly={!isEditing} />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input id="linkedin" name="linkedin" value={profile.socialMedia.linkedin} onChange={(e) => setProfile(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, linkedin: e.target.value } }))} readOnly={!isEditing} />
                </div>
              </div>
            </div>

            {/* Education and Awards */}
            <div className="mt-8 space-y-6">
              <h3 className="text-lg font-semibold">Education & Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Education</h4>
                  {profile.education.map((edu, index) => (
                    <div key={index} className="mb-2 p-3 border rounded-md">
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.institution}, {edu.year}</p>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-3 w-3 mr-1" /> Add Education
                    </Button>
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Awards & Recognitions</h4>
                  {profile.awards.map((award, index) => (
                    <div key={index} className="mb-2 p-3 border rounded-md flex items-center">
                      <Award className="h-4 w-4 mr-2 text-yellow-500" />
                      <p className="text-sm text-gray-700">{award}</p>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-3 w-3 mr-1" /> Add Award
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </LawyerDashboardLayout>
  );
};

export default LawyerProfile;

