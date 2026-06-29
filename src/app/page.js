'use client';

import { useState, useRef } from 'react';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import QRControls from '@/components/QRControls';
import { Copy, Link as LinkIcon, ArrowRight, Check } from 'lucide-react';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // QR State
  const [fgColor, setFgColor] = useState('#1e293b');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(false);
  const [logo, setLogo] = useState(null);
  const qrRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/short-link/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = (extension) => {
    // Access the canvas via the forwarded ref to QRCodeGenerator
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL(`image/${extension}`);
      const link = document.createElement('a');
      link.download = `qrcode.${extension}`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="min-h-screen bg-[#e0e7ff] relative overflow-x-hidden flex items-center justify-center p-4 py-8">

      {/* Mesh Gradient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-400/30 rounded-full blur-[120px] mix-blend-multiply filter opacity-70 animate-blob"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-400/30 rounded-full blur-[120px] mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-indigo-400/30 rounded-full blur-[120px] mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main Glassmorphism Container */}
      <div className="relative w-full max-w-[1024px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row h-auto lg:min-h-[600px]">

        {/* Left Column: Input, Results & CONTROLS */}
        <div className="w-full lg:w-5/12 p-8 lg:p-12 flex flex-col border-b lg:border-b-0 lg:border-r border-white/20 bg-white/20">

          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight leading-tight">
              Shorten & <span className="text-indigo-600">Share</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Create sleek short links and custom QR codes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <input
                type="url"
                required
                className="w-full pl-4 pr-12 py-3 bg-white/60 border border-white/40 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/80 transition-all shadow-sm"
                placeholder="https://very-long-url.com..."
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-indigo-100 rounded-md">
                <LinkIcon size={14} className="text-indigo-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-slate-900/10 transition-all transform active:scale-[0.98] ${loading ? 'opacity-80 cursor-wait' : ''}`}
            >
              {loading ? 'Processing...' : 'Shorten URL'}
              {!loading && <ArrowRight size={16} />}
            </button>
            {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
          </form>

          {/* Result Card */}
          {shortUrl && (
            <div className="mt-6 p-4 bg-white/40 border border-white/50 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="block text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-wider">Your Short Link</span>
              <div className="flex items-center gap-3">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm font-semibold text-indigo-600 truncate hover:underline decoration-2 underline-offset-2">
                  {shortUrl}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-white rounded-lg border border-slate-100 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-colors shadow-sm active:scale-95"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}

          {/* QR Controls (Now on Left) */}
          {(shortUrl || originalUrl) && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <QRControls
                fgColor={fgColor} setFgColor={setFgColor}
                bgColor={bgColor} setBgColor={setBgColor}
                size={size} setSize={setSize}
                margin={margin} setMargin={setMargin}
                handleLogoUpload={handleLogoUpload}
                downloadQRCode={downloadQRCode}
              />
            </div>
          )}

          <div className="mt-8 text-[10px] text-slate-400 text-center lg:text-left">
            © 2026 ShortLink. Secure & Fast.
          </div>
        </div>

        {/* Right Column: QR PREVIEW ONLY */}
        <div className="w-full lg:w-7/12 bg-white/10 backdrop-blur-sm p-8 lg:p-12 flex flex-col items-center justify-center relative min-h-[400px]">

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>

          {!originalUrl && !shortUrl ? (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md shadow-inner">
                <LinkIcon size={24} className="opacity-50" />
              </div>
              <p className="text-sm font-medium">Enter a link to see the magic</p>
            </div>
          ) : (
            <div className="w-full max-w-sm animate-in fade-in zoom-in duration-500">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide opacity-80">Live Preview</h2>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-red-400/60"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-400/60"></span>
                  <span className="w-2 h-2 rounded-full bg-green-400/60"></span>
                </div>
              </div>

              <QRCodeGenerator
                ref={qrRef}
                url={shortUrl || originalUrl}
                fgColor={fgColor}
                bgColor={bgColor}
                size={size}
                margin={margin}
                logo={logo}
              />
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
