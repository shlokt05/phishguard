import React from 'react';
import { Mail, Link2, Monitor, CreditCard, ShieldAlert, ArrowDown } from 'lucide-react';

export const FlowDiagram: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: "Suspicious Message",
      desc: "User receives deceptive Email, SMS, or Social DM with artificial panic/urgency.",
      icon: Mail,
      color: "from-blue-500 to-indigo-600",
      borderColor: "border-blue-500/30"
    },
    {
      num: 2,
      title: "Suspicious Link",
      desc: "Message contains a link targeting a fake domain mimicking a legitimate entity.",
      icon: Link2,
      color: "from-indigo-500 to-purple-600",
      borderColor: "border-indigo-500/30"
    },
    {
      num: 3,
      title: "Fake Website",
      desc: "Link opens a cloned website crafted with stolen logos and deceptive login forms.",
      icon: Monitor,
      color: "from-purple-500 to-amber-600",
      borderColor: "border-purple-500/30"
    },
    {
      num: 4,
      title: "User Asked for Sensitive Data",
      desc: "Victim is prompted to enter passwords, credit card numbers, or SMS OTP codes.",
      icon: CreditCard,
      color: "from-amber-500 to-rose-600",
      borderColor: "border-amber-500/30"
    },
    {
      num: 5,
      title: "Potential Risk",
      desc: "Stolen credentials enable account takeover, identity theft, or financial loss.",
      icon: ShieldAlert,
      color: "from-rose-600 to-red-700",
      borderColor: "border-rose-500/40"
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-1">Educational Flow: How Deceptive Sites Operate</h3>
      <p className="text-xs text-slate-400 mb-6">High-level educational sequence demonstrating the lifecycle of a phishing trap.</p>

      <div className="flex flex-col items-center max-w-xl mx-auto space-y-3">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <React.Fragment key={step.num}>
              <div className={`w-full p-4 rounded-xl bg-slate-950 border ${step.borderColor} flex items-start gap-4 transition-all hover:scale-[1.01]`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 0{step.num}</span>
                    <span className="font-extrabold text-xs text-slate-200">{step.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center justify-center my-1 text-slate-600">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 text-center">
        🛡️ <strong>PhishGuard Awareness:</strong> Breaking the chain at Step 2 (inspecting links) or Step 4 (refusing to enter credentials) completely prevents account compromise!
      </div>
    </div>
  );
};
