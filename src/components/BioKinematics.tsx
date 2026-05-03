import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, User, Eye, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const skeletalData = [
  { id: 'S_01', status: 'STABLE', activity: 'Treading Water', submersion: '0s', vitals: 'NORMAL' },
  { id: 'S_02', status: 'DISTRESS', activity: 'IDR (Ladder Climb)', submersion: '4s', vitals: 'ELEVATED' },
  { id: 'S_03', status: 'MONITOR', activity: 'Back Water Mill', submersion: '12s', vitals: 'WARNING' },
];

export function BioKinematics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Skeletal Vision Simulation */}
      <div className="bg-black/40 rounded-2xl border border-guardian-slate p-6 min-h-[350px] relative overflow-hidden group">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Pose Estimation Stream</h3>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Detection Engine: MediaPipe + MS-YOLO_v8</p>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-guardian-green/10 text-guardian-green rounded text-[10px] font-mono">TRACKING: 03</span>
          </div>
        </div>

        {/* Skeletal Visual Overlay */}
        <div className="relative aspect-video bg-guardian-navy/40 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" 
             className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
             alt="Swim Area"
           />
           <div className="scanline" />
           
           {/* Skeleton simulation using vector lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Person 1 - Treading */}
              <motion.g animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                 <circle cx="30" cy="40" r="2" fill="#00FF9D" />
                 <line x1="30" y1="42" x2="30" y2="55" stroke="#00FF9D" strokeWidth="1" />
                 <line x1="30" y1="55" x2="25" y2="65" stroke="#00FF9D" strokeWidth="1" />
                 <line x1="30" y1="55" x2="35" y2="65" stroke="#00FF9D" strokeWidth="1" />
                 <line x1="30" y1="45" x2="22" y2="48" stroke="#00FF9D" strokeWidth="1" />
                 <line x1="30" y1="45" x2="38" y2="48" stroke="#00FF9D" strokeWidth="1" />
              </motion.g>

              {/* Person 2 - Distress (Aggressive Motion) */}
              <motion.g 
                animate={{ 
                  y: [0, -4, 0],
                  rotate: [0, 5, -5, 0] 
                }} 
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="origin-center"
              >
                 <circle cx="70" cy="45" r="2" fill="#F21B3F" />
                 <line x1="70" y1="47" x2="70" y2="60" stroke="#F21B3F" strokeWidth="1.5" />
                 <motion.line 
                   animate={{ rotate: [0, 90, 0] }} 
                   x1="70" y1="50" x2="80" y2="40" 
                   stroke="#F21B3F" strokeWidth="1.5" 
                   className="origin-[70px_50px]"
                 />
                 <motion.line 
                   animate={{ rotate: [0, -90, 0] }} 
                   x1="70" y1="50" x2="60" y2="40" 
                   stroke="#F21B3F" strokeWidth="1.5" 
                   className="origin-[70px_50px]"
                 />
              </motion.g>
           </svg>

           {/* Label Overlays */}
           <div className="absolute top-[35%] left-[25%] text-[8px] font-mono text-guardian-green bg-black/60 px-1">ID: S_01 | TREADING</div>
           <div className="absolute top-[40%] left-[65%] text-[8px] font-mono text-guardian-alert bg-black/60 px-1 border border-guardian-alert">ID: S_02 | IDR_DETECTED</div>
        </div>
      </div>

      {/* Bio Metrics List */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-2">Kinematic Signatures</h3>
        {skeletalData.map((data) => (
          <div key={data.id} className="bg-guardian-slate/50 p-4 rounded-xl border border-guardian-slate flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-lg",
                data.status === 'DISTRESS' ? "bg-guardian-alert/20 text-guardian-alert" :
                data.status === 'MONITOR' ? "bg-guardian-orange/20 text-guardian-orange" :
                "bg-guardian-green/10 text-guardian-green"
              )}>
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-slate-200">{data.id}</span>
                  <span className={cn(
                    "text-[8px] font-bold px-1 rounded uppercase",
                    data.status === 'DISTRESS' ? "bg-guardian-alert/10 text-guardian-alert" : "bg-guardian-green/10 text-guardian-green"
                  )}>{data.status}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">{data.activity}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                 <Clock className="w-3 h-3 text-slate-500" />
                 <span className={cn(
                   "text-xs font-mono font-bold",
                   parseInt(data.submersion) > 10 ? "text-guardian-alert animate-pulse" : "text-white"
                 )}>{data.submersion}</span>
              </div>
              <div className="text-[9px] font-mono text-slate-600 uppercase">Submersion Timer</div>
            </div>
          </div>
        ))}

        <div className="p-4 bg-guardian-navy border border-guardian-slate rounded-xl">
           <div className="flex items-center gap-3 mb-3">
              <Shield className="w-4 h-4 text-guardian-green" />
              <span className="text-xs font-bold text-white uppercase tracking-tight">Active Sentinel Protocol</span>
           </div>
           <p className="text-[11px] text-slate-400 leading-relaxed italic">
             Monitoring "Solo" wanderers in Sector B4. 02 children identified as unattended near high-turban rip zone. Haptic alert sent to Lifeguard Delta.
           </p>
        </div>
      </div>
    </div>
  );
}
