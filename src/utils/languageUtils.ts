export const getLocalized = (data: any, lang: string): string => {
  if (!data) return '';
  if (typeof data === 'string') return data;
  if (typeof data === 'object') {
    return data[lang] || data['en'] || data['vi'] || ''; // Fallback chain
  }
  return String(data);
};
