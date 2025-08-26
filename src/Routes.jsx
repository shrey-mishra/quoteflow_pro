import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginScreen from './pages/login-screen';
import SupplierManagement from './pages/supplier-management';
import QuotationComparisonTable from './pages/quotation-comparison-table';
import ProcurementDashboard from './pages/procurement-dashboard';
import AdminApprovalScreen from './pages/admin-approval-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/supplier-management" element={<SupplierManagement />} />
        <Route path="/quotation-comparison-table" element={<QuotationComparisonTable />} />
        <Route path="/procurement-dashboard" element={<ProcurementDashboard />} />
        <Route path="/admin-approval-screen" element={<AdminApprovalScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;