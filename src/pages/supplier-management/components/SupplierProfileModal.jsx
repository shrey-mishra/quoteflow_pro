import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SupplierProfileModal = ({ isOpen, onClose, supplier, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !supplier) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Building2' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare' }
  ];

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars?.push(<Icon key={i} name="Star" size={16} className="text-warning fill-current" strokeWidth={0} />);
      } else if (i === fullStars && hasHalfStar) {
        stars?.push(<Icon key={i} name="StarHalf" size={16} className="text-warning fill-current" strokeWidth={0} />);
      } else {
        stars?.push(<Icon key={i} name="Star" size={16} className="text-muted-foreground" strokeWidth={1} />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'bg-success/10', text: 'text-success', icon: 'CheckCircle' },
      'Inactive': { bg: 'bg-muted', text: 'text-muted-foreground', icon: 'XCircle' },
      'Pending': { bg: 'bg-warning/10', text: 'text-warning', icon: 'Clock' },
      'Suspended': { bg: 'bg-destructive/10', text: 'text-destructive', icon: 'AlertTriangle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['Inactive'];
    
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${config?.bg} ${config?.text}`}>
        <Icon name={config?.icon} size={14} strokeWidth={2} />
        <span>{status}</span>
      </span>
    );
  };

  // Mock performance data
  const performanceMetrics = [
    { label: 'On-time Delivery', value: '94%', trend: 'up', color: 'text-success' },
    { label: 'Quality Rating', value: '4.7/5', trend: 'up', color: 'text-success' },
    { label: 'Response Time', value: '2.1 days', trend: 'down', color: 'text-success' },
    { label: 'Cost Efficiency', value: '87%', trend: 'up', color: 'text-success' }
  ];

  // Mock communication history
  const communications = [
    {
      id: 1,
      type: 'email',
      subject: 'Q4 Pricing Update Discussion',
      date: '2025-01-15',
      status: 'replied',
      preview: 'Thank you for the updated pricing structure. We would like to schedule a meeting to discuss...'
    },
    {
      id: 2,
      type: 'call',
      subject: 'Quality Assurance Review',
      date: '2025-01-10',
      status: 'completed',
      preview: 'Discussed recent quality improvements and certification renewal process.'
    },
    {
      id: 3,
      type: 'meeting',
      subject: 'Contract Renewal Meeting',
      date: '2025-01-05',
      status: 'completed',
      preview: 'Annual contract review and terms negotiation for 2025.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-card shadow-elevated rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                  {supplier?.logo ? (
                    <Image
                      src={supplier?.logo}
                      alt={supplier?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="Building2" size={32} className="text-primary" strokeWidth={2} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{supplier?.name}</h2>
                  <p className="text-sm text-muted-foreground">ID: {supplier?.supplierCode}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    {getRatingStars(supplier?.rating)}
                    <span className="text-sm text-muted-foreground">({supplier?.rating})</span>
                    {getStatusBadge(supplier?.status)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Edit" onClick={() => onEdit(supplier)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
              </div>
            </div>
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

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="User" size={16} className="text-muted-foreground" strokeWidth={2} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{supplier?.contactPerson}</p>
                          <p className="text-xs text-muted-foreground">{supplier?.contactTitle || 'Contact Person'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Mail" size={16} className="text-muted-foreground" strokeWidth={2} />
                        <p className="text-sm text-foreground">{supplier?.email}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Phone" size={16} className="text-muted-foreground" strokeWidth={2} />
                        <p className="text-sm text-foreground">{supplier?.phone}</p>
                      </div>
                      {supplier?.website && (
                        <div className="flex items-center space-x-3">
                          <Icon name="Globe" size={16} className="text-muted-foreground" strokeWidth={2} />
                          <a href={supplier?.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                            {supplier?.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" strokeWidth={2} />
                        <div>
                          <p className="text-sm text-foreground">{supplier?.address}</p>
                          <p className="text-xs text-muted-foreground">
                            {supplier?.city}, {supplier?.state} {supplier?.postalCode}
                          </p>
                          <p className="text-xs text-muted-foreground">{supplier?.country}</p>
                        </div>
                      </div>
                      {supplier?.taxId && (
                        <div className="flex items-center space-x-3">
                          <Icon name="FileText" size={16} className="text-muted-foreground" strokeWidth={2} />
                          <div>
                            <p className="text-sm text-foreground">Tax ID: {supplier?.taxId}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <Icon name="CreditCard" size={16} className="text-muted-foreground" strokeWidth={2} />
                        <div>
                          <p className="text-sm text-foreground">Payment Terms: Net {supplier?.paymentTerms} days</p>
                          <p className="text-xs text-muted-foreground">Currency: {supplier?.currency}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {supplier?.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Notes</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground">{supplier?.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Active Certifications</h3>
                  <span className="text-sm text-muted-foreground">
                    {supplier?.certifications?.length || 0} certifications
                  </span>
                </div>

                {supplier?.certifications && supplier?.certifications?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supplier?.certifications?.map((cert, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                            <Icon name="Award" size={20} className="text-success" strokeWidth={2} />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-foreground">{cert}</h4>
                            <p className="text-xs text-muted-foreground">Valid until: Dec 2025</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                    <h4 className="text-lg font-medium text-foreground mb-2">No Certifications</h4>
                    <p className="text-muted-foreground">This supplier has no active certifications on file.</p>
                  </div>
                )}
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {performanceMetrics?.map((metric, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground">{metric?.label}</h4>
                        <Icon 
                          name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                          size={16} 
                          className={metric?.color}
                          strokeWidth={2} 
                        />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2">Recent Performance Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    This supplier has maintained excellent performance standards over the past 6 months with consistent 
                    on-time deliveries and high-quality products. Response times have improved by 15% compared to the previous period.
                  </p>
                </div>
              </div>
            )}

            {/* Communications Tab */}
            {activeTab === 'communications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Communication History</h3>
                  <Button variant="outline" size="sm" iconName="Plus">
                    New Communication
                  </Button>
                </div>

                <div className="space-y-4">
                  {communications?.map((comm) => (
                    <div key={comm?.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon 
                            name={comm?.type === 'email' ? 'Mail' : comm?.type === 'call' ? 'Phone' : 'Users'} 
                            size={16} 
                            className="text-primary" 
                            strokeWidth={2} 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-foreground">{comm?.subject}</h4>
                            <span className="text-xs text-muted-foreground">{comm?.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{comm?.preview}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            comm?.status === 'completed' ? 'bg-success/10 text-success' :
                            comm?.status === 'replied'? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                          }`}>
                            {comm?.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfileModal;