import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, AlertCircle } from 'lucide-react';

interface ResponseViewerProps {
  response: string | null;
  isLoading: boolean;
  error: string | null;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse font-medium text-sm">SmartCode Mentor is thinking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500 space-y-3 p-8 text-center">
        <AlertCircle size={48} className="opacity-80" />
        <h3 className="text-lg font-semibold">Analysis Failed</h3>
        <p className="text-slate-600">{error}</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 p-8 text-center opacity-60">
        <Bot size={48} />
        <p className="max-w-xs text-sm">Select a language and paste your code on the left to get started.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-6 py-6 custom-scrollbar">
      <div className="prose prose-slate prose-sm max-w-none prose-pre:bg-slate-100 prose-pre:text-slate-800 prose-pre:border prose-pre:border-slate-200">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
};
