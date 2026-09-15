import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Award, ArrowRight, Trash2 } from 'lucide-react';

export const SavedRecommendationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Bookmark className="w-3.5 h-3.5 text-amber-700" />
            <span>सहेजी गई अनुशंसाएं (Saved Recommendations)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            आपकी पसंदीदा प्रशिक्षण सूचियां
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            भविष्य में समीक्षा या आवेदन करने हेतु सहेजे गए पाठ्यक्रम
          </p>
        </div>

        {/* Sample Bookmarked Item */}
        <div className="gov-card p-5 space-y-3 bg-white border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                IT & Digital Services
              </span>
              <h3 className="font-bold text-base text-slate-900 mt-1">
                Web & Digital Interface Design Assistant
              </h3>
              <p className="text-xs text-slate-500">NSQF Level 4 | 3 माह | वाराणसी प्रशिक्षण केंद्र</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              94% मैच
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button 
              onClick={() => alert('सहेजी गई सूची से हटा दिया गया')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>सूची से हटाएं</span>
            </button>

            <Link
              to="/training"
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
            >
              <span>विवरण देखें व आवेदन करें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
