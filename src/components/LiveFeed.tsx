import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, RefreshCw, AlertTriangle, User, Search, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { verifyHazardWithAI, DetectionResult } from '../services/guardianAI.ts';

interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  type: 'swimmer' | 'hazard' | 'vulnerable';
  distress?: boolean;
}

export function LiveFeed({ onVerify }: { onVerify: (res: DetectionResult) => void }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [detections, setDetections] = useState<BoundingBox[]>([
    { id: '1', x: 200, y: 300, width: 40, height: 60, label: 'Swimmer_01', confidence: 0.98, type: 'swimmer' },
    { id: '2', x: 450, y: 320, width: 35, height: 50, label: 'Swimmer_02', confidence: 0.94, type: 'swimmer', distress: true },
    { id: '3', x: 400, y: 150, width: 120, height: 180, label: 'RIP_CURRENT_ZONE', confidence: 0.88, type: 'hazard' },
    { id: '4', x: 700, y: 400, width: 30, height: 45, label: 'CHILD_UNATTENDED', confidence: 0.91, type: 'vulnerable' },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation of moving swimmers
  useEffect(() => {
    const interval = setInterval(() => {
      setDetections(prev => prev.map(d => {
        if (d.type === 'swimmer') {
          return {
            ...d,
            x: d.x + (Math.random() - 0.5) * 4,
            y: d.y + (Math.random() - 0.5) * 2
          };
        }
        return d;
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleCloudVerify = async () => {
    setIsVerifying(true);
    // In a real app, we'd capture the canvas. Here we simulate with a placeholder.
    // For the demo, I'll use a pre-determined prompt or just trigger the AI service.
    // Since I don't have a real image stream, I'll use a fallback.
    const mockImage = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="; // Tiny pixel
    
    // Actually, let's just simulate the result for the verification UI
    setTimeout(async () => {
       setIsVerifying(false);
       onVerify({
         hazardDetected: true,
         type: 'swimmer_distress',
         confidence: 0.99,
         description: "High-precision verification of IDR signature: Swimmer_02 exhibiting 'Climbing Ladder' motion.",
         recommendation: "Deploy Rescue Board 07 immediately."
       });
    }, 2000);
  };

  return (
    <section className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-guardian-slate group shadow-2xl">
      {/* Background Image - Simulated Feed */}
      <img 
        src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200" 
        className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[10s]"
        alt="Live Feed"
      />
      
      <div className="scanline" />

      {/* Detections Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {detections.map((d) => (
          <motion.div
            key={d.id}
            initial={false}
            animate={{ left: d.x, top: d.y, width: d.width, height: d.height }}
            className={cn(
              "absolute border-2 flex flex-col items-start gap-1 p-1",
              d.distress ? "border-guardian-alert shadow-[0_0_10px_#F21B3F]" : 
              d.type === 'hazard' ? "border-guardian-orange bg-guardian-orange/10" :
              d.type === 'vulnerable' ? "border-yellow-400" : "border-guardian-green"
            )}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={cn(
              "absolute -top-6 left-[-2px] px-2 py-0.5 text-[9px] font-mono whitespace-nowrap",
              d.distress ? "bg-guardian-alert text-white" : 
              d.type === 'hazard' ? "bg-guardian-orange text-white" :
              "bg-guardian-green text-guardian-navy"
            )}>
              {d.label} ({(d.confidence * 100).toFixed(0)}%)
            </div>
            
            {d.distress && (
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -right-6 top-0"
              >
                <AlertTriangle className="w-5 h-5 text-guardian-alert" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Control Overlay */}
      <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex flex-col md:flex-row justify-between items-start gap-2">
        <div className="flex gap-1 md:gap-2">
          <div className="px-2 md:px-3 py-1 md:py-1.5 bg-black/60 backdrop-blur-md rounded-md border border-guardian-slate flex items-center gap-1.5 md:gap-2">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-guardian-alert animate-pulse" />
            <span className="text-[8px] md:text-[10px] font-mono tracking-widest text-slate-300 uppercase">Live: CH_04N</span>
          </div>
          <div className="px-2 md:px-3 py-1 md:py-1.5 bg-black/60 backdrop-blur-md rounded-md border border-guardian-slate flex items-center gap-1.5 md:gap-2">
            <Search className="w-2.5 md:w-3 h-2.5 md:h-3 text-guardian-green" />
            <span className="text-[8px] md:text-[10px] font-mono tracking-widest text-slate-300 uppercase">ms-yolo_v8</span>
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button 
            disabled={isVerifying}
            onClick={handleCloudVerify}
            className={cn(
              "flex-1 md:flex-initial px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-guardian-orange to-red-600 rounded-lg text-[9px] md:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50",
              isVerifying && "animate-pulse"
            )}
          >
            {isVerifying ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3 fill-current" />}
            <span className="hidden sm:inline">{isVerifying ? 'Cloud Verifying...' : 'Cloud Verification'}</span>
            <span className="sm:hidden">{isVerifying ? 'VERIFYING...' : 'CLOUD VERIFY'}</span>
          </button>
          <button className="p-1.5 md:p-2 bg-black/60 backdrop-blur-md rounded-lg border border-guardian-slate text-slate-300 hover:text-white">
            <Maximize2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Overlay */}
      <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 flex justify-between items-end gap-2">
        <div className="flex flex-col gap-0 md:gap-1">
          <div className="text-xl md:text-[32px] font-display font-medium text-white leading-none">
            10:45<span className="hidden md:inline">:22</span><span className="text-[10px] md:text-sm opacity-50 ml-1">UTC</span>
          </div>
          <div className="text-[7px] md:text-[10px] font-mono text-slate-400">COORD: 34.0195, -118.4912</div>
        </div>

        <div className="flex gap-3 md:gap-6 items-end bg-black/40 backdrop-blur-sm p-1.5 md:p-3 rounded-lg md:rounded-xl border border-white/5">
          <div className="flex flex-col items-center">
            <span className="text-[7px] md:text-[9px] font-mono text-slate-500 uppercase mb-0.5 md:mb-1">Wind</span>
            <span className="text-xs md:text-sm font-display font-bold text-guardian-green">12.5 <span className="text-[8px] md:text-[10px] font-normal">m/s</span></span>
          </div>
          <div className="flex flex-col items-center border-l border-white/10 pl-3 md:pl-6">
            <span className="text-[7px] md:text-[9px] font-mono text-slate-500 uppercase mb-0.5 md:mb-1">SWH</span>
            <span className="text-xs md:text-sm font-display font-bold text-guardian-orange">2.34<span className="hidden md:inline">m</span></span>
          </div>
          <div className="hidden sm:flex flex-col items-center border-l border-white/10 pl-6">
            <span className="text-[9px] font-mono text-slate-500 uppercase mb-1">Obj</span>
            <span className="text-sm font-display font-bold text-white">04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
