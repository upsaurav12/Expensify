import React, { useState } from 'react';
import { Edit, Trash2, Filter } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate, filterTransactions } from '../../utils/helpers';
import { Transaction } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { getCategoryById, getIconComponent } from '../../data/defaultCategories';
import Modal from '../ui/Modal';
import TransactionForm from './TransactionForm';

interface TransactionListProps {
  showFilters?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ showFilters = true }) => {
  const { transactions, categories, filterOptions, setFilterOptions, deleteTransaction } = useFinance();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [tempFilters, setTempFilters] = useState({ ...filterOptions });
  
  const filteredTransactions = filterTransactions(transactions, filterOptions);
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilterOptions(tempFilters);
    setIsFilterModalOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      startDate: null,
      endDate: null,
      type: 'all',
      categoryId: 'all',
    };
    setTempFilters(defaultFilters);
    setFilterOptions(defaultFilters);
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <Card 
        title="Transactions"
        action={
          showFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<Filter size={16} />} 
              onClick={() => setIsFilterModalOpen(true)}
            >
              Filter
            </Button>
          )
        }
        className="h-full"
        contentClassName="p-0"
      >
        {sortedTransactions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">No transactions found.</p>
            {showFilters && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={resetFilters}
              >
                Reset filters
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 max-h-[500px] overflow-auto">
            {sortedTransactions.map(transaction => {
              const category = getCategoryById(transaction.categoryId, categories);
              const Icon = getIconComponent(category.icon);
              
              return (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-4" 
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                  >
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {category.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'} 
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                    
                    {transaction.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {transaction.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleEdit(transaction)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(transaction.id)}
                      className="text-gray-400 hover:text-error-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
      
      {/* Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Transactions"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={tempFilters.startDate || ''}
                onChange={handleFilterChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={tempFilters.endDate || ''}
                onChange={handleFilterChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Type
            </label>
            <select
              name="type"
              value={tempFilters.type}
              onChange={handleFilterChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="categoryId"
              value={tempFilters.categoryId}
              onChange={handleFilterChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Edit Transaction Modal */}
      <Modal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        title="Edit Transaction"
      >
        {editingTransaction && (
          <TransactionForm 
            onClose={() => setEditingTransaction(null)}
            initialData={editingTransaction}
          />
        )}
      </Modal>
    </>
  );
};

export default TransactionList;