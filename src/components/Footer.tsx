import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
              <span>Mausam (मौसम)</span>
              <span aria-hidden="true">·</span>
              <span className="font-normal text-slate-500">
                India Meteorological & Air Quality Portal
              </span>
            </div>
            <p className="mt-1 text-slate-500 max-w-xl text-balance">
              Grounding Indian meteorological forecasts with CPCB National Air Quality Index (NAQI) standards, IMD alert classifications, and high-resolution Open-Meteo surface atmospheric models.
            </p>
          </div>

          <div className="flex flex-col md:items-end text-xs text-slate-500 gap-1 font-mono">
            <div>All timestamps in Indian Standard Time (IST · UTC+5:30)</div>
            <div>CPCB NAQI 24-Hour Averaging Protocol</div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Mausam India. Built for Indian weather, monsoon & air monitoring.
          </div>
          <div className="flex items-center gap-4">
            <span>IMD Guidelines</span>
            <span aria-hidden="true">·</span>
            <span>CPCB Standards</span>
            <span aria-hidden="true">·</span>
            <span>WMO-Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
