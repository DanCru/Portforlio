import React, { useEffect, useState } from 'react';
import PortfolioService, { Experience } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Experience> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await PortfolioService.getItems('experience');
      setExperiences(data);
    } catch (error) {
      console.error('Failed to load experiences', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Experience) => {
    // Ensure all translatable fields are objects
    const normalize = (val: any) => typeof val === 'string' ? { vi: val, en: '' } : (val || { vi: '', en: '' });
    
    setEditingItem({
        ...item,
        position: normalize(item.position),
        company: normalize(item.company),
        location: normalize(item.location),
        description: normalize(item.description),
    });
  };

  const handleCreate = () => {
    setEditingItem({
        position: { vi: '', en: '' },
        company: { vi: '', en: '' },
        location: { vi: '', en: '' },
        period: '',
        description: { vi: '', en: '' },
        achievements: [],
        technologies: [],
        rank: '',
        sort_order: experiences.length + 1,
        is_active: true
    });
  };

  const handeDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        await PortfolioService.deleteItem('experience', id);
        loadData();
    } catch (error) {
        console.error('Failed to delete', error);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);

    try {
        // Prepare data for saving - basically JSON stringify the dual language objects
        // But wait, our API now expects JSON objects for these fields, so we can send as is.
        // However, we need to ensure we send the correct structure.
        
        const payload = {
            ...editingItem,
            position: JSON.stringify(editingItem.position),
            company: JSON.stringify(editingItem.company),
            location: JSON.stringify(editingItem.location),
            description: JSON.stringify(editingItem.description),
        };

        if (editingItem.id) {
            await PortfolioService.updateItem('experience', editingItem.id, payload);
        } else {
            await PortfolioService.createItem('experience', payload);
        }
        setEditingItem(null);
        loadData();
    } catch (error) {
        console.error('Failed to save', error);
        alert('Failed to save changes');
    } finally {
        setSaving(false);
    }
  };

  const handleLanguageChange = (field: keyof Experience, lang: 'vi' | 'en', value: string) => {
      if (!editingItem) return;
      setEditingItem(prev => ({
          ...prev!,
          [field]: { ...((prev as any)[field] || { vi: '', en: '' }), [lang]: value }
      }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Experience</h1>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus size={18} /> Add New
        </button>
      </div>

      <DualLanguageModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={editingItem?.id ? 'Edit Experience' : 'New Experience'}
        onSave={handleSave}
        isSaving={saving}
      >
        {editingItem && (
            <div className="space-y-4">
                <DualLanguageModal.LocalizedInput
                    label="Position"
                    name="position"
                    value={editingItem.position as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />
                
                <DualLanguageModal.LocalizedInput
                    label="Company"
                    name="company"
                    value={editingItem.company as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Period</label>
                        <input 
                            required
                            value={editingItem.period} 
                            onChange={e => setEditingItem({...editingItem, period: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            placeholder="e.g. 2020 - Present"
                        />
                    </div>
                     <div>
                         <label className="block text-sm font-medium mb-1">Rank</label>
                         <input 
                             value={editingItem.rank || ''} 
                             onChange={e => setEditingItem({...editingItem, rank: e.target.value})}
                             className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                              placeholder="e.g. Senior"
                         />
                     </div>
                 </div>

                <DualLanguageModal.LocalizedInput
                    label="Location"
                    name="location"
                    value={editingItem.location as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />

                <DualLanguageModal.LocalizedInput
                    label="Description"
                    name="description"
                    value={editingItem.description as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                    type="textarea"
                />

                {/* Achievements and Technologies could be handled here too if needed, but keeping simple for now */}
            </div>
        )}
      </DualLanguageModal>

      <div className="grid gap-4">
        {experiences.map(item => {
            // Helper to get display text
            const getVal = (val: any) => typeof val === 'string' ? val : (val?.vi || val?.en || '');
            
            return (
                <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center group">
                    <div>
                        <h3 className="font-bold text-lg">{getVal(item.position)} <span className="text-sm font-normal text-gray-500">at {getVal(item.company)}</span></h3>
                        <p className="text-sm text-gray-500">{item.period} | {getVal(item.location)}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                        <button onClick={() => handeDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                    </div>
                </div>
            );
        })}

        {experiences.length === 0 && (
            <div className="text-center py-10 text-gray-500">No experiences found. Add one to get started.</div>
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;
