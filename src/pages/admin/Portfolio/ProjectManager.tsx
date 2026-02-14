import React, { useEffect, useState } from 'react';
import PortfolioService, { Project } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await PortfolioService.getItems('project');
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Project) => {
    // Ensure all translatable fields are objects
    const normalize = (val: any) => typeof val === 'string' ? { vi: val, en: '' } : (val || { vi: '', en: '' });
    
    setEditingItem({
        ...item,
        title: normalize(item.title),
        category: normalize(item.category),
        slug: normalize(item.slug),
        description: normalize(item.description),
        long_description: normalize(item.long_description),
        content: normalize(item.content),
    });
  };

  const handleCreate = () => {
    setEditingItem({
        title: { vi: '', en: '' },
        slug: { vi: '', en: '' },
        category: { vi: '', en: '' },
        description: { vi: '', en: '' },
        long_description: { vi: '', en: '' },
        content: { vi: '', en: '' },
        image: '',
        status: 'Completed',
        sort_order: projects.length + 1,
        is_active: true
    });
    setImageFile(null);
  };

  const handeDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        await PortfolioService.deleteItem('project', id);
        loadData();
    } catch (error) {
        console.error('Failed to delete', error);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);

    try {
        // Prepare FormData for upload
        const formData = new FormData();
        
        // Add all simple fields
        Object.keys(editingItem).forEach(key => {
            if (key === 'image') return; // Handle image separately
            const value = (editingItem as any)[key];
            
            if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        // Add Image if selected
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // Auto-generate slug from VI title if missing
        if (!editingItem.slug?.vi && editingItem.title?.vi) {
             const slugVi = editingItem.title.vi.toLowerCase().replace(/ /g, '-');
             const slugEn = editingItem.title.en?.toLowerCase().replace(/ /g, '-') || slugVi;
             formData.set('slug', JSON.stringify({ vi: slugVi, en: slugEn }));
        }

        if (editingItem.id) {
            await PortfolioService.updateItem('project', editingItem.id, formData);
        } else {
            await PortfolioService.createItem('project', formData);
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

   const handleLanguageChange = (field: keyof Project, lang: 'vi' | 'en', value: string) => {
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
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Plus size={18} /> Add New
        </button>
      </div>

       <DualLanguageModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title={editingItem?.id ? 'Edit Project' : 'New Project'}
        onSave={handleSave}
        isSaving={saving}
      >
        {editingItem && (
            <div className="space-y-4">
                 <DualLanguageModal.LocalizedInput
                    label="Title"
                    name="title"
                    value={editingItem.title as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />

                <DualLanguageModal.LocalizedInput
                    label="Category"
                    name="category"
                    value={editingItem.category as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                />

                <DualLanguageModal.LocalizedInput
                    label="Short Description"
                    name="description"
                    value={editingItem.description as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                    type="textarea"
                    rows={2}
                />
                
                <DualLanguageModal.LocalizedInput
                    label="Long Description"
                    name="long_description"
                    value={editingItem.long_description as any}
                    onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                    type="textarea"
                    rows={4}
                />

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <DualLanguageModal.ImageUpload
                            label="Project Image"
                            imagePreview={imageFile ? URL.createObjectURL(imageFile) : (editingItem.image || null)}
                            onImageChange={setImageFile}
                        />
                    </div>
                    <div className="space-y-4">
                         <div>
                             <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={editingItem.status} 
                                onChange={e => setEditingItem({...editingItem, status: e.target.value})}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            >
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Live">Live</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium mb-1">Live URL</label>
                            <input 
                                value={editingItem.live_url || ''} 
                                onChange={e => setEditingItem({...editingItem, live_url: e.target.value})}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <div>
                             <label className="block text-sm font-medium mb-1">Github URL</label>
                            <input 
                                value={editingItem.github_url || ''} 
                                onChange={e => setEditingItem({...editingItem, github_url: e.target.value})}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    </div>
                 </div>
            </div>
        )}
      </DualLanguageModal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(item => {
             // Helper to get display text
            const getVal = (val: any) => typeof val === 'string' ? val : (val?.vi || val?.en || '');
            const imageUrl = item.image?.startsWith('http') || item.image?.startsWith('/') ? item.image : `http://localhost:7745${item.image}`;

            return (
                <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start group">
                    <div className="flex gap-4">
                        {item.image && (
                            <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                <img src={imageUrl} alt={getVal(item.title)} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div>
                            <h3 className="font-bold text-lg">{getVal(item.title)}</h3>
                            <p className="text-sm text-gray-500 mb-1">{getVal(item.category)}</p>
                            <span className={`text-xs px-2 py-1 rounded ${item.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                {item.status}
                            </span>
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

export default ProjectManager;
