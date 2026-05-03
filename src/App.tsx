/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LiveFeed } from './components/LiveFeed';
import { TelemetryPanel } from './components/TelemetryPanel';
import { RescueDeployment } from './components/RescueDeployment';
import { HazardHeatmap } from './components/HazardHeatmap';
import { BioKinematics } from './components/BioKinematics';
import { DetectionResult } from './services/guardianAI';
import { AlertCircle, Terminal, Activity, Waves, Shield, LifeBuoy } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiResult, setAiResult] = useState<DetectionResult | null>(null);

  const handleAiVerify = (result: DetectionResult) => {
    setAiResult(result);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-guardian-navy overflow-hidden font-sans selection:bg-guardian-green selection:text-guardian-navy">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col min-w-0 bg-guardian-navy data-grid-bg relative overflow-hidden">
        <Header aiResult={aiResult} onClear={() => setAiResult(null)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 pb-24 lg:pb-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 md:space-y-8 max-w-7xl mx-auto"
              >
                {/* Hero Section: Live Feed */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                  <div className="xl:col-span-2">
                    <LiveFeed onVerify={handleAiVerify} />
                  </div>
                  
                  {/* Quick Status / AI Insight */}
                  <div className="space-y-6">
                    <div className="bg-guardian-slate/50 p-4 md:p-6 rounded-2xl border border-guardian-slate h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Terminal className="w-4 h-4 text-guardian-green" />
                          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest">AI Detection Log</h3>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <LogItem type="danger" text="IDR_SIGNATURE detected in Sector_B4" time="10:44" />
                          <LogItem type="warning" text="Rip current velocity increasing" time="10:42" />
                          <LogItem type="info" text="Rescue Board RB_07 mission started" time="10:40" />
                          <LogItem type="info" text="Environmental scale re-calibrated" time="10:35" />
                          <LogItem type="danger" text="Submersion alert: Swimmer S_03" time="10:32" />
                        </div>
                      </div>

                      {aiResult && (
                        <div className="mt-6 md:mt-8 p-4 bg-guardian-orange/10 border border-guardian-orange/30 rounded-xl animate-in zoom-in-95 duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-guardian-orange" />
                            <span className="text-[10px] font-bold text-guardian-orange uppercase tracking-wider">Cloud Verification Detail</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed italic">
                            "{aiResult.description}"
                          </p>
                          <div className="mt-3 pt-3 border-t border-guardian-orange/20">
                            <div className="text-[9px] font-mono text-slate-500 mb-1 uppercase">Recommended Action</div>
                            <div className="text-xs font-bold text-white uppercase">{aiResult.recommendation}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Telemetry & Charts */}
                <TelemetryPanel />

                {/* Bottom Section: Rescue Assets */}
                <RescueDeployment />
              </motion.div>
            )}

            {activeTab === 'hazards' && (
              <motion.div
                key="hazards"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="max-w-7xl mx-auto space-y-8"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                      <Waves className="w-6 h-6 text-guardian-orange" />
                      Hazard Detection Grid
                    </h2>
                    <p className="text-slate-500 font-mono text-sm uppercase tracking-tight">Vulnerability Map • Tidal Overlay: SEC_A-D</p>
                  </div>
                  <div className="flex gap-2">
                     <span className="px-3 py-1 bg-guardian-slate border border-guardian-slate rounded-lg text-xs font-bold text-guardian-orange">ACTIVE_DANGER: 03</span>
                  </div>
                </div>
                
                <HazardHeatmap />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                   <div className="bg-guardian-slate/30 p-6 rounded-2xl border border-guardian-slate">
                      <h4 className="text-xs font-mono text-slate-500 uppercase mb-4">Risk Matrix</h4>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">Offshore Velocity Avg</span>
                            <span className="text-white font-mono">1.8 m/s</span>
                         </div>
                         <div className="w-full bg-guardian-navy h-1.5 rounded-full overflow-hidden">
                            <div className="bg-guardian-orange h-full w-[45%]" />
                         </div>
                         <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">Sediment Plume Density</span>
                            <span className="text-white font-mono">HIGH</span>
                         </div>
                      </div>
                   </div>
                   <div className="bg-guardian-alert/5 p-6 rounded-2xl border border-guardian-alert/30">
                      <h4 className="text-xs font-mono text-guardian-alert uppercase mb-4">Urgent Advisory</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        High-tide rip current formation predicted in Sector C within 15 minutes. Recommend mass evacuation of casual swimmers from marked corridors.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bio' && (
              <motion.div
                key="bio"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-7xl mx-auto space-y-8"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                     <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                       <Shield className="w-6 h-6 text-guardian-green" />
                       Bio-Kinematic CLEARRINGHOUSE
                     </h2>
                     <p className="text-slate-500 font-mono text-sm uppercase tracking-tight">Human Distress Signature Analysis • IDR_SIG_v4</p>
                   </div>
                   <div className="flex gap-2">
                      <span className="px-3 py-1 bg-guardian-alert/10 border border-guardian-alert text-xs font-bold text-guardian-alert animate-pulse">DISTRESS_WATCH: ON</span>
                   </div>
                </div>

                <BioKinematics />

                <div className="p-8 bg-guardian-slate/20 rounded-3xl border border-guardian-slate mt-8">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center">
                         <div className="text-3xl font-display font-bold text-guardian-green mb-1">0.12s</div>
                         <div className="text-[10px] font-mono text-slate-500 uppercase">Detection Latency (Edge)</div>
                      </div>
                      <div className="text-center border-x border-guardian-slate">
                         <div className="text-3xl font-display font-bold text-white mb-1">99.4%</div>
                         <div className="text-[10px] font-mono text-slate-500 uppercase">Pose Accuracy Index</div>
                      </div>
                      <div className="text-center">
                         <div className="text-3xl font-display font-bold text-guardian-orange mb-1">0s</div>
                         <div className="text-[10px] font-mono text-slate-500 uppercase">False Positives (24h)</div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'rescue' && (
              <motion.div
                key="rescue"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="max-w-7xl mx-auto space-y-8"
              >
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                     <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                       <LifeBuoy className="w-6 h-6 text-guardian-orange" />
                       Autonomous Rescue Deployment
                     </h2>
                     <p className="text-slate-500 font-mono text-sm uppercase tracking-tight">Active Assets • GPS Lock: SEC_B4</p>
                   </div>
                </div>
                
                <RescueDeployment />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>


      {/* Global Alert Overlay (Fake) */}
      <AnimatePresence>
        {aiResult?.hazardDetected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none ring-8 ring-inset ring-guardian-alert/20 z-50 mix-blend-screen"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LogItem({ type, text, time }: { type: 'danger' | 'warning' | 'info', text: string, time: string }) {
  const colors = {
    danger: 'bg-guardian-alert',
    warning: 'bg-guardian-orange',
    info: 'bg-guardian-green'
  };

  return (
    <div className="flex gap-3 items-start group">
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${colors[type]} shadow-[0_0_8px_currentColor]`} />
      <div className="flex-1">
        <p className="text-[11px] text-slate-300 group-hover:text-white transition-colors">{text}</p>
        <p className="text-[9px] font-mono text-slate-500">{time} UTC</p>
      </div>
    </div>
  );
}
