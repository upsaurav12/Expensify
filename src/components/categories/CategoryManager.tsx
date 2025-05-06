import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { getIconComponent } from '../../data/defaultCategories';
import { Category } from '../../types';

const CategoryManager: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3B82F6',
    icon: 'Sparkles',
  });

  const iconOptions = [
    'ShoppingBag', 'Utensils', 'Home', 'Car', 'Plane', 
    'Clipboard', 'Sparkles', 'Headphones', 'Heart', 
    'Banknote', 'Building', 'Briefcase'
  ];

  const colorOptions = [
    '#EF4444', '#F97316', '#F59E0B', '#10B981', 
    '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', 
    '#9CA3AF', '#1F2937'
  ];

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      color: '#3B82F6',
      icon: 'Sparkles',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }
    
    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        ...formData,
      });
    } else {
      addCategory(formData);
    }
    
    setIsModalOpen(false);
  };

  return (
    <>
      <Card 
        title="Categories"
        action={
          <Button 
            variant="primary" 
            size="sm" 
            leftIcon={<Plus size={16} />} 
            onClick={handleAdd}
          >
            Add
          </Button>
        }
        className="h-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(category => {
            const Icon = getIconComponent(category.icon);
            return (
              <div 
                key={category.id} 
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handleEdit(category)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(category.id)}
                    className="text-gray-400 hover:text-error-500 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Category name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full ${
                    formData.color === color ? 'ring-2 ring-offset-2 ring-primary-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map(icon => {
                const Icon = getIconComponent(icon);
                return (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      formData.icon === icon 
                        ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-500' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingCategory ? 'Update' : 'Add'} Category
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CategoryManager;