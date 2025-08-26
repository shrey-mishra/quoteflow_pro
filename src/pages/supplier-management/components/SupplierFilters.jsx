import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SupplierFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onBulkImport, 
  onBulkExport,
  selectedCount 
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Suspended', label: 'Suspended' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
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

  const certificationOptions = [
    { value: '', label: 'All Certifications' },
    { value: 'ISO 9001', label: 'ISO 9001' },
    { value: 'ISO 14001', label: 'ISO 14001' },
    { value: 'ISO 45001', label: 'ISO 45001' },
    { value: 'AS9100', label: 'AS9100' },
    { value: 'TS 16949', label: 'TS 16949' },
    { value: 'FDA Approved', label: 'FDA Approved' },
    { value: 'CE Marking', label: 'CE Marking' },
    { value: 'UL Listed', label: 'UL Listed' }
  ];

  const ratingOptions = [
    { value: '', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '1', label: '1+ Stars' }
  ];

  const hasActiveFilters = filters?.search || filters?.status || filters?.location || filters?.certification || filters?.rating;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search suppliers by name, email, or code..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          {selectedCount > 0 && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg">
              <Icon name="CheckSquare" size={16} strokeWidth={2} />
              <span className="text-sm font-medium">{selectedCount} selected</span>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            onClick={onBulkImport}
          >
            Import CSV
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onBulkExport}
          >
            Export CSV
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />
        
        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
          placeholder="Filter by location"
          searchable
        />
        
        <Select
          label="Certification"
          options={certificationOptions}
          value={filters?.certification}
          onChange={(value) => onFilterChange('certification', value)}
          placeholder="Filter by certification"
          searchable
        />
        
        <Select
          label="Rating"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => onFilterChange('rating', value)}
          placeholder="Filter by rating"
        />
      </div>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} strokeWidth={2} />
            <span>Active filters applied</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupplierFilters;