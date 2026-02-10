import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';

interface Translation {
    id: number;
    key: string;
    locale: string;
    value: string;
}

const Translations = () => {
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ key: '', locale: 'en', value: '' });

    useEffect(() => {
        fetchTranslations();
    }, []);

    const fetchTranslations = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:8000/api/translations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTranslations(res.data);
        } catch (error) {
            console.error('Failed to fetch translations', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:8000/api/translations', newItem, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTranslations([...translations, res.data]);
            setNewItem({ key: '', locale: 'en', value: '' });
        } catch (error) {
            alert('Failed to add translation');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/translations/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTranslations(translations.filter(t => t.id !== id));
        } catch (error) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Translations</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-sm mb-8">
                <h3 className="text-lg font-bold mb-4">Add New Translation</h3>
                <div className="flex gap-4">
                    <input 
                        type="text" 
                        placeholder="Key (e.g. home.title)" 
                        className="border p-2 rounded flex-1 dark:bg-gray-700 dark:border-gray-600"
                        value={newItem.key}
                        onChange={e => setNewItem({...newItem, key: e.target.value})}
                    />
                    <select 
                        className="border p-2 rounded w-24 dark:bg-gray-700 dark:border-gray-600"
                        value={newItem.locale}
                        onChange={e => setNewItem({...newItem, locale: e.target.value})}
                    >
                        <option value="en">EN</option>
                        <option value="vi">VI</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Value" 
                        className="border p-2 rounded flex-1 dark:bg-gray-700 dark:border-gray-600"
                        value={newItem.value}
                        onChange={e => setNewItem({...newItem, value: e.target.value})}
                    />
                    <button 
                        onClick={handleAdd}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                        <tr>
                            <th className="p-4">Key</th>
                            <th className="p-4">Locale</th>
                            <th className="p-4">Value</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {translations.map(t => (
                            <tr key={t.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-4 font-mono text-sm">{t.key}</td>
                                <td className="p-4"><span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs uppercase">{t.locale}</span></td>
                                <td className="p-4">{t.value}</td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => handleDelete(t.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {translations.length === 0 && !loading && (
                           <tr>
                               <td colSpan={4} className="p-8 text-center text-gray-500">No translations found.</td>
                           </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Translations;
