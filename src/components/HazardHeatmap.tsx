import React from 'react';
import { motion } from 'framer-motion';
import { Waves, AlertCircle, Wind, Thermometer, Map as MapIcon, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const activeHazards = [
  { id: 'RIP_01', type: 'Bathymetry Rip', severity: 'HIGH', location: 'Section B-North', velocity: '2.4 m/s', trend: 'STRENGTHENING' },
  { id: 'RIP_04', type: 'Transient Rip', severity: 'MEDIUM', location: 'Section C-South', velocity: '1.2 m/s', trend: 'DISSIPATING' },
  { id: 'WAVE_ANOMALY', type: 'Rogue Wave Risk', severity: 'CRITICAL', location: '500m Offshore', probability: '65%', timeToImpact: '8m' },
];

export function HazardHeatmap() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visual Heatmap Container */}
      <div className="lg:col-span-2 bg-guardian-slate/50 rounded-2xl border border-guardian-slate p-6 min-h-[400px] relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h3 className="text-sm font-semibold text-white">Spatial Hazard Analysis</h3>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Composite Layer: Bathymetry + Optical Flow</p>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-guardian-navy border border-guardian-slate rounded text-[10px] font-mono text-guardian-green">LAYER: FLOW_VECTORS</span>
            <span className="px-2 py-1 bg-guardian-navy border border-guardian-slate rounded text-[10px] font-mono text-slate-400">FPS: 60</span>
          </div>
        </div>

        {/* Simulated Heatmap */}
        <div className="absolute inset-0 m-6 mb-20 bg-guardian-navy/40 rounded-xl border border-white/5 overflow-hidden">
          <div className="w-full h-full relative data-grid-bg opacity-30" />
          
          {/* Heatmap Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-1/4 left-1/3 w-48 h-48 bg-guardian-orange/40 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-guardian-alert/30 rounded-full blur-3xl" 
          />
          
          {/* Flow Particles (Simplified) */}
          <div className="absolute inset-0">
             {Array.from({ length: 40 }).map((_, i) => (
               <motion.div 
                 key={i}
                 initial={{ 
                   x: Math.random() * 100 + "%", 
                   y: Math.random() * 100 + "%", 
                   opacity: 0 
                 }}
                 animate={{ 
                   y: "-=100", 
                   opacity: [0, 0.5, 0] 
                 }}
                 transition={{ 
                   repeat: Infinity, 
                   duration: Math.random() * 2 + 1, 
                   delay: Math.random() * 5 
                 }}
                 className="absolute w-0.5 h-4 bg-guardian-green/30 rounded-full"
               />
             ))}
          </div>

          {/* Coordinate Marks */}
          <div className="absolute inset-0 flex justify-between p-2 pointer-events-none">
             <div className="flex flex-col justify-between text-[8px] font-mono text-slate-600">
                <span>90°</span><span>45°</span><span>0°</span>
             </div>
             <div className="flex items-end gap-12 text-[8px] font-mono text-slate-600">
                <span>SEC_A</span><span>SEC_B</span><span>SEC_C</span>
             </div>
          </div>
        </div>

        {/* Hazard Legend */}
        <div className="absolute bottom-6 left-6 right-6 flex gap-4">
           <LegendItem color="bg-guardian-alert" label="CRITICAL_SURF" />
           <LegendItem color="bg-guardian-orange" label="RIP_CONCENTRATION" />
           <LegendItem color="bg-guardian-green" label="SAFE_CHANNEL" />
        </div>
      </div>

      {/* Hazard List */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-2">Active Notifications</h3>
        {activeHazards.map((hazard) => (
          <div key={hazard.id} className="bg-guardian-slate/50 p-4 rounded-xl border border-guardian-slate group hover:border-guardian-orange/40 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className={cn(
                  "w-4 h-4",
                  hazard.severity === 'CRITICAL' ? "text-guardian-alert" : "text-guardian-orange"
                )} />
                <span className="text-xs font-bold text-white">{hazard.id}</span>
              </div>
              <span className={cn(
                "text-[9px] font-bold px-1.5 py-0.5 rounded",
                hazard.severity === 'CRITICAL' ? "bg-guardian-alert/20 text-guardian-alert" : "bg-guardian-orange/20 text-guardian-orange"
              )}>
                {hazard.severity}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium mb-1">{hazard.type} - {hazard.location}</div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
               <span>{hazard.velocity || hazard.probability + ' Prob'}</span>
               <div className="flex items-center gap-1">
                 <ChevronRight className="w-3 h-3 text-guardian-green" />
                 <span className="text-guardian-green">{hazard.trend || 'ETA: ' + hazard.timeToImpact}</span>
               </div>
            </div>
          </div>
        ))}
        
        <div className="p-6 bg-guardian-navy border border-dashed border-guardian-slate rounded-xl text-center">
           <Wind className="w-6 h-6 text-slate-600 mx-auto mb-2" />
           <p className="text-[10px] text-slate-500 font-mono italic">Spectral model suggests transient growth in Sector D due to tidal shift in 45m.</p>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2 bg-guardian-navy/60 px-2 py-1 rounded-md border border-white/5">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">{label}</span>
    </div>
  );
}
