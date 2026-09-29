import React from 'react';
import { Shield, Award, Sparkles, Smartphone, Users, Globe, ExternalLink, Heart, Layers } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>स्मार्ट इंडिया हैकाथॉन (SIH 2026) प्रोटोटाइप</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            AAROHAN (आरोहण) के बारे में
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            एआई-संचालित बहुभाषी वॉयस सहायक: आजीविका मानचित्रण एवं एनएसक्यूएफ संरेखित कौशल विकास
          </p>
        </div>

        {/* Hackathon Problem Context */}
        <div className="gov-card p-6 bg-white space-y-4">
          <h2 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
            समस्या वक्तव्य एवं संदर्भ (Problem Statement ID: SIH26097)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-semibold block">थीम:</span>
              <strong className="text-slate-900 text-sm">कृषि, खाद्य प्रौद्योगिकी एवं ग्रामीण विकास</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 font-semibold block">लक्षित लाभार्थी:</span>
              <strong className="text-slate-900 text-sm">पीएम-अजय (PM-AJAY) के अंतर्गत अनुसूचित जाति लाभार्थी</strong>
            </div>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            ग्रामीण एवं अर्ध-शहरी क्षेत्रों में कई लाभार्थी उपयुक्त कौशल प्रशिक्षण की जानकारी के अभाव, 
            कौशल बेमेल, भाषा बाधा और कम डिजिटल साक्षरता के कारण विकास की मुख्यधारा से वंचित रह जाते हैं। 
            आरोहण इस खाई को पाटने के लिए एक स्वाभाविक, आवाज-आधारित (Voice-First) मार्गदर्शन प्रणाली प्रदान करता है।
          </p>
        </div>

        {/* Government Ecosystem Alignment section (Section 26 compliance) */}
        <div className="gov-card p-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">सरकारी इकोसिस्टम संरेखण (Government Ecosystem Alignment)</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            "आरोहण को संबंधित सरकारी कौशल और आजीविका तंत्रों के साथ संरेखित करने हेतु डिज़ाइन किया गया है:"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <strong className="text-amber-300 block font-semibold">1. PM-AJAY (पीएम-अजय)</strong>
              <span className="text-slate-300 text-[11px]">
                प्रधान मंत्री अनुसूचित जाति अभ्युदय योजना के तहत कौशल विकास एवं आजीविका सृजन लक्ष्यों के अनुरूप।
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <strong className="text-amber-300 block font-semibold">2. NSQF / NCVET</strong>
              <span className="text-slate-300 text-[11px]">
                राष्ट्रीय कौशल योग्यता ढांचा (Level 3-5) अनुसार पाठ्यक्रमों की सक्षमता मैपिंग।
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <strong className="text-amber-300 block font-semibold">3. Skill India Digital (SIDH)</strong>
              <span className="text-slate-300 text-[11px]">
                कौशल भारत डिजिटल इकोसिस्टम के मानकीकृत कोर्स कैटलॉग संरचना के साथ समन्वय।
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <strong className="text-amber-300 block font-semibold">4. BHASHINI (भाषिणी)</strong>
              <span className="text-slate-300 text-[11px]">
                राष्ट्रीय भाषा अनुवाद मिशन के बहुभाषी वॉयस मॉडल के साथ भविष्य की एकीकरण रूपरेखा।
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-1">
            * अस्वीकरण: यह स्मार्ट इंडिया हैकाथॉन (SIH 2026) नवाचार प्रोटोटाइप है। किसी भी आधिकारिक सरकारी साझेदारी का दावा नहीं किया गया है।
          </div>
        </div>

        {/* Section 25: Future Extensible Scope */}
        <div className="gov-card p-6 bg-white space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            भविष्य का नियोजित विस्तार (Planned Future Integrations)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <Smartphone className="w-5 h-5 text-emerald-600 mx-auto" />
              <strong className="block text-slate-800">व्हाट्सएप बॉट</strong>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">नियोजित एकीकरण</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <Globe className="w-5 h-5 text-blue-600 mx-auto" />
              <strong className="block text-slate-800">IVR टोल-फ्री वॉयस</strong>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">नियोजित एकीकरण</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <Smartphone className="w-5 h-5 text-indigo-600 mx-auto" />
              <strong className="block text-slate-800">ऑफ़लाइन मोबाइल ऐप</strong>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">नियोजित एकीकरण</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <Users className="w-5 h-5 text-purple-600 mx-auto" />
              <strong className="block text-slate-800">ग्राम पंचायत कियोस्क</strong>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">नियोजित एकीकरण</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

