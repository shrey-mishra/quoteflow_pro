import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';
import QuotationOverviewTable from './components/QuotationOverviewTable';
import QuotationFormDropdowns from '../quotation-comparison-table/components/QuotationFormDropdowns';
import AdminServiceQuotationTable from './components/AdminServiceQuotationTable';
import AdminTransportQuotationTable from './components/AdminTransportQuotationTable';

import SummaryMetrics from './components/SummaryMetrics';
import RejectModal from './components/RejectModal';
import StatusIndicator from './components/StatusIndicator';
import AdminQuotationComparisonTable from './components/AdminQuotationComparisonTable';

const AdminApprovalScreen = () => {
  const navigate = useNavigate();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [selectedFormType, setSelectedFormType] = useState('provided_data');

  // Add admin approval state for all form types
  const [adminApproval, setAdminApproval] = useState({
    provided_data: {},
    service: {},
    transport: {}
  });

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Admin User",
    email: "admin@company.com",
    role: "Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Quotation Awaiting Review',
      message: 'RFQ-2024-007 requires your approval',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Value Transaction',
      message: 'Quotation exceeds $200K threshold',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false
    }
  ];

  // Mock quotation data for approval
  const mockQuotationData = {
    id: 'RFQ-2024-007',
    title: 'Industrial Equipment Procurement - Manufacturing Line Upgrade',
    description: 'Comprehensive procurement request for upgrading manufacturing line including machinery, safety equipment, and electronic components',
    requestedBy: 'Procurement Team',
    submittedDate: '08/20/2024',
    deadline: '09/15/2024',
    deliveryLocation: 'Manufacturing Facility - Building A, Floor 3',
    specialRequirements: 'ISO 9001 certified suppliers required, 2-year warranty mandatory',
    status: 'Pending Approval',
    submissionTime: '2024-08-22 14:30:00',
    items: [
      {
        id: 1,
        itemCode: 'MFG-001',
        description: 'Industrial CNC Machine - 5-axis',
        vendorCode: 'TS001',
        category: 'Machinery',
        quantity: 2,
        unitOfMeasure: 'Units',
        specifications: 'Working envelope: 1000x800x600mm, Spindle speed: 12000 RPM',
        estimatedBudget: 150000
      },
      {
        id: 2,
        itemCode: 'SAF-002',
        description: 'Safety Equipment Bundle',
        vendorCode: 'GS003',
        category: 'Safety Equipment',
        quantity: 50,
        unitOfMeasure: 'Sets',
        specifications: 'Hard hats, safety vests, protective goggles, steel-toe boots',
        estimatedBudget: 7500
      },
      {
        id: 3,
        itemCode: 'ELE-003',
        description: 'Electronic Control Systems',
        vendorCode: 'TF002',
        category: 'Electronics',
        quantity: 10,
        unitOfMeasure: 'Units',
        specifications: 'PLC controllers, HMI panels, sensor arrays',
        estimatedBudget: 25000
      }
    ],
    suppliers: [
      {
        id: 1,
        name: 'ACME Industrial Solutions',
        contact: 'john.smith@acme-industrial.com',
        rating: 4.8,
        items: [
          { itemId: 1, unitPrice: 72000, totalPrice: 144000, deliveryTime: '8-10 weeks', warranty: '3 years', notes: 'Premium quality, extended warranty included' },
          { itemId: 2, unitPrice: 145, totalPrice: 7250, deliveryTime: '2-3 weeks', warranty: '1 year', notes: 'CE certified, bulk discount applied' }
        ],
        totalQuote: 151250,
        attachments: ['technical_specs.pdf', 'warranty_terms.pdf']
      },
      {
        id: 2,
        name: 'TechFlow Manufacturing',
        contact: 'sarah.jones@techflow.com',
        rating: 4.6,
        items: [
          { itemId: 1, unitPrice: 68000, totalPrice: 136000, deliveryTime: '6-8 weeks', warranty: '2 years', notes: 'Standard warranty, installation included' },
          { itemId: 3, unitPrice: 2400, totalPrice: 24000, deliveryTime: '4-5 weeks', warranty: '2 years', notes: 'Latest generation controllers' }
        ],
        totalQuote: 160000,
        attachments: ['product_catalog.pdf', 'installation_guide.pdf']
      },
      {
        id: 3,
        name: 'Global Safety Corp',
        contact: 'mike.wilson@globalsafety.com',
        rating: 4.9,
        items: [
          { itemId: 2, unitPrice: 140, totalPrice: 7000, deliveryTime: '1-2 weeks', warranty: '1 year', notes: 'Premium safety equipment, ISO certified' },
          { itemId: 3, unitPrice: 2600, totalPrice: 26000, deliveryTime: '3-4 weeks', warranty: '3 years', notes: 'Extended support package included' }
        ],
        totalQuote: 33000,
        attachments: ['safety_certificates.pdf', 'compliance_docs.pdf']
      }
    ]
  };

  // Add mock service data to match quotation team structure
  const mockServiceData = {
    id: 'RFQ-2024-007-SRV',
    type: 'service',
    items: [
      {
        id: 1,
        projectName: "Plant Maintenance Service",
        description: "Comprehensive maintenance service for manufacturing equipment",
        specifications: "Monthly preventive maintenance, emergency repairs, 24/7 support",
        uom: "PROJECT",
        requiredQuantity: 1
      },
      {
        id: 2,
        projectName: "Software Development",
        description: "Custom ERP module development and integration",
        specifications: "Full-stack development, testing, deployment, 6-month support",
        uom: "HOURS",
        requiredQuantity: 480
      }
    ],
    suppliers: [
      {
        id: 1,
        name: 'TechService Solutions',
        contact: 'service@techsol.com',
        rating: 4.8,
        quotes: [
          { itemId: 1, unitPrice: 5000, totalPrice: 5000, attachment: 'service_proposal_1.pdf' },
          { itemId: 2, unitPrice: 85, totalPrice: 40800, attachment: 'dev_proposal.pdf' }
        ],
        totalQuote: 45800
      },
      {
        id: 2,
        name: 'Global Service Corp',
        contact: 'quotes@globalservice.com',
        rating: 4.6,
        quotes: [
          { itemId: 1, unitPrice: 4800, totalPrice: 4800, attachment: 'maintenance_plan.pdf' },
          { itemId: 2, unitPrice: 90, totalPrice: 43200, attachment: 'technical_spec.pdf' }
        ],
        totalQuote: 48000
      }
    ],
    serviceDocuments: {
      signedBOO: { name: 'signed_BOO_document.pdf', type: 'application/pdf' },
      signedDrawing: { name: 'technical_drawing_signed.pdf', type: 'application/pdf' }
    }
  };

  // Add mock transport data to match quotation team structure  
  const mockTransportData = {
    id: 'RFQ-2024-007-TRP',
    type: 'transport',
    items: [
      {
        id: 1,
        from: "Mumbai Port",
        to: "Delhi Warehouse", 
        vehicleSize: "container_40ft",
        load: "Electronic Components",
        dimensions: "12m x 2.4m x 2.6m",
        frequency: "4"
      },
      {
        id: 2,
        from: "Chennai Factory",
        to: "Bangalore Distribution Center",
        vehicleSize: "large",
        load: "Manufacturing Equipment", 
        dimensions: "8m x 2m x 2m",
        frequency: "2"
      }
    ],
    suppliers: [
      {
        id: 1,
        name: 'FastTrack Logistics',
        contact: 'quotes@fasttrack.com',
        rating: 4.7,
        quotes: [
          { itemId: 1, unitPrice: 1200, monthlyTotal: 4800, attachment: 'logistics_quote_1.pdf' },
          { itemId: 2, unitPrice: 800, monthlyTotal: 1600, attachment: 'transport_proposal.pdf' }
        ],
        totalQuote: 6400
      },
      {
        id: 2,
        name: 'Reliable Transport Co',
        contact: 'sales@reliabletrans.com',
        rating: 4.9,
        quotes: [
          { itemId: 1, unitPrice: 1100, monthlyTotal: 4400, attachment: 'shipping_rates.pdf' },
          { itemId: 2, unitPrice: 750, monthlyTotal: 1500, attachment: 'freight_quote.pdf' }
        ],
        totalQuote: 5900
      }
    ]
  };

  // Function to get current data based on form type
  const getCurrentQuotationData = () => {
    switch (selectedFormType) {
      case 'service':
        return mockServiceData;
      case 'transport':
        return mockTransportData;
      default:
        return mockQuotationData;
    }
  };

  const currentData = getCurrentQuotationData();

  const handleApprove = () => {
    // Handle approval logic
    console.log('Quotation approved:', mockQuotationData?.id);
    alert('Quotation has been approved successfully!');
    navigate('/procurement-dashboard');
  };

  const handleReject = () => {
    setIsRejectModalOpen(true);
  };

  const handleRejectConfirm = (rejectionReason) => {
    console.log('Quotation rejected:', mockQuotationData?.id, 'Reason:', rejectionReason);
    setIsRejectModalOpen(false);
    alert('Quotation has been rejected with reason: ' + rejectionReason);
    navigate('/procurement-dashboard');
  };

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const totalEstimatedValue = mockQuotationData?.suppliers?.reduce((sum, supplier) => sum + supplier?.totalQuote, 0) || 0;
  const lowestQuote = Math.min(...(mockQuotationData?.suppliers?.map(s => s?.totalQuote) || [0]));
  const highestQuote = Math.max(...(mockQuotationData?.suppliers?.map(s => s?.totalQuote) || [0]));
  const averageQuote = totalEstimatedValue / (mockQuotationData?.suppliers?.length || 1);

  // Transform mockQuotationData for the comparison table format
  const transformedSuppliers = mockQuotationData?.suppliers?.map(supplier => ({
    id: supplier?.id,
    name: supplier?.name,
    contact: supplier?.contact,
    rating: supplier?.rating
  })) || [];

  const transformedQuotes = mockQuotationData?.suppliers?.map(supplier => ({
    id: supplier?.id,
    items: supplier?.items || [],
    totalQuote: supplier?.totalQuote,
    footer: {
      transportation_freight: "Included in quote",
      packing_charges: "Extra as applicable", 
      delivery_lead_time: supplier?.items?.[0]?.deliveryTime || "As per agreement",
      warranty: supplier?.items?.[0]?.warranty || "Standard warranty",
      currency: "USD",
      remarks_of_quotation: supplier?.items?.[0]?.notes || "All terms as per RFQ"
    }
  })) || [];

  // Add form type change handler
  const handleFormTypeChange = (formType) => {
    setSelectedFormType(formType);
  };

  // Add handlers for admin approval fields
  const handleFinalSupplierChange = (itemId, field, value) => {
    setAdminApproval(prev => ({
      ...prev,
      [selectedFormType]: {
        ...prev?.[selectedFormType],
        [itemId]: {
          ...prev?.[selectedFormType]?.[itemId],
          finalSupplier: {
            ...prev?.[selectedFormType]?.[itemId]?.finalSupplier,
            [field]: value
          }
        }
      }
    }));
  };

  const handleFinalPriceChange = (itemId, value) => {
    setAdminApproval(prev => ({
      ...prev,
      [selectedFormType]: {
        ...prev?.[selectedFormType],
        [itemId]: {
          ...prev?.[selectedFormType]?.[itemId],
          finalPrice: value
        }
      }
    }));
  };

  // Calculate sum amount based on quantity and final price
  const calculateSumAmount = (itemId, quantity) => {
    const finalPrice = adminApproval?.[selectedFormType]?.[itemId]?.finalPrice || 0;
    return (parseFloat(finalPrice) * quantity)?.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigationBar 
        user={currentUser}
        notifications={notifications}
        onLogout={handleLogout}
        onNotificationRead={() => {}}
        onNotificationClear={() => {}}
      />
      <BreadcrumbTrail />
      <div className="pt-4 pb-8">
        {/* Header Section */}
        <div className="px-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Approval Screen</h1>
              <p className="text-muted-foreground">
                Review quotation details and make approval decisions
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="ArrowLeft"
                onClick={() => navigate('/procurement-dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Add Form Type Selection */}
          <div className="mb-6">
            <QuotationFormDropdowns 
              selectedCommodity={selectedFormType}
              selectedProductType="standard"
              selectedWorkType="normal"
              onCommodityChange={handleFormTypeChange}
              onProductTypeChange={() => {}}
              onWorkTypeChange={() => {}}
              readOnly
            />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="px-6 mb-6">
          <StatusIndicator 
            status={currentData?.status || mockQuotationData?.status}
            submissionTime={currentData?.submissionTime || mockQuotationData?.submissionTime}
          />
        </div>

        {/* Quotation Overview Table */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Quotation Overview</h2>
            <span className="text-sm text-muted-foreground">
              RFQ Details & Status ({selectedFormType === 'provided_data' ? 'Provided Data' : selectedFormType === 'service' ? 'Service' : 'Transport'} Form)
            </span>
          </div>
          <QuotationOverviewTable quotationData={currentData} />
        </div>

        {/* Form-Specific Quotation Tables */}
        {selectedFormType === 'provided_data' ? (
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Provided Data Quotation Comparison</h2>
              <span className="text-sm text-muted-foreground">
                Same view as created by quotation requesting team
              </span>
            </div>
            <AdminQuotationComparisonTable 
              suppliers={transformedSuppliers}
              items={mockQuotationData?.items}
              quotes={transformedQuotes}
              adminApproval={adminApproval?.[selectedFormType] || {}}
              onFinalSupplierChange={handleFinalSupplierChange}
              onFinalPriceChange={handleFinalPriceChange}
              calculateSumAmount={calculateSumAmount}
            />
          </div>
        ) : selectedFormType === 'service' ? (
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Service Quotation Comparison</h2>
              <span className="text-sm text-muted-foreground">
                Service form as filled by quotation team - Read Only
              </span>
            </div>
            <AdminServiceQuotationTable 
              suppliers={mockServiceData?.suppliers}
              items={mockServiceData?.items}
              serviceDocuments={mockServiceData?.serviceDocuments}
              adminApproval={adminApproval?.[selectedFormType] || {}}
              onFinalSupplierChange={handleFinalSupplierChange}
              onFinalPriceChange={handleFinalPriceChange}
              calculateSumAmount={calculateSumAmount}
            />
          </div>
        ) : (
          <div className="px-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Transport Quotation Comparison</h2>
              <span className="text-sm text-muted-foreground">
                Transport form as filled by quotation team - Read Only
              </span>
            </div>
            <AdminTransportQuotationTable 
              suppliers={mockTransportData?.suppliers}
              items={mockTransportData?.items}
              adminApproval={adminApproval?.[selectedFormType] || {}}
              onFinalSupplierChange={handleFinalSupplierChange}
              onFinalPriceChange={handleFinalPriceChange}
              calculateSumAmount={calculateSumAmount}
            />
          </div>
        )}

        {/* Summary Metrics */}
        <div className="px-6 mb-6">
          <SummaryMetrics 
            lowestQuote={lowestQuote}
            highestQuote={highestQuote}
            averageQuote={averageQuote}
            suppliersCount={mockQuotationData?.suppliers?.length}
          />
        </div>

        {/* Action Buttons */}
        <div className="px-6">
          <div className="sticky bottom-6 bg-card border border-border rounded-lg p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Ready for Decision
                </h3>
                <p className="text-sm text-muted-foreground">
                  Review all quotation details above before making your decision
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="destructive"
                  iconName="X"
                  onClick={handleReject}
                  className="px-8"
                >
                  Reject
                </Button>
                <Button
                  variant="default"
                  iconName="Check"
                  onClick={handleApprove}
                  className="px-8"
                >
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
        quotationId={mockQuotationData?.id}
      />
    </div>
  );
};

export default AdminApprovalScreen;