import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  FileText, 
  FileUp, 
  Search, 
  Brain, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Scale, 
  Send,
  Download,
  PlusCircle,
  FileQuestion,
  BookOpen,
  Sparkles
} from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const AICaseAssistant = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [question, setQuestion] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI legal assistant. How can I help with your case today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [documentAnalysis, setDocumentAnalysis] = useState(null);
  const [caseInsights, setCaseInsights] = useState(null);
  
  // Mock case data
  const caseData = {
    id: 'CASE-2024-056',
    title: 'Wrongful Termination Claim',
    type: 'Employment Law',
    status: 'Active',
    created_at: '2024-12-01T10:30:00Z',
    description: `I was terminated from my position at TechCorp after 5 years of employment. I believe the termination was wrongful as it occurred shortly after I reported harassment from my supervisor to HR. I had consistently positive performance reviews until I made this report. Two weeks after my complaint, I was told my position was being eliminated due to "restructuring," but I later learned they hired someone new for a very similar role.`,
    client: {
      id: 'CLIENT-001',
      name: 'Sarah Johnson'
    },
    lawyer: {
      id: 'LW-2024-108',
      name: 'Lisa Martinez'
    },
    documents: [
      {
        id: 'DOC-2024-112',
        title: 'Employment Contract',
        type: 'contract',
        uploaded_at: '2024-12-02T14:22:33Z'
      },
      {
        id: 'DOC-2024-113',
        title: 'Performance Reviews (2022-2024)',
        type: 'evidence',
        uploaded_at: '2024-12-02T14:25:12Z'
      },
      {
        id: 'DOC-2024-114',
        title: 'Termination Letter',
        type: 'correspondence',
        uploaded_at: '2024-12-02T14:28:45Z'
      },
      {
        id: 'DOC-2024-115',
        title: 'HR Complaint Documentation',
        type: 'evidence',
        uploaded_at: '2024-12-03T09:15:22Z'
      }
    ]
  };
  
  // Mock document analysis
  const mockDocumentAnalysis = {
    document_type: "Employment Contract",
    key_parties: [
      "Employee: Sarah Johnson",
      "Employer: TechCorp Inc."
    ],
    important_dates: [
      "Contract Start Date: January 15, 2019",
      "Probationary Period: 90 days from start date",
      "Annual Review Date: January 15 of each year"
    ],
    critical_terms: [
      "At-will employment clause (Section 3.2)",
      "Non-disclosure agreement (Section 5)",
      "Non-compete clause for 12 months (Section 6.1)",
      "Mandatory arbitration clause (Section 12.3)"
    ],
    legal_obligations: [
      "Employee must provide 2 weeks notice for resignation",
      "Employer must provide written warning before performance-based termination",
      "Both parties must attempt mediation before legal proceedings"
    ],
    potential_issues: [
      "Termination clause may conflict with anti-retaliation protections",
      "Non-compete clause may be overly broad in scope",
      "Arbitration clause limits ability to pursue court action"
    ],
    missing_information: [
      "No specific procedure outlined for reporting workplace harassment",
      "No clear definition of 'cause' for termination",
      "No specification of severance terms"
    ],
    implications: [
      "The written warning requirement may be relevant to your wrongful termination claim",
      "Anti-retaliation provisions in employment law may supersede at-will employment clause",
      "Mandatory arbitration clause may affect your legal strategy"
    ],
    recommended_actions: [
      "Review whether proper termination procedures were followed per contract",
      "Assess if termination timing after harassment report constitutes retaliation",
      "Determine if 'restructuring' claim is supported by company actions",
      "Consider whether arbitration is required before court filing"
    ],
    disclaimer: "This AI-generated document analysis is for informational purposes only and does not constitute legal advice. The analysis may not identify all relevant aspects of the document. Always consult with a qualified attorney for a comprehensive document review."
  };
  
  // Mock case insights
  const mockCaseInsights = {
    summary_of_key_facts: [
      "Employee terminated after 5 years of employment",
      "Termination occurred shortly after reporting harassment to HR",
      "Consistent positive performance reviews prior to complaint",
      "Employer claimed 'restructuring' as reason for termination",
      "Similar position was filled shortly after termination"
    ],
    primary_legal_issues: [
      "Potential wrongful termination in violation of public policy",
      "Possible retaliation for reporting harassment",
      "Potential pretextual termination (restructuring claim)",
      "Possible violation of anti-discrimination laws"
    ],
    potential_legal_theories: [
      "Retaliation claim under Title VII of the Civil Rights Act",
      "Wrongful termination in violation of public policy",
      "Breach of implied covenant of good faith and fair dealing",
      "Violation of state whistleblower protection laws"
    ],
    case_strengths: [
      "Clear temporal proximity between harassment report and termination",
      "History of positive performance reviews contradicts performance-based termination",
      "Evidence of similar position being filled undermines restructuring claim",
      "Documentation of harassment complaint establishes protected activity"
    ],
    case_weaknesses: [
      "At-will employment clause in contract",
      "Potential difficulty proving direct causal link between complaint and termination",
      "Mandatory arbitration clause may limit court options",
      "Employer may claim legitimate business reasons for restructuring"
    ],
    recommended_strategy: [
      "Gather evidence of the new hire in similar position",
      "Obtain written documentation of all performance reviews",
      "Secure testimony from colleagues about workplace environment",
      "Document timeline of events with precise dates",
      "Consider EEOC complaint before proceeding to litigation",
      "Evaluate arbitration requirements and potential challenges"
    ],
    potential_outcomes: [
      "Settlement agreement with compensation and NDA",
      "Reinstatement with back pay (less common)",
      "Monetary damages for lost wages and emotional distress",
      "Possible punitive damages if retaliation is proven",
      "Dismissal if evidence is insufficient or procedural issues arise"
    ],
    evidence_needed: [
      "All written communication regarding termination",
      "Documentation of harassment complaint to HR",
      "Complete performance review history",
      "Company policies regarding harassment and termination",
      "Evidence of new hire for similar position",
      "Witness statements from colleagues"
    ],
    estimated_timeline: "8-14 months from filing to resolution, with potential for earlier settlement",
    recommended_next_steps: [
      "File EEOC complaint within 180 days of termination",
      "Gather all relevant documentation and evidence",
      "Prepare detailed timeline of events",
      "Consider mediation as potential early resolution",
      "Assess financial damages and potential settlement value"
    ],
    disclaimer: "This AI-generated analysis is for informational purposes only and does not constitute legal advice. The analysis is based on the information provided and general legal principles. It may not account for all relevant facts, jurisdictional differences, or recent legal developments. Always consult with a qualified attorney for advice tailored to your specific situation."
  };
  
  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: question,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory([...chatHistory, userMessage]);
    setIsAnalyzing(true);
    
    // Clear input
    setQuestion('');
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse;
      
      // Generate different responses based on question content
      if (question.toLowerCase().includes('timeline') || question.toLowerCase().includes('how long')) {
        aiResponse = {
          role: 'assistant',
          content: `Based on similar wrongful termination cases, you can expect the following timeline:\n\n1. EEOC Filing and Investigation: 3-6 months\n2. Mediation or Settlement Discussions: 1-2 months\n3. If no settlement, litigation preparation: 2-3 months\n4. Discovery phase: 3-6 months\n5. Pre-trial motions and settlement conferences: 1-3 months\n6. Trial (if necessary): 1 week to several weeks\n\nMany employment cases settle before trial, often during the EEOC phase or during discovery. The entire process typically takes 8-14 months, though complex cases can take longer.\n\nPlease note that this timeline is an estimate based on general patterns and your specific case may vary.`,
          timestamp: new Date().toISOString()
        };
      } else if (question.toLowerCase().includes('evidence') || question.toLowerCase().includes('proof')) {
        aiResponse = {
          role: 'assistant',
          content: `For your wrongful termination case, the following evidence would be particularly valuable:\n\n1. Documentation of your harassment complaint to HR\n2. All written communication regarding your termination\n3. Complete history of performance reviews showing positive feedback\n4. Company policies regarding harassment and termination procedures\n5. Evidence of the new hire for a position similar to yours\n6. Witness statements from colleagues who can corroborate your account\n7. Any direct communications with your supervisor before and after your complaint\n8. Documentation showing the alleged "restructuring" and its scope\n\nFocus on establishing the timeline and causal connection between your harassment report and subsequent termination. Evidence showing that the "restructuring" explanation was pretextual will be particularly important.\n\nYour attorney can help you obtain additional evidence through the discovery process if your case proceeds to litigation.`,
          timestamp: new Date().toISOString()
        };
      } else if (question.toLowerCase().includes('settlement') || question.toLowerCase().includes('compensation')) {
        aiResponse = {
          role: 'assistant',
          content: `Settlement values for wrongful termination cases vary widely based on several factors:\n\n1. Your salary and benefits (lost wages)\n2. Duration of unemployment\n3. Emotional distress damages\n4. Strength of evidence showing retaliation\n5. Jurisdiction and applicable laws\n6. Employer's history of similar cases\n\nTypical settlements for wrongful termination with retaliation elements often range from 6-18 months of the employee's salary, plus potential additional damages for emotional distress.\n\nCases with strong evidence of retaliation following harassment complaints may command higher settlements due to the potential for punitive damages if the case went to trial.\n\nPlease note that this information is general in nature. Your attorney can provide a more specific valuation based on the particular facts of your case and the applicable laws in your jurisdiction.`,
          timestamp: new Date().toISOString()
        };
      } else if (question.toLowerCase().includes('arbitration') || question.toLowerCase().includes('court')) {
        aiResponse = {
          role: 'assistant',
          content: `Your employment contract contains a mandatory arbitration clause (Section 12.3), which typically requires employment disputes to be resolved through arbitration rather than court litigation.\n\nHowever, there are several important considerations:\n\n1. Some states have limitations on mandatory arbitration for certain types of claims, particularly those involving harassment or discrimination.\n\n2. The enforceability of the arbitration clause may be challengeable depending on its specific terms and your jurisdiction.\n\n3. Even with an arbitration clause, you can still file an EEOC complaint, as administrative agency actions are generally not prevented by arbitration agreements.\n\n4. If arbitration is required, the process is typically faster than court litigation but may offer more limited discovery options and appeal rights.\n\nYour attorney should review the specific language of your arbitration clause and advise on its enforceability and strategic implications for your case.`,
          timestamp: new Date().toISOString()
        };
      } else {
        aiResponse = {
          role: 'assistant',
          content: `Based on the information you have provided about your wrongful termination case, it appears you may have a potential retaliation claim. The timing between your harassment report and subsequent termination creates a concerning temporal proximity that could suggest causation.\n\nThe fact that your employer claimed "restructuring" but then hired someone for a similar position could be evidence of pretext - meaning the stated reason for termination was not the real reason.\n\nTo strengthen your case, I recommend:\n\n1. Documenting the exact timeline of events\n2. Gathering all performance reviews showing your positive history\n3. Obtaining any evidence about the new hire in the similar position\n4. Preserving all communication related to your harassment complaint\n\nDepending on your location, you likely need to file an EEOC complaint within 180 days of the termination (or 300 days in some states). This is an important administrative step before pursuing most employment discrimination claims.\n\nYour attorney can provide specific guidance tailored to your jurisdiction and the particular facts of your case.`,
          timestamp: new Date().toISOString()
        };
      }
      
      setChatHistory(prevChat => [...prevChat, aiResponse]);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const handleAnalyzeDocument = () => {
    if (!documentTitle || !documentContent) return;
    
    setIsAnalyzing(true);
    
    // Simulate document analysis
    setTimeout(() => {
      setDocumentAnalysis(mockDocumentAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };
  
  const handleGenerateCaseInsights = () => {
    setIsAnalyzing(true);
    
    // Simulate case analysis
    setTimeout(() => {
      setCaseInsights(mockCaseInsights);
      setIsAnalyzing(false);
    }, 3000);
  };
  
  const renderChatTab = () => {
    return (
      <div className="flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
                <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input 
              placeholder="Ask a question about your case..." 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
              disabled={isAnalyzing}
            />
            <Button onClick={handleSendQuestion} disabled={!question.trim() || isAnalyzing}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Ask about case strategy, evidence needed, potential outcomes, or legal concepts
          </div>
        </div>
      </div>
    );
  };
  
  const renderDocumentAnalysisTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Document Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Document Title</label>
                <Input 
                  placeholder="e.g., Employment Contract" 
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Document Content</label>
                <Textarea 
                  placeholder="Paste the document text here..." 
                  className="min-h-[200px]"
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleAnalyzeDocument} 
                disabled={!documentTitle || !documentContent || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing Document...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Document
                  </>
                )}
              </Button>
              <div className="text-xs text-gray-500 text-center">
                Or upload a document file (coming soon)
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Case Documents</h3>
            <div className="border rounded-lg divide-y">
              {caseData.documents.map((doc) => (
                <div key={doc.id} className="p-3 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{doc.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(doc.uploaded_at).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <FileQuestion className="h-4 w-4" />
                          <span className="ml-1 text-xs">Analyze</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-3 text-center">
                <Button variant="outline" size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Upload New Document
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {documentAnalysis && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Document Analysis: {documentTitle}
              </CardTitle>
              <CardDescription>
                AI-powered analysis of your document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Document Type</h4>
                    <p className="mt-1">{documentAnalysis.document_type}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Key Parties</h4>
                    <ul className="mt-1 space-y-1">
                      {documentAnalysis.key_parties.map((party, index) => (
                        <li key={index} className="text-sm">• {party}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Important Dates</h4>
                    <ul className="mt-1 space-y-1">
                      {documentAnalysis.important_dates.map((date, index) => (
                        <li key={index} className="text-sm">• {date}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Critical Terms</h4>
                    <ul className="mt-1 space-y-1">
                      {documentAnalysis.critical_terms.map((term, index) => (
                        <li key={index} className="text-sm">• {term}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Potential Issues</h4>
                    <ul className="mt-1 space-y-1">
                      {documentAnalysis.potential_issues.map((issue, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Implications for Your Case</h4>
                    <ul className="mt-1 space-y-1">
                      {documentAnalysis.implications.map((implication, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <Lightbulb className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{implication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Recommended Actions</h4>
                    <ul className="mt-1 space-y-1">
                      {documentAnalysis.recommended_actions.map((action, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="text-xs text-gray-500 italic">
                {documentAnalysis.disclaimer}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Analysis
              </Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Discuss with Lawyer
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    );
  };
  
  const renderCaseInsightsTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Case Summary</h3>
          <p className="text-gray-700">{caseData.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <h4 className="text-xs font-medium text-gray-500">Case Type</h4>
              <p className="text-sm font-medium">{caseData.type}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Status</h4>
              <Badge variant="outline" className={caseData.status === 'Active' ? 'bg-green-50 text-green-700' : ''}>
                {caseData.status}
              </Badge>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Created</h4>
              <p className="text-sm">{new Date(caseData.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Lawyer</h4>
              <p className="text-sm">{caseData.lawyer.name}</p>
            </div>
          </div>
        </div>
        
        {!caseInsights ? (
          <div className="text-center py-8">
            <Button 
              onClick={handleGenerateCaseInsights}
              disabled={isAnalyzing}
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-5 w-5 animate-pulse" />
                  Analyzing Your Case...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-5 w-5" />
                  Generate AI Case Insights
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Our AI will analyze your case details to provide legal insights and strategy recommendations
            </p>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                AI Case Analysis
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of your wrongful termination case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="strengths">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                  <TabsTrigger value="strengths">Case Assessment</TabsTrigger>
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="strengths" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Case Strengths</h3>
                      <ul className="space-y-2">
                        {caseInsights.case_strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Case Challenges</h3>
                      <ul className="space-y-2">
                        {caseInsights.case_weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Primary Legal Issues</h3>
                    <ul className="space-y-2">
                      {caseInsights.primary_legal_issues.map((issue, index) => (
                        <li key={index} className="flex items-start">
                          <Scale className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Potential Legal Theories</h3>
                    <ul className="space-y-2">
                      {caseInsights.potential_legal_theories.map((theory, index) => (
                        <li key={index} className="flex items-start">
                          <BookOpen className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{theory}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="strategy" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recommended Strategy</h3>
                    <ul className="space-y-2">
                      {caseInsights.recommended_strategy.map((strategy, index) => (
                        <li key={index} className="flex items-start">
                          <Lightbulb className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Potential Outcomes</h3>
                    <ul className="space-y-2">
                      {caseInsights.potential_outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Recommended Next Steps</h3>
                    <ul className="space-y-2">
                      {caseInsights.recommended_next_steps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="evidence" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Evidence Needed</h3>
                    <ul className="space-y-2">
                      {caseInsights.evidence_needed.map((evidence, index) => (
                        <li key={index} className="flex items-start">
                          <FileText className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{evidence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Current Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseData.documents.map((doc) => (
                        <div key={doc.id} className="border rounded-lg p-3">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-500 mr-2" />
                            <div>
                              <h4 className="text-sm font-medium">{doc.title}</h4>
                              <p className="text-xs text-gray-500">{doc.type}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-800">Missing Evidence</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Based on our analysis, you should consider obtaining the following additional evidence:
                        </p>
                        <ul className="mt-2 space-y-1">
                          <li className="text-sm text-amber-700">• Evidence of new hire for similar position</li>
                          <li className="text-sm text-amber-700">• Witness statements from colleagues</li>
                          <li className="text-sm text-amber-700">• Company policies regarding harassment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Estimated Timeline</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm">{caseInsights.estimated_timeline}</p>
                    </div>
                    
                    <div className="mt-4 space-y-4">
                      <div className="relative">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        
                        <div className="relative pl-10 pb-8">
                          <div className="absolute left-0 rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center">
                            1
                          </div>
                          <h4 className="text-sm font-medium">EEOC Filing and Investigation</h4>
                          <p className="text-sm text-gray-500 mt-1">3-6 months</p>
                          <p className="text-sm mt-2">
                            File a charge with the Equal Employment Opportunity Commission (EEOC) within 180 days of the termination. The EEOC will investigate the claim and may attempt mediation.
                          </p>
                        </div>
                        
                        <div className="relative pl-10 pb-8">
                          <div className="absolute left-0 rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center">
                            2
                          </div>
                          <h4 className="text-sm font-medium">Settlement Discussions</h4>
                          <p className="text-sm text-gray-500 mt-1">1-2 months</p>
                          <p className="text-sm mt-2">
                            Many cases resolve during EEOC mediation or early settlement discussions. This can significantly shorten the timeline.
                          </p>
                        </div>
                        
                        <div className="relative pl-10 pb-8">
                          <div className="absolute left-0 rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center">
                            3
                          </div>
                          <h4 className="text-sm font-medium">Litigation Preparation</h4>
                          <p className="text-sm text-gray-500 mt-1">2-3 months</p>
                          <p className="text-sm mt-2">
                            If no settlement is reached, your attorney will prepare to file a lawsuit after receiving a "right to sue" letter from the EEOC.
                          </p>
                        </div>
                        
                        <div className="relative pl-10 pb-8">
                          <div className="absolute left-0 rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center">
                            4
                          </div>
                          <h4 className="text-sm font-medium">Discovery Phase</h4>
                          <p className="text-sm text-gray-500 mt-1">3-6 months</p>
                          <p className="text-sm mt-2">
                            Exchange of evidence, depositions, and interrogatories. This is often when additional settlement discussions occur as more facts come to light.
                          </p>
                        </div>
                        
                        <div className="relative pl-10">
                          <div className="absolute left-0 rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center">
                            5
                          </div>
                          <h4 className="text-sm font-medium">Trial or Final Resolution</h4>
                          <p className="text-sm text-gray-500 mt-1">1-3 months</p>
                          <p className="text-sm mt-2">
                            If the case proceeds to trial, it typically lasts several days to a week. Most cases settle before reaching trial.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6" />
              
              <div className="text-xs text-gray-500 italic">
                {caseInsights.disclaimer}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Analysis
              </Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Discuss with Lawyer
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    );
  };
  
  return (
    <DashboardLayout 
      title="AI Case Assistant" 
      subtitle="Get AI-powered insights and assistance for your legal case"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Legal Chat</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            <span>Document Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            <span>Case Insights</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Legal Assistant Chat
              </CardTitle>
              <CardDescription>
                Ask questions about your case and get AI-powered legal guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {renderChatTab()}
            </CardContent>
            <CardFooter className="text-xs text-gray-500 italic">
              This AI assistant provides general legal information only, not legal advice. Always consult with your attorney for advice specific to your situation.
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Document Analysis
              </CardTitle>
              <CardDescription>
                Get AI-powered analysis of your legal documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderDocumentAnalysisTab()}
            </CardContent>
            <CardFooter className="text-xs text-gray-500 italic">
              AI document analysis is for informational purposes only and may not identify all relevant aspects of a document. Always consult with your attorney.
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                Case Insights
              </CardTitle>
              <CardDescription>
                Get AI-powered analysis and strategy recommendations for your case
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderCaseInsightsTab()}
            </CardContent>
            <CardFooter className="text-xs text-gray-500 italic">
              AI case insights are for informational purposes only and do not constitute legal advice. Always consult with your attorney for advice tailored to your specific situation.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AICaseAssistant;

