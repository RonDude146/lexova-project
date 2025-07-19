import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Scale, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What is Lexova?',
          answer: 'Lexova is an AI-powered legal matching platform that connects clients with qualified lawyers based on their specific legal needs. Our advanced AI analyzes your case details and matches you with lawyers who have the right expertise, experience, and track record for your situation.'
        },
        {
          question: 'How does the AI matching work?',
          answer: 'Our AI system analyzes multiple factors including your case type, location, budget, urgency, and specific requirements. It then compares this with our database of verified lawyers, considering their specializations, experience, success rates, and availability to provide you with the top 5 most suitable matches.'
        },
        {
          question: 'Is Lexova free to use?',
          answer: 'Creating an account and using our AI matching service is completely free for clients. You only pay the lawyer directly for their legal services. There are no hidden fees or commissions from Lexova for clients.'
        },
        {
          question: 'How do I get started?',
          answer: 'Simply sign up for a free account, describe your legal situation using our guided questionnaire, and our AI will immediately provide you with matched lawyer recommendations. You can then review profiles, read reviews, and contact lawyers directly.'
        }
      ]
    },
    {
      category: 'For Clients',
      questions: [
        {
          question: 'What types of legal cases does Lexova handle?',
          answer: 'Lexova covers a wide range of legal areas including Criminal Law, Family Law, Personal Injury, Corporate Law, Real Estate Law, Immigration Law, Employment Law, Intellectual Property, Tax Law, Bankruptcy Law, and many more specialized areas.'
        },
        {
          question: 'How do I know if a lawyer is qualified?',
          answer: 'All lawyers on Lexova are thoroughly verified. We check their bar admission, education, experience, and professional standing. Each lawyer profile shows their credentials, specializations, years of experience, success rates, and client reviews.'
        },
        {
          question: 'Can I communicate with lawyers before hiring them?',
          answer: 'Yes! Most lawyers offer initial consultations where you can discuss your case, ask questions, and determine if they\'re the right fit. Many offer free or low-cost initial consultations to help you make an informed decision.'
        },
        {
          question: 'What if I\'m not satisfied with the AI recommendations?',
          answer: 'You can refine your search criteria, provide additional case details, or use our advanced search filters to find lawyers manually. Our AI learns from feedback and continuously improves its recommendations.'
        },
        {
          question: 'How do I pay for legal services?',
          answer: 'Payment is handled directly between you and your chosen lawyer. Lawyers set their own rates and payment terms. Common arrangements include hourly rates, flat fees, or contingency fees depending on the case type.'
        }
      ]
    },
    {
      category: 'For Lawyers',
      questions: [
        {
          question: 'How do I join Lexova as a lawyer?',
          answer: 'Sign up for a lawyer account, complete our verification process by providing your bar admission details, education, and professional information. Once verified, you can create your profile and start receiving client matches.'
        },
        {
          question: 'What are the fees for lawyers?',
          answer: 'Lexova charges a small subscription fee for lawyers to maintain their profiles and access our platform features. There are no commission fees on cases you receive through our platform. Detailed pricing is available during the signup process.'
        },
        {
          question: 'How does Lexova find clients for me?',
          answer: 'Our AI matches clients with lawyers based on case requirements, specializations, location, and other factors. When a client\'s case matches your expertise and availability, you\'ll be included in their recommendations and can choose to respond to their inquiry.'
        },
        {
          question: 'Can I control my availability and case types?',
          answer: 'Absolutely! You have full control over your profile, including which case types you want to handle, your availability, geographic areas you serve, and your rates. You can update these preferences anytime.'
        },
        {
          question: 'How do I build my reputation on Lexova?',
          answer: 'Client reviews and ratings help build your reputation. Providing excellent service, maintaining updated credentials, and actively engaging with potential clients through consultations will improve your profile visibility and matching priority.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'What if I forget my password?',
          answer: 'Click on "Forgot Password" on the sign-in page. Enter your email address, and we\'ll send you a secure link to reset your password. If you continue to have issues, contact our support team.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take data security very seriously. All personal information is encrypted and stored securely. We comply with privacy regulations and never share your personal information without your consent. Read our Privacy Policy for detailed information.'
        },
        {
          question: 'Can I use Lexova on my mobile device?',
          answer: 'Yes! Lexova is fully responsive and works on all devices including smartphones and tablets. We also have mobile apps available for iOS and Android for an optimized mobile experience.'
        },
        {
          question: 'What browsers are supported?',
          answer: 'Lexova works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser.'
        },
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach our support team through the Contact Us page, email us at support@lexova.com, or use the live chat feature available on our platform. We typically respond within 24 hours.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          question: 'How is my case information protected?',
          answer: 'All case information is encrypted and stored securely. Only you and the lawyers you choose to contact can see your case details. We use industry-standard security measures to protect all data on our platform.'
        },
        {
          question: 'Can I delete my account and data?',
          answer: 'Yes, you can delete your account at any time from your profile settings. This will remove all your personal information from our system. Note that some information may be retained for legal compliance purposes as outlined in our Privacy Policy.'
        },
        {
          question: 'Do you share information with third parties?',
          answer: 'We do not sell or share your personal information with third parties for marketing purposes. Information is only shared with lawyers you choose to contact and as required by law. See our Privacy Policy for complete details.'
        },
        {
          question: 'What cookies does Lexova use?',
          answer: 'We use essential cookies for platform functionality and optional cookies for analytics and user experience improvement. You can manage your cookie preferences in your account settings or browser settings.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <HelpCircle className="h-12 w-12 text-blue-600" />
              <Scale className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find answers to common questions about Lexova, our AI-powered lawyer matching service, 
              and how to get the most out of our platform.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const itemIndex = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems.has(itemIndex);
                  
                  return (
                    <Card key={questionIndex} className="overflow-hidden">
                      <button
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                        onClick={() => toggleItem(itemIndex)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <CardContent className="px-6 pb-6 pt-0">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Cannot find the answer you are looking for? Our support team is here to help. 
            Reach out to us and we will get back to you as soon as possible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-600 mb-4">
                  Get instant help from our support team
                </p>
                <button className="text-blue-600 hover:text-blue-500 font-medium">
                  Start Chat
                </button>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email Support
                </h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll respond within 24 hours
                </p>
                <a href="mailto:support@lexova.com" className="text-blue-600 hover:text-blue-500 font-medium">
                  support@lexova.com
                </a>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Help Center
                </h3>
                <p className="text-gray-600 mb-4">
                  Browse our comprehensive help documentation
                </p>
                <button className="text-blue-600 hover:text-blue-500 font-medium">
                  Visit Help Center
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

