import React from 'react';
import { Shield, Check, Lock, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose, onAccept }) => {
  const { setConsentGiven } = useAuth();

  if (!isOpen) return null;

  const handleAgree = () => {
    setConsentGiven(true);
    onAccept();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">लाभार्थी सहमति एवं गोपनीयता</h3>
            <p className="text-xs text-slate-500">PM-AJAY कौशल एवं आजीविका सहायता हेतु</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2.5 leading-relaxed">
          <p className="font-semibold text-slate-900 text-sm">
            "आपकी जानकारी का उपयोग केवल आपके कौशल और आजीविका प्रोफ़ाइल निर्माण के लिए किया जाएगा।"
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-slate-600">
            <li>आपकी शिक्षा व कौशल विवरण एनएसक्यूएफ (NSQF) पाठ्यक्रमों से जोड़े जाएंगे।</li>
            <li>आपकी सहमति के बिना कोई भी व्यक्तिगत पहचान डेटा सार्वजनिक नहीं किया जाएगा।</li>
            <li>आप किसी भी समय अपनी प्रोफ़ाइल में सुधार या इसे हटा सकते हैं।</li>
          </ul>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>डेटा एन्क्रिप्शन एवं अनामीकृत (Anonymized) विश्लेषण प्रोटोकॉल लागू।</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
          >
            अधिक जानें (Learn More)
          </button>
          <button
            onClick={handleAgree}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-amber-300" />
            स्वीकार करें एवं आगे बढ़ें (Allow & Continue)
          </button>
        </div>
      </div>
    </div>
  );
};

