import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { RecommendationCard } from '../components/RecommendationCard';
import { RecommendationItem } from '../types';
import { Award, ArrowRight, Filter, Sparkles, AlertCircle } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const TrainingPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const { setDemoStep } = useDemo();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecs() {
      setLoading(false);
      const res = await api.getRecommendations();
      if (res && res.recommendations) {
        setRecommendations(res.recommendations);
      }
    }
    fetchRecs();
  }, []);

  const filtered = filterCategory === 'all'
    ? recommendations
    : recommendations.filter(r => r.course.category === filterCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>एनएसक्यूएफ संरेखित प्रशिक्षण अनुशंसाएं (NSQF-Aligned Recommendations)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            आपकी योग्यता व रुचि अनुसार सर्वश्रेष्ठ पाठ्यक्रम
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            पारदर्शी स्कोरिंग एल्गोरिदम द्वारा चयनित पाठ्यक्रम, जो आपके कौशल अंतर को समाप्त कर रोजगार दिलाते हैं।
          </p>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>पारदर्शी गणना मॉडल:</strong> प्रत्येक कोर्स का मिलान आपकी शिक्षा (20%), मौजूदा कौशल (30%), 
            व्यक्तिगत रुचि (20%), स्थान सुगमता (15%) और रोजगार पसंद (15%) के आधार पर निष्पक्ष रूप से आंका गया है।
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>श्रेणी अनुसार फ़िल्टर करें:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'all', label: 'सभी पाठ्यक्रम' },
              { key: 'it', label: 'सूचना प्रौद्योगिकी (IT)' },
              { key: 'agriculture', label: 'आधुनिक कृषि व सोलर' },
              { key: 'services', label: 'सेवाएं एवं बैंकिंग' }
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterCategory(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterCategory === f.key
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin mx-auto mb-2" />
            <p className="text-xs font-semibold">अनुशंसाएं तैयार की जा रही हैं...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((item) => (
              <RecommendationCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* Next Step Callout */}
        <div className="gov-card p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm">अगला चरण: संपूर्ण आजीविका यात्रा का नक्शा (Livelihood Map)</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              देखें कि प्रशिक्षण पूरा होने के बाद आपको किन रोजगार व स्वरोजगार अवसरों से जोड़ा जाएगा।
            </p>
          </div>

          <button
            onClick={() => {
              setDemoStep(5);
              navigate('/livelihood');
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow transition flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>आजीविका मैप देखें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
