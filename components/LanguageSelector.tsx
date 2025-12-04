import React from 'react';
import { SupportedLanguage } from '../types';
import { LANGUAGE_OPTIONS } from '../constants';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  selected: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selected,
  onChange,
  disabled
}) => {
  return (
    <div className="relative inline-block w-48">
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as SupportedLanguage)}
          disabled={disabled}
          className="w-full appearance-none bg-white border border-slate-300 hover:border-slate-400 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};
