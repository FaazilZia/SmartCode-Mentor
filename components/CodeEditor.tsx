import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, disabled }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Input</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        spellCheck={false}
        className="flex-1 w-full p-4 bg-slate-900 text-slate-100 font-mono text-sm leading-relaxed resize-none focus:outline-none placeholder-slate-600"
        placeholder="// Paste your code here..."
      />
    </div>
  );
};
