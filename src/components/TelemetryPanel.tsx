import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Wind, Waves, Thermometer, Droplets } from 'lucide-react';
import { calculateSWH } from '../lib/waveMath';
import { cn } from '../lib/utils';

const data = Array.from({ length: 24 }, (_, i) => {
  const wind = 5 + Math.sin(i / 3) * 3 + Math.random() * 2;
  return {
    time: `${i}:00`,
    windSpeed: parseFloat(wind.toFixed(2)),
    swh: parseFloat(calculateSWH(wind).toFixed(2)),
  };
});

export function TelemetryPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
      <div className="bg-guardian-slate/50 p-4 md:p-6 rounded-2xl border border-guardian-slate flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Wind className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Environmental Scaling</h3>
              <p className="text-[10px] font-mono text-slate-400 uppercase">SWH = a·U^b</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-lg md:text-xl font-display font-bold text-guardian-green">14.2 m/s</div>
            <div className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase">PEAK_GUST</div>
          </div>
        </div>

        <div className="flex-1 min-h-[150px] md:min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF9D" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00FF9D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" vertical={false} />
              <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0A1128', border: '1px solid #1C2541', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="swh" stroke="#00FF9D" fillOpacity={1} fill="url(#colorWave)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-guardian-slate/50 p-6 rounded-2xl border border-guardian-slate">
          <h3 className="text-xs font-mono text-slate-500 uppercase mb-4 tracking-widest">Real-time Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              icon={Waves} 
              label="Wave Period" 
              value="8.2s" 
              trend="+0.4" 
              color="text-blue-400" 
            />
            <MetricCard 
              icon={Thermometer} 
              label="Water Temp" 
              value="18.5°C" 
              trend="-0.2" 
              color="text-emerald-400" 
            />
            <MetricCard 
              icon={Droplets} 
              label="Turbidity" 
              value="4.1 NTU" 
              trend="+1.2" 
              color="text-amber-400" 
            />
            <MetricCard 
              icon={Wind} 
              label="Barometer" 
              value="1013 hPa" 
              trend="STABLE" 
              color="text-purple-400" 
            />
          </div>
        </div>

        <div className="bg-guardian-alert/5 p-6 rounded-2xl border border-guardian-alert/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono text-guardian-alert uppercase tracking-widest">Rogue Wave Alert</h3>
            <span className="px-2 py-0.5 bg-guardian-alert/10 text-guardian-alert text-[10px] font-bold rounded">RISK: MEDIUM</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
            Combination of constructive interference and shoaling detected 500m offshore. Potential for 4m+ breaking wave within 12-minute window.
          </p>
          <div className="h-1 w-full bg-guardian-slate rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              className="h-full bg-guardian-alert"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, trend, color }: any) {
  return (
    <div className="p-4 bg-guardian-navy border border-guardian-slate rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <Icon className={cn("w-4 h-4", color)} />
        <span className={cn("text-[8px] font-bold px-1.5 py-0.5 rounded", 
          trend === 'STABLE' ? "bg-slate-800 text-slate-400" : "bg-guardian-slate text-guardian-green")}>
          {trend}
        </span>
      </div>
      <div className="text-lg font-display font-bold text-white">{value}</div>
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-tight">{label}</div>
    </div>
  );
}
