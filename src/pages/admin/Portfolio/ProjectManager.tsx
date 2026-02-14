import React, { useEffect, useState } from 'react';
import PortfolioService, { Project } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, X, PlusCircle, MinusCircle } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [techStackInput, setTechStackInput] = useState('');

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
        title: normalize(item.title),
        category: normalize(item.category),
        slug: normalize(item.slug),
        description: normalize(item.description),
        long_description: normalize(item.long_description),
        role: normalize(item.role),
        responsibilities: normalize(item.responsibilities),
        content: normalize(item.content),
    });
    
    // Handle tech stack array to string
    let stack = item.tech_stack;
    if (typeof stack === 'string') {
        try { stack = JSON.parse(stack); } catch(e) {}
    }
    setTechStackInput(Array.isArray(stack) ? stack.join(', ') : '');
    
    setImageFile(null);
    setGalleryFiles([]);
  };

  const handleCreate = () => {
    setEditingItem({
        title: { vi: '', en: '' },
        slug: { vi: '', en: '' },
        category: { vi: '', en: '' },
        description: { vi: '', en: '' },
        long_description: { vi: '', en: '' },
        role: { vi: '', en: '' },
        responsibilities: { vi: '', en: '' },
        content: { vi: '', en: '' },
        image: '',
        status: 'Completed',
        sort_order: projects.length + 1,
        is_active: true,
        start_date: '',
        end_date: '',
        gallery_images: []
    });
    setTechStackInput('');
    setImageFile(null);
    setGalleryFiles([]);
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
        const formData = new FormData();
        
        // Add all simple fields
        Object.keys(editingItem).forEach(key => {
            if (key === 'image' || key === 'gallery_images') return;
            const value = (editingItem as any)[key];
            
            if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        });

        // Add Tech Stack
        const stackArray = techStackInput.split(',').map(s => s.trim()).filter(s => s);
        formData.append('tech_stack', JSON.stringify(stackArray));

        // Add Image if selected
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // Add Gallery Images
        galleryFiles.forEach((file) => {
            formData.append('gallery_images_files[]', file);
        });

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
        setGalleryFiles([]);
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

  const handleGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          setGalleryFiles(prev => [...prev, ...Array.from(e.target.files!)]);
      }
  };

  if (loading) return <div className="p-12 flex justify-center"><div className="w-8 h-8 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" /></div>;

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
        size="full"
      >
        {editingItem && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                     <h3 className="font-bold border-b pb-2">Basic Info</h3>
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
                        rows={3}
                    />
                    
                     <div>
                        <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                        <input 
                            value={techStackInput} 
                            onChange={e => setTechStackInput(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            placeholder="React, Laravel, MySQL..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium mb-1">Start Date</label>
                             <input 
                                type="date"
                                value={editingItem.start_date || ''} 
                                onChange={e => setEditingItem({...editingItem, start_date: e.target.value})}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                             />
                        </div>
                         <div>
                             <label className="block text-sm font-medium mb-1">End Date</label>
                             <input 
                                type="date"
                                value={editingItem.end_date || ''} 
                                onChange={e => setEditingItem({...editingItem, end_date: e.target.value})}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                             />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                        <div className="flex items-center pt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={editingItem.is_active} 
                                    onChange={e => setEditingItem({...editingItem, is_active: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                <span>Active</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold border-b pb-2">Detailed Info</h3>
                    
                    <DualLanguageModal.LocalizedInput
                        label="My Role"
                        name="role"
                        value={editingItem.role as any}
                        onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                    />

                    <DualLanguageModal.LocalizedInput
                        label="Responsibilities"
                        name="responsibilities"
                        value={editingItem.responsibilities as any}
                        onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                        type="textarea"
                        rows={4}
                    />

                    <DualLanguageModal.LocalizedInput
                        label="Long Description / Challenge"
                        name="long_description"
                        value={editingItem.long_description as any}
                        onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
                        type="textarea"
                        rows={4}
                    />

                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="pt-4 border-t">
                        <DualLanguageModal.ImageUpload
                            label="Project Thumbnail"
                            imagePreview={imageFile ? URL.createObjectURL(imageFile) : (editingItem.image || null)}
                            onImageChange={setImageFile}
                        />

                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Gallery Images</label>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleGalleryFileSelect}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                                {editingItem.gallery_images?.map((img, idx) => (
                                    <div key={idx} className="w-20 h-20 relative">
                                        <img src={img.startsWith('http') ? img : `http://localhost:7745${img}`} className="w-full h-full object-cover rounded" />
                                    </div>
                                ))}
                                {galleryFiles.map((file, idx) => (
                                    <div key={`new-${idx}`} className="w-20 h-20 relative border-2 border-blue-500 rounded">
                                        <img src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </DualLanguageModal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(item => {
             const getVal = (val: any) => {
                 if (typeof val === 'string') {
                     try { return JSON.parse(val).vi || val; } catch(e) { return val; }
                 }
                 return val?.vi || val?.en || '';
             };
             const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7745';
             const imageUrl = item.image 
                ? (item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`)
                : '';

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
