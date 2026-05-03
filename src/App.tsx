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
import { DetectionResult } from './services/guardianAI';
import { AlertCircle, Terminal, Activity } from 'lucide-react';

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
                className="max-w-7xl mx-auto"
              >
                <div className="p-12 bg-guardian-slate/20 rounded-3xl border border-dashed border-guardian-slate text-center">
                  <Activity className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold text-slate-500 mb-2">Hazard Heatmap Protocol</h2>
                  <p className="text-slate-600 font-mono text-sm uppercase">Simulating Bathymetry-controlled vs Transient Rips...</p>
                </div>
              </motion.div>
            )}
            
            {/* Other tabs can be similarly implemented */}
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
