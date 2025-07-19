import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, FileText, AlertTriangle, Shield, Users, Gavel } from 'lucide-react';

const TermsConditions = () => {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        {
          text: "By accessing and using Lexova's platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          text: "These Terms of Service constitute a legally binding agreement between you and Lexova. Your use of our services is also governed by our Privacy Policy, which is incorporated by reference into these Terms."
        },
        {
          text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform after changes are posted constitutes acceptance of the modified terms."
        }
      ]
    },
    {
      icon: Users,
      title: "User Accounts and Responsibilities",
      content: [
        {
          subtitle: "Account Creation",
          text: "You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
          subtitle: "User Conduct",
          text: "You agree to use Lexova only for lawful purposes and in accordance with these Terms. You will not use the platform to transmit harmful, offensive, or illegal content, or to violate any applicable laws or regulations."
        },
        {
          subtitle: "Professional Standards",
          text: "Lawyers using our platform must maintain their professional licenses in good standing and comply with all applicable bar rules and ethical requirements. Clients must provide truthful information about their legal matters."
        }
      ]
    },
    {
      icon: Gavel,
      title: "Platform Services",
      content: [
        {
          subtitle: "AI Matching Service",
          text: "Lexova provides an AI-powered matching service to connect clients with lawyers. While our AI strives for accuracy, we do not guarantee that matched lawyers are the best fit for every situation. Final selection decisions rest with the client."
        },
        {
          subtitle: "No Legal Advice",
          text: "Lexova does not provide legal advice. Our platform facilitates connections between clients and lawyers, but we are not a law firm and do not practice law. Any legal advice must come directly from licensed attorneys."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain platform availability but do not guarantee uninterrupted service. We may temporarily suspend services for maintenance, updates, or due to circumstances beyond our control."
        }
      ]
    },
    {
      icon: Shield,
      title: "Lawyer Verification and Standards",
      content: [
        {
          subtitle: "Verification Process",
          text: "We verify lawyer credentials including bar admission, education, and professional standing. However, verification does not constitute an endorsement or guarantee of quality, and clients should conduct their own due diligence."
        },
        {
          subtitle: "Ongoing Compliance",
          text: "Lawyers must maintain current licenses and notify us of any disciplinary actions, suspensions, or changes in their professional status. Failure to maintain compliance may result in removal from the platform."
        },
        {
          subtitle: "Performance Standards",
          text: "Lawyers are expected to maintain professional standards, respond promptly to client inquiries, and provide competent representation. Consistent poor performance may result in platform removal."
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Disclaimers and Limitations",
      content: [
        {
          subtitle: "Service Disclaimers",
          text: "Lexova provides the platform 'as is' without warranties of any kind. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement."
        },
        {
          subtitle: "Limitation of Liability",
          text: "Lexova's liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, special, or consequential damages arising from your use of the platform."
        },
        {
          subtitle: "Third-Party Services",
          text: "Our platform may integrate with third-party services. We are not responsible for the availability, accuracy, or content of third-party services, and your use of such services is at your own risk."
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
              <Gavel className="h-12 w-12 text-blue-600" />
              <Scale className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              These terms govern your use of Lexova's AI-powered legal matching platform. 
              Please read them carefully before using our services.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-4 inline-block">
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to Lexova, an AI-powered legal matching platform that connects clients with 
                qualified lawyers. These Terms and Conditions ("Terms") govern your access to and 
                use of our website, mobile applications, and related services (collectively, the "Platform").
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Lexova operates as a technology platform that facilitates connections between clients 
                seeking legal services and licensed attorneys. We do not provide legal services directly 
                and are not a law firm.
              </p>
              <p className="text-gray-600 leading-relaxed">
                These Terms constitute a binding legal agreement between you and Lexova. By using our 
                Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
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
                      {item.subtitle && (
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {item.subtitle}
                        </h4>
                      )}
                      <p className="text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Payment Terms */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <FileText className="h-6 w-6 text-blue-600" />
                <span>Payment Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Client Payments</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Clients pay lawyers directly for legal services. Lexova does not process payments 
                    for legal services and is not responsible for payment disputes between clients and lawyers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Fees</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Lexova may charge subscription fees to lawyers for platform access and premium features. 
                    All fees are clearly disclosed during the signup process and are subject to change with notice.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Refund Policy</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Platform subscription fees are generally non-refundable. Refunds may be considered 
                    on a case-by-case basis for technical issues or service failures on our part.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl">
                <Shield className="h-6 w-6 text-blue-600" />
                <span>Intellectual Property</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Ownership</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Lexova owns all rights, title, and interest in the Platform, including our AI algorithms, 
                    software, trademarks, and proprietary technology. Users are granted a limited, 
                    non-exclusive license to use the Platform.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">User Content</h4>
                  <p className="text-gray-600 leading-relaxed">
                    You retain ownership of content you submit to the Platform. By submitting content, 
                    you grant Lexova a license to use, modify, and display such content for platform 
                    operation and improvement purposes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Prohibited Use</h4>
                  <p className="text-gray-600 leading-relaxed">
                    You may not copy, modify, distribute, or create derivative works of our Platform 
                    or proprietary technology without explicit written permission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal 
                information is governed by our Privacy Policy, which is incorporated into these Terms 
                by reference.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using our Platform, you consent to the collection and use of your information as 
                described in our Privacy Policy. We implement appropriate security measures to protect 
                your data, but cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">User Termination</h4>
                  <p className="text-gray-600 leading-relaxed">
                    You may terminate your account at any time by contacting us or using account 
                    deletion features. Upon termination, your access to the Platform will cease.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Termination</h4>
                  <p className="text-gray-600 leading-relaxed">
                    We may suspend or terminate your account for violations of these Terms, illegal 
                    activity, or other reasons at our discretion. We will provide notice when possible.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Effect of Termination</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Upon termination, your right to use the Platform ceases immediately. Provisions 
                    regarding intellectual property, disclaimers, and limitations of liability survive termination.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  These Terms are governed by the laws of the State of [State] and the United States, 
                  without regard to conflict of law principles. Any disputes arising from these Terms 
                  or your use of the Platform will be resolved through binding arbitration.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Before initiating arbitration, parties must attempt to resolve disputes through 
                  good faith negotiations. If resolution is not possible, arbitration will be conducted 
                  under the rules of the American Arbitration Association.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms or need to contact us regarding your use 
                of the Platform, please reach out:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-700"><strong>Email:</strong> legal@lexova.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Legal Street, Law City, LC 12345</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;

