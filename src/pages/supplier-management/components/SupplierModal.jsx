import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SupplierModal = ({ isOpen, onClose, supplier, onSave, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    supplierCode: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    contactPerson: '',
    contactTitle: '',
    taxId: '',
    paymentTerms: '',
    currency: 'USD',
    status: 'Active',
    certifications: [],
    documents: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (supplier && mode === 'edit') {
      setFormData({
        ...supplier,
        certifications: supplier?.certifications || [],
        documents: supplier?.documents || []
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        supplierCode: `SUP-${Date.now()?.toString()?.slice(-6)}`,
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        contactPerson: '',
        contactTitle: '',
        taxId: '',
        paymentTerms: '30',
        currency: 'USD',
        status: 'Active',
        certifications: [],
        documents: [],
        notes: ''
      });
    }
    setErrors({});
    setActiveTab('basic');
  }, [supplier, mode, isOpen]);

  const countryOptions = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Japan', label: 'Japan' },
    { value: 'China', label: 'China' },
    { value: 'India', label: 'India' },
    { value: 'Australia', label: 'Australia' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Suspended', label: 'Suspended' }
  ];

  const paymentTermsOptions = [
    { value: '15', label: 'Net 15' },
    { value: '30', label: 'Net 30' },
    { value: '45', label: 'Net 45' },
    { value: '60', label: 'Net 60' },
    { value: '90', label: 'Net 90' },
    { value: 'COD', label: 'Cash on Delivery' },
    { value: 'Prepaid', label: 'Prepaid' }
  ];

  const availableCertifications = [
    'ISO 9001', 'ISO 14001', 'ISO 45001', 'AS9100', 'TS 16949',
    'FDA Approved', 'CE Marking', 'UL Listed', 'RoHS Compliant', 'REACH Compliant'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCertificationChange = (certification, checked) => {
    setFormData(prev => ({
      ...prev,
      certifications: checked
        ? [...prev?.certifications, certification]
        : prev?.certifications?.filter(c => c !== certification)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Supplier name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.address?.trim()) newErrors.address = 'Address is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.country) newErrors.country = 'Country is required';
    if (!formData?.contactPerson?.trim()) newErrors.contactPerson = 'Contact person is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData?.email && !emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const supplierData = {
        ...formData,
        id: mode === 'edit' ? supplier?.id : Date.now(),
        rating: mode === 'edit' ? supplier?.rating : 0,
        createdAt: mode === 'edit' ? supplier?.createdAt : new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };

      await onSave(supplierData);
      onClose();
    } catch (error) {
      console.error('Error saving supplier:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: 'Building2' },
    { id: 'contact', label: 'Contact Details', icon: 'User' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-elevated rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Building2" size={20} className="text-primary" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {mode === 'edit' ? 'Edit Supplier' : 'Add New Supplier'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mode === 'edit' ? 'Update supplier information' : 'Create a new supplier profile'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth
                    ${activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size={16} strokeWidth={2} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6 max-h-96 overflow-y-auto">
              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Supplier Name"
                      type="text"
                      value={formData?.name}
                      onChange={(e) => handleInputChange('name', e?.target?.value)}
                      error={errors?.name}
                      required
                      placeholder="Enter supplier company name"
                    />
                    
                    <Input
                      label="Supplier Code"
                      type="text"
                      value={formData?.supplierCode}
                      onChange={(e) => handleInputChange('supplierCode', e?.target?.value)}
                      placeholder="Auto-generated code"
                      disabled={mode === 'edit'}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Website"
                      type="url"
                      value={formData?.website}
                      onChange={(e) => handleInputChange('website', e?.target?.value)}
                      placeholder="https://www.example.com"
                    />
                    
                    <Input
                      label="Tax ID"
                      type="text"
                      value={formData?.taxId}
                      onChange={(e) => handleInputChange('taxId', e?.target?.value)}
                      placeholder="Enter tax identification number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Select
                      label="Currency"
                      options={currencyOptions}
                      value={formData?.currency}
                      onChange={(value) => handleInputChange('currency', value)}
                      required
                    />
                    
                    <Select
                      label="Payment Terms"
                      options={paymentTermsOptions}
                      value={formData?.paymentTerms}
                      onChange={(value) => handleInputChange('paymentTerms', value)}
                      required
                    />
                    
                    <Select
                      label="Status"
                      options={statusOptions}
                      value={formData?.status}
                      onChange={(value) => handleInputChange('status', value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
                    <textarea
                      value={formData?.notes}
                      onChange={(e) => handleInputChange('notes', e?.target?.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      placeholder="Additional notes about this supplier..."
                    />
                  </div>
                </div>
              )}

              {/* Contact Details Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Contact Person"
                      type="text"
                      value={formData?.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
                      error={errors?.contactPerson}
                      required
                      placeholder="Primary contact name"
                    />
                    
                    <Input
                      label="Contact Title"
                      type="text"
                      value={formData?.contactTitle}
                      onChange={(e) => handleInputChange('contactTitle', e?.target?.value)}
                      placeholder="Job title or position"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData?.email}
                      onChange={(e) => handleInputChange('email', e?.target?.value)}
                      error={errors?.email}
                      required
                      placeholder="contact@supplier.com"
                    />
                    
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData?.phone}
                      onChange={(e) => handleInputChange('phone', e?.target?.value)}
                      error={errors?.phone}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Input
                      label="Address"
                      type="text"
                      value={formData?.address}
                      onChange={(e) => handleInputChange('address', e?.target?.value)}
                      error={errors?.address}
                      required
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      label="City"
                      type="text"
                      value={formData?.city}
                      onChange={(e) => handleInputChange('city', e?.target?.value)}
                      error={errors?.city}
                      required
                      placeholder="City name"
                    />
                    
                    <Input
                      label="State/Province"
                      type="text"
                      value={formData?.state}
                      onChange={(e) => handleInputChange('state', e?.target?.value)}
                      placeholder="State or province"
                    />
                    
                    <Input
                      label="Postal Code"
                      type="text"
                      value={formData?.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e?.target?.value)}
                      placeholder="ZIP/Postal code"
                    />
                  </div>

                  <Select
                    label="Country"
                    options={countryOptions}
                    value={formData?.country}
                    onChange={(value) => handleInputChange('country', value)}
                    error={errors?.country}
                    required
                    searchable
                  />
                </div>
              )}

              {/* Certifications Tab */}
              {activeTab === 'certifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Available Certifications</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Select all certifications that this supplier currently holds.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableCertifications?.map((certification) => (
                      <Checkbox
                        key={certification}
                        label={certification}
                        checked={formData?.certifications?.includes(certification)}
                        onChange={(e) => handleCertificationChange(certification, e?.target?.checked)}
                      />
                    ))}
                  </div>

                  {formData?.certifications?.length > 0 && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="text-sm font-medium text-foreground mb-2">Selected Certifications:</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData?.certifications?.map((cert) => (
                          <span
                            key={cert}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            <Icon name="Award" size={14} strokeWidth={2} />
                            <span>{cert}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4">Document Management</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Upload and manage supplier documents such as certificates, contracts, and compliance documents.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                    <h4 className="text-lg font-medium text-foreground mb-2">Upload Documents</h4>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop files here, or click to browse
                    </p>
                    <Button variant="outline" iconName="Upload">
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                    </p>
                  </div>

                  {formData?.documents?.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground">Uploaded Documents:</h4>
                      {formData?.documents?.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon name="FileText" size={20} className="text-muted-foreground" strokeWidth={2} />
                            <div>
                              <p className="text-sm font-medium text-foreground">{doc?.name}</p>
                              <p className="text-xs text-muted-foreground">{doc?.size} • {doc?.type}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" iconName="Trash2" className="text-destructive">
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-border bg-muted/30">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                iconName={mode === 'edit' ? 'Save' : 'Plus'}
              >
                {mode === 'edit' ? 'Update Supplier' : 'Add Supplier'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;