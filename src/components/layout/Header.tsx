import React from 'react';
import { Wallet, Plus } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onAddTransaction: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTransaction }) => {
  return (
    <header className="bg-primary-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Wallet size={24} />
          <h1 className="text-xl font-bold">Finance Tracker</h1>
        </div>
        <Button 
          onClick={onAddTransaction}
          variant="success"
          leftIcon={<Plus size={18} />}
        >
          Add Transaction
        </Button>
      </div>
    </header>
  );
};

export default Header;