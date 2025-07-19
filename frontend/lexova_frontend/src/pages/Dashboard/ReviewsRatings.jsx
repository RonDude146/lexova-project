import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { 
  Star, 
  User, 
  Calendar, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  Edit,
  Trash2,
  Send,
  Award,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const ReviewsRatings = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const myReviews = [
    {
      id: 1,
      lawyer: {
        name: 'Sarah Johnson',
        firm: 'Johnson & Associates',
        avatar: '/api/placeholder/50/50'
      },
      caseTitle: 'Personal Injury Claim',
      rating: 5,
      review: 'Sarah was exceptional throughout my personal injury case. She was professional, responsive, and achieved a settlement that exceeded my expectations. I would highly recommend her services.',
      date: '2024-12-10',
      helpful: 12,
      caseOutcome: 'Successful Settlement',
      wouldRecommend: true
    },
    {
      id: 2,
      lawyer: {
        name: 'Michael Chen',
        firm: 'Chen Legal Group',
        avatar: '/api/placeholder/50/50'
      },
      caseTitle: 'Contract Review',
      rating: 4,
      review: 'Michael provided thorough contract review services. He identified several important issues and helped negotiate better terms. Very knowledgeable and detail-oriented.',
      date: '2024-11-28',
      helpful: 8,
      caseOutcome: 'Contract Approved',
      wouldRecommend: true
    },
    {
      id: 3,
      lawyer: {
        name: 'David Wilson',
        firm: 'Wilson Family Law',
        avatar: '/api/placeholder/50/50'
      },
      caseTitle: 'Divorce Proceedings',
      rating: 3,
      review: 'David handled my divorce case adequately. The process took longer than expected, but the outcome was fair. Communication could have been better at times.',
      date: '2024-10-15',
      helpful: 5,
      caseOutcome: 'Divorce Finalized',
      wouldRecommend: false
    }
  ];

  const pendingReviews = [
    {
      id: 1,
      lawyer: {
        name: 'Emily Rodriguez',
        firm: 'Rodriguez Law Firm',
        avatar: '/api/placeholder/50/50'
      },
      caseTitle: 'Employment Dispute',
      completedDate: '2024-12-15',
      caseOutcome: 'Settlement Reached'
    }
  ];

  const lawyerStats = [
    {
      lawyer: 'Sarah Johnson',
      totalCases: 2,
      avgRating: 5.0,
      totalSpent: 8500,
      relationship: 'Active'
    },
    {
      lawyer: 'Michael Chen',
      totalCases: 1,
      avgRating: 4.0,
      totalSpent: 2500,
      relationship: 'Completed'
    },
    {
      lawyer: 'David Wilson',
      totalCases: 1,
      avgRating: 3.0,
      totalSpent: 6800,
      relationship: 'Completed'
    }
  ];

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = (lawyerId) => {
    if (selectedRating > 0 && reviewText.trim()) {
      // In real app, this would submit the review via API
      console.log('Submitting review:', { lawyerId, rating: selectedRating, review: reviewText });
      setSelectedRating(0);
      setReviewText('');
      setShowReviewForm(false);
    }
  };

  const avgRating = myReviews.reduce((sum, review) => sum + review.rating, 0) / myReviews.length;
  const totalReviews = myReviews.length;
  const recommendationRate = (myReviews.filter(r => r.wouldRecommend).length / myReviews.length) * 100;

  return (
    <DashboardLayout 
      title="Reviews & Ratings" 
      subtitle="Rate your lawyers and help other clients make informed decisions"
    >
      <div className="space-y-6">
        {/* Review Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reviews Given</p>
                  <p className="text-2xl font-bold text-blue-600">{totalReviews}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-yellow-600">{avgRating.toFixed(1)}</p>
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="bg-yellow-50 p-2 rounded-full">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recommendation Rate</p>
                  <p className="text-2xl font-bold text-green-600">{recommendationRate.toFixed(0)}%</p>
                </div>
                <div className="bg-green-50 p-2 rounded-full">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingReviews.length}</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-full">
                  <Edit className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Reviews ({pendingReviews.length})</TabsTrigger>
            <TabsTrigger value="my-reviews">My Reviews ({myReviews.length})</TabsTrigger>
            <TabsTrigger value="lawyer-stats">Lawyer Statistics</TabsTrigger>
          </TabsList>

          {/* Pending Reviews Tab */}
          <TabsContent value="pending" className="space-y-4">
            {pendingReviews.length > 0 ? (
              pendingReviews.map((pending) => (
                <Card key={pending.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{pending.lawyer.name}</CardTitle>
                          <CardDescription>{pending.lawyer.firm}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Case Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-gray-900">{pending.caseTitle}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>Completed: {new Date(pending.completedDate).toLocaleDateString()}</span>
                          <span>Outcome: {pending.caseOutcome}</span>
                        </div>
                      </div>

                      {!showReviewForm ? (
                        <Button onClick={() => setShowReviewForm(true)}>
                          <Star className="h-4 w-4 mr-2" />
                          Write Review
                        </Button>
                      ) : (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <Label>Rating</Label>
                            <div className="mt-2">
                              {renderStars(selectedRating, true, setSelectedRating)}
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="review">Your Review</Label>
                            <Textarea
                              id="review"
                              placeholder="Share your experience working with this lawyer..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              rows={4}
                              className="mt-2"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="recommend" className="rounded" />
                            <Label htmlFor="recommend" className="text-sm">
                              I would recommend this lawyer to others
                            </Label>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleSubmitReview(pending.id)}
                              disabled={selectedRating === 0 || !reviewText.trim()}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Submit Review
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setShowReviewForm(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Reviews</h3>
                  <p className="text-gray-600">
                    You're all caught up! All your completed cases have been reviewed.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Reviews Tab */}
          <TabsContent value="my-reviews" className="space-y-4">
            {myReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.lawyer.name}</h3>
                        <p className="text-sm text-gray-600">{review.lawyer.firm}</p>
                        <p className="text-sm text-blue-600 mt-1">{review.caseTitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {review.caseOutcome}
                      </span>
                      <span className="flex items-center">
                        {review.wouldRecommend ? (
                          <>
                            <ThumbsUp className="h-4 w-4 mr-1 text-green-600" />
                            <span className="text-green-600">Recommended</span>
                          </>
                        ) : (
                          <>
                            <ThumbsDown className="h-4 w-4 mr-1 text-red-600" />
                            <span className="text-red-600">Not Recommended</span>
                          </>
                        )}
                      </span>
                      <span>{review.helpful} found helpful</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Lawyer Statistics Tab */}
          <TabsContent value="lawyer-stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lawyer Performance Summary</CardTitle>
                <CardDescription>
                  Overview of your experience with different lawyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lawyerStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{stat.lawyer}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>{stat.totalCases} case{stat.totalCases > 1 ? 's' : ''}</span>
                            <span>${stat.totalSpent.toLocaleString()} spent</span>
                            <Badge 
                              variant="outline" 
                              className={stat.relationship === 'Active' ? 'text-green-600' : 'text-gray-600'}
                            >
                              {stat.relationship}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          {renderStars(Math.round(stat.avgRating))}
                          <span className="text-sm font-medium">{stat.avgRating.toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-gray-500">Average Rating</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Your Review Impact</CardTitle>
                <CardDescription>
                  How your reviews help the Lexova community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">47</p>
                    <p className="text-sm text-gray-600">People helped by your reviews</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">4.3</p>
                    <p className="text-sm text-gray-600">Your average rating given</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">Top 10%</p>
                    <p className="text-sm text-gray-600">Most helpful reviewer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReviewsRatings;

