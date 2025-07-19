import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Shield, Eye, Lock, Users, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account, we collect personal information such as your name, email address, phone number, and address. For lawyers, we also collect professional information including bar admission details, education, and experience."
        },
        {
          subtitle: "Case Information",
          text: "When you submit a case for lawyer matching, we collect details about your legal situation, case type, location, budget preferences, and any additional information you provide to help us match you with suitable lawyers."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you use our platform, including pages visited, features used, search queries, and interaction patterns to improve our services."
        },
        {
          subtitle: "Device and Technical Information",
          text: "We collect technical information such as your IP address, browser type, device information, and operating system to ensure platform security and optimize performance."
        }
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "AI Lawyer Matching",
          text: "We use your case information and preferences to power our AI matching algorithm, connecting you with lawyers who have the most relevant expertise and experience for your specific legal needs."
        },
        {
          subtitle: "Platform Services",
          text: "Your information enables us to provide core platform services including account management, communication tools, payment processing, and customer support."
        },
        {
          subtitle: "Service Improvement",
          text: "We analyze usage patterns and feedback to continuously improve our AI algorithms, user interface, and overall platform experience while maintaining your privacy."
        },
        {
          subtitle: "Communication",
          text: "We use your contact information to send important updates about your account, matched lawyers, platform changes, and respond to your inquiries."
        }
      ]
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: [
        {
          subtitle: "With Matched Lawyers",
          text: "When our AI matches you with lawyers, we share relevant case information and your contact details only with lawyers you choose to contact or who are included in your match results."
        },
        {
          subtitle: "Service Providers",
          text: "We work with trusted third-party service providers for payment processing, email delivery, analytics, and hosting. These providers are bound by strict confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or government request, or when necessary to protect our rights, users' safety, or investigate fraud."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the business transaction, with continued protection under this privacy policy."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols. This includes personal information, case details, and payment information."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls ensuring that only authorized personnel can access user data, and only for legitimate business purposes. All access is logged and monitored."
        },
        {
          subtitle: "Security Monitoring",
          text: "Our systems are continuously monitored for security threats, vulnerabilities, and unauthorized access attempts. We maintain incident response procedures for any security events."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your information only as long as necessary to provide services, comply with legal obligations, and resolve disputes. You can request data deletion at any time."
        }
      ]
    },
    {
      icon: Shield,
      title: "Your Privacy Rights",
      content: [
        {
          subtitle: "Access and Portability",
          text: "You have the right to access, download, and receive a copy of your personal information in a structured, machine-readable format."
        },
        {
          subtitle: "Correction and Updates",
          text: "You can update, correct, or modify your personal information at any time through your account settings or by contacting our support team."
        },
        {
          subtitle: "Deletion",
          text: "You have the right to request deletion of your personal information. We will delete your data unless we have a legitimate reason to retain it, such as legal compliance."
        },
        {
          subtitle: "Opt-out",
          text: "You can opt out of non-essential communications, marketing emails, and certain data processing activities while still maintaining your account and core services."
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
              <Shield className="h-12 w-12 text-blue-600" />
              <Scale className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your privacy is fundamental to our mission. Learn how we collect, use, 
              and protect your information while providing AI-powered legal matching services.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-4 inline-block">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Lexova, we are committed to protecting your privacy and maintaining the confidentiality 
                of your personal and legal information. This Privacy Policy explains how we collect, use, 
                share, and protect your information when you use our AI-powered legal matching platform.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We understand that legal matters are sensitive and personal. Our privacy practices are 
                designed to give you control over your information while enabling us to provide you with 
                the best possible legal matching services through our advanced AI technology.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using Lexova, you agree to the collection and use of information in accordance with 
                this Privacy Policy. If you do not agree with our policies and practices, please do not 
                use our services.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          {sections.map((section, index) => (
            <Card key={index} className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <section.icon className="h-6 w-6 text-blue-600" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {item.subtitle}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Cookies and Tracking */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <FileText className="h-6 w-6 text-blue-600" />
                <span>Cookies and Tracking Technologies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                  <p className="text-gray-600 leading-relaxed">
                    We use essential cookies that are necessary for the platform to function properly, 
                    including authentication, security, and basic functionality.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                  <p className="text-gray-600 leading-relaxed">
                    With your consent, we use analytics cookies to understand how users interact with 
                    our platform, helping us improve our services and user experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie Management</h4>
                  <p className="text-gray-600 leading-relaxed">
                    You can manage your cookie preferences through your browser settings or our cookie 
                    preference center. Note that disabling certain cookies may affect platform functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Users */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Users className="h-6 w-6 text-blue-600" />
                <span>International Users</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Lexova is based in the United States, and your information may be transferred to, 
                  stored, and processed in the United States and other countries where our service 
                  providers operate.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  For users in the European Union, we comply with GDPR requirements and provide 
                  additional rights including data portability, the right to be forgotten, and 
                  explicit consent for data processing.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  For users in California, we comply with the California Consumer Privacy Act (CCPA) 
                  and provide additional rights regarding personal information disclosure and deletion.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Lexova is not intended for use by individuals under the age of 18. We do not knowingly 
                collect personal information from children under 18. If we become aware that we have 
                collected personal information from a child under 18, we will take steps to delete 
                such information promptly.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify you of any material 
                changes by:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Posting the updated policy on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a prominent notice on our platform</li>
                <li>Requiring your consent for significant changes</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Your continued use of Lexova after any changes indicates your acceptance of the 
                updated Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or 
                our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> privacy@lexova.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Legal Street, Law City, LC 12345</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                We will respond to your privacy-related inquiries within 30 days of receipt.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

