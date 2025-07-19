import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { 
  Brain, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Scale
} from 'lucide-react';

const AIMatching = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [caseData, setCaseData] = useState({
    caseType: '',
    description: '',
    location: '',
    urgency: 'medium',
    budgetMin: '',
    budgetMax: '',
    preferredCommunication: 'email'
  });
  const [matches, setMatches] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const caseTypes = [
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
    'Healthcare Law'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - No rush', description: 'Can wait several weeks' },
    { value: 'medium', label: 'Medium - Standard', description: 'Need response within 1-2 weeks' },
    { value: 'high', label: 'High - Urgent', description: 'Need response within few days' },
    { value: 'critical', label: 'Critical - Emergency', description: 'Need immediate attention' }
  ];

  const sampleMatches = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialization: 'Personal Injury',
      experience: 12,
      rating: 4.9,
      totalCases: 156,
      hourlyRate: 350,
      location: 'New York, NY',
      matchScore: 95,
      profileImage: '/api/placeholder/100/100',
      bio: 'Experienced personal injury attorney with a track record of securing substantial settlements for clients.',
      languages: ['English', 'Spanish'],
      education: 'Harvard Law School',
      barAdmission: 'NY, NJ',
      responseTime: '< 2 hours',
      availability: 'Available this week'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialization: 'Personal Injury',
      experience: 8,
      rating: 4.7,
      totalCases: 89,
      hourlyRate: 275,
      location: 'New York, NY',
      matchScore: 88,
      profileImage: '/api/placeholder/100/100',
      bio: 'Dedicated to fighting for the rights of injury victims with personalized attention to each case.',
      languages: ['English', 'Mandarin'],
      education: 'Columbia Law School',
      barAdmission: 'NY',
      responseTime: '< 4 hours',
      availability: 'Available next week'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialization: 'Personal Injury',
      experience: 15,
      rating: 4.8,
      totalCases: 203,
      hourlyRate: 400,
      location: 'Brooklyn, NY',
      matchScore: 85,
      profileImage: '/api/placeholder/100/100',
      bio: 'Senior partner specializing in complex personal injury cases with multi-million dollar settlements.',
      languages: ['English', 'Spanish'],
      education: 'NYU Law School',
      barAdmission: 'NY, CT',
      responseTime: '< 6 hours',
      availability: 'Available in 2 weeks'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis({
        complexity: 7,
        estimatedDuration: '6-12 months',
        keyFactors: [
          'Severity of injuries',
          'Clear liability evidence',
          'Insurance coverage limits',
          'Medical documentation quality'
        ],
        recommendedExperience: 'Senior level (10+ years)',
        budgetEstimate: '$15,000 - $25,000'
      });
      setMatches(sampleMatches);
      setStep(3);
      setLoading(false);
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setCaseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <span>Describe Your Legal Situation</span>
        </CardTitle>
        <CardDescription>
          Tell us about your case so our AI can find the perfect lawyer match
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
          <div>
            <Label htmlFor="caseType">Case Type *</Label>
            <Select value={caseData.caseType} onValueChange={(value) => handleInputChange('caseType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your case type" />
              </SelectTrigger>
              <SelectContent>
                {caseTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Case Description *</Label>
            <Textarea
              id="description"
              placeholder="Please describe your legal situation in detail. Include relevant dates, parties involved, and what outcome you are seeking..."
              value={caseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={6}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              The more details you provide, the better our AI can match you with the right lawyer.
            </p>
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="City, State (e.g., New York, NY)"
              value={caseData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={!caseData.caseType || !caseData.description || !caseData.location}>
            Continue to Preferences
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Case Preferences</CardTitle>
        <CardDescription>
          Help us refine your lawyer matches with your preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Urgency Level</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {urgencyLevels.map((level) => (
                <div
                  key={level.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    caseData.urgency === level.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('urgency', level.value)}
                >
                  <div className="font-medium text-sm">{level.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Budget Range (Optional)</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Input
                  placeholder="Min budget ($)"
                  type="number"
                  value={caseData.budgetMin}
                  onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                />
              </div>
              <div>
                <Input
                  placeholder="Max budget ($)"
                  type="number"
                  value={caseData.budgetMax}
                  onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This helps us match you with lawyers within your budget range.
            </p>
          </div>

          <div>
            <Label htmlFor="communication">Preferred Communication</Label>
            <Select value={caseData.preferredCommunication} onValueChange={(value) => handleInputChange('preferredCommunication', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="in-person">In Person</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Find My Lawyers
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderLoading = () => (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is Analyzing Your Case</h3>
        <p className="text-gray-600 mb-6">
          Our advanced AI is reviewing your case details and matching you with the most suitable lawyers...
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Analyzing case complexity</span>
            <span>100%</span>
          </div>
          <Progress value={100} className="mb-4" />
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Matching with lawyers</span>
            <span>85%</span>
          </div>
          <Progress value={85} className="mb-4" />
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Ranking recommendations</span>
            <span>60%</span>
          </div>
          <Progress value={60} />
        </div>
      </CardContent>
    </Card>
  );

  const renderResults = () => (
    <div className="space-y-6">
      {/* AI Analysis */}
      {aiAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span>AI Case Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{aiAnalysis.complexity}/10</div>
                <div className="text-sm text-gray-600">Complexity Score</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-semibold text-green-600">{aiAnalysis.estimatedDuration}</div>
                <div className="text-sm text-gray-600">Est. Duration</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-lg font-semibold text-purple-600">{aiAnalysis.recommendedExperience}</div>
                <div className="text-sm text-gray-600">Experience Level</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-600">{aiAnalysis.budgetEstimate}</div>
                <div className="text-sm text-gray-600">Budget Estimate</div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Case Factors:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {aiAnalysis.keyFactors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lawyer Matches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Top Lawyer Matches</span>
            <span className="text-sm font-normal text-gray-600">{matches.length} lawyers found</span>
          </CardTitle>
          <CardDescription>
            Ranked by AI compatibility with your case requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {matches.map((lawyer) => (
              <div key={lawyer.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
                      <p className="text-blue-600 font-medium">{lawyer.specialization}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          <span>{lawyer.experience} years</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          <span>{lawyer.rating} ({lawyer.totalCases} cases)</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{lawyer.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {lawyer.matchScore}% Match
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      ${lawyer.hourlyRate}/hr
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{lawyer.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Education:</span>
                    <p className="text-gray-600">{lawyer.education}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Bar Admission:</span>
                    <p className="text-gray-600">{lawyer.barAdmission}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Languages:</span>
                    <p className="text-gray-600">{lawyer.languages.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Responds {lawyer.responseTime}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      <span>{lawyer.availability}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Different Results?</h3>
            <p className="text-gray-600 mb-4">
              You can refine your search criteria or start a new search with different case details.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Refine Search
              </Button>
              <Button variant="outline" onClick={() => setStep(1)}>
                New Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout 
      title="AI Lawyer Matching" 
      subtitle="Find the perfect lawyer for your case using our advanced AI technology"
    >
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Case Details</span>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Preferences</span>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Results</span>
            </div>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {loading && renderLoading()}
        {step === 3 && !loading && renderResults()}
      </div>
    </DashboardLayout>
  );
};

export default AIMatching;

