import React from 'react';
import { useDemo } from '../context/DemoContext';
import { Sparkles, Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const { isDemoActive, demoStep, setDemoStep, startDemo } = useDemo();
  const navigate = useNavigate();

  const handleStepClick = (step: number, route: string) => {
    setDemoStep(step);
    navigate(route);
  };

  return (
    <div className="bg-amber-500 text-slate-900 text-xs md:text-sm font-medium py-1.5 px-4 shadow-sm border-b border-amber-600 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="bg-slate-900 text-amber-300 font-bold px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> SIH 2026 DEMO MODE
        </span>
        <span className="hidden sm:inline text-slate-900 font-medium">
          Problem Statement: SIH26097 | PM-AJAY Context | Prototype Data
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1 bg-amber-400/80 px-2 py-0.5 rounded text-xs">
          <button 
            onClick={() => handleStepClick(1, '/assistant')}
            className={`px-1.5 py-0.5 rounded transition ${demoStep === 1 ? 'bg-slate-900 text-amber-300 font-bold' : 'hover:bg-amber-300'}`}
          >
            1. वॉयस
          </button>
          <span>→</span>
          <button 
            onClick={() => handleStepClick(2, '/profile')}
            className={`px-1.5 py-0.5 rounded transition ${demoStep === 2 ? 'bg-slate-900 text-amber-300 font-bold' : 'hover:bg-amber-300'}`}
          >
            2. प्रोफ़ाइल
          </button>
          <span>→</span>
          <button 
            onClick={() => handleStepClick(3, '/skill-gap')}
            className={`px-1.5 py-0.5 rounded transition ${demoStep === 3 ? 'bg-slate-900 text-amber-300 font-bold' : 'hover:bg-amber-300'}`}
          >
            3. स्किल गैप
          </button>
          <span>→</span>
          <button 
            onClick={() => handleStepClick(4, '/training')}
            className={`px-1.5 py-0.5 rounded transition ${demoStep === 4 ? 'bg-slate-900 text-amber-300 font-bold' : 'hover:bg-amber-300'}`}
          >
            4. प्रशिक्षण
          </button>
          <span>→</span>
          <button 
            onClick={() => handleStepClick(5, '/livelihood')}
            className={`px-1.5 py-0.5 rounded transition ${demoStep === 5 ? 'bg-slate-900 text-amber-300 font-bold' : 'hover:bg-amber-300'}`}
          >
            5. आजीविका
          </button>
        </div>

        <button 
          onClick={startDemo}
          className="bg-slate-900 hover:bg-slate-800 text-amber-300 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition"
          title="Restart guided demo"
        >
          <RotateCcw className="w-3 h-3" /> रीसेट
        </button>
      </div>
    </div>
  );
};

