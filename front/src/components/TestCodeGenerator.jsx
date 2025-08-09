

import React, { useEffect, useState } from 'react';
import { generateTestCode } from '../services/aiService';

export default function TestCodeGenerator() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const repo = JSON.parse(localStorage.getItem('selectedRepo'));
    const files = JSON.parse(localStorage.getItem('selectedFiles'));
    const summary = JSON.parse(localStorage.getItem('selectedSummary'));

    if (!repo || !files || !summary) {
      setError('Missing input for code generation.');
      setLoading(false);
      return;
    }

    generateTestCode({ repo, files, summary })
      .then((res) => {
        const generated = res.data.code || '';
        setCode(generated);
        localStorage.setItem('generatedTestCode', generated);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to generate test code.');
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'generated-test-code.js';
    link.href = url;
    link.click();
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: 44, height: 44 }} role="status" />
          <h6 className="mt-2">Generating test code...</h6>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex min-vh-100 justify-content-center align-items-center bg-light">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div className="container py-5" style={{ minHeight: '100vh', background: '#f6fafd' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h4 className="mb-4 fw-bold text-primary" style={{ letterSpacing: '.01em' }}>
            🧪 Generated Test Code
          </h4>
          <div className="code-block rounded shadow-sm border p-3 mb-3">
            <pre
              className="m-0"
              style={{
                background: 'transparent',
                color: '#243847',
                fontSize: '1.07em',
                fontFamily: 'JetBrains Mono, Fira Mono, Menlo, monospace',
                lineHeight: 1.6,
                maxHeight: 500,
                overflowY: 'auto',
                border: 0,
                boxShadow: 'none',
                borderRadius: 9,
              }}
            >
              <code>{code}</code>
            </pre>
          </div>
          <div className="mt-3 d-flex gap-3">
            <button
              className="btn btn-outline-primary btn-action"
              onClick={handleCopy}
              style={{
                fontWeight: 600,
                borderRadius: 7,
                minWidth: 95,
                boxShadow: copied ? '0 0 0 3px #b2dcfc' : '0 1px 6px 0 rgba(30,180,255,0.07)',
                transition: 'all .16s',
              }}
            >
              {copied ? '✔ Copied!' : 'Copy'}
            </button>
            <button
              className="btn btn-success btn-action"
              onClick={handleDownload}
              style={{
                fontWeight: 600,
                borderRadius: 7,
                minWidth: 110,
                boxShadow: '0 1px 6px 0 rgba(74,222,128,0.10)',
                transition: 'all .16s'
              }}
            >
              ⬇ Download
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .code-block {
          background: linear-gradient(110deg, #eef7fc 80%, #fafdff 100%);
          box-shadow: 0 2px 18px 0 rgba(60,160,255,0.11);
          border: 1.5px solid #e5f3ff;
          transition: box-shadow .21s cubic-bezier(.4,0,.2,1), border .18s;
        }
        .code-block:hover {
          box-shadow: 0 10px 28px 0 rgba(34,168,255,0.13), 0 1.5px 7px 0 rgba(52, 144, 255, 0.06);
          border-color: #c1e6ff;
        }
        .btn-action {
          box-shadow: 0 1px 10px 0 rgba(34,168,255,0.06);
          transition: border-color .16s, box-shadow .18s, background .14s;
        }
        .btn-action:active, .btn-action:focus {
          outline: 2px solid #a5d7fc !important;
          box-shadow: 0 0 0 3px #a5d7fc;
          background: #eaf6ff;
        }
        .btn-success.btn-action:active, .btn-success.btn-action:focus {
          background: #dcfce7 !important;
          border-color: #33eb77 !important;
          color: #166534 !important;
        }
        .btn-outline-primary.btn-action[disabled], .btn-success.btn-action[disabled] {
          opacity: 0.75;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .code-block {
            font-size: 0.98em;
            padding: 0.75em;
          }
          .container.py-5 {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
