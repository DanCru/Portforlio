import React, { useEffect, useState } from 'react';
import PortfolioService from '../../../services/portfolio.service';
import { Save } from 'lucide-react';

const GeneralSettings = () => {
  const [settings, setSettings] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await PortfolioService.getPublicData();
      setSettings(data.settings);
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
        // Convert object back to array of {key, value} for API
        const settingsArray = Object.keys(settings).map(key => ({
            key,
            value: settings[key]
        }));
        
        await PortfolioService.updateSettings(settingsArray);
        setMessage('Settings saved successfully!');
    } catch (error) {
        setMessage('Failed to save settings.');
        console.error(error);
    } finally {
        setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">General Settings</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Hero Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hero Title</label>
              <input
                type="text"
                name="hero_title"
                value={settings.hero_title || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
              <textarea
                name="hero_subtitle"
                value={settings.hero_subtitle || ''}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">About Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="about_name"
                value={settings.about_name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="about_description"
                value={settings.about_description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="contact_email"
                value={settings.contact_email || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </section>

        <div className="fixed bottom-8 right-8">
            <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 disabled:opacity-50"
            >
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>

      </form>
    </div>
  );
};

export default GeneralSettings;
