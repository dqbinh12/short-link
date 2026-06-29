'use client';

import React from 'react';
import { Download, Upload, Palette, Layout, Zap, Shapes } from 'lucide-react';

const TEMPLATES = [
  { name: 'Classic',  fg: '#1a1a1a', bg: '#ffffff' },
  { name: 'Midnight', fg: '#e2e8f0', bg: '#0f172a' },
  { name: 'Ocean',    fg: '#0c4a6e', bg: '#bfdbfe' },
  { name: 'Forest',   fg: '#14532d', bg: '#d1fae5' },
  { name: 'Sunset',   fg: '#9a3412', bg: '#ffedd5' },
  { name: 'Violet',   fg: '#ede9fe', bg: '#4c1d95' },
  { name: 'Gold',     fg: '#78350f', bg: '#fef3c7' },
  { name: 'Slate',    fg: '#f1f5f9', bg: '#334155' },
];

const DOT_STYLES = [
  { value: 'square',        label: 'Square',     previewClass: 'rounded-none' },
  { value: 'dots',          label: 'Dots',       previewClass: 'rounded-full' },
  { value: 'rounded',       label: 'Rounded',    previewClass: 'rounded-sm' },
  { value: 'extra-rounded', label: 'Soft',       previewClass: 'rounded-md' },
  { value: 'classy',        label: 'Classy',     previewClass: 'rounded-none' },
  { value: 'classy-rounded',label: 'Classy+',    previewClass: 'rounded-sm' },
];

const CORNER_PRESETS = [
  { label: 'Classic',    sq: 'square',        dot: 'square', outerR: 'rounded-none', innerR: 'rounded-none' },
  { label: 'Sq+Dot',     sq: 'square',        dot: 'dot',    outerR: 'rounded-none', innerR: 'rounded-full' },
  { label: 'Rounded',    sq: 'extra-rounded', dot: 'square', outerR: 'rounded-full', innerR: 'rounded-none' },
  { label: 'Soft',       sq: 'extra-rounded', dot: 'dot',    outerR: 'rounded-full', innerR: 'rounded-full' },
  { label: 'Circle',     sq: 'dot',           dot: 'dot',    outerR: 'rounded-full', innerR: 'rounded-full' },
  { label: 'Circle+Sq',  sq: 'dot',           dot: 'square', outerR: 'rounded-full', innerR: 'rounded-none' },
];

const ERROR_LEVELS = [
  { value: 'L', label: 'L', desc: '7%' },
  { value: 'M', label: 'M', desc: '15%' },
  { value: 'Q', label: 'Q', desc: '25%' },
  { value: 'H', label: 'H', desc: '30%' },
];

const QRControls = ({
  fgColor, setFgColor,
  bgColor, setBgColor,
  size, setSize,
  margin, setMargin,
  level, setLevel,
  dotStyle, setDotStyle,
  cornerSquareStyle, setCornerSquareStyle,
  cornerDotStyle, setCornerDotStyle,
  handleLogoUpload,
  downloadQRCode,
}) => {
  const isActive = (t) => t.fg === fgColor && t.bg === bgColor;

  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-5 space-y-5 shadow-lg mt-6">

      {/* Templates */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">
          <Zap size={12} /> Templates
        </label>
        <div className="grid grid-cols-4 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => { setFgColor(t.fg); setBgColor(t.bg); }}
              title={t.name}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                isActive(t)
                  ? 'border-indigo-400 ring-2 ring-indigo-300/50 scale-105'
                  : 'border-white/50 hover:border-slate-300 hover:scale-105'
              }`}
              style={{ backgroundColor: t.bg }}
            >
              {/* Mini QR dots */}
              <div className="grid grid-cols-3 gap-[2px]">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-[1px]"
                    style={{ backgroundColor: [0,2,6,8,4].includes(i) ? t.fg : 'transparent' }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-semibold leading-none" style={{ color: t.fg }}>
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Shape Style */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">
          <Shapes size={12} /> Shape Style
        </label>

        {/* Dot style */}
        <p className="text-[10px] text-slate-400 mb-1.5 uppercase tracking-wide">Modules</p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {DOT_STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => setDotStyle(s.value)}
              className={`flex flex-col items-center gap-1.5 py-2 px-1 rounded-lg border transition-all ${
                dotStyle === s.value
                  ? 'bg-indigo-50 border-indigo-400 ring-1 ring-indigo-300/50'
                  : 'bg-white/60 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30'
              }`}
            >
              <div className="grid grid-cols-3 gap-[2px]">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${s.previewClass} ${
                      [0,2,6,8,4].includes(i) ? 'bg-slate-700' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-[9px] font-semibold ${dotStyle === s.value ? 'text-indigo-600' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Corner presets */}
        <p className="text-[10px] text-slate-400 mb-1.5 uppercase tracking-wide">Corners</p>
        <div className="grid grid-cols-3 gap-2">
          {CORNER_PRESETS.map((p) => {
            const active = cornerSquareStyle === p.sq && cornerDotStyle === p.dot;
            return (
              <button
                key={p.label}
                onClick={() => { setCornerSquareStyle(p.sq); setCornerDotStyle(p.dot); }}
                className={`flex flex-col items-center gap-1.5 py-2 px-1 rounded-lg border transition-all ${
                  active
                    ? 'bg-indigo-50 border-indigo-400 ring-1 ring-indigo-300/50'
                    : 'bg-white/60 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30'
                }`}
              >
                <div className={`w-7 h-7 border-[3px] border-slate-700 flex items-center justify-center ${p.outerR}`}>
                  <div className={`w-3 h-3 bg-slate-700 ${p.innerR}`} />
                </div>
                <span className={`text-[9px] font-semibold ${active ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Colors */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
          <Palette size={12} /> Custom Colors
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex items-center justify-between px-3 py-2 bg-white/70 border border-slate-200 rounded-lg group-hover:border-slate-300 transition-colors">
              <span className="text-xs text-slate-500">Foreground</span>
              <div className="w-5 h-5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: fgColor }} />
            </div>
          </div>
          <div className="relative group">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex items-center justify-between px-3 py-2 bg-white/70 border border-slate-200 rounded-lg group-hover:border-slate-300 transition-colors">
              <span className="text-xs text-slate-500">Background</span>
              <div className="w-5 h-5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: bgColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Error Correction */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
          <Zap size={12} /> Error Correction
        </label>
        <div className="grid grid-cols-4 gap-2">
          {ERROR_LEVELS.map((l) => (
            <button
              key={l.value}
              onClick={() => setLevel(l.value)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg border text-center transition-all ${
                level === l.value
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-white/60 border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <span className="text-xs font-bold">{l.label}</span>
              <span className={`text-[9px] ${level === l.value ? 'text-indigo-200' : 'text-slate-400'}`}>{l.desc}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5">Higher = more recoverable if damaged, but denser</p>
      </div>

      {/* Size & Margin */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
          <Layout size={12} /> Export Size
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="128"
            max="1024"
            step="64"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <span className="text-xs text-slate-400 w-16 text-right">{size}px</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            id="includeMargin"
            checked={margin}
            onChange={(e) => setMargin(e.target.checked)}
            className="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="includeMargin" className="text-xs text-slate-600 cursor-pointer select-none">Add Margin</label>
        </div>
      </div>

      {/* Logo */}
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
          <Upload size={12} /> Logo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="block w-full text-xs text-slate-500
            file:mr-3 file:py-1.5 file:px-3
            file:rounded-md file:border-0
            file:text-xs file:font-medium
            file:bg-indigo-50 file:text-indigo-600
            hover:file:bg-indigo-100
            cursor-pointer"
        />
      </div>

      {/* Downloads */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => downloadQRCode('png')}
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 text-white py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors text-xs font-medium shadow-md"
        >
          <Download size={14} /> PNG
        </button>
        <button
          onClick={() => downloadQRCode('jpeg')}
          className="flex-1 flex items-center justify-center gap-1.5 bg-white text-slate-700 border border-slate-200 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors text-xs font-medium shadow-sm"
        >
          <Download size={14} /> JPG
        </button>
      </div>

    </div>
  );
};

export default QRControls;
