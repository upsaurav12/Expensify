import React from 'react';
import { Home, BarChart, List, Tag, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <List size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart size={20} /> },
    { id: 'categories', label: 'Categories', icon: <Tag size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <aside className="hidden md:block bg-white border-r border-gray-200 w-64 flex-shrink-0">
      <nav className="p-4 h-full">
        <ul className="space-y-2">
          {tabs.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;