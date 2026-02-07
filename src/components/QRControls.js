'use client';

import React from 'react';
import { Download, Upload, Palette, Layout } from 'lucide-react';

const QRControls = ({
    fgColor, setFgColor,
    bgColor, setBgColor,
    size, setSize,
    margin, setMargin,
    handleLogoUpload,
    downloadQRCode
}) => {
    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-5 space-y-5 shadow-lg mt-6">

            {/* Colors */}
            <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    <Palette size={12} /> Colors
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
                            <div className="w-5 h-5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: fgColor }}></div>
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
                            <div className="w-5 h-5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: bgColor }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logo */}
            <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    <Upload size={12} /> Logo
                </label>
                <div className="relative">
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
            </div>

            {/* Size & Margin */}
            <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    <Layout size={12} /> Layout
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="128"
                        max="512"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <span className="text-xs text-slate-400 w-12 text-right">{size}px</span>
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

            {/* Downloads */}
            <div className="flex gap-2 pt-2">
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
