import React, { useEffect, useState } from 'react';
import PortfolioService, { Certification } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const CertificationManager = () => {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Certification> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await PortfolioService.getItems('certification');
      setItems(data);
    } catch (error) {
      console.error('Failed to load certifications', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Certification) => {
    setEditingItem({...item});
  };

  const handleCreate = () => {
    setEditingItem({
        name: '',
        issuer: '',
        url: '',
        sort_order: items.length + 1,
        is_active: true
    });
  };

  const handeDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        await PortfolioService.deleteItem('certification', id);
        loadData();
    } catch (error) {
        console.error('Failed to delete', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
        if (editingItem.id) {
            await PortfolioService.updateItem('certification', editingItem.id, editingItem);
        } else {
            await PortfolioService.createItem('certification', editingItem);
        }
        setEditingItem(null);
        loadData();
    } catch (error) {
        console.error('Failed to save', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Certifications</h1>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus size={18} /> Add New
        </button>
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold">{editingItem.id ? 'Edit Certificate' : 'New Certificate'}</h2>
                    <button onClick={() => setEditingItem(null)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input 
                            required
                            value={editingItem.name} 
                            onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Issuer</label>
                        <input 
                            required
                            value={editingItem.issuer} 
                            onChange={e => setEditingItem({...editingItem, issuer: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">URL (Optional)</label>
                        <input 
                            value={editingItem.url || ''} 
                            onChange={e => setEditingItem({...editingItem, url: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center group">
                <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.issuer}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                    <button onClick={() => handeDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationManager;
