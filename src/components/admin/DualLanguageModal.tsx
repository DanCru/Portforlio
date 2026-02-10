import React, { useState, useEffect } from 'react';
import { X, Copy, Upload, Image as ImageIcon } from 'lucide-react';

interface LocalizedInputProps {
  label: string;
  name: string;
  value: { vi: string; en: string } | undefined;
  onChange: (name: string, lang: 'vi' | 'en', value: string) => void;
  type?: 'text' | 'textarea' | 'editor'; // editor placeholder
  rows?: number;
}

const LocalizedInput: React.FC<LocalizedInputProps> = ({ label, name, value, onChange, type = 'text', rows = 3 }) => {
  const [useViFallback, setUseViFallback] = useState(false);
  const valVI = value?.vi || '';
  const valEN = value?.en || '';

  const handleCopy = () => {
    onChange(name, 'en', valVI);
  };

  return (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <button
                type="button"
                onClick={handleCopy}
                className="text-xs flex items-center gap-1 text-sky-600 hover:text-sky-700 dark:text-sky-400"
                title="Copy VI content to EN"
            >
                <Copy size={12} /> Copy VI to EN
            </button>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vietnamese Column */}
        <div>
          <span className="block text-xs mb-1 uppercase font-bold text-sky-600">Tiếng Việt (VI)</span>
          {type === 'textarea' ? (
            <textarea
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
              rows={rows}
              value={valVI}
              onChange={(e) => onChange(name, 'vi', e.target.value)}
              placeholder={`Nhập ${label} (Tiếng Việt)...`}
            />
          ) : (
            <input
              type="text"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
              value={valVI}
              onChange={(e) => onChange(name, 'vi', e.target.value)}
              placeholder={`Nhập ${label} (Tiếng Việt)...`}
            />
          )}
        </div>

        {/* English Column */}
        <div className="relative">
          <div className="flex justify-between items-center">
             <span className="block text-xs mb-1 uppercase font-bold text-rose-500">English (EN)</span>
              <label className="flex items-center gap-1 cursor-pointer text-xs text-gray-500">
                  <input 
                    type="checkbox" 
                    checked={useViFallback} 
                    onChange={(e) => setUseViFallback(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span>Fallback to VI</span>
              </label>
          </div>
          
          {useViFallback ? (
             <div className="w-full p-2 border border-dashed rounded-md bg-gray-50 dark:bg-gray-800 text-gray-400 italic text-sm">
                 Using content from Vietnamese version...
             </div>
          ) : (
            type === 'textarea' ? (
                <textarea
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-rose-500"
                rows={rows}
                value={valEN}
                onChange={(e) => onChange(name, 'en', e.target.value)}
                placeholder={`Enter ${label} (English)...`}
                />
            ) : (
                <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-rose-500"
                value={valEN}
                onChange={(e) => onChange(name, 'en', e.target.value)}
                placeholder={`Enter ${label} (English)...`}
                />
            )
          )}
        </div>
      </div>
    </div>
  );
};

interface ImageUploadProps {
    label?: string;
    imagePreview: string | null;
    onImageChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label = "Image", imagePreview, onImageChange }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageChange(e.target.files[0]);
        }
    };

    return (
        <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
             <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 flex items-center justify-center group">
                    {imagePreview ? (
                        <img 
                            src={typeof imagePreview === 'string' && imagePreview.startsWith('http') ? imagePreview : (imagePreview instanceof File ? URL.createObjectURL(imagePreview) : imagePreview)} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <ImageIcon className="text-gray-400" size={32} />
                    )}
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer text-white p-2 rounded-full hover:bg-white/20">
                             <Upload size={20} />
                             <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
                <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <Upload size={16} />
                        <span>Choose Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF up to 2MB</p>
                </div>
             </div>
        </div>
    );
}


interface DualLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  isSaving: boolean;
  size?: 'md' | 'lg' | 'xl' | 'full';
}

const DualLanguageModal: React.FC<DualLanguageModalProps> & { LocalizedInput: typeof LocalizedInput; ImageUpload: typeof ImageUpload } = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  isSaving,
  size = 'xl'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
      md: 'max-w-md',
      lg: 'max-w-2xl',
      xl: 'max-w-5xl',
      full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-5 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 shadow-lg shadow-sky-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

DualLanguageModal.LocalizedInput = LocalizedInput;
DualLanguageModal.ImageUpload = ImageUpload;

export default DualLanguageModal;
