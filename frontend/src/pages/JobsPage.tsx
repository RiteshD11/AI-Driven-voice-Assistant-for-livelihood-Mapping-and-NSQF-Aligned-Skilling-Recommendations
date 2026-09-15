import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { OpportunityCard } from '../components/OpportunityCard';
import { LivelihoodOpportunity } from '../types';
import { Briefcase, Filter, Search, MapPin, Sparkles } from 'lucide-react';

export const JobsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') || 'all';

  const [opportunities, setOpportunities] = useState<LivelihoodOpportunity[]>([]);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.getOpportunities({ type: typeFilter });
      if (res && res.opportunities) {
        setOpportunities(res.opportunities);
      }
      setLoading(false);
    }
    loadData();
  }, [typeFilter]);

  const filtered = opportunities.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === 'all' || item.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5 text-blue-800" />
            <span>रोजगार एवं स्वरोजगार (Jobs & Self-Employment Opportunities)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            स्थानीय आजीविका के अवसर
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            आपके कौशल एवं प्रशिक्षण से मेल खाने वाले सत्यापित स्थानीय अवसर और स्वरोजगार के रास्ते।
          </p>
        </div>

        {/* Filters Bar */}
        <div className="gov-card p-4 bg-white space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="कौशल या पद का नाम खोजें..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900"
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none font-semibold text-slate-700"
              >
                <option value="all">सभी प्रकार (रोजगार + स्वरोजगार)</option>
                <option value="employment">केवल नौकरी / रोजगार (Employment)</option>
                <option value="self_employment">केवल स्वरोजगार / सूक्ष्म-उद्यम (Self-Employment)</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none font-semibold text-slate-700"
              >
                <option value="all">सभी स्थान (All Locations)</option>
                <option value="varanasi">वाराणसी (Varanasi)</option>
                <option value="chandauli">चंदौली (Chandauli)</option>
                <option value="mirzapur">मिर्ज़ापुर (Mirzapur)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opportunities List Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin mx-auto mb-2" />
            <p className="text-xs font-semibold">अवसर लोड हो रहे हैं...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
            कोई अवसर नहीं मिला। कृपया अपने फ़िल्टर बदलें।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((opp) => (
              <OpportunityCard key={opp._id} opp={opp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
