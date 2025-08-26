import React from 'react';
import AppIcon from '../../../components/AppIcon';


const AdminQuotationComparisonTable = ({ 
  suppliers = [], 
  items = [], 
  quotes = [],
  adminApproval = {},
  onFinalSupplierChange,
  onFinalPriceChange,
  calculateSumAmount
}) => {
  const getSupplierName = (supplierId) => {
    const supplier = suppliers?.find(s => s?.id === supplierId);
    return supplier ? supplier?.name : 'Unknown Supplier';
  };

  const calculateAmount = (rate, quantity) => {
    return (rate * quantity)?.toFixed(2);
  };

  const calculateTotalAmount = (quoteIndex) => {
    return items?.reduce((total, item) => {
      const quote = quotes?.[quoteIndex];
      const itemQuote = quote?.items?.find(qi => qi?.itemId === item?.id);
      const rate = itemQuote?.unitPrice || 0;
      return total + (rate * item?.quantity);
    }, 0);
  };

  // Footer row configurations (read-only display)
  const footerRows = [
    { label: "Transportation/Freight", key: "transportation_freight" },
    { label: "Packing Charges", key: "packing_charges" },
    { label: "Delivery Lead Time", key: "delivery_lead_time" },
    { label: "Warranty", key: "warranty" },
    { label: "Currency", key: "currency" },
    { label: "Remarks of Quotation", key: "remarks_of_quotation" }
  ];

  if (!items?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <AppIcon name="Table" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No quotation data available</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          {/* Table Header */}
          <thead className="bg-muted border-b border-border sticky top-0 z-20">
            <tr>
              {/* Fixed Left Column Headers */}
              <th className="p-3 text-left bg-card sticky left-0 z-30 border-r border-border">
                <div className="flex items-center space-x-2">
                  <AppIcon name="Package" size={16} />
                  <span className="text-sm font-semibold text-foreground">Description</span>
                </div>
              </th>
              
              <th className="p-3 text-left bg-card sticky left-48 z-30 border-r border-border">
                <div className="flex items-center space-x-2">
                  <AppIcon name="Tag" size={16} />
                  <span className="text-sm font-semibold text-foreground">Vendor Code</span>
                </div>
              </th>
              
              <th className="p-3 text-left bg-card sticky left-96 z-30 border-r border-border">
                <div className="flex items-center space-x-2">
                  <AppIcon name="FileText" size={16} />
                  <span className="text-sm font-semibold text-foreground">Specifications</span>
                </div>
              </th>
              
              <th className="p-3 text-left bg-card sticky left-120 z-30 border-r border-border">
                <div className="flex items-center space-x-2">
                  <AppIcon name="Hash" size={16} />
                  <span className="text-sm font-semibold text-foreground">Req Qty</span>
                </div>
              </th>
              
              <th className="p-3 text-left bg-card sticky left-144 z-30 border-r border-border">
                <div className="flex items-center space-x-2">
                  <AppIcon name="Ruler" size={16} />
                  <span className="text-sm font-semibold text-foreground">UOM</span>
                </div>
              </th>
              
              <th className="p-3 text-left bg-card sticky left-168 z-30 border-r border-border">
                <div className="flex items-center space-x-2">
                  <AppIcon name="DollarSign" size={16} />
                  <span className="text-sm font-semibold text-foreground">Est. Budget</span>
                </div>
              </th>
              
              <th className="p-3 text-left bg-card sticky left-192 z-30 border-r border-border">
                <div className="flex items-center space-x-2">
                  <AppIcon name="Tag" size={16} />
                  <span className="text-sm font-semibold text-foreground">Category</span>
                </div>
              </th>

              {/* Dynamic Supplier Quote Headers */}
              {suppliers?.map((supplier, index) => (
                <th key={supplier?.id} className="p-3 text-left border-r border-border min-w-64">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <AppIcon name="Building2" size={16} className="text-primary" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {supplier?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating: {supplier?.rating}/5.0
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Contact: {supplier?.contact}
                    </div>
                  </div>
                </th>
              ))}

              {/* Admin Approval Column Header */}
              <th className="p-3 text-left border-r border-border min-w-96 bg-orange-50 dark:bg-orange-950/20">
                <div className="flex items-center space-x-2">
                  <AppIcon name="UserCheck" size={16} className="text-orange-600" />
                  <div>
                    <div className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                      Admin Approval
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">
                      Final supplier selection & pricing
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {/* Item Rows */}
            {items?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/50">
                {/* Fixed Left Columns */}
                <td className="p-3 bg-card sticky left-0 z-10 border-r border-border">
                  <div className="text-sm font-medium text-foreground">
                    {item?.description}
                  </div>
                </td>
                <td className="p-3 bg-card sticky left-48 z-10 border-r border-border">
                  <div className="text-sm font-medium text-foreground">
                    {item?.vendorCode || '-'}
                  </div>
                </td>
                <td className="p-3 bg-card sticky left-96 z-10 border-r border-border">
                  <div className="text-sm text-muted-foreground max-w-48 truncate">
                    {item?.specifications || '-'}
                  </div>
                </td>
                <td className="p-3 bg-card sticky left-120 z-10 border-r border-border">
                  <div className="text-sm font-medium text-foreground">
                    {item?.quantity}
                  </div>
                </td>
                <td className="p-3 bg-card sticky left-144 z-10 border-r border-border">
                  <div className="text-sm text-muted-foreground">
                    {item?.unitOfMeasure || '-'}
                  </div>
                </td>
                <td className="p-3 bg-card sticky left-168 z-10 border-r border-border">
                  <div className="text-sm font-medium text-foreground">
                    ${item?.estimatedBudget?.toFixed(2) || '0.00'}
                  </div>
                </td>
                <td className="p-3 bg-card sticky left-192 z-10 border-r border-border">
                  <div className="text-sm text-muted-foreground">
                    {item?.category || '-'}
                  </div>
                </td>

                {/* Dynamic Quote Columns */}
                {suppliers?.map((supplier) => {
                  const supplierQuote = quotes?.find(q => q?.id === supplier?.id);
                  const itemQuote = supplierQuote?.items?.find(qi => qi?.itemId === item?.id);
                  
                  return (
                    <td key={supplier?.id} className="p-3 border-r border-border">
                      {itemQuote ? (
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-foreground">
                              ${itemQuote?.unitPrice?.toFixed(2)}
                            </div>
                            <div className="text-sm font-semibold text-primary">
                              Total: ${itemQuote?.totalPrice?.toFixed(2)}
                            </div>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>Delivery: {itemQuote?.deliveryTime}</div>
                            <div>Warranty: {itemQuote?.warranty}</div>
                            {itemQuote?.notes && (
                              <div className="text-xs italic bg-muted p-1 rounded">
                                {itemQuote?.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground text-center">
                          No quote
                        </div>
                      )}
                    </td>
                  );
                })}

                {/* Admin Approval Column */}
                <td className="p-3 border-r border-border bg-orange-50/50 dark:bg-orange-950/10">
                  <div className="space-y-3">
                    {/* Final Supplier Section */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-orange-800 dark:text-orange-200 mb-1">
                        Final Supplier
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Vendor Code"
                          value={adminApproval?.[item?.id]?.finalSupplier?.vendorCode || ''}
                          onChange={(e) => onFinalSupplierChange?.(item?.id, 'vendorCode', e?.target?.value)}
                          className="w-full px-2 py-1 text-xs border border-orange-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                        />
                        <input
                          type="text"
                          placeholder="Vendor Name"
                          value={adminApproval?.[item?.id]?.finalSupplier?.vendorName || ''}
                          onChange={(e) => onFinalSupplierChange?.(item?.id, 'vendorName', e?.target?.value)}
                          className="w-full px-2 py-1 text-xs border border-orange-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Final Price Section */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-orange-800 dark:text-orange-200 mb-1">
                        Final Price
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Enter final price"
                        value={adminApproval?.[item?.id]?.finalPrice || ''}
                        onChange={(e) => onFinalPriceChange?.(item?.id, e?.target?.value)}
                        className="w-full px-2 py-1 text-xs border border-orange-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    {/* Sum Amount Section */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-orange-800 dark:text-orange-200 mb-1">
                        Sum Amount
                      </div>
                      <div className="text-sm font-semibold text-primary bg-white dark:bg-gray-800 px-2 py-1 rounded border">
                        ${calculateSumAmount?.(item?.id, item?.quantity) || '0.00'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Qty: {item?.quantity} × Final Price
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="border-b border-border bg-primary/5 font-semibold">
              <td className="p-3 bg-card sticky left-0 z-10 border-r border-border text-primary">
                Total Amount
              </td>
              <td className="p-3 bg-card sticky left-48 z-10 border-r border-border"></td>
              <td className="p-3 bg-card sticky left-96 z-10 border-r border-border"></td>
              <td className="p-3 bg-card sticky left-120 z-10 border-r border-border"></td>
              <td className="p-3 bg-card sticky left-144 z-10 border-r border-border"></td>
              <td className="p-3 bg-card sticky left-168 z-10 border-r border-border"></td>
              <td className="p-3 bg-card sticky left-192 z-10 border-r border-border"></td>
              
              {suppliers?.map((supplier) => {
                const supplierQuote = quotes?.find(q => q?.id === supplier?.id);
                return (
                  <td key={supplier?.id} className="p-3 border-r border-border">
                    <div className="text-lg font-bold text-primary">
                      ${supplierQuote?.totalQuote?.toFixed(2) || '0.00'}
                    </div>
                  </td>
                );
              })}

              {/* Admin Total Column */}
              <td className="p-3 border-r border-border bg-orange-50/50 dark:bg-orange-950/10">
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">
                    ${items?.reduce((total, item) => {
                      const sumAmount = parseFloat(calculateSumAmount?.(item?.id, item?.quantity) || 0);
                      return total + sumAmount;
                    }, 0)?.toFixed(2)}
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    Admin Total
                  </div>
                </div>
              </td>
            </tr>

            {/* Footer Rows */}
            {footerRows?.map((footerRow, index) => (
              <tr key={index} className="border-b border-border bg-muted/30">
                <td className="p-3 bg-card sticky left-0 z-10 border-r border-border font-medium text-sm text-foreground">
                  {footerRow?.label}
                </td>
                <td className="p-3 bg-card sticky left-48 z-10 border-r border-border"></td>
                <td className="p-3 bg-card sticky left-96 z-10 border-r border-border"></td>
                <td className="p-3 bg-card sticky left-120 z-10 border-r border-border"></td>
                <td className="p-3 bg-card sticky left-144 z-10 border-r border-border"></td>
                <td className="p-3 bg-card sticky left-168 z-10 border-r border-border"></td>
                <td className="p-3 bg-card sticky left-192 z-10 border-r border-border"></td>
                
                {suppliers?.map((supplier) => {
                  const supplierQuote = quotes?.find(q => q?.id === supplier?.id);
                  const value = supplierQuote?.footer?.[footerRow?.key] || '-';
                  
                  return (
                    <td key={supplier?.id} className="p-3 border-r border-border">
                      <div className="text-sm text-foreground">
                        {footerRow?.key === "remarks_of_quotation" ? (
                          <div className="max-w-48 text-sm leading-relaxed">
                            {value}
                          </div>
                        ) : (
                          value
                        )}
                      </div>
                    </td>
                  );
                })}

                {/* Admin Footer Column */}
                <td className="p-3 border-r border-border bg-orange-50/30 dark:bg-orange-950/10">
                  {index === 0 ? (
                    <div className="text-xs text-orange-600 dark:text-orange-400">
                      Final decision pending
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">-</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuotationComparisonTable;