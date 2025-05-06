import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings: React.FC = () => {
  const clearLocalStorage = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Settings">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Management</h3>
            <p className="text-gray-600 mb-4">
              Clear all your financial data. This action cannot be undone.
            </p>
            <Button 
              variant="danger"
              onClick={clearLocalStorage}
            >
              Reset All Data
            </Button>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
            <p className="text-gray-600">
              Personal Finance Tracker - Version 1.0.0
            </p>
            <p className="text-gray-600 mt-2">
              A simple app to track your expenses and income. All data is stored locally on your device.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;