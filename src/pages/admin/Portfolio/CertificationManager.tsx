import React, { useEffect, useState, useRef } from 'react';
import PortfolioService, { Certification } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const CertificationManager = () => {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Certification> | null>(null);
  
  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Normalize localized fields
    const normalize = (val: any) => {
        if (typeof val === 'string') {
            try {
                const parsed = JSON.parse(val);
                return { vi: parsed.vi || '', en: parsed.en || '' };
            } catch (e) {
                return { vi: val, en: '' };
            }
        }
        return val || { vi: '', en: '' };
    };

    setEditingItem({
        ...item,
        name: normalize(item.name),
        issuer: normalize(item.issuer),
    });
    
    // Set image preview
    if (item.image) {
        const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7745';
        setImagePreview(item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`);
    } else {
        setImagePreview(null);
    }
    setImageFile(null);
  };

  const handleCreate = () => {
    setEditingItem({
        name: { vi: '', en: '' },
        issuer: { vi: '', en: '' },
        url: '',
        issue_date: '',
        sort_order: items.length + 1,
        is_active: true
    });
    setImagePreview(null);
    setImageFile(null);
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setImageFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleLanguageChange = (field: keyof Certification, lang: 'vi' | 'en', value: string) => {
      if (!editingItem) return;
      setEditingItem(prev => ({
          ...prev!,
          [field]: { ...((prev as any)[field] || { vi: '', en: '' }), [lang]: value }
      }));
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);

    try {
        const formData = new FormData();
        
        // Append localized fields as JSON strings
        formData.append('name', JSON.stringify(editingItem.name));
        formData.append('issuer', JSON.stringify(editingItem.issuer));
        
        // Append other fields
        if (editingItem.url) formData.append('url', editingItem.url);
        if (editingItem.issue_date) formData.append('issue_date', editingItem.issue_date); // YYYY-MM-DD
        if (editingItem.sort_order) formData.append('sort_order', editingItem.sort_order.toString());
        formData.append('is_active', editingItem.is_active ? '1' : '0');

        // Append image if new one selected
        if (imageFile) {
            formData.append('image', imageFile);
        }

        if (editingItem.id) {
            formData.append('_method', 'PUT'); // Laravel method spoofing for FormData PUT
            await PortfolioService.updateItem('certification', editingItem.id, formData);
        } else {
            await PortfolioService.createItem('certification', formData);
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Certifications</h1>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus size={18} /> Add New
        </button>
      </div>

      <DualLanguageModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={editingItem?.id ? 'Edit Certificate' : 'New Certificate'}
        onSave={handleSave}
        isSaving={saving}
      >
        {editingItem && (
            <div className="space-y-6">
                 {/* Image Upload */}
                 <div>
                    <label className="block text-sm font-medium mb-2">Certificate Image</label>
                    <div className="flex items-center gap-4">
                        <div 
                            className="w-32 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors overflow-hidden bg-gray-50 dark:bg-gray-700"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <ImageIcon size={24} className="mx-auto mb-1" />
                                    <span className="text-xs">Select Image</span>
                                </div>
                            )}
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageSelect}
                        />
                         <div className="text-sm text-gray-500">
                            <p>Click to upload certificate image.</p>
                            <p>Recommended: JPG, PNG (Max 2MB)</p>
                        </div>
                    </div>
                 </div>

                <div className="grid grid-cols-1 gap-4">
                     <DualLanguageModal.LocalizedInput
                        label="Certificate Name"
                        name="name"
                        value={editingItem.name as any}
                        onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                    />
                    
                    <DualLanguageModal.LocalizedInput
                        label="Issuing Organization"
                        name="issuer"
                        value={editingItem.issuer as any}
                        onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Issue Date</label>
                        <input 
                            type="date"
                            value={editingItem.issue_date ? editingItem.issue_date.split('T')[0] : ''} 
                            onChange={e => setEditingItem({...editingItem, issue_date: e.target.value})}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium mb-1">Credential URL</label>
                         <input 
                             value={editingItem.url || ''} 
                             onChange={e => setEditingItem({...editingItem, url: e.target.value})}
                             className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                             placeholder="https://..."
                         />
                     </div>
                </div>
            </div>
        )}
      </DualLanguageModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => {
            const getVal = (val: any) => typeof val === 'string' ? { vi: '', en: '' } : (val || { vi: '', en: '' });
            const getStr = (val: any) => val?.vi || val?.en || '';
            const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7745';
            const imageUrl = item.image 
                ? (item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`) 
                : null;

            return (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden group border border-slate-200 dark:border-gray-700">
                    <div className="h-40 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                        {imageUrl ? (
                            <img src={imageUrl} alt={getStr(getVal(item.name))} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <ImageIcon size={48} />
                            </div>
                        )}
                        
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/50 rounded p-1">
                             <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:text-blue-700 rounded"><Edit size={16} /></button>
                             <button onClick={() => handeDelete(item.id)} className="p-1.5 text-red-600 hover:text-red-700 rounded"><Trash2 size={16} /></button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold text-lg mb-1 line-clamp-1" title={getStr(getVal(item.name))}>{getStr(getVal(item.name))}</h4>
                        <p className="text-sm text-gray-500 mb-2">{getStr(getVal(item.issuer))}</p>
                        <div className="flex justify-between items-center text-xs text-gray-400">
                            <span>{item.issue_date ? new Date(item.issue_date).toLocaleDateString() : 'No date'}</span>
                             {item.url && (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Credential</a>
                            )}
                        </div>
                    </div>
                </div>
            );
        })}
        
        {items.length === 0 && !loading && (
             <div className="col-span-full text-center py-10 text-gray-500">
                No certifications found. Click "Add New" to create one.
            </div>
        )}
      </div>
    </div>
  );
};

export default CertificationManager;
