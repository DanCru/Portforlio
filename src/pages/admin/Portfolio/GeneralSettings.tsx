import React, { useEffect, useState } from 'react';
import PortfolioService from '../../../services/portfolio.service';
import { Save } from 'lucide-react';
import DualLanguageModal from '../../../components/admin/DualLanguageModal';

const GeneralSettings = () => {
  const [settings, setSettings] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Helper to parse localized setting
  const getLocalizedSetting = (key: string) => {
      const val = settings[key];
      if (!val) return { vi: '', en: '' };
      try {
          return JSON.parse(val);
      } catch (e) {
          return { vi: val, en: '' }; // Fallback
      }
  };

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

  const handleLocalizedChange = (key: string, lang: 'vi' | 'en', val: string) => {
      const current = getLocalizedSetting(key);
      const updated = { ...current, [lang]: val };
      setSettings(prev => ({ ...prev, [key]: JSON.stringify(updated) }));
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
    <div className="max-w-4xl mx-auto pb-20">
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
             <DualLanguageModal.LocalizedInput
                label="Hero Title"
                name="hero_title"
                value={getLocalizedSetting('hero_title')}
                onChange={(name, lang, val) => handleLocalizedChange(name, lang, val)}
            />
            <DualLanguageModal.LocalizedInput
                label="Hero Subtitle"
                name="hero_subtitle"
                value={getLocalizedSetting('hero_subtitle')}
                onChange={(name, lang, val) => handleLocalizedChange(name, lang, val)}
                type="textarea"
            />
          </div>
        </section>

         {/* Core Values Section */}
         <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex justify-between items-center">
              <span>Core Philosophy (Triết lý cốt lõi)</span>
              <span className="text-xs font-normal text-gray-500">Displayed in Hero section boxes</span>
          </h2>
          <div className="grid gap-6">
            {[1, 2, 3, 4].map(num => (
                <div key={num} className="border p-4 rounded dark:border-gray-700">
                    <h3 className="font-semibold mb-2">Value #{num}</h3>
                    <div className="space-y-3">
                        <DualLanguageModal.LocalizedInput
                            label="Title"
                            name={`core_value_${num}_title`}
                            value={getLocalizedSetting(`core_value_${num}_title`)}
                            onChange={(name, lang, val) => handleLocalizedChange(name, lang, val)}
                        />
                        <DualLanguageModal.LocalizedInput
                            label="Description"
                            name={`core_value_${num}_desc`}
                            value={getLocalizedSetting(`core_value_${num}_desc`)}
                            onChange={(name, lang, val) => handleLocalizedChange(name, lang, val)}
                        />
                    </div>
                </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">About Section</h2>
          <div className="grid gap-4">
             <DualLanguageModal.LocalizedInput
                label="Name"
                name="about_name"
                value={getLocalizedSetting('about_name')}
                onChange={(name, lang, val) => handleLocalizedChange(name, lang, val)}
            />
             <DualLanguageModal.LocalizedInput
                label="Description"
                name="about_description"
                value={getLocalizedSetting('about_description')}
                onChange={(name, lang, val) => handleLocalizedChange(name, lang, val)}
                type="textarea"
            />
          </div>
        </section>

         {/* Additional Skills */}
         <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Additional Skills</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Skills List (Comma separated)</label>
              <textarea
                name="additional_skills"
                value={settings.additional_skills || ''}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="Agile Methodology, Code Review, Team Leadership..."
              />
              <p className="text-xs text-gray-500 mt-1">These will appear at the bottom of the Skills section.</p>
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
