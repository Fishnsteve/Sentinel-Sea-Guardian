import React from 'react';
import { Bell, Shield, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { DetectionResult } from '../services/guardianAI';

export function Header({ aiResult, onClear }: { aiResult: DetectionResult | null, onClear: () => void }) {
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
            title="Click to clear AI Result"
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
        <div className="hidden md:flex -space-x-1">
          {/* Active Towers */}
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full bg-guardian-slate flex items-center justify-center border-2 border-guardian-navy text-[10px] font-mono text-guardian-green">
              T{i}
            </div>
          ))}
        </div>
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4 md:w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 md:w-2 md:h-2 bg-guardian-alert rounded-full border-2 border-guardian-navy" />
        </button>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-guardian-slate to-guardian-navy border border-guardian-slate flex items-center justify-center overflow-hidden">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Sentinel" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
