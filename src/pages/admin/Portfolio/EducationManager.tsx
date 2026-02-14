import React, { useEffect, useState } from 'react';
import PortfolioService, { Education } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const EducationManager = () => {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Education> | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await PortfolioService.getItems('education');
      setItems(data);
    } catch (error) {
      console.error('Failed to load education', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Education) => {
    const normalize = (val: any) => typeof val === 'string' ? { vi: val, en: '' } : (val || { vi: '', en: '' });
    setEditingItem({
        ...item,
        degree: normalize(item.degree),
        school: normalize(item.school),
        description: normalize(item.description),
    });
  };

  const handleCreate = () => {
    setEditingItem({
        degree: { vi: '', en: '' },
        school: { vi: '', en: '' },
        period: '',
        description: { vi: '', en: '' },
        image: '',
        gpa: '',
        sort_order: items.length + 1,
        is_active: true
    });
    setImageFile(null);
  };

  const handeDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        await PortfolioService.deleteItem('education', id);
        loadData();
    } catch (error) {
        console.error('Failed to delete', error);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);

    try {
        const formData = new FormData();
        
        Object.keys(editingItem).forEach(key => {
            if (key === 'image') return;
            const value = (editingItem as any)[key];
            
            if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (editingItem.id) {
            await PortfolioService.updateItem('education', editingItem.id, formData);
        } else {
            await PortfolioService.createItem('education', formData);
        }
        setEditingItem(null);
        setImageFile(null);
        loadData();
    } catch (error) {
        console.error('Failed to save', error);
        alert('Failed to save changes');
    } finally {
        setSaving(false);
    }
  };

  const handleLanguageChange = (field: keyof Education, lang: 'vi' | 'en', value: string) => {
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
        <h1 className="text-2xl font-bold">Manage Education</h1>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus size={18} /> Add New
        </button>
      </div>

       <DualLanguageModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={editingItem?.id ? 'Edit Education' : 'New Education'}
        onSave={handleSave}
        isSaving={saving}
      >
        {editingItem && (
            <div className="space-y-4">
                <DualLanguageModal.LocalizedInput
                    label="Degree"
                    name="degree"
                    value={editingItem.degree as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />

                <DualLanguageModal.LocalizedInput
                    label="School"
                    name="school"
                    value={editingItem.school as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <DualLanguageModal.ImageUpload
                            label="School Logo"
                            imagePreview={imageFile ? URL.createObjectURL(imageFile) : (editingItem.image || null)}
                            onImageChange={setImageFile}
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Period</label>
                            <input 
                                required
                                value={editingItem.period} 
                                onChange={e => setEditingItem({...editingItem, period: e.target.value})}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">GPA/Grade</label>
                            <input 
                                value={editingItem.gpa || ''} 
                                onChange={e => setEditingItem({...editingItem, gpa: e.target.value})}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    </div>
                </div>

                <DualLanguageModal.LocalizedInput
                    label="Description"
                    name="description"
                    value={editingItem.description as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                    type="textarea"
                />
            </div>
        )}
      </DualLanguageModal>

      <div className="grid gap-4">
        {items.map(item => {
             const getVal = (val: any) => typeof val === 'string' ? val : (val?.vi || val?.en || '');
             const imageUrl = item.image?.startsWith('http') || item.image?.startsWith('/') ? item.image : `http://localhost:7745${item.image}`;

             return (
                <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center group">
                    <div className="flex gap-4">
                        {item.image && (
                             <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                <img src={imageUrl} alt={getVal(item.school)} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div>
                            <h3 className="font-bold text-lg">{getVal(item.degree)}</h3>
                            <p className="text-sm font-bold text-gray-500">{getVal(item.school)}</p>
                            <p className="text-sm text-gray-500">{item.period} | {item.gpa}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18} /></button>
                        <button onClick={() => handeDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default EducationManager;
