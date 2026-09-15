import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useDemo } from '../context/DemoContext';
import { 
  Mic, UserCheck, Award, Briefcase, Compass, ArrowRight, 
  Shield, CheckCircle2, ChevronRight, HelpCircle, Layers, 
  BookOpen, Sparkles, Smartphone, Users, MapPin
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const { startDemo } = useDemo();

  const journeySteps = [
    { num: '01', title: 'वॉयस इनपुट (Voice)', desc: 'अपनी भाषा में बोलें, कोई जटिल फॉर्म नहीं', icon: Mic },
    { num: '02', title: 'प्रोफ़ाइल (Profile)', desc: 'एआई द्वारा योग्यता व रुचि का स्वचालित निष्कर्षण', icon: UserCheck },
    { num: '03', title: 'कौशल (Skills)', desc: 'मौजूदा क्षमताओं व अंतर (Skill Gap) का विश्लेषण', icon: Layers },
    { num: '04', title: 'प्रशिक्षण (Training)', desc: 'एनएसक्यूएफ (NSQF) संरेखित पाठ्यक्रमों की अनुशंसा', icon: Award },
    { num: '05', title: 'आजीविका (Livelihood)', desc: 'स्थानीय रोजगार एवं स्वरोजगार से जुड़ाव', icon: Briefcase }
  ];

  const problemPoints = [
    { title: 'जागरूकता का अभाव', desc: 'उपयुक्त कौशल प्रशिक्षण अवसरों और योजनाओं की जानकारी तक सीमित पहुंच।' },
    { title: 'कौशल बेमेल (Skill Mismatch)', desc: 'बाजार की मांग और पारंपरिक कौशल के बीच बड़ा अंतर।' },
    { title: 'भाषा व डिजिटल बाधाएं', desc: 'जटिल ऑनलाइन पोर्टलों पर अंग्रेजी या औपचारिक भाषा में फॉर्म भरना कठिन।' },
    { title: 'प्रशिक्षण से आजीविका का अभाव', desc: 'प्रशिक्षण पूरा होने के बाद भी रोजगार या स्वरोजगार से सीधा जुड़ाव न होना।' }
  ];

  const faqs = [
    {
      q: 'आरोहण (AAROHAN) किस समस्या का समाधान करता है?',
      a: 'पीएम-अजय (PM-AJAY) के तहत लाभार्थियों को आवाज के माध्यम से उनकी भाषा में उपयुक्त कौशल प्रशिक्षण और स्थानीय रोजगार/स्वरोजगार से जोड़ता है।'
    },
    {
      q: 'क्या इसका उपयोग करने के लिए टाइपिंग जानना जरूरी है?',
      a: 'नहीं! आरोहण वॉयस-फर्स्ट (आवाज आधारित) प्रणाली है। आप केवल माइक बटन दबाकर हिंदी या अपनी भाषा में बोल सकते हैं।'
    },
    {
      q: 'प्रशिक्षण अनुशंसाएं किस आधार पर दी जाती हैं?',
      a: 'पारदर्शी 5-कारकीय गणना: शिक्षा स्तर (20%), मौजूदा कौशल (30%), व्यक्तिगत रुचि (20%), स्थान सुगमता (15%) और आजीविका पसंद (15%)।'
    },
    {
      q: 'क्या यह आधिकारिक सरकारी पोर्टल है?',
      a: 'यह स्मार्ट इंडिया हैकाथॉन (SIH 2026) के लिए विकसित प्रोटोटाइप समाधान है, जो राष्ट्रीय कौशल विकास मानकों (NSQF/NCVET) के संरेखित बनाया गया है।'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>स्मार्ट इंडिया हैकाथॉन (SIH 2026) | समस्या आईडी: SIH26097</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            AAROHAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white text-3xl sm:text-4xl md:text-5xl">
              आपकी आवाज़। आपका हुनर। आपकी आजीविका।
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            अनुसूचित जाति (SC) लाभार्थियों हेतु एआई-संचालित बहुभाषी वॉयस सहायक जो व्यक्तिगत योग्यता व रुचि अनुसार 
            कौशल प्रशिक्षण और स्थानीय आजीविका का मार्ग प्रशस्त करता है।
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/assistant"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Mic className="w-5 h-5" />
              <span>सफर शुरू करें (Start Your Journey)</span>
            </Link>

            <Link
              to="/assistant"
              onClick={startDemo}
              className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 px-6 py-3.5 rounded-xl font-semibold text-sm shadow transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>एसआईएच डेमो वॉकथ्रू (2 मिनट)</span>
            </Link>
          </div>

          {/* Key Metric Highlights */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-bold text-amber-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">वॉयस-फर्स्ट इंटरफ़ेस</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">NSQF</div>
              <div className="text-xs text-slate-400 mt-0.5">मानक संरेखित कोर्स</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">पारदर्शी</div>
              <div className="text-xs text-slate-400 mt-0.5">5-कारकीय मैच स्कोरिंग</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">द्विपक्षीय</div>
              <div className="text-xs text-slate-400 mt-0.5">रोजगार व स्वरोजगार</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual User Journey */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
            मार्गदर्शन प्रवाह (User Journey)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            जटिल फॉर्म नहीं, सीधा व सरल मार्गदर्शन
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            वॉयस इनपुट से लेकर रोजगार प्राप्ति तक का 5-चरणीय सहज सफर
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {journeySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="gov-card p-5 relative flex flex-col justify-between border-t-4 border-t-amber-500">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 font-mono">{step.num}</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Problem & Our Solution */}
      <section className="py-14 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Problem */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded">
              प्रमुख जमीनी चुनौतियां (Core Problem)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              कौशल विकास में लाभार्थियों के समक्ष आने वाली प्रमुख बाधाएं
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {problemPoints.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-xs text-slate-900 mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Solution Highlights */}
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/20 px-2.5 py-1 rounded">
              आरोहण का समाधान (Our Solution)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold leading-snug">
              एआई और प्राकृतिक भाषा प्रसंस्करण (NLP) से सशक्त पारदर्शी प्लेटफॉर्म
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">बहुभाषी वॉयस संवाद (Multilingual Voice)</strong>
                  <span className="text-slate-300">हिंदी एवं क्षेत्रीय बोलियों में बोलकर अपनी योग्यता साझा करें।</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">स्वचालित प्रोफ़ाइल निष्कर्षण (AI/NLP Profile)</strong>
                  <span className="text-slate-300">कथित भाषा से शिक्षा, मौजूदा हुनर और प्राथमिकताओं की स्वचालित पहचान।</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">स्किल गैप एवं एनएसक्यूएफ संरेखण (NSQF Alignment)</strong>
                  <span className="text-slate-300">उद्योग मानकों के अनुसार आवश्यक कौशल अंतर दर्शाना।</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">पारदर्शी अनुशंसा एवं आजीविका मैपिंग</strong>
                  <span className="text-slate-300">प्रत्येक कोर्स व जॉब मैच का स्पष्ट कारण और रोजगार मार्ग।</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>अभी एआई वॉयस सहायक से बात करें</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Architecture */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded">
            तकनीकी वास्तुकला (Tech Stack)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            आधुनिक, स्केलेबल एवं मॉड्यूलर तकनीक
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            React, Node.js, Python AI/NLP, और MongoDB का सुदृढ़ संयोजन
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gov-card p-5 space-y-2">
            <span className="text-[11px] font-bold text-blue-700 uppercase">यूजर इंटरफ़ेस (Frontend)</span>
            <h4 className="font-bold text-sm text-slate-900">React 18 + TypeScript</h4>
            <p className="text-xs text-slate-600">
              Tailwind CSS, मोबाइल-फर्स्ट सुगम डिज़ाइन, वेब स्पीच API एकीकरण और हिंदी टाइपोग्राफी।
            </p>
          </div>

          <div className="gov-card p-5 space-y-2">
            <span className="text-[11px] font-bold text-emerald-700 uppercase">बैकएंड एपीआई (Backend)</span>
            <h4 className="font-bold text-sm text-slate-900">Node.js + Express</h4>
            <p className="text-xs text-slate-600">
              सुरक्षित JWT प्रमाणीकरण, डेटा सत्यापन, दर सीमा (Rate limiting) और RESTful एंडपॉइंट्स।
            </p>
          </div>

          <div className="gov-card p-5 space-y-2">
            <span className="text-[11px] font-bold text-amber-700 uppercase">एआई सेवा (AI & NLP)</span>
            <h4 className="font-bold text-sm text-slate-900">Python + FastAPI</h4>
            <p className="text-xs text-slate-600">
              नेचुरल लैंग्वेज पार्सर, स्किल गैप डिटेक्टर, 5-कारकीय वेटेड अनुशंसा इंजन और लाइव फॉलबैक।
            </p>
          </div>

          <div className="gov-card p-5 space-y-2">
            <span className="text-[11px] font-bold text-purple-700 uppercase">डेटाबेस (Database)</span>
            <h4 className="font-bold text-sm text-slate-900">MongoDB + Mongoose</h4>
            <p className="text-xs text-slate-600">
              लाभार्थी प्रोफ़ाइल, एनएसक्यूएफ कोर्स, आजीविका के अवसर और अनामीकृत सांख्यिकी का कुशल भंडारण।
            </p>
          </div>
        </div>
      </section>

      {/* Measurable Impact Section */}
      <section className="py-14 bg-slate-100 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
            प्रभाव संकेतक (Measurable Impact)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            जमीनी स्तर पर सकारात्मक सामाजिक प्रभाव
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            बिना किसी काल्पनिक आंकड़ों के, वास्तविक रूप से मापे जाने योग्य सामाजिक प्रभाव संकेतक:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">1</div>
            <h4 className="font-bold text-sm text-slate-900">डिजिटल बाधाओं में कमी</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              कम डिजिटल साक्षरता वाले लाभार्थियों हेतु वॉयस संवाद द्वारा सहज पहुंच और शून्य फॉर्म-जटिलता।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">2</div>
            <h4 className="font-bold text-sm text-slate-900">सटीक कौशल संरेखण</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              पारंपरिक अनुभव को पहचानते हुए एनएसक्यूएफ मानकों अनुसार अपस्किलिंग और सर्टिफिकेशन गैप का निदान।
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">3</div>
            <h4 className="font-bold text-sm text-slate-900">रोजगार व स्वरोजगार जुड़ाव</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              प्रशिक्षण समाप्ति पर स्थानीय सूक्ष्म-उद्यमों (CSC, सोलर पंप आदि) एवं रोजगार अवसरों से सीधा मैपिंग।
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded">
            अक्सर पूछे जाने वाले सवाल (FAQ)
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            आरोहण के संबंध में महत्वपूर्ण प्रश्न
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1.5 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">
            अपनी आजीविका और कौशल विकास का सफर शुरू करें
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            आरोहण वॉयस सहायक आपकी भाषा में आपकी सहायता के लिए तैयार है।
          </p>
          <div className="pt-2">
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition"
            >
              <Mic className="w-4 h-4" />
              <span>वॉयस असिस्टेंट से बात करें</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
