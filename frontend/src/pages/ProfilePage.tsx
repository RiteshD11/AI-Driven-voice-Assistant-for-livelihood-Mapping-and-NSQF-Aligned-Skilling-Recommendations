import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { 
  User, MapPin, GraduationCap, Briefcase, Award, Heart, 
  Settings, CheckCircle2, Edit3, Save, ArrowRight, Shield, 
  Layers, Plus, Trash2, Smartphone
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentProfile, updateProfile, setDemoStep } = useDemo();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentProfile);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        existingSkills: [...prev.existingSkills, { name: newSkill.trim(), proficiency: 'intermediate', category: 'general' }]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      existingSkills: prev.existingSkills.filter((_, i) => i !== index)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header & Completion progress */}
        <div className="gov-card p-6 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg border-2 border-amber-300">
              {formData.name.slice(0, 1) || 'र'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold">{formData.name}</h1>
                {formData.aiExtracted && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                    एआई सत्यापित
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{formData.location.district}, {formData.location.state}</span>
                <span>•</span>
                <span>आयु: {formData.age} वर्ष</span>
              </p>
            </div>
          </div>

          {/* Profile completion gauge */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 min-w-[240px]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium">प्रोफ़ाइल पूर्णता (Profile Completion)</span>
              <span className="font-bold text-amber-400 text-sm">{formData.profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${formData.profileCompletion}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {formData.profileCompletion >= 80 ? '✓ एनएसक्यूएफ संरेखण हेतु पर्याप्त' : 'कृपया सभी विवरण भरें'}
            </p>
          </div>
        </div>

        {/* Action button toolbar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>PM-AJAY लाभार्थी प्रोफ़ाइल (गोपनीयता संरक्षित)</span>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>सुरक्षित करें (Save Changes)</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>संशोधन करें (Edit Profile)</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Grid of Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Basic & Demographic Details */}
          <div className="gov-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-900" />
              <span>बुनियादी जानकारी (Demographics)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 font-semibold block mb-0.5">नाम</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded text-xs"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{formData.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-500 font-semibold block mb-0.5">आयु (Age)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full p-2 border rounded text-xs"
                    />
                  ) : (
                    <p className="font-bold text-slate-800">{formData.age} वर्ष</p>
                  )}
                </div>

                <div>
                  <label className="text-slate-500 font-semibold block mb-0.5">लिंग (Gender)</label>
                  {isEditing ? (
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full p-2 border rounded text-xs"
                    >
                      <option value="male">पुरुष (Male)</option>
                      <option value="female">महिला (Female)</option>
                      <option value="other">अन्य (Other)</option>
                    </select>
                  ) : (
                    <p className="font-bold text-slate-800 capitalize">{formData.gender === 'male' ? 'पुरुष' : 'महिला'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-slate-500 font-semibold block mb-0.5">ज़िला व राज्य</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location.district}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      location: { ...formData.location, district: e.target.value } 
                    })}
                    className="w-full p-2 border rounded text-xs mb-1"
                  />
                ) : (
                  <p className="font-bold text-slate-800">{formData.location.district}, {formData.location.state}</p>
                )}
              </div>

              <div>
                <label className="text-slate-500 font-semibold block mb-0.5">पसंदीदा भाषा (Preferred Language)</label>
                <p className="font-bold text-slate-800">हिंदी (Hindi)</p>
              </div>
            </div>
          </div>

          {/* Card 2: Education & Occupation */}
          <div className="gov-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>शिक्षा व कार्य अनुभव (Education & Work)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 font-semibold block mb-0.5">उच्चतम शैक्षणिक योग्यता</label>
                {isEditing ? (
                  <select
                    value={formData.education.level}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      education: { ...formData.education, level: e.target.value } 
                    })}
                    className="w-full p-2 border rounded text-xs"
                  >
                    <option value="8th">8वीं पास</option>
                    <option value="10th">10वीं (हाई स्कूल)</option>
                    <option value="12th">12वीं (इंटरमीडिएट)</option>
                    <option value="diploma">डिप्लोमा / आईटीआई</option>
                    <option value="graduate">स्नातक (Graduate)</option>
                  </select>
                ) : (
                  <div>
                    <p className="font-bold text-slate-800">{formData.education.level}</p>
                    <span className="text-[11px] text-slate-500">{formData.education.details}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-slate-500 font-semibold block mb-0.5">वर्तमान स्थिति / पेशा</label>
                <p className="font-bold text-slate-800">{formData.occupation.current}</p>
                <span className="text-[11px] text-slate-500">अनुभव: {formData.occupation.experience} वर्ष</span>
              </div>

              <div>
                <label className="text-slate-500 font-semibold block mb-0.5">आजीविका प्राथमिकता (Job Preference)</label>
                {isEditing ? (
                  <select
                    value={formData.jobPreference}
                    onChange={(e) => setFormData({ ...formData, jobPreference: e.target.value as any })}
                    className="w-full p-2 border rounded text-xs"
                  >
                    <option value="employment">रोजगार / नौकरी (Employment)</option>
                    <option value="self_employment">स्वरोजगार / सूक्ष्म-उद्यम (Self-Employment)</option>
                    <option value="both">दोनों (Both Flexible)</option>
                  </select>
                ) : (
                  <span className="inline-block bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    {formData.jobPreference === 'both' ? 'रोजगार व स्वरोजगार दोनों' : formData.jobPreference}
                  </span>
                )}
              </div>

              <div>
                <label className="text-slate-500 font-semibold block mb-0.5">गतिशीलता (Mobility Preference)</label>
                <p className="font-bold text-slate-800">स्थानीय (जिले के अंदर काम)</p>
              </div>
            </div>
          </div>

          {/* Card 3: Skills & Interests */}
          <div className="gov-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>मौजूदा कौशल एवं रुचियां (Skills & Interests)</span>
            </h3>

            {/* Skills chip list */}
            <div>
              <label className="text-slate-500 font-semibold text-xs block mb-1.5">
                पहचाने गए कौशल ({formData.existingSkills.length}):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {formData.existingSkills.map((sk, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-800 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                    <span>{sk.name}</span>
                    {isEditing && (
                      <button onClick={() => removeSkill(idx)} className="text-rose-500 hover:text-rose-700">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-1 mt-2">
                  <input
                    type="text"
                    placeholder="नया कौशल जोड़ें"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="p-1 text-xs border rounded flex-1"
                  />
                  <button onClick={addSkill} className="px-2 bg-blue-900 text-white rounded text-xs">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Interests chip list */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-slate-500 font-semibold text-xs block mb-1.5 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>व्यक्तिगत रुचियां:</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {formData.interests.map((int, idx) => (
                  <span key={idx} className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                    <span>{int}</span>
                    {isEditing && (
                      <button onClick={() => removeInterest(idx)} className="text-rose-500 hover:text-rose-700">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step Forward Callout to Skill Gap Analysis */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="font-bold text-sm text-amber-950">अगला कदम: कौशल अंतर विश्लेषण (Skill Gap Analysis)</h4>
            <p className="text-xs text-amber-800 mt-0.5">
              अपनी रुचि अनुसार लक्षित जॉब रोल के लिए आवश्यक कौशलों की तुलना करें।
            </p>
          </div>

          <button
            onClick={() => {
              setDemoStep(3);
              navigate('/skill-gap');
            }}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5 shrink-0"
          >
            <span>स्किल गैप एनालिसिस देखें</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
