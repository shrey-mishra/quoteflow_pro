import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const SupplierAnalytics = ({ suppliers }) => {
  // Calculate analytics data
  const totalSuppliers = suppliers?.length;
  const activeSuppliers = suppliers?.filter(s => s?.status === 'Active')?.length;
  const averageRating = suppliers?.reduce((sum, s) => sum + s?.rating, 0) / suppliers?.length || 0;
  const certifiedSuppliers = suppliers?.filter(s => s?.certifications && s?.certifications?.length > 0)?.length;

  // Status distribution data
  const statusData = [
    { name: 'Active', value: suppliers?.filter(s => s?.status === 'Active')?.length, color: '#10B981' },
    { name: 'Inactive', value: suppliers?.filter(s => s?.status === 'Inactive')?.length, color: '#6B7280' },
    { name: 'Pending', value: suppliers?.filter(s => s?.status === 'Pending')?.length, color: '#F59E0B' },
    { name: 'Suspended', value: suppliers?.filter(s => s?.status === 'Suspended')?.length, color: '#EF4444' }
  ]?.filter(item => item?.value > 0);

  // Rating distribution data
  const ratingData = [
    { rating: '5 Stars', count: suppliers?.filter(s => s?.rating >= 4.5)?.length },
    { rating: '4 Stars', count: suppliers?.filter(s => s?.rating >= 3.5 && s?.rating < 4.5)?.length },
    { rating: '3 Stars', count: suppliers?.filter(s => s?.rating >= 2.5 && s?.rating < 3.5)?.length },
    { rating: '2 Stars', count: suppliers?.filter(s => s?.rating >= 1.5 && s?.rating < 2.5)?.length },
    { rating: '1 Star', count: suppliers?.filter(s => s?.rating < 1.5)?.length }
  ];

  // Geographic distribution
  const locationData = suppliers?.reduce((acc, supplier) => {
    const country = supplier?.country || 'Unknown';
    acc[country] = (acc?.[country] || 0) + 1;
    return acc;
  }, {});

  const topLocations = Object.entries(locationData)?.sort(([,a], [,b]) => b - a)?.slice(0, 5)?.map(([country, count]) => ({ country, count }));

  // Mock performance data
  const performanceData = [
    { month: 'Jan', responseTime: 2.4, costSavings: 12.5 },
    { month: 'Feb', responseTime: 2.1, costSavings: 15.2 },
    { month: 'Mar', responseTime: 1.9, costSavings: 18.7 },
    { month: 'Apr', responseTime: 2.3, costSavings: 14.3 },
    { month: 'May', responseTime: 2.0, costSavings: 16.8 },
    { month: 'Jun', responseTime: 1.8, costSavings: 19.2 }
  ];

  const StatCard = ({ title, value, subtitle, icon, trend, trendValue }) => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name={icon} size={24} className="text-primary" strokeWidth={2} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={16} strokeWidth={2} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Suppliers"
          value={totalSuppliers}
          subtitle="Registered in system"
          icon="Building2"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Active Suppliers"
          value={activeSuppliers}
          subtitle={`${((activeSuppliers / totalSuppliers) * 100)?.toFixed(1)}% of total`}
          icon="CheckCircle"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Average Rating"
          value={averageRating?.toFixed(1)}
          subtitle="Out of 5.0 stars"
          icon="Star"
          trend="up"
          trendValue="+0.2"
        />
        <StatCard
          title="Certified Suppliers"
          value={certifiedSuppliers}
          subtitle={`${((certifiedSuppliers / totalSuppliers) * 100)?.toFixed(1)}% certified`}
          icon="Award"
          trend="up"
          trendValue="+8%"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier Status Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Supplier Status Distribution</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" strokeWidth={2} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {statusData?.map((item) => (
              <div key={item?.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                <span className="text-sm text-foreground">{item?.name} ({item?.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Rating Distribution</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" strokeWidth={2} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="rating" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Locations */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Top Supplier Locations</h3>
            <Icon name="MapPin" size={20} className="text-muted-foreground" strokeWidth={2} />
          </div>
          <div className="space-y-4">
            {topLocations?.map((location, index) => (
              <div key={location?.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{location?.country}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(location?.count / totalSuppliers) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">{location?.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Performance Trends</h3>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" strokeWidth={2} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                  name="Response Time (days)"
                />
                <Line
                  type="monotone"
                  dataKey="costSavings"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Cost Savings (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-sm text-foreground">Response Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-sm text-foreground">Cost Savings</span>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Supplier Activity</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" strokeWidth={2} />
        </div>
        <div className="space-y-4">
          {[
            { action: 'New supplier registered', supplier: 'TechCorp Solutions', time: '2 hours ago', type: 'success' },
            { action: 'Certification updated', supplier: 'Global Manufacturing Inc.', time: '4 hours ago', type: 'info' },
            { action: 'Supplier rating updated', supplier: 'Premium Parts Ltd.', time: '6 hours ago', type: 'warning' },
            { action: 'Supplier suspended', supplier: 'Unreliable Supplies Co.', time: '1 day ago', type: 'error' }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
              <div className={`w-2 h-2 rounded-full ${
                activity?.type === 'success' ? 'bg-success' :
                activity?.type === 'info' ? 'bg-primary' :
                activity?.type === 'warning' ? 'bg-warning' : 'bg-destructive'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity?.action}</span> - {activity?.supplier}
                </p>
                <p className="text-xs text-muted-foreground">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierAnalytics;