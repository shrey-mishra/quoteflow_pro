import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SupplierTable = ({ 
  suppliers, 
  onEdit, 
  onView, 
  onDelete, 
  onViewAnalytics,
  selectedSuppliers,
  onSelectSupplier,
  onSelectAll,
  sortConfig,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSort = (field) => {
    const direction = sortConfig?.field === field && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
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
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        <Icon name={config?.icon} size={12} strokeWidth={2} />
        <span>{status}</span>
      </span>
    );
  };

  const getCertificationBadge = (certifications) => {
    const count = certifications?.length;
    if (count === 0) {
      return (
        <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          <Icon name="AlertCircle" size={12} strokeWidth={2} />
          <span>None</span>
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
        <Icon name="Award" size={12} strokeWidth={2} />
        <span>{count} Active</span>
      </span>
    );
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars?.push(<Icon key={i} name="Star" size={14} className="text-warning fill-current" strokeWidth={0} />);
      } else if (i === fullStars && hasHalfStar) {
        stars?.push(<Icon key={i} name="StarHalf" size={14} className="text-warning fill-current" strokeWidth={0} />);
      } else {
        stars?.push(<Icon key={i} name="Star" size={14} className="text-muted-foreground" strokeWidth={1} />);
      }
    }
    
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedSuppliers?.length === suppliers?.length && suppliers?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Supplier Name</span>
                  <Icon name={getSortIcon('name')} size={14} strokeWidth={2} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-foreground">Contact Info</span>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-foreground">Location</span>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-foreground">Certifications</span>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Rating</span>
                  <Icon name={getSortIcon('rating')} size={14} strokeWidth={2} />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} strokeWidth={2} />
                </button>
              </th>
              <th className="text-right px-4 py-3">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {suppliers?.map((supplier) => (
              <tr
                key={supplier?.id}
                className={`hover:bg-muted/30 transition-smooth ${
                  selectedSuppliers?.includes(supplier?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(supplier?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers?.includes(supplier?.id)}
                    onChange={() => onSelectSupplier(supplier?.id)}
                    className="rounded border-border focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                      {supplier?.logo ? (
                        <Image
                          src={supplier?.logo}
                          alt={supplier?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon name="Building2" size={20} className="text-primary" strokeWidth={2} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{supplier?.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {supplier?.supplierCode}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={14} className="text-muted-foreground" strokeWidth={2} />
                      <span className="text-sm text-foreground">{supplier?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={14} className="text-muted-foreground" strokeWidth={2} />
                      <span className="text-sm text-foreground">{supplier?.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" strokeWidth={2} />
                    <div>
                      <p className="text-sm text-foreground">{supplier?.city}</p>
                      <p className="text-xs text-muted-foreground">{supplier?.country}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {getCertificationBadge(supplier?.certifications)}
                </td>
                <td className="px-4 py-4">
                  {getRatingStars(supplier?.rating)}
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(supplier?.status)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onView(supplier)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(supplier)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="BarChart3"
                      onClick={() => onViewAnalytics(supplier)}
                    >
                      Analytics
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onDelete(supplier)}
                      className="text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {suppliers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building2" size={48} className="text-muted-foreground mx-auto mb-4" strokeWidth={1} />
          <h3 className="text-lg font-medium text-foreground mb-2">No suppliers found</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first supplier to the system.</p>
          <Button variant="default" iconName="Plus">
            Add New Supplier
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupplierTable;