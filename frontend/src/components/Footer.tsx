import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, CheckCircle2, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-20">
      {/* Ecosystem alignment callout */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">सरकारी इकोसिस्टम संरेखण (Government Ecosystem Alignment)</h4>
              <p className="text-xs text-slate-400">
                डिज़ाइन किया गया: PM-AJAY, NSQF / NCVET, स्किल इंडिया डिजिटल (SIDH), एवं भाषिणी (Bhashini) वाक मॉडल
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-400 max-w-sm">
            <span className="text-amber-400 font-semibold">नोट:</span> यह स्मार्ट इंडिया हैकाथॉन (SIH 2026) प्रोटोटाइप है। प्रदर्शित पाठ्यक्रम व अवसर सिमुलेटेड डेमो डेटा पर आधारित हैं।
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Project Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">AAROHAN</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono">SIH26097</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              अनुसूचित जाति (SC) लाभार्थियों हेतु एआई-संचालित बहुभाषी वॉयस सहायक जो व्यक्तिगत योग्यता व रुचि अनुसार कौशल प्रशिक्षण और स्थानीय आजीविका का मार्ग प्रशस्त करता है।
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400">
              <Shield className="w-3.5 h-3.5" />
              <span>डेटा गोपनीयता एवं सुरक्षा प्रतिबद्ध</span>
            </div>
          </div>

          {/* Col 2: Core User Journey */}
          <div>
            <h5 className="text-white font-semibold mb-3">उपयोगकर्ता यात्रा (User Journey)</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/assistant" className="hover:text-amber-400 transition">1. वॉयस इनपुट एवं प्रोफ़ाइल निर्माण</Link></li>
              <li><Link to="/skills" className="hover:text-amber-400 transition">2. कौशल मूल्यांकन (Skill Assessment)</Link></li>
              <li><Link to="/skill-gap" className="hover:text-amber-400 transition">3. स्किल गैप एनालिसिस (Skill Gap)</Link></li>
              <li><Link to="/training" className="hover:text-amber-400 transition">4. एनएसक्यूएफ प्रशिक्षण अनुशंसा</Link></li>
              <li><Link to="/livelihood" className="hover:text-amber-400 transition">5. आजीविका व रोजगार मैपिंग</Link></li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div>
            <h5 className="text-white font-semibold mb-3">पोर्टल पृष्ठ (Portal Links)</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/jobs" className="hover:text-amber-400 transition">रोजगार एवं स्वरोजगार अवसर</Link></li>
              <li><Link to="/dashboard" className="hover:text-amber-400 transition">प्रगति डैशबोर्ड (Beneficiary Dashboard)</Link></li>
              <li><Link to="/admin" className="hover:text-amber-400 transition">प्रशासन व एनालिटिक्स (Admin Analytics)</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition">परियोजना व समस्या विवरण</Link></li>
              <li><Link to="/help" className="hover:text-amber-400 transition">सहायता, सुगमता व अक्सर पूछे जाने वाले सवाल</Link></li>
            </ul>
          </div>

          {/* Col 4: SIH 2026 Prototype Details */}
          <div>
            <h5 className="text-white font-semibold mb-3">स्मार्ट इंडिया हैकाथॉन 2026</h5>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">समस्या आईडी:</span>
                <span className="text-white font-mono">SIH26097</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">थीम:</span>
                <span className="text-white">कृषि, खाद्य व ग्रामीण विकास</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">श्रेणी:</span>
                <span className="text-white">सॉफ्टवेयर (Software)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">प्रोटोटाइप संस्करण:</span>
                <span className="text-amber-400 font-semibold">v1.0.0 (SIH Eval)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <div>
            © 2026 AAROHAN Team. Smart India Hackathon 2026 Solution Prototype.
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link to="/help" className="hover:text-slate-300">गोपनीयता नीति (Privacy)</Link>
            <Link to="/help" className="hover:text-slate-300">उपयोग की शर्तें</Link>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400/80">Made with ❤️ for Rural Empowerment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
