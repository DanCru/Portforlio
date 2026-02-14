import React, { useEffect, useState, useRef } from 'react';
import PortfolioService, { Skill } from '../../../services/portfolio.service';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7745';

const SkillManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      category: normalize(item.category),
    });
    setIconFile(null);
    setIconPreview(item.icon_url ? (item.icon_url.startsWith('http') ? item.icon_url : `${API_BASE}${item.icon_url}`) : '');
  };

  const handleCreate = () => {
    setEditingItem({
      name: '',
      category: { vi: 'Frontend', en: 'Frontend' },
      icon: '',
      sort_order: skills.length + 1,
      is_active: true,
    });
    setIconFile(null);
    setIconPreview('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await PortfolioService.deleteItem('skill', id);
      loadData();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('name', editingItem.name || '');
      formData.append('category', JSON.stringify(editingItem.category));
      formData.append('icon', editingItem.icon || '');
      formData.append('sort_order', String(editingItem.sort_order || 0));
      formData.append('is_active', editingItem.is_active ? '1' : '0');

      if (iconFile) {
        formData.append('icon_url_file', iconFile);
      }

      if (editingItem.id) {
        await PortfolioService.updateItem('skill', editingItem.id, formData);
      } else {
        await PortfolioService.createItem('skill', formData);
      }
      setEditingItem(null);
      setIconFile(null);
      setIconPreview('');
      loadData();
    } catch (error) {
      console.error('Failed to save', error);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageChange = (field: string, lang: 'vi' | 'en', value: string) => {
    if (!editingItem) return;
    if (field === 'category') {
      setEditingItem((prev: any) => ({
        ...prev,
        category: { ...(prev.category || { vi: '', en: '' }), [lang]: value }
      }));
    }
  };

  const getIconUrl = (skill: Skill) => {
    if (!skill.icon_url) return '';
    return skill.icon_url.startsWith('http') ? skill.icon_url : `${API_BASE}${skill.icon_url}`;
  };

  if (loading) return <div className="flex items-center justify-center p-12"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const getCatVal = (cat: any) => typeof cat === 'string' ? cat : (cat?.vi || cat?.en || 'Uncategorized');
  const categories = Array.from(new Set(skills.map(s => getCatVal(s.category)))).sort();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Skills</h1>
          <p className="text-gray-500 mt-1">{skills.length} skills across {categories.length} categories</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <DualLanguageModal
        isOpen={!!editingItem}
        onClose={() => { setEditingItem(null); setIconFile(null); setIconPreview(''); }}
        title={editingItem?.id ? 'Edit Skill' : 'New Skill'}
        onSave={handleSave}
        isSaving={saving}
        size="md"
      >
        {editingItem && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Technology Name</label>
              <input
                required
                value={editingItem.name}
                onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. React, Laravel, Docker"
              />
            </div>

            <DualLanguageModal.LocalizedInput
              label="Category"
              name="category"
              value={editingItem.category as any}
              onChange={(name, lang, val) => handleLanguageChange(name as any, lang, val)}
            />

            {/* Icon Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Technology Icon</label>
              <div className="flex items-center gap-4">
                <div 
                  className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-700"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {iconPreview ? (
                    <img src={iconPreview} alt="Icon" className="w-12 h-12 object-contain" />
                  ) : (
                    <ImageIcon size={24} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Upload size={14} /> Upload Icon
                  </button>
                  <p className="text-xs text-gray-400 mt-1">PNG, SVG or WebP. Max 500KB.</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/svg+xml,image/webp,image/jpeg"
                  onChange={handleIconChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Sort Order</label>
                <input
                  type="number"
                  value={editingItem.sort_order || 0}
                  onChange={e => setEditingItem({ ...editingItem, sort_order: Number(e.target.value) })}
                  className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  checked={editingItem.is_active}
                  onChange={e => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm">Active</label>
              </div>
            </div>
          </div>
        )}
      </DualLanguageModal>

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold">{category}</h3>
              <p className="text-sm text-gray-500">{skills.filter(s => getCatVal(s.category) === category).length} skills</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
              {skills.filter(s => getCatVal(s.category) === category).map(item => (
                <div key={item.id} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800 transition-colors group relative">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center">
                    {item.icon_url ? (
                      <img src={getIconUrl(item)} alt={item.name} className="w-10 h-10 object-contain" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-400">{item.name.substring(0, 2)}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">{item.name}</span>
                  
                  {/* Actions */}
                  <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-xs"><Edit size={12} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-xs"><Trash2 size={12} /></button>
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
