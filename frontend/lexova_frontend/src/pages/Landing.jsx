import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Scale, 
  Brain, 
  Shield, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Zap,
  Clock,
  Award
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI analyzes your case and matches you with the most suitable lawyers based on expertise, location, and success rate.'
    },
    {
      icon: Shield,
      title: 'Verified Lawyers',
      description: 'All lawyers on our platform are thoroughly verified, licensed, and have proven track records in their specializations.'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Get personalized legal consultation and case management tailored to your specific needs and circumstances.'
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Find and connect with qualified lawyers in minutes, not days. Our streamlined process saves you time and effort.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our AI assistant is available round the clock to help you with case questions and lawyer matching.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'We maintain high standards through continuous monitoring, client feedback, and lawyer performance tracking.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'Lexova helped me find the perfect corporate lawyer for my startup. The AI matching was incredibly accurate!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Individual Client',
      content: 'I was overwhelmed with my legal situation, but Lexova made finding the right lawyer so simple and stress-free.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Family Law Client',
      content: 'The lawyer I found through Lexova was exactly what I needed. Professional, experienced, and understanding.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Cases Matched' },
    { number: '500+', label: 'Verified Lawyers' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find the Perfect Lawyer with{' '}
              <span className="text-blue-600">AI-Powered Matching</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Lexova revolutionizes legal services by connecting clients with top lawyers 
              through intelligent case analysis. Get matched with the right legal expert 
              for your specific needs in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup?type=client">
                <Button size="lg" className="text-lg px-8 py-3">
                  Find a Lawyer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup?type=lawyer">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Join as a Lawyer
                </Button>
              </Link>
            </div>
          </div>

          {/* AI Matching Animation Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900">AI Legal Matching in Action</h3>
                <p className="text-gray-600">Watch how our AI analyzes your case and finds the perfect lawyer</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Describe Your Case</h4>
                  <p className="text-gray-600 text-sm">Tell our AI about your legal situation</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">AI Analysis</h4>
                  <p className="text-gray-600 text-sm">Our AI analyzes and matches requirements</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Get Matched</h4>
                  <p className="text-gray-600 text-sm">Receive top 5 lawyer recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lexova?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with legal expertise to provide 
              the most efficient and accurate lawyer matching service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Do not just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Legal Match?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of clients who have found their ideal lawyers through 
            our AI-powered matching system. Get started today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup?type=client">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

