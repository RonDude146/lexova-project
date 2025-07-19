import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Clock, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Award, 
  Check, 
  MessageSquare, 
  Calendar, 
  Sparkles,
  Brain,
  Scale,
  FileText,
  BarChart,
  Zap
} from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const AILawyerMatching = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseType, setCaseType] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [budget, setBudget] = useState('medium');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('English');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchingLawyers, setMatchingLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [caseAnalysis, setCaseAnalysis] = useState(null);
  
  // Mock case types
  const caseTypes = [
    { value: 'divorce', label: 'Divorce' },
    { value: 'child_custody', label: 'Child Custody' },
    { value: 'personal_injury', label: 'Personal Injury' },
    { value: 'car_accident', label: 'Car Accident' },
    { value: 'medical_malpractice', label: 'Medical Malpractice' },
    { value: 'criminal_defense', label: 'Criminal Defense' },
    { value: 'dui', label: 'DUI Defense' },
    { value: 'estate_planning', label: 'Estate Planning' },
    { value: 'business_formation', label: 'Business Formation' },
    { value: 'intellectual_property', label: 'Intellectual Property' },
    { value: 'immigration', label: 'Immigration' },
    { value: 'employment', label: 'Employment Issues' },
    { value: 'landlord_tenant', label: 'Landlord-Tenant Disputes' },
    { value: 'bankruptcy', label: 'Bankruptcy' },
    { value: 'tax_issues', label: 'Tax Issues' }
  ];
  
  // Mock urgency levels
  const urgencyLevels = [
    { value: 'emergency', label: 'Emergency (24 hours)', description: 'Requires immediate attention' },
    { value: 'urgent', label: 'Urgent (2-3 days)', description: 'Time-sensitive matter' },
    { value: 'standard', label: 'Standard (1 week)', description: 'Normal timeline' },
    { value: 'flexible', label: 'Flexible (2 weeks)', description: 'Not time-sensitive' },
    { value: 'planning', label: 'Planning (1+ month)', description: 'Future planning' }
  ];
  
  // Mock budget ranges
  const budgetRanges = [
    { value: 'low', label: 'Economy', description: 'Lower cost options' },
    { value: 'medium', label: 'Standard', description: 'Average market rates' },
    { value: 'high', label: 'Premium', description: 'Experienced specialists' },
    { value: 'premium', label: 'Elite', description: 'Top-tier attorneys' }
  ];
  
  // Mock languages
  const languages = [
    'English', 'Spanish', 'French', 'Mandarin', 'Cantonese', 
    'Vietnamese', 'Korean', 'Russian', 'Arabic', 'Portuguese'
  ];
  
  // Mock matching lawyers data
  const mockLawyers = [
    {
      id: 'LW-2024-101',
      name: 'David Wilson',
      photo: '/assets/lawyers/lawyer1.jpg',
      specializations: ['Criminal Defense', 'DUI Defense', 'Drug Offenses'],
      experience_years: 12,
      cases_handled: 450,
      languages: ['English', 'Spanish'],
      location: 'New York, NY',
      average_rating: 4.8,
      review_count: 120,
      hourly_rate: 300,
      availability: 'high',
      success_rate: 0.85,
      education: [
        {institution: 'Harvard Law School', degree: 'Juris Doctor', year: 2012},
        {institution: 'University of Pennsylvania', degree: 'Bachelor of Arts, Political Science', year: 2009}
      ],
      bar_admissions: ['New York State Bar', 'Federal Bar, Southern District of NY'],
      match_score: 92,
      match_reasons: [
        'Strong specialization match: David specializes in Criminal Defense, DUI Defense',
        'Highly experienced: 12 years of practice with 450 cases',
        'Excellent track record: 85% success rate'
      ]
    },
    {
      id: 'LW-2024-102',
      name: 'Jennifer Davis',
      photo: '/assets/lawyers/lawyer2.jpg',
      specializations: ['Family Law', 'Divorce', 'Child Custody', 'Domestic Violence'],
      experience_years: 15,
      cases_handled: 620,
      languages: ['English'],
      location: 'Chicago, IL',
      average_rating: 4.9,
      review_count: 180,
      hourly_rate: 275,
      availability: 'medium',
      success_rate: 0.92,
      education: [
        {institution: 'University of Chicago Law School', degree: 'Juris Doctor', year: 2009},
        {institution: 'Northwestern University', degree: 'Bachelor of Science, Psychology', year: 2006}
      ],
      bar_admissions: ['Illinois State Bar'],
      match_score: 88,
      match_reasons: [
        'Strong specialization match: Jennifer specializes in Family Law, Divorce',
        'Highly experienced: 15 years of practice with 620 cases',
        'Excellent track record: 92% success rate'
      ]
    },
    {
      id: 'LW-2024-103',
      name: 'Michael Chen',
      photo: '/assets/lawyers/lawyer3.jpg',
      specializations: ['Intellectual Property', 'Patent', 'Trademark', 'Copyright', 'Technology Law'],
      experience_years: 8,
      cases_handled: 210,
      languages: ['English', 'Mandarin', 'Cantonese'],
      location: 'San Francisco, CA',
      average_rating: 4.7,
      review_count: 85,
      hourly_rate: 350,
      availability: 'high',
      success_rate: 0.88,
      education: [
        {institution: 'Stanford Law School', degree: 'Juris Doctor', year: 2016},
        {institution: 'MIT', degree: 'Bachelor of Science, Computer Science', year: 2013}
      ],
      bar_admissions: ['California State Bar', 'U.S. Patent and Trademark Office'],
      match_score: 85,
      match_reasons: [
        'Strong specialization match: Michael specializes in Intellectual Property, Patent',
        'Speaks all your preferred languages: English, Mandarin',
        'Strong track record: 88% success rate'
      ]
    },
    {
      id: 'LW-2024-106',
      name: 'Emily Wong',
      photo: '/assets/lawyers/lawyer4.jpg',
      specializations: ['Personal Injury', 'Car Accidents', 'Medical Malpractice', 'Workplace Injuries'],
      experience_years: 12,
      cases_handled: 390,
      languages: ['English', 'Mandarin'],
      location: 'Los Angeles, CA',
      average_rating: 4.8,
      review_count: 170,
      hourly_rate: 325,
      availability: 'medium',
      success_rate: 0.91,
      education: [
        {institution: 'UCLA School of Law', degree: 'Juris Doctor', year: 2012},
        {institution: 'UC Berkeley', degree: 'Bachelor of Arts, Sociology', year: 2009}
      ],
      bar_admissions: ['California State Bar'],
      match_score: 79,
      match_reasons: [
        'Good specialization match: Emily has relevant expertise in Personal Injury',
        'Experienced: 12 years of legal practice',
        'Excellent track record: 91% success rate'
      ]
    },
    {
      id: 'LW-2024-108',
      name: 'Lisa Martinez',
      photo: '/assets/lawyers/lawyer5.jpg',
      specializations: ['Employment Law', 'Discrimination', 'Wrongful Termination', 'Harassment', 'Wage Disputes'],
      experience_years: 14,
      cases_handled: 410,
      languages: ['English', 'Spanish'],
      location: 'Phoenix, AZ',
      average_rating: 4.7,
      review_count: 140,
      hourly_rate: 280,
      availability: 'high',
      success_rate: 0.86,
      education: [
        {institution: 'Arizona State University College of Law', degree: 'Juris Doctor', year: 2010},
        {institution: 'University of Arizona', degree: 'Bachelor of Arts, Psychology', year: 2007}
      ],
      bar_admissions: ['Arizona State Bar', 'California State Bar'],
      match_score: 72,
      match_reasons: [
        'Good specialization match: Lisa has relevant expertise in Employment Law',
        'Experienced: 14 years of legal practice',
        'High availability for your urgent case'
      ]
    }
  ];
  
  // Mock case analysis data
  const mockCaseAnalysis = {
    key_legal_issues: [
      "Potential wrongful termination based on protected class status",
      "Possible workplace discrimination",
      "Hostile work environment allegations",
      "Retaliation for reporting harassment"
    ],
    complexity_level: "moderate",
    potential_specializations: [
      "Employment Law",
      "Workplace Discrimination",
      "Wrongful Termination"
    ],
    urgency_assessment: "standard",
    jurisdictional_requirements: "State employment laws apply; federal EEOC considerations",
    language_cultural_considerations: "None specified",
    budget_range: "medium",
    specific_expertise: "Attorney with experience in employment discrimination cases",
    estimated_timeline: "3-6 months for resolution",
    potential_outcomes: [
      "Settlement agreement with former employer",
      "Reinstatement with accommodations",
      "Monetary compensation for damages",
      "Case dismissal if evidence is insufficient"
    ],
    recommended_documentation: [
      "Employment contract and employee handbook",
      "Performance reviews and employment history",
      "Communications regarding incidents of discrimination",
      "Witness statements and supporting evidence",
      "Records of reporting to HR or management"
    ]
  };
  
  const handleNextStep = () => {
    if (currentStep === 2) {
      // Simulate AI analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        setCaseAnalysis(mockCaseAnalysis);
        setMatchingLawyers(mockLawyers);
        setCurrentStep(3);
      }, 3000);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSelectLawyer = (lawyer) => {
    setSelectedLawyer(lawyer);
  };
  
  const isStepOneValid = () => {
    return caseType && caseDescription.length >= 50;
  };
  
  const isStepTwoValid = () => {
    return urgency && budget && location && language;
  };
  
  const renderStepOne = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">What type of legal help do you need?</h3>
          <Select value={caseType} onValueChange={setCaseType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a case type" />
            </SelectTrigger>
            <SelectContent>
              {caseTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Describe your legal situation</h3>
          <p className="text-sm text-gray-500 mb-2">
            Provide details about your case to help us find the right lawyer for you.
            The more information you provide, the better the match will be.
          </p>
          <Textarea 
            placeholder="Describe your legal issue in detail..." 
            value={caseDescription}
            onChange={(e) => setCaseDescription(e.target.value)}
            className="min-h-[200px]"
          />
          <p className="text-xs text-gray-500 mt-2">
            Minimum 50 characters. Currently: {caseDescription.length} characters
            {caseDescription.length < 50 && (
              <span className="text-red-500"> (Please provide more details)</span>
            )}
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleNextStep}
            disabled={!isStepOneValid()}
          >
            Next Step <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  const renderStepTwo = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">How urgent is your legal matter?</h3>
          <RadioGroup value={urgency} onValueChange={setUrgency} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgencyLevels.map((level) => (
              <div key={level.value} className="flex items-start space-x-2">
                <RadioGroupItem value={level.value} id={`urgency-${level.value}`} className="mt-1" />
                <Label htmlFor={`urgency-${level.value}`} className="flex flex-col">
                  <span className="font-medium">{level.label}</span>
                  <span className="text-sm text-gray-500">{level.description}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">What is your budget range?</h3>
          <RadioGroup value={budget} onValueChange={setBudget} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetRanges.map((range) => (
              <div key={range.value} className="flex items-start space-x-2">
                <RadioGroupItem value={range.value} id={`budget-${range.value}`} className="mt-1" />
                <Label htmlFor={`budget-${range.value}`} className="flex flex-col">
                  <span className="font-medium">{range.label}</span>
                  <span className="text-sm text-gray-500">{range.description}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Your location</h3>
            <Input 
              placeholder="City, State" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              This helps us find lawyers licensed in your jurisdiction
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Preferred language</h3>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button 
            onClick={handleNextStep}
            disabled={!isStepTwoValid()}
          >
            Find Matching Lawyers <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  const renderAnalysisStep = () => {
    return (
      <div className="space-y-6">
        {isAnalyzing ? (
          <div className="text-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-12 w-12 text-primary animate-pulse" />
                </div>
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold">AI Analysis in Progress</h3>
              <p className="text-gray-500 max-w-md">
                Our AI is analyzing your case details to find the best legal match for your situation.
              </p>
              <div className="w-full max-w-md">
                <Progress value={65} className="h-2" />
              </div>
              <div className="text-sm text-gray-500 animate-pulse">
                Analyzing legal requirements...
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    AI Case Analysis
                  </CardTitle>
                  <CardDescription>
                    Based on your case details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Complexity Level</h4>
                    <div className="flex items-center mt-1">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        {caseAnalysis?.complexity_level === 'simple' && 'Simple'}
                        {caseAnalysis?.complexity_level === 'moderate' && 'Moderate'}
                        {caseAnalysis?.complexity_level === 'complex' && 'Complex'}
                        {caseAnalysis?.complexity_level === 'highly_complex' && 'Highly Complex'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Key Legal Issues</h4>
                    <ul className="mt-1 space-y-1">
                      {caseAnalysis?.key_legal_issues.map((issue, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Recommended Expertise</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {caseAnalysis?.potential_specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Estimated Timeline</h4>
                    <p className="text-sm mt-1">{caseAnalysis?.estimated_timeline}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Recommended Documentation</h4>
                    <ul className="mt-1 space-y-1">
                      {caseAnalysis?.recommended_documentation.map((doc, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    Best Matching Lawyers
                  </CardTitle>
                  <CardDescription>
                    AI-matched based on your case requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {matchingLawyers.map((lawyer) => (
                      <div 
                        key={lawyer.id} 
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedLawyer?.id === lawyer.id ? 'bg-blue-50' : ''}`}
                        onClick={() => handleSelectLawyer(lawyer)}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={lawyer.photo} alt={lawyer.name} />
                            <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900">{lawyer.name}</h3>
                              <div className="flex items-center">
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                                  {lawyer.match_score}% Match
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="mt-1 flex flex-wrap gap-1">
                              {lawyer.specializations.slice(0, 3).map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                              {lawyer.specializations.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{lawyer.specializations.length - 3} more
                                </Badge>
                              )}
                            </div>
                            
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Briefcase className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                <span>{lawyer.experience_years} years</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-3.5 w-3.5 mr-1 text-amber-400" />
                                <span>{lawyer.average_rating} ({lawyer.review_count})</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                <span>{lawyer.location}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-3.5 w-3.5 mr-1 text-gray-400" />
                                <span>${lawyer.hourly_rate}/hr</span>
                              </div>
                            </div>
                            
                            {selectedLawyer?.id === lawyer.id && (
                              <div className="mt-3 space-y-2">
                                <Separator />
                                <h4 className="text-sm font-medium">Why this is a good match:</h4>
                                <ul className="space-y-1">
                                  {lawyer.match_reasons.map((reason, index) => (
                                    <li key={index} className="text-sm flex items-start">
                                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="pt-2">
                                  <Button className="w-full">Contact This Lawyer</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep} disabled={isAnalyzing}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Adjust Preferences
          </Button>
          {!isAnalyzing && selectedLawyer && (
            <Button>
              Proceed with Selected Lawyer <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-sm mt-2">Case Details</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <Scale className="h-5 w-5" />
            </div>
            <span className="text-sm mt-2">Preferences</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-sm mt-2">Matches</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <DashboardLayout 
      title="AI Lawyer Matching" 
      subtitle="Find the perfect lawyer for your case with our AI matching system"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            <CardTitle>AI-Powered Lawyer Matching</CardTitle>
          </div>
          <CardDescription>
            Our advanced AI analyzes your case details to find the most suitable lawyers for your specific legal needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepIndicator()}
          
          {currentStep === 1 && renderStepOne()}
          {currentStep === 2 && renderStepTwo()}
          {currentStep === 3 && renderAnalysisStep()}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AILawyerMatching;

