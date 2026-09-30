import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en.json';
import te from './locales/te.json';

// Only languages with a complete resource file are offered. Add a new language by
// adding locales/<code>.json with the same keys and registering it here.
export const LANGUAGES = {
  en: { code: 'en', label: 'English', short: 'EN', locale: 'en-IN', dict: en },
  te: { code: 'te', label: 'తెలుగు', short: 'తె', locale: 'te-IN', dict: te }
};
const STORAGE_KEY = 'uaf-lang';
const I18nContext = createContext(null);

const lookup = (dict, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES[saved]) return saved;
  } catch { /* storage unavailable: fall back to English */ }
  return 'en';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const t = useCallback((key, vars) => {
    let value = lookup(LANGUAGES[lang].dict, key);
    if (value === undefined) value = lookup(en, key);
    if (value === undefined) return key;
    if (typeof value === 'string' && vars) value = value.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
    return value;
  }, [lang]);

  const value = useMemo(() => ({
    lang, setLang, t, locale: LANGUAGES[lang].locale,
    formatDate: (iso) => new Intl.DateTimeFormat(LANGUAGES[lang].locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
  }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
