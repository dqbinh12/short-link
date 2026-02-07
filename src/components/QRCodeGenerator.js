'use client';

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = forwardRef(({
    url,
    fgColor,
    bgColor,
    size,
    margin,
    logo
}, ref) => {
    const localQrRef = useRef();

    useImperativeHandle(ref, () => ({
        querySelector: (selector) => localQrRef.current.querySelector(selector)
    }));

    return (
        <div className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-md p-8 rounded-2xl border border-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div ref={localQrRef} className="bg-white p-4 rounded-xl shadow-sm">
                <QRCodeCanvas
                    value={url || 'https://example.com'}
                    size={size}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    includeMargin={margin}
                    level={"H"}
                    imageSettings={logo ? {
                        src: logo,
                        x: undefined,
                        y: undefined,
                        height: size * 0.22,
                        width: size * 0.22,
                        excavate: true,
                    } : undefined}
                />
            </div>
            <p className="mt-4 text-xs text-slate-500 font-mono truncate max-w-[250px] bg-slate-100/50 px-2 py-1 rounded">
                {url || 'https://example.com'}
            </p>
        </div>
    );
});

QRCodeGenerator.displayName = 'QRCodeGenerator';

export default QRCodeGenerator;
