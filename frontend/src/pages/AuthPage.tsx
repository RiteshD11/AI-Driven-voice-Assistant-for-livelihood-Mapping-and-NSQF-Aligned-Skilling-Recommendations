import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Phone, Mail, User, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { ConsentModal } from '../components/ConsentModal';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('demo@unnati.gov.in');
  const [password, setPassword] = useState('demo1234');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('hi');
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [acceptedConsent, setAcceptedConsent] = useState(true);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('कृपया सभी आवश्यक विवरण दर्ज करें');
      return;
    }

    if (!isLogin && !acceptedConsent) {
      setConsentModalOpen(true);
      return;
    }

    // Authenticate demo user
    login({
      id: 'demo-beneficiary-101',
      name: isLogin ? 'राजेश कुमार (Rajesh Kumar)' : (name || 'नया लाभार्थी'),
      email: identifier.includes('@') ? identifier : undefined,
      phone: !identifier.includes('@') ? identifier : phone || '9876543210',
      role: 'beneficiary',
      language: (language as any) || 'hi',
      preferredLanguage: (language as any) || 'hi',
      consentGiven: acceptedConsent,
      createdAt: new Date().toISOString()
    });

    navigate('/assistant');
  };

  const fillDemoCredentials = () => {
    setIdentifier('demo@unnati.gov.in');
    setPassword('demo1234');
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        {/* Portal header branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-900 text-amber-400 font-black text-2xl shadow-md">
            उ
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isLogin ? 'लाभार्थी लॉगिन (Beneficiary Login)' : 'नया पंजीकरण (New Registration)'}
          </h2>
          <p className="text-xs text-slate-500">
            कौशल प्रशिक्षण एवं आजीविका मैपिंग हेतु सुरक्षित सरकारी संरेखित पोर्टल
          </p>
        </div>

        {/* SIH Demo Quick Login Box */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1.5">
          <div className="flex items-center justify-between font-bold text-amber-900">
            <span>🎯 SIH 2026 मूल्यांकन हेतु डेमो लॉगिन:</span>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[11px] bg-amber-200 hover:bg-amber-300 text-amber-900 px-2 py-0.5 rounded font-semibold transition"
            >
              स्वतः भरें (Autofill)
            </button>
          </div>
          <div className="text-slate-600 font-mono text-[11px]">
            उपयोगकर्ता: <span className="text-slate-900 font-bold">demo@unnati.gov.in</span> | पासवर्ड: <span className="text-slate-900 font-bold">demo1234</span>
          </div>
        </div>

        {/* Card Form */}
        <div className="gov-card p-6 shadow-md space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  पूरा नाम (Full Name) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. राजेश कुमार"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ईमेल या मोबाइल नंबर (Email or Mobile) *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="demo@unnati.gov.in या 9876543210"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                पासवर्ड (Password) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedConsent}
                    onChange={(e) => setAcceptedConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 text-blue-900 rounded border-slate-300"
                  />
                  <span className="text-[11px] text-slate-700 leading-tight">
                    मैं कौशल व आजीविका प्रोफाइल निर्माण हेतु अपनी बुनियादी जानकारी के उपयोग की सहमति देता/देती हूँ।
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setConsentModalOpen(true)}
                  className="text-[11px] text-blue-800 font-semibold hover:underline block"
                >
                  गोपनीयता नियम एवं विवरण पढ़ें
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow transition flex items-center justify-center gap-1.5"
            >
              <span>{isLogin ? 'सुरक्षित लॉगिन करें' : 'पंजीकरण पूर्ण करें'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          {/* Toggle between login and register */}
          <div className="text-center pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-xs text-blue-900 hover:underline font-semibold"
            >
              {isLogin ? 'नया लाभार्थी? यहाँ पंजीकरण करें' : 'पहले से खाता है? यहाँ लॉगिन करें'}
            </button>
          </div>
        </div>

        {/* Privacy footnote */}
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>PM-AJAY प्रोटोकॉल अनुसार डेटा गोपनीयता सुनिश्चित</span>
        </div>
      </div>

      <ConsentModal
        isOpen={consentModalOpen}
        onClose={() => setConsentModalOpen(false)}
        onAccept={() => setAcceptedConsent(true)}
      />
    </div>
  );
};

