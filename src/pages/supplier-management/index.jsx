import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TopNavigationBar from '../../components/ui/TopNavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';

import Button from '../../components/ui/Button';
import SupplierTable from './components/SupplierTable';
import SupplierFilters from './components/SupplierFilters';
import SupplierModal from './components/SupplierModal';
import SupplierAnalytics from './components/SupplierAnalytics';
import SupplierProfileModal from './components/SupplierProfileModal';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [sortConfig, setSortConfig] = useState({ field: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    location: '',
    certification: '',
    rating: ''
  });

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@quoteflow.com",
    role: "Procurement Manager",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'New supplier registration',
      message: 'TechCorp Solutions has submitted their registration for approval.',
      timestamp: new Date(Date.now() - 1800000),
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Certification expiring',
      message: 'Global Manufacturing Inc. ISO 9001 certification expires in 30 days.',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Supplier rating updated',
      message: 'Premium Parts Ltd. rating increased to 4.8 stars.',
      timestamp: new Date(Date.now() - 7200000),
      read: true
    }
  ];

  // Mock supplier data
  const mockSuppliers = [
    {
      id: 1,
      name: "TechCorp Solutions",
      supplierCode: "SUP-001",
      email: "contact@techcorp.com",
      phone: "+1 (555) 123-4567",
      website: "https://www.techcorp.com",
      address: "123 Technology Drive",
      city: "San Francisco",
      state: "CA",
      country: "United States",
      postalCode: "94105",
      contactPerson: "John Smith",
      contactTitle: "Sales Manager",
      taxId: "12-3456789",
      paymentTerms: "30",
      currency: "USD",
      status: "Active",
      rating: 4.5,
      certifications: ["ISO 9001", "ISO 14001", "AS9100"],
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2025-01-20T14:45:00Z",
      notes: "Reliable supplier with excellent track record in technology components."
    },
    {
      id: 2,
      name: "Global Manufacturing Inc.",
      supplierCode: "SUP-002",
      email: "procurement@globalmanuf.com",
      phone: "+1 (555) 987-6543",
      website: "https://www.globalmanuf.com",
      address: "456 Industrial Boulevard",
      city: "Detroit",
      state: "MI",
      country: "United States",
      postalCode: "48201",
      contactPerson: "Maria Rodriguez",
      contactTitle: "Business Development Manager",
      taxId: "98-7654321",
      paymentTerms: "45",
      currency: "USD",
      status: "Active",
      rating: 4.2,
      certifications: ["ISO 9001", "TS 16949", "ISO 45001"],
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
      createdAt: "2024-02-20T09:15:00Z",
      updatedAt: "2025-01-18T11:20:00Z",
      notes: "Large-scale manufacturing capabilities with automotive industry expertise."
    },
    {
      id: 3,
      name: "Premium Parts Ltd.",
      supplierCode: "SUP-003",
      email: "sales@premiumparts.co.uk",
      phone: "+44 20 7123 4567",
      website: "https://www.premiumparts.co.uk",
      address: "789 Manufacturing Way",
      city: "Birmingham",
      state: "West Midlands",
      country: "United Kingdom",
      postalCode: "B1 1AA",
      contactPerson: "James Wilson",
      contactTitle: "Account Manager",
      taxId: "GB123456789",
      paymentTerms: "30",
      currency: "GBP",
      status: "Active",
      rating: 4.8,
      certifications: ["ISO 9001", "CE Marking", "RoHS Compliant"],
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
      createdAt: "2024-03-10T14:22:00Z",
      updatedAt: "2025-01-22T16:30:00Z",
      notes: "High-quality precision parts manufacturer with European compliance."
    },
    {
      id: 4,
      name: "Asia Pacific Supplies",
      supplierCode: "SUP-004",
      email: "info@apsupplies.com.sg",
      phone: "+65 6123 4567",
      website: "https://www.apsupplies.com.sg",
      address: "321 Business Park Drive",
      city: "Singapore",
      state: "",
      country: "Singapore",
      postalCode: "138623",
      contactPerson: "Li Wei Chen",
      contactTitle: "Regional Director",
      taxId: "SG-12345678A",
      paymentTerms: "60",
      currency: "USD",
      status: "Pending",
      rating: 3.9,
      certifications: ["ISO 9001", "ISO 14001"],
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
      createdAt: "2024-12-05T08:45:00Z",
      updatedAt: "2025-01-15T10:12:00Z",
      notes: "New supplier undergoing evaluation process for regional expansion."
    },
    {
      id: 5,
      name: "European Components GmbH",
      supplierCode: "SUP-005",
      email: "vertrieb@eurocomponents.de",
      phone: "+49 30 1234 5678",
      website: "https://www.eurocomponents.de",
      address: "Industriestraße 45",
      city: "Munich",
      state: "Bavaria",
      country: "Germany",
      postalCode: "80331",
      contactPerson: "Hans Mueller",
      contactTitle: "Verkaufsleiter",
      taxId: "DE123456789",
      paymentTerms: "30",
      currency: "EUR",
      status: "Active",
      rating: 4.3,
      certifications: ["ISO 9001", "CE Marking", "REACH Compliant"],
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      createdAt: "2024-04-18T12:30:00Z",
      updatedAt: "2025-01-19T15:45:00Z",
      notes: "Specialized in electronic components with strong European market presence."
    },
    {
      id: 6,
      name: "Unreliable Supplies Co.",
      supplierCode: "SUP-006",
      email: "contact@unreliable.com",
      phone: "+1 (555) 000-0000",
      website: "",
      address: "999 Problem Street",
      city: "Nowhere",
      state: "XX",
      country: "United States",
      postalCode: "00000",
      contactPerson: "No Contact",
      contactTitle: "Unknown",
      taxId: "00-0000000",
      paymentTerms: "90",
      currency: "USD",
      status: "Suspended",
      rating: 1.2,
      certifications: [],
      logo: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2025-01-10T09:00:00Z",
      notes: "Suspended due to quality issues and delivery delays."
    }
  ];

  useEffect(() => {
    setSuppliers(mockSuppliers);
    setFilteredSuppliers(mockSuppliers);
  }, []);

  useEffect(() => {
    let filtered = [...suppliers];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(supplier =>
        supplier?.name?.toLowerCase()?.includes(searchTerm) ||
        supplier?.email?.toLowerCase()?.includes(searchTerm) ||
        supplier?.supplierCode?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(supplier => supplier?.status === filters?.status);
    }

    // Apply location filter
    if (filters?.location) {
      filtered = filtered?.filter(supplier => supplier?.country === filters?.location);
    }

    // Apply certification filter
    if (filters?.certification) {
      filtered = filtered?.filter(supplier =>
        supplier?.certifications && supplier?.certifications?.includes(filters?.certification)
      );
    }

    // Apply rating filter
    if (filters?.rating) {
      const minRating = parseInt(filters?.rating);
      filtered = filtered?.filter(supplier => supplier?.rating >= minRating);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.field];
      let bValue = b?.[sortConfig?.field];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortConfig?.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredSuppliers(filtered);
  }, [suppliers, filters, sortConfig]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      location: '',
      certification: '',
      rating: ''
    });
  };

  const handleSort = (config) => {
    setSortConfig(config);
  };

  const handleSelectSupplier = (supplierId) => {
    setSelectedSuppliers(prev =>
      prev?.includes(supplierId)
        ? prev?.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSuppliers?.length === filteredSuppliers?.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(filteredSuppliers?.map(s => s?.id));
    }
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setModalMode('add');
    setIsSupplierModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setModalMode('edit');
    setIsSupplierModalOpen(true);
  };

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsProfileModalOpen(true);
  };

  const handleDeleteSupplier = (supplier) => {
    if (window.confirm(`Are you sure you want to delete ${supplier?.name}?`)) {
      setSuppliers(prev => prev?.filter(s => s?.id !== supplier?.id));
      setSelectedSuppliers(prev => prev?.filter(id => id !== supplier?.id));
    }
  };

  const handleViewAnalytics = (supplier) => {
    // In a real app, this would navigate to a detailed analytics page
    alert(`Viewing analytics for ${supplier?.name}`);
  };

  const handleSaveSupplier = (supplierData) => {
    if (modalMode === 'add') {
      setSuppliers(prev => [...prev, supplierData]);
    } else {
      setSuppliers(prev => prev?.map(s => s?.id === supplierData?.id ? supplierData : s));
    }
    setIsSupplierModalOpen(false);
  };

  const handleBulkImport = () => {
    // Mock CSV import functionality
    alert('CSV import functionality would be implemented here');
  };

  const handleBulkExport = () => {
    // Mock CSV export functionality
    const csvContent = "data:text/csv;charset=utf-8," + "Name,Code,Email,Phone,Status,Rating\n" +
      filteredSuppliers?.map(s => 
        `"${s?.name}","${s?.supplierCode}","${s?.email}","${s?.phone}","${s?.status}","${s?.rating}"`
      )?.join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link?.setAttribute("href", encodedUri);
    link?.setAttribute("download", "suppliers.csv");
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleLogout = () => {
    // Mock logout functionality
    alert('Logout functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Supplier Management - QuoteFlow Pro</title>
        <meta name="description" content="Manage suppliers, certifications, and performance tracking in QuoteFlow Pro procurement system" />
      </Helmet>
      {/* Navigation */}
      <TopNavigationBar
        user={currentUser}
        notifications={notifications}
        onLogout={handleLogout}
      />
      {/* Breadcrumb */}
      <BreadcrumbTrail />
      {/* Main Content */}
      <div className="pt-20">
        <div className="px-6 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Supplier Management</h1>
              <p className="text-muted-foreground">
                Manage your supplier database, track performance, and maintain certifications
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={showAnalytics ? 'default' : 'outline'}
                iconName="BarChart3"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                onClick={handleAddSupplier}
              >
                Add New Supplier
              </Button>
            </div>
          </div>

          {/* Analytics Section */}
          {showAnalytics && (
            <div className="mb-8">
              <SupplierAnalytics suppliers={filteredSuppliers} />
            </div>
          )}

          {/* Filters */}
          <SupplierFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onBulkImport={handleBulkImport}
            onBulkExport={handleBulkExport}
            selectedCount={selectedSuppliers?.length}
          />

          {/* Supplier Table */}
          <SupplierTable
            suppliers={filteredSuppliers}
            onEdit={handleEditSupplier}
            onView={handleViewSupplier}
            onDelete={handleDeleteSupplier}
            onViewAnalytics={handleViewAnalytics}
            selectedSuppliers={selectedSuppliers}
            onSelectSupplier={handleSelectSupplier}
            onSelectAll={handleSelectAll}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Results Summary */}
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredSuppliers?.length} of {suppliers?.length} suppliers
            </span>
            {selectedSuppliers?.length > 0 && (
              <span>
                {selectedSuppliers?.length} supplier{selectedSuppliers?.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <SupplierModal
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        supplier={selectedSupplier}
        onSave={handleSaveSupplier}
        mode={modalMode}
      />
      <SupplierProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        supplier={selectedSupplier}
        onEdit={handleEditSupplier}
      />
    </div>
  );
};

export default SupplierManagement;