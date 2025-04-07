import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

// Shared Pages
import LoginPage from './pages/shared/LoginPage';
import RegisterPage from './pages/shared/RegisterPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminActivityLogPage from './pages/admin/AdminActivityLogPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Owner Pages
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage';
import OwnerProjectsPage from './pages/owner/OwnerProjectsPage';
import OwnerProjectDetailPage from './pages/owner/OwnerProjectDetailPage';
import OwnerInvitationsPage from './pages/owner/OwnerInvitationsPage';
import OwnerReviewsPage from './pages/owner/OwnerReviewsPage';
import OwnerNotificationsPage from './pages/owner/OwnerNotificationsPage';
import OwnerSettingsPage from './pages/owner/OwnerSettingsPage';

// Engineer Pages
import EngineerDashboardPage from './pages/engineer/EngineerDashboardPage';
import EngineerTasksPage from './pages/engineer/EngineerTasksPage';
import EngineerProjectsPage from './pages/engineer/EngineerProjectsPage';
import EngineerReportsPage from './pages/engineer/EngineerReportsPage';
import EngineerNotificationsPage from './pages/engineer/EngineerNotificationsPage';
import EngineerSettingsPage from './pages/engineer/EngineerSettingsPage';

// Contractor Pages
import ContractorDashboardPage from './pages/contractor/ContractorDashboardPage';
import ContractorTasksPage from './pages/contractor/ContractorTasksPage';
import ContractorProjectsPage from './pages/contractor/ContractorProjectsPage';
import ContractorReportsPage from './pages/contractor/ContractorReportsPage';
import ContractorInvitationsPage from './pages/contractor/ContractorInvitationsPage';
import ContractorNotificationsPage from './pages/contractor/ContractorNotificationsPage';
import ContractorSettingsPage from './pages/contractor/ContractorSettingsPage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" />;
      case 'owner':
        return <Navigate to="/owner/dashboard" />;
      case 'engineer':
        return <Navigate to="/engineer/dashboard" />;
      case 'contractor':
        return <Navigate to="/contractor/dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }
  
  return <>{children}</>;
};

// Main Router Component
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage onLogin={(email, password) => {
          console.log('Login attempt with:', email, password);
          // This would dispatch the login action in a real implementation
          // dispatch(loginRequest({ email, password }));
        }} />} />
        <Route path="/register" element={<RegisterPage onRegister={(userData) => {
          console.log('Register attempt with:', userData);
          // This would dispatch the register action in a real implementation
          // dispatch(registerRequest(userData));
        }} />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/activity-log" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminActivityLogPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminSettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Owner Routes */}
        <Route 
          path="/owner/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/projects" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerProjectsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/projects/:id" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerProjectDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/invitations" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerInvitationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/reviews" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerReviewsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/notifications" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerNotificationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/owner/settings" 
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerSettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Engineer Routes */}
        <Route 
          path="/engineer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['engineer']}>
              <EngineerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/engineer/tasks" 
          element={
            <ProtectedRoute allowedRoles={['engineer']}>
              <EngineerTasksPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/engineer/projects" 
          element={
            <ProtectedRoute allowedRoles={['engineer']}>
              <EngineerProjectsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/engineer/reports" 
          element={
            <ProtectedRoute allowedRoles={['engineer']}>
              <EngineerReportsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/engineer/notifications" 
          element={
            <ProtectedRoute allowedRoles={['engineer']}>
              <EngineerNotificationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/engineer/settings" 
          element={
            <ProtectedRoute allowedRoles={['engineer']}>
              <EngineerSettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Contractor Routes */}
        <Route 
          path="/contractor/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <ContractorDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contractor/tasks" 
          element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <ContractorTasksPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contractor/projects" 
          element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <ContractorProjectsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contractor/reports" 
          element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <ContractorReportsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contractor/invitations" 
          element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <ContractorInvitationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contractor/notifications" 
          element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <ContractorNotificationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contractor/settings" 
          element={
            <ProtectedRoute allowedRoles={['contractor']}>
              <ContractorSettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Default Route - Redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
