import React from 'react';
import { Bell, Shield, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { DetectionResult } from '../services/guardianAI';

export function Header({ aiResult, onClear }: { aiResult: DetectionResult | null, onClear: () => void }) {
  return (
    <header className="px-8 py-4 border-b border-guardian-slate flex justify-between items-center bg-guardian-navy/80 backdrop-blur-xl sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-medium text-white">Main Command</h2>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-mono text-guardian-green">SECTOR_ALPHA</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">34.0195° N, 118.4912° W • CLEARINGHOUSE_ACTIVE</p>
        </div>

        {aiResult && (
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="h-8 w-px bg-guardian-slate" />
            <div className={cn(
              "px-4 py-2 rounded-xl flex items-center gap-3 border shadow-lg transition-colors cursor-pointer",
              aiResult.hazardDetected ? "bg-guardian-alert/10 border-guardian-alert/50" : "bg-guardian-green/10 border-guardian-green/50"
            )}
            onClick={onClear}
            title="Click to clear AI Result"
            >
              <div className={cn(
                "p-1.5 rounded-md",
                aiResult.hazardDetected ? "bg-guardian-alert text-white" : "bg-guardian-green text-guardian-navy"
              )}>
                <Zap className="w-3 h-3 fill-current" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase leading-none mb-1">Cloud Analysis Result</div>
                <div className="text-xs font-bold leading-none">{aiResult.type || 'CLEAR'} | {(aiResult.confidence * 100).toFixed(0)}% CONF</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex -space-x-1">
          {/* Active Towers */}
          {[1, 2, 3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full bg-guardian-slate flex items-center justify-center border-2 border-guardian-navy text-[10px] font-mono text-guardian-green">
              T{i}
            </div>
          ))}
        </div>
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-guardian-alert rounded-full border-2 border-guardian-navy" />
        </button>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-guardian-slate to-guardian-navy border border-guardian-slate flex items-center justify-center overflow-hidden">
          <img src="https://i.pravatar.cc/150?u=steve" alt="User" />
        </div>
      </div>
    </header>
  );
}
