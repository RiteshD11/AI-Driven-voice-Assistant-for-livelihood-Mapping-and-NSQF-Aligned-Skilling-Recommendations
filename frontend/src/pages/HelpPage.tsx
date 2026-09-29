import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { HelpCircle, Eye, Volume2, Type, Send, CheckCircle2, Shield } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { textSize, setTextSize, highContrast, setHighContrast, speakText } = useAccessibility();
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-800" />
            <span>सुगमता एवं सहायता (Accessibility & Assistance)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            पोर्टल सहायता एवं दृष्टिगत सुगमता नियंत्रण
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            सभी लाभार्थियों, विशेषकर कम डिजिटल साक्षरता अथवा दृष्टि संवेदनशीलता वाले उपयोगकर्ताओं हेतु सुगम मंच।
          </p>
        </div>

        {/* Accessibility Controls Panel */}
        <div className="gov-card p-6 bg-white space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-900" />
            <span>दृष्टिगत अनुकूलन (Visual Preferences)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Font Size controls */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-slate-600" />
                <span>अक्षर आकार (Font Size Scaling):</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setTextSize('normal')}
                  className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition ${
                    textSize === 'normal' ? 'bg-blue-900 text-white font-bold' : 'bg-white text-slate-700'
                  }`}
                >
                  सामान्य (अ)
                </button>
                <button
                  onClick={() => setTextSize('large')}
                  className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${
                    textSize === 'large' ? 'bg-blue-900 text-white font-bold' : 'bg-white text-slate-700'
                  }`}
                >
                  बड़ा (अ+)
                </button>
                <button
                  onClick={() => setTextSize('extra-large')}
                  className={`flex-1 py-2 rounded-lg border text-base font-semibold transition ${
                    textSize === 'extra-large' ? 'bg-blue-900 text-white font-bold' : 'bg-white text-slate-700'
                  }`}
                >
                  अति बड़ा (अ++)
                </button>
              </div>
            </div>

            {/* High contrast toggle */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-slate-600" />
                <span>उच्च विषमता (High Contrast Mode):</span>
              </span>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full py-2 rounded-lg border text-xs font-bold transition ${
                  highContrast 
                    ? 'bg-amber-400 text-slate-950 border-amber-500' 
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {highContrast ? '✓ हाई कॉन्ट्रास्ट सक्रिय है' : 'हाई कॉन्ट्रास्ट चालू करें'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 28: Simple Error Guidance and Tips */}
        <div className="gov-card p-6 bg-white space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            वॉयस इनपुट में समस्या आने पर क्या करें? (Troubleshooting)
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
            <li><strong>माइक्रोफ़ोन अनुमति:</strong> यदि ब्राउज़र माइक की अनुमति मांगे, तो 'Allow' (अनुमति दें) पर क्लिक करें।</li>
            <li><strong>शांत वातावरण:</strong> बोलते समय आसपास का शोर कम रखें ताकि एआई आपकी आवाज़ स्पष्ट समझ सके।</li>
            <li><strong>लिखने का विकल्प:</strong> यदि माइक काम न करे, तो 'लिखकर बताएं' (Type Instead) बटन का उपयोग करें।</li>
            <li><strong>डेमो मोड:</strong> 'डेमो वॉयस नमूना' बटन दबाकर स्वचालित बातचीत का अनुभव प्राप्त किया जा सकता है।</li>
          </ul>
        </div>

        {/* Feedback Form */}
        <div className="gov-card p-6 bg-white space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            आपकी प्रतिक्रिया (Feedback & Suggestion)
          </h3>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>आपकी प्रतिक्रिया सफलतापूर्वक दर्ज कर ली गई है। धन्यवाद!</span>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">रेटिंग (1 से 5 स्टार):</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className={`px-3 py-1.5 rounded-lg border font-bold ${
                        feedbackRating === star ? 'bg-amber-500 text-slate-950 border-amber-600' : 'bg-slate-50'
                      }`}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">सुझाव या अनुभव:</label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="आरोहण को और बेहतर बनाने हेतु अपना सुझाव साझा करें..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-900"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>प्रतिक्रिया भेजें</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

