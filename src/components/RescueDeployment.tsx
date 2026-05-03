import React from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, MapPin, Navigation, Wifi, Database, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const assets = [
  { id: 'LR_01', type: 'Life Ring', status: 'READY', battery: '98%', signal: 'STRONG' },
  { id: 'LR_02', type: 'Life Ring', status: 'DEPLO_STANDBY', battery: '92%', signal: 'STRONG' },
  { id: 'RB_07', type: 'Rescue Board', status: 'ACTIVE', battery: '85%', signal: 'MED', coord: '34.0195, -118.4912' },
  { id: 'RB_12', type: 'Rescue Board', status: 'CHARGING', battery: '22%', signal: 'OFFLINE' },
];

export function RescueDeployment() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-guardian-slate/50 rounded-2xl border border-guardian-slate p-6 overflow-hidden relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Rescue Coordination Center</h3>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Real-time Asset Tracking</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-guardian-navy border border-guardian-slate rounded-lg text-[10px] font-bold text-slate-300">
              <Database className="w-3 h-3" /> LOGS
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-guardian-orange rounded-lg text-[10px] font-bold text-white">
              <Navigation className="w-3 h-3" /> GLOBAL VIEW
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset.id} className="group p-4 bg-guardian-navy/50 border border-guardian-slate rounded-xl flex items-center justify-between transition-all hover:border-guardian-green/30">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  asset.status === 'ACTIVE' ? "bg-guardian-orange/20 text-guardian-orange" : 
                  asset.status === 'READY' ? "bg-guardian-green/20 text-guardian-green" :
                  "bg-slate-800 text-slate-500"
                )}>
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-slate-200">{asset.id}</span>
                    <span className="text-[10px] font-mono text-slate-500">[{asset.type}]</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-guardian-green" />
                      <span className="text-[10px] font-mono text-slate-400">{asset.battery}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] font-mono text-slate-400">{asset.signal}</span>
                    </div>
                    {asset.coord && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-guardian-orange" />
                        <span className="text-[10px] font-mono text-slate-400">{asset.coord}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[9px] font-bold tracking-tighter uppercase",
                  asset.status === 'READY' ? "bg-guardian-green/10 text-guardian-green" :
                  asset.status === 'ACTIVE' ? "bg-guardian-orange/10 text-guardian-orange animate-pulse" :
                  "bg-slate-800 text-slate-500"
                )}>
                  {asset.status}
                </span>
                {asset.status === 'ACTIVE' && (
                  <button className="text-[10px] font-bold text-guardian-orange hover:underline">ABORT_CMD</button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Visual Map Ornament */}
        <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 border border-guardian-slate/20 rounded-full flex items-center justify-center -z-10 bg-radial-gradient">
           <div className="w-48 h-48 border border-guardian-slate/10 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 border border-guardian-slate/5 rounded-full" />
           </div>
        </div>
      </div>

        <div className="bg-guardian-slate/50 rounded-2xl border border-guardian-slate p-6">
          <h3 className="text-xs font-mono text-slate-500 uppercase mb-4 tracking-widest">Autonomous Logic</h3>
          <div className="space-y-6">
            <div className="p-4 bg-guardian-navy border border-guardian-slate rounded-xl">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[11px] font-bold text-slate-300">MediaPipe Navigation</span>
                 <div className="p-1 px-2 bg-guardian-green/10 text-guardian-green rounded text-[9px] font-mono">OPTIMAL</div>
               </div>
               <p className="text-[11px] text-slate-500 mb-4">Rescue Board RB_07 navigating via MediaPipe Pose Estimation to victim GPS coordinates. Current ETA: 45s.</p>
               <div className="flex gap-1 h-1">
                 {Array.from({ length: 12 }).map((_, i) => (
                   <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }} className={cn("flex-1 rounded-full", i < 8 ? "bg-guardian-green" : "bg-guardian-slate")} />
                 ))}
               </div>
            </div>

            <div className="p-4 bg-guardian-navy border border-guardian-slate rounded-xl">
               <h4 className="text-[10px] font-mono text-slate-400 uppercase mb-3 border-b border-guardian-slate pb-2">Recent Mission Logs</h4>
               <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px]">
                     <span className="text-slate-300">INCIDENT_392 (RIP)</span>
                     <span className="text-guardian-green">RESOLVED</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                     <span className="text-slate-300">IDR_DETECTED_04</span>
                     <span className="text-guardian-green">RECOVERED</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px]">
                     <span className="text-slate-300">ROGUE_WAVE_ALPHA</span>
                     <span className="text-slate-500">MONITORED</span>
                  </div>
               </div>
            </div>

            <div className="p-4 bg-guardian-navy border border-guardian-slate rounded-xl">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[11px] font-bold text-slate-300">Haptic Snapshot</span>
                 <span className="text-[9px] font-mono text-slate-500 uppercase italic">QUEUE: 01</span>
               </div>
               <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full border-2 border-guardian-navy bg-guardian-slate overflow-hidden">
                   <img src="https://i.pravatar.cc/150?u=1" alt="avatar" />
                 </div>
                 <div className="w-8 h-8 rounded-full border-2 border-guardian-navy bg-guardian-slate flex items-center justify-center text-[10px] font-mono">
                   +3
                 </div>
               </div>
               <p className="text-[10px] text-slate-500 mt-3 font-mono">PUSHED_TO: BEACH_UNIT_NORTH, TOWER_04</p>
            </div>
          </div>
        </div>

    </div>
  );
}
