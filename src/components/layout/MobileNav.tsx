import React from 'react';
import { Home, BarChart, List, Tag, Settings } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: <Home size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <List size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart size={20} /> },
    { id: 'categories', label: 'Categories', icon: <Tag size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="grid grid-cols-5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center py-2 ${
              activeTab === tab.id
                ? 'text-primary-600'
                : 'text-gray-500'
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;