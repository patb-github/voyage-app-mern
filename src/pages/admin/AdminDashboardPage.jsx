import React, { useState } from 'react';
import { FaBox, FaTicketAlt, FaShoppingCart, FaChartBar, FaUsers, FaCog } from 'react-icons/fa';

function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaChartBar /> },
    { id: 'packageTrips', name: 'Package Trips', icon: <FaBox /> },
    { id: 'coupons', name: 'Coupons', icon: <FaTicketAlt /> },
    { id: 'orders', name: 'Orders', icon: <FaShoppingCart /> },
    { id: 'customers', name: 'Customers', icon: <FaUsers /> },
    { id: 'settings', name: 'Settings', icon: <FaCog /> },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'packageTrips':
        return <PackageTripManage />;
      case 'coupons':
        return <CouponManage />;
      case 'orders':
        return <OrderManage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-2 text-left ${
                activeMenu === item.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">{menuItems.find(item => item.id === activeMenu)?.name}</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { name: 'Total Sales', value: '$15,231', change: '+2.5%', changeType: 'increase' },
    { name: 'Active Users', value: '1,234', change: '+15%', changeType: 'increase' },
    { name: 'Conversion Rate', value: '3.2%', change: '-0.4%', changeType: 'decrease' },
    { name: 'Avg. Order Value', value: '$86', change: '+$3', changeType: 'increase' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div key={item.name} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600">{item.name}</h3>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
          <p className={`text-sm mt-2 ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {item.change} from last month
          </p>
        </div>
      ))}
    </div>
  );
}

function PackageTripManage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Manage Package Trips</h3>
      {/* Add package trip management content here */}
    </div>
  );
}

function CouponManage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Manage Coupons</h3>
      {/* Add coupon management content here */}
    </div>
  );
}

function OrderManage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Manage Orders</h3>
      {/* Add order management content here */}
    </div>
  );
}

export default AdminDashboard;