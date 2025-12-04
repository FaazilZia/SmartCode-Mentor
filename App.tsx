import React, { useState, useCallback } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { LanguageSelector } from './components/LanguageSelector';
import { ResponseViewer } from './components/ResponseViewer';
import { SupportedLanguage, AnalysisState } from './types';
import { analyzeCode } from './services/geminiService';
import { SAMPLE_CODE_SNIPPETS } from './constants';
import { Code2, Play, Eraser, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(SupportedLanguage.PYTHON);
  const [code, setCode] = useState<string>('');
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    response: null,
  });

  const handleAnalyze = useCallback(async () => {
    if (!code.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await analyzeCode(code, selectedLanguage);
      setState({ isLoading: false, error: null, response: result });
    } catch (err: any) {
      setState({
        isLoading: false,
        error: err.message || "Something went wrong. Please try again.",
        response: null
      });
    }
  }, [code, selectedLanguage]);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    // Optional: Load sample code if empty
    if (!code.trim() && SAMPLE_CODE_SNIPPETS[lang]) {
      setCode(SAMPLE_CODE_SNIPPETS[lang] || '');
    }
  };

  const handleClear = () => {
    setCode('');
    setState({ isLoading: false, error: null, response: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Code2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">SmartCode Mentor</h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">AI-Powered Code Review</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
               How it works
             </a>
             <div className="h-4 w-px bg-slate-300"></div>
             <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
               v1.0.0
             </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-64px)]">
        
        {/* Left Panel: Input */}
        <div className="flex flex-col gap-4 h-full min-h-[500px]">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <LanguageSelector 
              selected={selectedLanguage} 
              onChange={handleLanguageChange} 
              disabled={state.isLoading}
            />
            
            <div className="flex items-center gap-2">
               <button
                onClick={handleClear}
                disabled={state.isLoading || !code}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                title="Clear Code"
              >
                <Eraser size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 relative group">
             <CodeEditor 
                code={code} 
                onChange={setCode} 
                disabled={state.isLoading} 
             />
             
             {/* Floating Action Button for Mobile / Desktop accessible */}
             <div className="absolute bottom-6 right-6 z-10">
                <button
                  onClick={handleAnalyze}
                  disabled={state.isLoading || !code.trim()}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all transform
                    ${!code.trim() || state.isLoading 
                      ? 'bg-slate-400 cursor-not-allowed opacity-80' 
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-indigo-500/30'}
                  `}
                >
                  {state.isLoading ? (
                    'Analyzing...'
                  ) : (
                    <>
                      <Play size={18} fill="currentColor" />
                      <span>Review Code</span>
                    </>
                  )}
                </button>
             </div>
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="h-full min-h-[500px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col relative">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-500" />
              Mentor Feedback
            </h2>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <ResponseViewer 
              response={state.response} 
              isLoading={state.isLoading} 
              error={state.error} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
