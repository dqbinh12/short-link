'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const PREVIEW_SIZE = 256;

const QRCodeGenerator = forwardRef(({
    url,
    fgColor,
    bgColor,
    size,
    margin,
    logo
}, ref) => {
    const hiddenRef = useRef();

    useImperativeHandle(ref, () => ({
        querySelector: (selector) => hiddenRef.current.querySelector(selector)
    }));

    const imageSettings = logo ? {
        src: logo,
        x: undefined,
        y: undefined,
        height: size * 0.22,
        width: size * 0.22,
        excavate: true,
    } : undefined;

    const previewImageSettings = logo ? {
        src: logo,
        x: undefined,
        y: undefined,
        height: PREVIEW_SIZE * 0.22,
        width: PREVIEW_SIZE * 0.22,
        excavate: true,
    } : undefined;

    return (
        <div className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-md p-8 rounded-2xl border border-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl">
            {/* Visible preview - fixed size */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <QRCodeCanvas
                    value={url || 'https://example.com'}
                    size={PREVIEW_SIZE}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    includeMargin={margin}
                    level={"H"}
                    imageSettings={previewImageSettings}
                />
            </div>
            <p className="mt-4 text-xs text-slate-500 font-mono truncate max-w-[250px] bg-slate-100/50 px-2 py-1 rounded">
                {url || 'https://example.com'}
            </p>

            {/* Hidden high-res canvas for download */}
            <div ref={hiddenRef} className="hidden">
                <QRCodeCanvas
                    value={url || 'https://example.com'}
                    size={size}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    includeMargin={margin}
                    level={"H"}
                    imageSettings={imageSettings}
                />
            </div>
        </div>
    );
});

QRCodeGenerator.displayName = 'QRCodeGenerator';

export default QRCodeGenerator;
