import React, { useEffect, useState } from 'react';
import PortfolioService, { Skill } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const SkillManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Skill> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await PortfolioService.getItems('skill');
      setSkills(data);
    } catch (error) {
      console.error('Failed to load skills', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Skill) => {
    // Only category is potentially translatable here based on typical usage, 
    // but name is usually universal (React, Laravel). 
    // However, for full consistency, let's allow category translation.
    // Name we will keep as string for now as it maps to icons/tech keys usually.
    // Wait, the migration made all string columns nullable or text? 
    // Let's check if we want to translate 'name'. 'React' is 'React'. 
    // 'category' could be 'Frontend' (EN) / 'Giao diện' (VI).
    
    const normalize = (val: any) => typeof val === 'string' ? { vi: val, en: '' } : (val || { vi: '', en: '' });

    setEditingItem({
        ...item,
        // name: normalize(item.name), // Name usually doesn't need translation for tech skills
        category: normalize(item.category), 
    });
  };

  const handleCreate = () => {
    setEditingItem({
        name: '',
        category: { vi: 'Frontend', en: 'Frontend' },
        proficiency: 50,
        icon: '',
        sort_order: skills.length + 1,
        is_active: true
    });
  };

  const handeDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        await PortfolioService.deleteItem('skill', id);
        loadData();
    } catch (error) {
        console.error('Failed to delete', error);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);

    try {
        // Prepare payload - Skill is simpler, usually no image upload here yet (icon is string)
         const payload = {
            ...editingItem,
            category: JSON.stringify(editingItem.category),
        };

        if (editingItem.id) {
            await PortfolioService.updateItem('skill', editingItem.id, payload);
        } else {
            await PortfolioService.createItem('skill', payload);
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

  const handleLanguageChange = (field: keyof Skill, lang: 'vi' | 'en', value: string) => {
      if (!editingItem) return;
      // Special handling if we decide to translate name later, but for now only category
      if (field === 'category') {
          setEditingItem(prev => ({
              ...prev!,
              category: { ...((prev as any).category || { vi: '', en: '' }), [lang]: value }
          }));
      }
  };

  if (loading) return <div>Loading...</div>;

  // Helper to extract category string for grouping (use VI for grouping key or EN)
  const getCatVal = (cat: any) => typeof cat === 'string' ? cat : (cat?.vi || cat?.en || 'Uncategorized');
  const categories = Array.from(new Set(skills.map(s => getCatVal(s.category)))).sort();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus size={18} /> Add New
        </button>
      </div>

       <DualLanguageModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={editingItem?.id ? 'Edit Skill' : 'New Skill'}
        onSave={handleSave}
        isSaving={saving}
        size="md"
      >
        {editingItem && (
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name (Tech Name)</label>
                    <input 
                        required
                        value={editingItem.name} 
                        onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        placeholder="e.g. React, Laravel"
                    />
                </div>

                <DualLanguageModal.LocalizedInput
                    label="Category"
                    name="category"
                    value={editingItem.category as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />
                
                <div>
                    <label className="block text-sm font-medium mb-1">Proficiency ({editingItem.proficiency}%)</label>
                    <input 
                        type="range"
                        min="0"
                        max="100"
                        value={editingItem.proficiency} 
                        onChange={e => setEditingItem({...editingItem, proficiency: Number(e.target.value)})}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Icon (Lucide Icon Name)</label>
                    <input 
                        value={editingItem.icon || ''} 
                        onChange={e => setEditingItem({...editingItem, icon: e.target.value})}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        placeholder="e.g. Activity, Server, Code"
                    />
                </div>
            </div>
        )}
      </DualLanguageModal>

      <div className="space-y-8">
        {categories.map(category => (
            <div key={category}>
                <h3 className="text-xl font-bold mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.filter(s => getCatVal(s.category) === category).map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center group">
                            <div>
                                <h4 className="font-bold">{item.name}</h4>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2 w-32">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.proficiency}%` }}></div>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                                <button onClick={() => handeDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
