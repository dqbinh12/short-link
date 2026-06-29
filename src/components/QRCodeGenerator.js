'use client';

import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

const PREVIEW_SIZE = 256;

const QRCodeGenerator = forwardRef(({
  url,
  fgColor,
  bgColor,
  size,
  margin,
  level = 'H',
  logo,
  dotStyle = 'square',
  cornerSquareStyle = 'square',
  cornerDotStyle = 'square',
}, ref) => {
  const previewRef = useRef(null);
  const qrInstance = useRef(null);

  const buildConfig = (renderSize) => ({
    width: renderSize,
    height: renderSize,
    data: url || 'https://example.com',
    qrOptions: { errorCorrectionLevel: level },
    dotsOptions: { color: fgColor, type: dotStyle },
    cornersSquareOptions: { color: fgColor, type: cornerSquareStyle },
    cornersDotOptions: { color: fgColor, type: cornerDotStyle },
    backgroundOptions: { color: bgColor },
    image: logo || undefined,
    imageOptions: { crossOrigin: 'anonymous', margin: 4 },
    margin: margin ? 10 : 0,
  });

  useEffect(() => {
    if (!previewRef.current) return;

    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      const config = buildConfig(PREVIEW_SIZE);
      if (!qrInstance.current) {
        qrInstance.current = new QRCodeStyling(config);
        previewRef.current.innerHTML = '';
        qrInstance.current.append(previewRef.current);
      } else {
        qrInstance.current.update(config);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, fgColor, bgColor, margin, level, logo, dotStyle, cornerSquareStyle, cornerDotStyle]);

  useImperativeHandle(ref, () => ({
    download: (extension) => {
      import('qr-code-styling').then(({ default: QRCodeStyling }) => {
        const dlQr = new QRCodeStyling(buildConfig(size));
        dlQr.download({ extension, name: 'qrcode' });
      });
    },
  }));

  return (
    <div className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-md p-8 rounded-2xl border border-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div ref={previewRef} style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }} />
      </div>
      <p className="mt-4 text-xs text-slate-500 font-mono truncate max-w-[250px] bg-slate-100/50 px-2 py-1 rounded">
        {url || 'https://example.com'}
      </p>
    </div>
  );
});

QRCodeGenerator.displayName = 'QRCodeGenerator';

export default QRCodeGenerator;
