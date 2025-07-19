import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Brain, Users, Target, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Ethan Mathew Kiran',
      role: 'CEO & Founder',
      description: 'Came up with the AI-driven lawyer matching idea. Oversees Lexova\'s vision, strategy, and business development. Ensures legal-tech innovation aligns with market needs.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Aron Eby',
      role: 'CTO',
      description: 'Leads all technical aspects of Lexova, including AI, website, UI/UX, app, and chat interface. Develops and maintains Lexova\'s AI-driven lawyer-matching system. Oversees backend security, authentication, and platform scalability.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Aiden Mathew Arun',
      role: 'CFO',
      description: 'Handles customer relations, marketing, and revenue strategies. Ensures Lexova\'s financial stability and growth. Develops customer engagement strategies and partnerships.',
      image: '/api/placeholder/300/300'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI technology to revolutionize how legal services are accessed and delivered.'
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'We believe everyone deserves access to quality legal representation, regardless of their background or location.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Our AI-powered matching ensures clients are connected with lawyers who have the exact expertise they need.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We maintain the highest standards through rigorous lawyer verification and continuous performance monitoring.'
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'We understand that legal issues can be stressful, and we strive to make the process as smooth as possible.'
    },
    {
      icon: Scale,
      title: 'Justice',
      description: 'We are committed to promoting equal access to justice and supporting the legal profession.'
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Lexova Founded',
      description: 'Ethan Mathew Kiran conceptualizes the AI-driven lawyer matching platform'
    },
    {
      year: '2024',
      title: 'Team Formation',
      description: 'Aron Eby joins as CTO and Aiden Mathew Arun as CFO to complete the founding team'
    },
    {
      year: '2024',
      title: 'Platform Development',
      description: 'Development of the AI matching algorithm and platform infrastructure begins'
    },
    {
      year: '2024',
      title: 'Beta Launch',
      description: 'Lexova launches with verified lawyers and initial client base'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Scale className="h-12 w-12 text-blue-600" />
              <span className="text-4xl font-bold text-gray-900">Lexova</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolutionizing Legal Services with{' '}
              <span className="text-blue-600">AI Technology</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our mission is to democratize access to legal services by connecting clients 
              with the perfect lawyers through intelligent case analysis and matching.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To revolutionize legal services by connecting clients with top lawyers through AI. 
              We believe that finding the right legal representation shouldn't be a matter of 
              chance or connections, but a precise match based on expertise, experience, and case requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI-Powered Intelligence
                </h3>
                <p className="text-gray-600">
                  Our sophisticated AI analyzes case details, lawyer expertise, and success rates 
                  to provide the most accurate matches possible.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Human-Centered Design
                </h3>
                <p className="text-gray-600">
                  While we leverage AI, we never forget that legal issues affect real people. 
                  Our platform is designed with empathy and understanding.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Scale className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Justice for All
                </h3>
                <p className="text-gray-600">
                  We're committed to making quality legal representation accessible to everyone, 
                  regardless of their background or circumstances.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our founding team combines expertise in technology, business, and legal innovation 
              to create a platform that truly serves both clients and lawyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-16 w-16 text-gray-500" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do at Lexova, from product development 
              to customer service and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to reality, here is how Lexova has evolved to become 
              the leading AI-powered legal matching platform.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-6">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-blue-600 mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Connect With Us
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Follow us on social media to stay updated on our latest developments, 
            legal insights, and platform updates.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://instagram.com/lexovaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.612-.123-.833-.344-.221-.221-.344-.518-.344-.833 0-.315.123-.612.344-.833.221-.221.518-.344.833-.344s.612.123.833.344c.221.221.344.518.344.833 0 .315-.123.612-.344.833-.221.221-.518.344-.833.344z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/lexova"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/lexovaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

