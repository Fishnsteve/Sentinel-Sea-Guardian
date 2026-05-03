import React, { useState } from 'react';
import { Bell, ChevronRight, Zap, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { DetectionResult } from '../services/guardianAI';
import { motion, AnimatePresence } from 'framer-motion';

const guideSteps = [
  { title: "Cloud Verification", description: "Standard AI scans for hazards locally. 'Cloud Ver' uses advanced models to confirm life-critical drowning signatures." },
  { title: "Risk Grid", description: "Blue indicates calm water. Orange/Red zones indicate concentrated rip currents detected by spectral analysis." },
  { title: "Bio-Kinematics", description: "Sentinel tracks skeletal points to detect 'IDR' (Instinctive Drowning Response)—aggressive splashing without forward progress." },
];

export function Header({ aiResult, onClear }: { aiResult: DetectionResult | null, onClear: () => void }) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <header className="px-4 md:px-8 py-3 md:py-4 border-b border-guardian-slate flex justify-between items-center bg-guardian-navy/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-1 md:gap-2">
            <h2 className="text-base md:text-xl font-display font-medium text-white truncate">Main Command</h2>
            <ChevronRight className="w-3 h-3 md:w-4 h-4 text-slate-600 shrink-0" />
            <span className="text-[10px] md:text-sm font-mono text-guardian-green truncate">SECTOR_ALPHA</span>
          </div>
          <p className="text-[9px] md:text-xs text-slate-500 font-mono truncate">34.0195° N, 118.4912° W • CLEARINGHOUSE_ACTIVE</p>
        </div>

        {aiResult && (
          <div className="hidden sm:flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="h-8 w-px bg-guardian-slate" />
            <div className={cn(
              "px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-2 md:gap-3 border shadow-lg transition-colors cursor-pointer",
              aiResult.hazardDetected ? "bg-guardian-alert/10 border-guardian-alert/50" : "bg-guardian-green/10 border-guardian-green/50"
            )}
            onClick={onClear}
            title="Click to clear AI analysis"
            >
              <div className={cn(
                "p-1 md:p-1.5 rounded-md",
                aiResult.hazardDetected ? "bg-guardian-alert text-white" : "bg-guardian-green text-guardian-navy"
              )}>
                <Zap className="w-3 h-3 fill-current" />
              </div>
              <div className="hidden lg:block">
                <div className="text-[10px] font-mono text-slate-400 uppercase leading-none mb-1">Cloud Analysis Result</div>
                <div className="text-xs font-bold leading-none">{aiResult.type || 'CLEAR'} | {(aiResult.confidence * 100).toFixed(0)}% CONF</div>
              </div>
              <div className="lg:hidden text-[10px] font-bold truncate max-w-[80px]">
                {aiResult.type}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button 
          onClick={() => setShowGuide(!showGuide)}
          aria-label="Toggle Guide"
          className={cn(
            "p-2 rounded-lg transition-all flex items-center gap-2 px-3 focus:outline-none focus:ring-2 focus:ring-guardian-green",
            showGuide ? "bg-guardian-green text-guardian-navy" : "bg-guardian-slate text-slate-400 hover:text-white"
          )}
        >
          <Info className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase hidden md:inline">Guide</span>
        </button>

        <div className="hidden md:flex -space-x-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full bg-guardian-slate flex items-center justify-center border-2 border-guardian-navy text-[10px] font-mono text-guardian-green">
              T{i}
            </div>
          ))}
        </div>
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors" aria-label="Notifications">
          <Bell className="w-4 h-4 md:w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-guardian-alert rounded-full border-2 border-guardian-navy" />
        </button>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-guardian-slate to-guardian-navy border border-guardian-slate flex items-center justify-center overflow-hidden">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Sentinel" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      <AnimatePresence>
        {showGuide && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 p-4 md:px-8 bg-guardian-navy/95 border-b border-guardian-slate shadow-2xl z-50 backdrop-blur-3xl"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-guardian-green uppercase tracking-widest">Sentinel Operator Guide</h3>
                <button onClick={() => setShowGuide(false)} className="p-1 hover:bg-white/5 rounded-full"><X className="w-4 h-4 text-slate-500" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {guideSteps.map((step, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">0{i+1}. {step.title}</div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light italic">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

