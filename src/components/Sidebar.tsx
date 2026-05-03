import React from 'react';
import { Shield, Activity, Waves, Bell, Settings, LifeBuoy, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: Activity, label: 'Overview', id: 'overview' },
  { icon: Waves, label: 'Hazards', id: 'hazards' },
  { icon: Shield, label: 'Bio', id: 'bio' },
  { icon: LifeBuoy, label: 'Rescue', id: 'rescue' },
];

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-guardian-slate bg-guardian-navy h-screen flex-col z-20">
        <div className="p-6 border-b border-guardian-slate">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-guardian-orange rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg tracking-tight">SENTINEL</h1>
              <p className="text-[10px] font-mono text-guardian-green uppercase tracking-widest">Sea Guardian v4.2</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group text-sm font-medium w-full text-left",
                activeTab === item.id 
                  ? "bg-guardian-slate text-guardian-green shadow-[0_0_15px_rgba(0,255,157,0.1)]" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-guardian-slate/50"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-guardian-green" : "text-slate-500 group-hover:text-slate-300")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-guardian-slate">
          <div className="bg-guardian-slate/30 rounded-xl p-4 border border-guardian-slate">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase">System Status</span>
              <span className="w-2 h-2 rounded-full bg-guardian-green animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">EDGE_YOLO_v8n</span>
                <span className="text-guardian-green font-mono">ACTIVE</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">CLOUD_RT_DETR</span>
                <span className="text-guardian-green font-mono">STANDBY</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-guardian-slate/50">
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter text-center">
                Developed by <span className="text-slate-300">Steven</span> for <span className="text-slate-300">Vincent</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-guardian-navy/95 backdrop-blur-lg border-t border-guardian-slate flex items-center justify-around px-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
              activeTab === item.id ? "text-guardian-green" : "text-slate-500"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
