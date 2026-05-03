import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, MapPin, Navigation, Wifi, Database, Zap, X } from 'lucide-react';
import { cn } from '../lib/utils';

const assets = [
  { id: 'LR_01', type: 'Life Ring', status: 'READY', battery: '98%', signal: 'STRONG' },
  { id: 'LR_02', type: 'Life Ring', status: 'DEPLO_STANDBY', battery: '92%', signal: 'STRONG' },
  { id: 'RB_07', type: 'Rescue Board', status: 'ACTIVE', battery: '85%', signal: 'MED', coord: '34.0195, -118.4912' },
  { id: 'RB_12', type: 'Rescue Board', status: 'CHARGING', battery: '22%', signal: 'OFFLINE' },
];

export function RescueDeployment() {
  const [showGlobalMap, setShowGlobalMap] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-guardian-slate/50 rounded-2xl border border-guardian-slate p-6 overflow-hidden relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Rescue Coordination Center</h3>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Real-time Asset Tracking</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setShowLogs(true)}
              className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 py-1.5 bg-guardian-navy border border-guardian-slate rounded-lg text-[10px] font-bold text-slate-300 hover:bg-guardian-slate transition-colors"
            >
              <Database className="w-3 h-3" /> LOGS
            </button>
            <button 
              onClick={() => setShowGlobalMap(true)}
              className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-3 py-1.5 bg-guardian-orange rounded-lg text-[10px] font-bold text-white hover:brightness-110 transition-all shadow-lg shadow-guardian-orange/20"
            >
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
                  <button 
                    onClick={() => alert("Abort command sent to RB_07. Awaiting confirmation.")}
                    className="text-[10px] font-bold text-guardian-orange hover:underline"
                  >
                    ABORT_CMD
                  </button>
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
                 <motion.div 
                   key={i} 
                   animate={{ opacity: [0.3, 1, 0.3] }} 
                   transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }} 
                   className={cn("flex-1 rounded-full", i < 8 ? "bg-guardian-green" : "bg-guardian-slate")} 
                 />
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

      <AnimatePresence>
        {showGlobalMap && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-guardian-navy/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl h-[80vh] bg-guardian-slate border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-display font-bold text-white flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-guardian-orange" />
                    Global Maritime View
                  </h2>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Live Satellite + Oceanographic Synthesis</p>
                </div>
                <button 
                  onClick={() => setShowGlobalMap(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 relative bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1544208062-359255ea4918?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-50 grayscale"
                  alt="Global Map"
                />
                
                <div className="absolute inset-0 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full data-grid-bg opacity-20" />
                  <MapMarker x="40%" y="30%" label="RB_07" type="asset" />
                  <MapMarker x="60%" y="70%" label="TOWER_04" type="station" />
                  <MapMarker x="50%" y="50%" label="CRITICAL_RIP" type="hazard" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showLogs && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-guardian-navy/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg bg-guardian-slate border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-white uppercase tracking-wider">Mission Command Logs</h3>
                <button onClick={() => setShowLogs(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                <LogLine time="10:45:22" text="S_02 Distress Verification: CONFIRMED" type="danger" />
                <LogLine time="10:44:10" text="RB_07 Autonomous Pathing: IN_PROGRESS" type="info" />
                <LogLine time="10:42:05" text="Haptic Snap pushed to TOWER_04" type="warning" />
                <LogLine time="10:30:00" text="System Heartbeat: OPTIMAL" type="info" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MapMarker({ x, y, label, type }: { x: string, y: string, label: string, type: 'asset' | 'hazard' | 'station' }) {
  const colors = { asset: 'bg-guardian-green', hazard: 'bg-guardian-alert', station: 'bg-guardian-orange' };
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ left: x, top: y }} className="absolute flex flex-col items-center gap-1">
      <div className={cn("w-3 h-3 rounded-full border-2 border-white shadow-lg animate-pulse", colors[type])} />
      <span className="text-[8px] font-mono text-white bg-black/60 px-1 rounded">{label}</span>
    </motion.div>
  );
}

function LogLine({ time, text, type }: { time: string, text: string, type: 'danger' | 'warning' | 'info' }) {
  const colors = { danger: 'text-guardian-alert', warning: 'text-guardian-orange', info: 'text-guardian-green' };
  return (
    <div className="flex gap-4 border-b border-white/5 pb-2 text-[10px] font-mono">
      <span className="text-slate-500 shrink-0">{time}</span>
      <span className={cn("flex-1", colors[type])}>{text}</span>
    </div>
  );
}

