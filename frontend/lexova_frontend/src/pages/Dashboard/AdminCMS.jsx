import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminDashboardLayout from '../../components/Dashboard/AdminDashboardLayout';
import { 
  FileText, 
  Search, 
  Plus,
  Edit, 
  Trash,
  Eye,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Layout,
  Image,
  Save,
  FileImage,
  Home,
  Info,
  HelpCircle,
  Mail,
  Shield,
  FileCheck
} from 'lucide-react';

const AdminCMS = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pages');
  const [selectedContent, setSelectedContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [contentType, setContentType] = useState('page');

  // Sample data for CMS content
  const [pages] = useState([
    {
      id: 'page-001',
      title: 'Home Page',
      slug: 'home',
      status: 'published',
      lastUpdated: '2024-12-15',
      updatedBy: 'Admin',
      sections: [
        {
          id: 'section-001',
          type: 'hero',
          title: 'Find the Perfect Lawyer for Your Legal Needs',
          subtitle: 'AI-powered matching to connect you with the right legal professional',
          ctaText: 'Find a Lawyer Now',
          ctaLink: '/signup',
          backgroundImage: '/assets/images/hero-background.jpg'
        },
        {
          id: 'section-002',
          type: 'features',
          title: 'Why Choose Lexova',
          features: [
            {
              title: 'AI-Powered Matching',
              description: 'Our advanced algorithm finds the perfect lawyer for your specific case',
              icon: 'brain'
            },
            {
              title: 'Verified Professionals',
              description: 'All lawyers are thoroughly vetted and credentials verified',
              icon: 'shield'
            },
            {
              title: 'Transparent Pricing',
              description: 'Clear fee structures with no hidden costs',
              icon: 'dollar'
            }
          ]
        },
        {
          id: 'section-003',
          type: 'testimonials',
          title: 'What Our Clients Say',
          testimonials: [
            {
              quote: 'Lexova helped me find the perfect lawyer for my case within minutes.',
              author: 'John D.',
              location: 'New York',
              rating: 5
            },
            {
              quote: 'The AI matching was spot on. My lawyer was exactly what I needed.',
              author: 'Sarah M.',
              location: 'Chicago',
              rating: 5
            },
            {
              quote: 'Transparent, efficient, and professional from start to finish.',
              author: 'Michael T.',
              location: 'Los Angeles',
              rating: 4
            }
          ]
        }
      ]
    },
    {
      id: 'page-002',
      title: 'About Us',
      slug: 'about',
      status: 'published',
      lastUpdated: '2024-12-10',
      updatedBy: 'Admin',
      sections: [
        {
          id: 'section-004',
          type: 'header',
          title: 'About Lexova',
          subtitle: 'Revolutionizing legal services through technology',
          backgroundImage: '/assets/images/about-header.jpg'
        },
        {
          id: 'section-005',
          type: 'content',
          title: 'Our Mission',
          content: 'At Lexova, we believe everyone deserves access to quality legal representation. Our mission is to democratize legal services by leveraging technology to connect clients with the perfect lawyer for their specific needs.'
        },
        {
          id: 'section-006',
          type: 'team',
          title: 'Our Team',
          members: [
            {
              name: 'Ethan Johnson',
              title: 'CEO & Founder',
              bio: 'Former attorney with 15 years of experience in corporate law.',
              image: '/assets/images/team/ethan.jpg'
            },
            {
              name: 'Aron Smith',
              title: 'CTO',
              bio: 'AI specialist with background in machine learning and legal tech.',
              image: '/assets/images/team/aron.jpg'
            },
            {
              name: 'Aiden Williams',
              title: 'COO',
              bio: 'Operations expert with experience scaling legal startups.',
              image: '/assets/images/team/aiden.jpg'
            }
          ]
        }
      ]
    },
    {
      id: 'page-003',
      title: 'FAQ',
      slug: 'faq',
      status: 'published',
      lastUpdated: '2024-12-08',
      updatedBy: 'Admin',
      sections: [
        {
          id: 'section-007',
          type: 'header',
          title: 'Frequently Asked Questions',
          subtitle: 'Find answers to common questions about Lexova',
          backgroundImage: '/assets/images/faq-header.jpg'
        },
        {
          id: 'section-008',
          type: 'faq',
          categories: [
            {
              title: 'General Questions',
              questions: [
                {
                  question: 'How does Lexova work?',
                  answer: 'Lexova uses AI technology to match clients with lawyers based on case requirements, lawyer expertise, and other factors to ensure the best possible match.'
                },
                {
                  question: 'Is Lexova available nationwide?',
                  answer: 'Yes, Lexova is available across all 50 states with lawyers specializing in various jurisdictions.'
                }
              ]
            },
            {
              title: 'For Clients',
              questions: [
                {
                  question: 'How much does it cost to use Lexova?',
                  answer: 'Creating an account and getting matched with lawyers is free. You only pay for the legal services you receive from your chosen lawyer.'
                },
                {
                  question: 'Can I switch lawyers if I\'m not satisfied?',
                  answer: 'Yes, you can request a new match at any time through your dashboard.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'page-004',
      title: 'Contact Us',
      slug: 'contact',
      status: 'draft',
      lastUpdated: '2024-12-05',
      updatedBy: 'Admin',
      sections: [
        {
          id: 'section-009',
          type: 'header',
          title: 'Contact Us',
          subtitle: 'We\'re here to help with any questions',
          backgroundImage: '/assets/images/contact-header.jpg'
        },
        {
          id: 'section-010',
          type: 'contact_info',
          email: 'support@lexova.com',
          phone: '(800) 123-4567',
          address: '123 Legal Avenue, Suite 500, New York, NY 10001',
          hours: 'Monday-Friday: 9am-6pm EST'
        },
        {
          id: 'section-011',
          type: 'contact_form',
          fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
            { name: 'subject', label: 'Subject', type: 'text', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ]
        }
      ]
    }
  ]);

  const [legalDocs] = useState([
    {
      id: 'doc-001',
      title: 'Terms of Service',
      slug: 'terms',
      status: 'published',
      lastUpdated: '2024-11-30',
      updatedBy: 'Admin',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.'
    },
    {
      id: 'doc-002',
      title: 'Privacy Policy',
      slug: 'privacy',
      status: 'published',
      lastUpdated: '2024-11-30',
      updatedBy: 'Admin',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.'
    },
    {
      id: 'doc-003',
      title: 'Cookie Policy',
      slug: 'cookies',
      status: 'draft',
      lastUpdated: '2024-12-01',
      updatedBy: 'Admin',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.'
    }
  ]);

  const [blogPosts] = useState([
    {
      id: 'blog-001',
      title: 'How AI is Transforming Legal Services',
      slug: 'ai-transforming-legal-services',
      status: 'published',
      author: 'Ethan Johnson',
      category: 'Technology',
      publishDate: '2024-12-10',
      lastUpdated: '2024-12-12',
      updatedBy: 'Admin',
      excerpt: 'Artificial intelligence is revolutionizing how legal services are delivered. Learn how AI is making legal help more accessible and efficient.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
      featuredImage: '/assets/images/blog/ai-legal.jpg',
      tags: ['AI', 'Legal Tech', 'Innovation']
    },
    {
      id: 'blog-002',
      title: '5 Things to Consider When Hiring a Lawyer',
      slug: '5-things-consider-hiring-lawyer',
      status: 'published',
      author: 'Sarah Williams',
      category: 'Advice',
      publishDate: '2024-12-05',
      lastUpdated: '2024-12-05',
      updatedBy: 'Admin',
      excerpt: 'Hiring the right lawyer is crucial for your case. Here are five important factors to consider before making your decision.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
      featuredImage: '/assets/images/blog/hiring-lawyer.jpg',
      tags: ['Legal Advice', 'Hiring', 'Lawyers']
    },
    {
      id: 'blog-003',
      title: 'Understanding Family Law: A Beginner\'s Guide',
      slug: 'understanding-family-law-beginners-guide',
      status: 'draft',
      author: 'Michael Chen',
      category: 'Education',
      publishDate: null,
      lastUpdated: '2024-12-15',
      updatedBy: 'Admin',
      excerpt: 'Family law can be complex and emotionally challenging. This guide breaks down the basics to help you navigate family legal matters.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
      featuredImage: '/assets/images/blog/family-law.jpg',
      tags: ['Family Law', 'Legal Guide', 'Divorce', 'Custody']
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4" />;
      case 'draft':
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5 text-blue-600" />;
      case 'about':
        return <Info className="h-5 w-5 text-purple-600" />;
      case 'faq':
        return <HelpCircle className="h-5 w-5 text-yellow-600" />;
      case 'contact':
        return <Mail className="h-5 w-5 text-green-600" />;
      case 'terms':
      case 'privacy':
      case 'cookies':
        return <Shield className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLegalDocs = legalDocs.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleContentSelect = (content, type) => {
    setSelectedContent(content);
    setContentType(type);
    setEditMode(false);
  };

  const handleCreateNew = () => {
    let newContent;
    
    if (activeTab === 'pages') {
      newContent = {
        id: `page-${Date.now()}`,
        title: 'New Page',
        slug: 'new-page',
        status: 'draft',
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: 'Admin',
        sections: []
      };
    } else if (activeTab === 'legal') {
      newContent = {
        id: `doc-${Date.now()}`,
        title: 'New Legal Document',
        slug: 'new-document',
        status: 'draft',
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: 'Admin',
        content: ''
      };
    } else if (activeTab === 'blog') {
      newContent = {
        id: `blog-${Date.now()}`,
        title: 'New Blog Post',
        slug: 'new-blog-post',
        status: 'draft',
        author: 'Admin',
        category: 'Uncategorized',
        publishDate: null,
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: 'Admin',
        excerpt: '',
        content: '',
        featuredImage: '',
        tags: []
      };
    }
    
    setSelectedContent(newContent);
    setContentType(activeTab === 'pages' ? 'page' : activeTab === 'legal' ? 'legal' : 'blog');
    setEditMode(true);
  };

  return (
    <AdminDashboardLayout 
      title="Content Management System" 
      subtitle="Manage website content, pages, and blog posts"
    >
      <div className="space-y-6">
        {/* CMS Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pages</p>
                  <p className="text-2xl font-bold text-blue-600">{pages.length}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <Layout className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {pages.filter(p => p.status === 'published').length} published, {pages.filter(p => p.status === 'draft').length} drafts
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Legal Documents</p>
                  <p className="text-2xl font-bold text-purple-600">{legalDocs.length}</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-full">
                  <FileCheck className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {legalDocs.filter(d => d.status === 'published').length} published, {legalDocs.filter(d => d.status === 'draft').length} drafts
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Blog Posts</p>
                  <p className="text-2xl font-bold text-green-600">{blogPosts.length}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {blogPosts.filter(p => p.status === 'published').length} published, {blogPosts.filter(p => p.status === 'draft').length} drafts
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Create */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content List */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="pages" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="pages" className="flex-1">Pages</TabsTrigger>
                <TabsTrigger value="legal" className="flex-1">Legal Docs</TabsTrigger>
                <TabsTrigger value="blog" className="flex-1">Blog</TabsTrigger>
              </TabsList>

              <TabsContent value="pages" className="space-y-4 mt-0">
                {filteredPages.map((page) => (
                  <Card 
                    key={page.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedContent?.id === page.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => handleContentSelect(page, 'page')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getContentIcon(page.slug)}
                          <h3 className="font-medium text-gray-900">{page.title}</h3>
                        </div>
                        <Badge className={getStatusColor(page.status)}>
                          {getStatusIcon(page.status)}
                          <span className="ml-1 capitalize">{page.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">/{page.slug}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Updated: {page.lastUpdated}</span>
                        <span>By: {page.updatedBy}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredPages.length === 0 && (
                  <Card className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No pages found</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="legal" className="space-y-4 mt-0">
                {filteredLegalDocs.map((doc) => (
                  <Card 
                    key={doc.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedContent?.id === doc.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => handleContentSelect(doc, 'legal')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getContentIcon(doc.slug)}
                          <h3 className="font-medium text-gray-900">{doc.title}</h3>
                        </div>
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusIcon(doc.status)}
                          <span className="ml-1 capitalize">{doc.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">/{doc.slug}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Updated: {doc.lastUpdated}</span>
                        <span>By: {doc.updatedBy}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredLegalDocs.length === 0 && (
                  <Card className="p-8 text-center">
                    <FileCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No legal documents found</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="blog" className="space-y-4 mt-0">
                {filteredBlogPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${selectedContent?.id === post.id ? 'border-blue-500 shadow-md' : ''}`}
                    onClick={() => handleContentSelect(post, 'blog')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <Badge className={getStatusColor(post.status)}>
                          {getStatusIcon(post.status)}
                          <span className="ml-1 capitalize">{post.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">{tag}</Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="bg-gray-50">+{post.tags.length - 2}</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>By: {post.author}</span>
                        <span>{post.publishDate || 'Draft'}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredBlogPosts.length === 0 && (
                  <Card className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No blog posts found</p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-2">
            {selectedContent ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>{editMode ? 'Edit Content' : 'Content Details'}</CardTitle>
                    <CardDescription>
                      {contentType === 'page' ? 'Page' : contentType === 'legal' ? 'Legal Document' : 'Blog Post'}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!editMode ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {editMode ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Title</label>
                          <Input 
                            value={selectedContent.title} 
                            onChange={(e) => setSelectedContent({...selectedContent, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Slug</label>
                          <Input 
                            value={selectedContent.slug} 
                            onChange={(e) => setSelectedContent({...selectedContent, slug: e.target.value})}
                          />
                        </div>
                      </div>

                      {contentType === 'blog' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Author</label>
                            <Input 
                              value={selectedContent.author} 
                              onChange={(e) => setSelectedContent({...selectedContent, author: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <Select 
                              value={selectedContent.category}
                              onValueChange={(value) => setSelectedContent({...selectedContent, category: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Advice">Advice</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="News">News</SelectItem>
                                <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Select 
                          value={selectedContent.status}
                          onValueChange={(value) => setSelectedContent({...selectedContent, status: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(contentType === 'legal' || contentType === 'blog') && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            {contentType === 'blog' ? 'Excerpt' : 'Summary'}
                          </label>
                          <Textarea 
                            value={contentType === 'blog' ? selectedContent.excerpt : ''}
                            onChange={(e) => setSelectedContent({...selectedContent, excerpt: e.target.value})}
                            rows={3}
                          />
                        </div>
                      )}

                      {(contentType === 'legal' || contentType === 'blog') && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Content</label>
                          <Textarea 
                            value={selectedContent.content} 
                            onChange={(e) => setSelectedContent({...selectedContent, content: e.target.value})}
                            rows={10}
                          />
                        </div>
                      )}

                      {contentType === 'blog' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Featured Image</label>
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                              {selectedContent.featuredImage ? (
                                <img 
                                  src={selectedContent.featuredImage} 
                                  alt="Featured" 
                                  className="w-full h-full object-cover rounded"
                                />
                              ) : (
                                <FileImage className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <Button variant="outline">
                              <Image className="h-4 w-4 mr-2" />
                              Select Image
                            </Button>
                          </div>
                        </div>
                      )}

                      {contentType === 'blog' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Tags</label>
                          <Input 
                            value={selectedContent.tags.join(', ')} 
                            onChange={(e) => setSelectedContent({...selectedContent, tags: e.target.value.split(',').map(tag => tag.trim())})}
                            placeholder="Enter tags separated by commas"
                          />
                        </div>
                      )}

                      {contentType === 'page' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-700">Page Sections</h3>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Section
                            </Button>
                          </div>
                          
                          {selectedContent.sections.map((section, index) => (
                            <Card key={section.id} className="border-dashed">
                              <CardHeader className="py-3">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base">{section.title || `Section ${index + 1}`}</CardTitle>
                                  <Badge>{section.type}</Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="py-2">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Remove
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // View Mode
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Title</h3>
                          <p className="text-base">{selectedContent.title}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">URL</h3>
                          <p className="text-base">/{selectedContent.slug}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                          <Badge className={getStatusColor(selectedContent.status)}>
                            {getStatusIcon(selectedContent.status)}
                            <span className="ml-1 capitalize">{selectedContent.status}</span>
                          </Badge>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                          <p className="text-base">{selectedContent.lastUpdated}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Updated By</h3>
                          <p className="text-base">{selectedContent.updatedBy}</p>
                        </div>
                      </div>

                      {contentType === 'blog' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Author</h3>
                            <p className="text-base">{selectedContent.author}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                            <Badge variant="outline">{selectedContent.category}</Badge>
                          </div>
                        </div>
                      )}

                      {contentType === 'blog' && selectedContent.tags.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedContent.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {contentType === 'blog' && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Excerpt</h3>
                          <p className="text-base text-gray-700">{selectedContent.excerpt}</p>
                        </div>
                      )}

                      {(contentType === 'legal' || contentType === 'blog') && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Content Preview</h3>
                          <div className="p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
                            <p className="text-sm text-gray-700 whitespace-pre-line">{selectedContent.content}</p>
                          </div>
                        </div>
                      )}

                      {contentType === 'blog' && selectedContent.featuredImage && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Featured Image</h3>
                          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                            <img 
                              src={selectedContent.featuredImage} 
                              alt="Featured" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {contentType === 'page' && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Page Sections ({selectedContent.sections.length})</h3>
                          <div className="space-y-3">
                            {selectedContent.sections.map((section, index) => (
                              <Card key={section.id}>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">{section.title || `Section ${index + 1}`}</h4>
                                    <Badge>{section.type}</Badge>
                                  </div>
                                  {section.subtitle && (
                                    <p className="text-sm text-gray-600 mb-2">{section.subtitle}</p>
                                  )}
                                  {section.content && (
                                    <p className="text-sm text-gray-700 line-clamp-2">{section.content}</p>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View on Site
                          </Button>
                          {selectedContent.status === 'draft' && (
                            <Button>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Publish
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select content to edit</h3>
                  <p className="text-gray-600">
                    Choose a page, legal document, or blog post from the list to view and edit its content.
                  </p>
                  <Button className="mt-4" onClick={handleCreateNew}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Content
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCMS;

