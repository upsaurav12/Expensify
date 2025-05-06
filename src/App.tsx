import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';
import Modal from './components/ui/Modal';
import TransactionForm from './components/transactions/TransactionForm';

// Pages
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Categories from './pages/Categories';
import Settings from './pages/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'analytics':
        return <Analytics />;
      case 'categories':
        return <Categories />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header onAddTransaction={() => setIsTransactionFormOpen(true)} />
        
        <div className="flex-1 flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="flex-1 p-4 md:p-6 pb-16 md:pb-6 overflow-auto">
            <div className="container mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
        
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Add Transaction Modal */}
        <Modal
          isOpen={isTransactionFormOpen}
          onClose={() => setIsTransactionFormOpen(false)}
          title="Add Transaction"
        >
          <TransactionForm onClose={() => setIsTransactionFormOpen(false)} />
        </Modal>
      </div>
    </FinanceProvider>
  );
}

export default App;