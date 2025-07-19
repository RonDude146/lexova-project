import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import AIMatching from './pages/Dashboard/AIMatching';
import ClientProfile from './pages/Dashboard/ClientProfile';
import CaseManagement from './pages/Dashboard/CaseManagement';
import CaseDetail from './pages/Dashboard/CaseDetail';
import PaymentManagement from './pages/Dashboard/PaymentManagement';
import ReviewsRatings from './pages/Dashboard/ReviewsRatings';
import LawyerDashboard from './pages/Dashboard/LawyerDashboard';
import LawyerCaseManagement from './pages/Dashboard/LawyerCaseManagement';
import LawyerAvailability from './pages/Dashboard/LawyerAvailability';
import LawyerPayments from './pages/Dashboard/LawyerPayments';
import LawyerProfile from './pages/Dashboard/LawyerProfile';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AdminUserManagement from './pages/Dashboard/AdminUserManagement';
import AdminCaseMonitoring from './pages/Dashboard/AdminCaseMonitoring';
import AdminPaymentManagement from './pages/Dashboard/AdminPaymentManagement';
import AdminDisputeResolution from './pages/Dashboard/AdminDisputeResolution';
import AdminReports from './pages/Dashboard/AdminReports';
import AdminCMS from './pages/Dashboard/AdminCMS';
import AdminFeedback from './pages/Dashboard/AdminFeedback';
import AdminVerification from './pages/Dashboard/AdminVerification';
import AdminNotifications from './pages/Dashboard/AdminNotifications';
import AdminSettings from './pages/Dashboard/AdminSettings';
import AdminAuditLogs from './pages/Dashboard/AdminAuditLogs';
import AdminSecureLogin from './pages/Dashboard/AdminSecureLogin';
import AdminVisualTools from './pages/Dashboard/AdminVisualTools';
import AdminAdjustableSettings from './pages/Dashboard/AdminAdjustableSettings';
import AILawyerMatching from './pages/Dashboard/AILawyerMatching';
import AICaseAssistant from './pages/Dashboard/AICaseAssistant';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with layout */}
        <Route path="/" element={<Layout><Landing /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/signin" element={<Layout><SignIn /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms-conditions" element={<Layout><TermsConditions /></Layout>} />
        
        {/* Client Dashboard routes without main layout */}
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/dashboard/matching" element={<AIMatching />} />
        <Route path="/dashboard/profile" element={<ClientProfile />} />
        <Route path="/dashboard/cases" element={<CaseManagement />} />
        <Route path="/dashboard/cases/:id" element={<CaseDetail />} />
        <Route path="/dashboard/payments" element={<PaymentManagement />} />
        <Route path="/dashboard/reviews" element={<ReviewsRatings />} />
        
        {/* Lawyer Dashboard routes without main layout */}
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
        <Route path="/lawyer-dashboard/cases" element={<LawyerCaseManagement />} />
        <Route path="/lawyer-dashboard/availability" element={<LawyerAvailability />} />
        <Route path="/lawyer-dashboard/payments" element={<LawyerPayments />} />
        <Route path="/lawyer-dashboard/profile" element={<LawyerProfile />} />
        
        {/* Admin Dashboard routes without main layout */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/users" element={<AdminUserManagement />} />
        <Route path="/admin-dashboard/cases" element={<AdminCaseMonitoring />} />
        <Route path="/admin-dashboard/payments" element={<AdminPaymentManagement />} />
        <Route path="/admin-dashboard/disputes" element={<AdminDisputeResolution />} />
        <Route path="/admin-dashboard/reports" element={<AdminReports />} />
        <Route path="/admin-dashboard/cms" element={<AdminCMS />} />
        <Route path="/admin-dashboard/feedback" element={<AdminFeedback />} />
        <Route path="/admin-dashboard/verification" element={<AdminVerification />} />
        <Route path="/admin-dashboard/notifications" element={<AdminNotifications />} />
        <Route path="/admin-dashboard/settings" element={<AdminSettings />} />
        <Route path="/admin-dashboard/audit-logs" element={<AdminAuditLogs />} />
        <Route path="/admin-dashboard/secure-login" element={<AdminSecureLogin />} />
        <Route path="/admin-dashboard/visual-tools" element={<AdminVisualTools />} />
        <Route path="/admin-dashboard/adjustable-settings" element={<AdminAdjustableSettings />} />
        
        {/* Alternative admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/cases" element={<AdminCaseMonitoring />} />
        <Route path="/admin/payments" element={<AdminPaymentManagement />} />
        <Route path="/admin/disputes" element={<AdminDisputeResolution />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/cms" element={<AdminCMS />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/admin/verification" element={<AdminVerification />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
        <Route path="/admin/secure-login" element={<AdminSecureLogin />} />
        <Route path="/admin/visual-tools" element={<AdminVisualTools />} />
        <Route path="/admin/adjustable-settings" element={<AdminAdjustableSettings />} />
        
        {/* AI Features Routes */}
        <Route path="/dashboard/ai-lawyer-matching" element={<AILawyerMatching />} />
        <Route path="/dashboard/ai-case-assistant" element={<AICaseAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;

