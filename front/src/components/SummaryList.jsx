
// import React, { useEffect, useState } from 'react';
// import { generateSummaries } from '../services/aiService';

// export default function SummaryList({ onSummarySelect }) {
//   const [summaries, setSummaries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedSummary, setSelectedSummary] = useState(null);

//   useEffect(() => {
//     const selectedFiles = JSON.parse(localStorage.getItem('selectedFiles'));
//     const selectedRepo = JSON.parse(localStorage.getItem('selectedRepo'));

//     if (!selectedFiles || !selectedRepo) {
//       setError('Missing selected files or repo in local storage.');
//       setLoading(false);
//       return;
//     }

//     generateSummaries({ files: selectedFiles, repo: selectedRepo })
//       .then((res) => {
//         setSummaries(res.data || []);
//         console.log(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError('Failed to generate summaries.');
//         setLoading(false);
//       });
//   }, []);

//   const handleGenerateClick = () => {
//     if (!selectedSummary) return;
//     localStorage.setItem('selectedSummary', JSON.stringify(selectedSummary));
//     onSummarySelect();
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center mt-5">
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" style={{ width: 42, height: 42 }} role="status" />
//           <h6 className="mt-2">Generating Summaries...</h6>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="alert alert-danger text-center mt-5">{error}</div>;
//   }

//   if (summaries.length === 0) {
//     return <div className="text-center mt-5 text-secondary">No summaries available.</div>;
//   }

//   return (
//     <div className="container py-5" style={{ minHeight: '100vh', background: '#f7faff' }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="fw-bold text-primary" style={{ letterSpacing: '.015em' }}>
//           🧠 AI-Generated Test Case Summaries
//         </h4>
//         <button
//           className="btn btn-primary px-4 py-2 fw-semibold shadow"
//           disabled={!selectedSummary}
//           style={{
//             borderRadius: 9,
//             fontSize: '1.07em',
//             letterSpacing: '.016em',
//             background: selectedSummary
//               ? 'linear-gradient(90deg, #48b1fc 77%, #3d68f8 100%)'
//               : '#b4cdee',
//             border: 'none',
//             opacity: selectedSummary ? 1 : 0.67,
//             transition: 'all .15s',
//           }}
//           onClick={handleGenerateClick}
//         >
//           🚀 Generate Test Code
//         </button>
//       </div>

//       <div className="row gy-4">
//         {summaries.map((summaryText, index) => {
//           const fileName = `Summary ${index + 1}`;
//           const isSelected = selectedSummary === summaryText;
//           return (
//             <div className="col-md-6" key={index}>
//               <div
//                 className={
//                   'card summary-card shadow-sm h-100 ' +
//                   (isSelected ? 'border-primary selected-card' : 'border-0')
//                 }
//                 onClick={() => setSelectedSummary(summaryText)}
//                 style={{
//                   cursor: 'pointer',
//                   borderRadius: 18,
//                   transition: 'all .2s cubic-bezier(.4,0,.2,1)',
//                   background: isSelected
//                     ? 'linear-gradient(96deg, #e8f2ff 80%, #fafdff 100%)'
//                     : 'linear-gradient(115deg, #fff 92%, #f3f6fa 100%)',
//                   boxShadow: isSelected
//                     ? '0 4px 32px 0 rgba(52,144,255,0.13)'
//                     : '0 2px 10px 0 rgba(184, 200, 225, 0.09)'
//                 }}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === 'Enter' && setSelectedSummary(summaryText)}
//               >
//                 <div className="card-body">
//                   <h6 className="card-title fw-bold mb-3" style={{ color: '#205eac', fontSize: '1.05em' }}>
//                     {fileName}
//                   </h6>
//                   <p
//                     className="card-text"
//                     style={{
//                       whiteSpace: 'pre-wrap',
//                       fontFamily: 'inherit',
//                       fontSize: '1.09em',
//                       color: '#444',
//                       marginBottom: 0,
//                     }}
//                   >
//                     {summaryText}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <style>{`
//         .summary-card {
//           margin-bottom: 10px;
//           box-shadow: 0 2px 10px 0 rgba(184, 200, 225, 0.09);
//           outline: none;
//         }
//         .summary-card:hover {
//           box-shadow: 0 8px 22px 0 rgba(52,144,255,0.13);
//           transform: scale(1.015);
//           border-color: #84caff !important;
//           background: linear-gradient(92deg, #eaf7ff 88%, #f2f6f9 100%);
//         }
//         .selected-card {
//           border: 2.5px solid #429cf7 !important;
//         }
//       `}</style>
//     </div>
//   );
// }





import React, { useEffect, useState } from 'react';
import { generateSummaries } from '../services/aiService';

export default function SummaryList({ onSummarySelect }) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSummary, setSelectedSummary] = useState(null);

  useEffect(() => {
    const selectedFiles = JSON.parse(localStorage.getItem('selectedFiles'));
    const selectedRepo = JSON.parse(localStorage.getItem('selectedRepo'));

    if (!selectedFiles || !selectedRepo) {
      setError('Missing selected files or repo in local storage.');
      setLoading(false);
      return;
    }

    generateSummaries({ files: selectedFiles, repo: selectedRepo })
      .then((res) => {
        setSummaries(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to generate summaries.');
        setLoading(false);
      });
  }, []);

  const handleGenerateClick = () => {
    if (!selectedSummary) return;
    localStorage.setItem('selectedSummary', JSON.stringify(selectedSummary));
    onSummarySelect();
  };

  if (loading) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center summary-loader-bg" style={{zIndex: 9999}}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" style={{ width: 42, height: 42 }} role="status" />
        <h6 className="mt-2 text-primary fw-semibold">Generating Summaries...</h6>
      </div>
      <style>{`
        .summary-loader-bg {
          background: linear-gradient(120deg, #e3f0ff 0%, #f7faff 100%);
        }
      `}</style>
    </div>
  );
}

if (error) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center summary-loader-bg" style={{zIndex: 9999}}>
      <div className="alert alert-danger shadow-sm px-4 py-3 fw-semibold">
        {error}
      </div>
      <style>{`
        .summary-loader-bg {
          background: linear-gradient(120deg, #ffe3e3 0%, #f7faff 100%);
        }
      `}</style>
    </div>
  );
}


  return (
    <div className="container py-5 summary-bg" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background shapes */}
      <div className="summary-bg-shape summary-bg-shape-1"></div>
      <div className="summary-bg-shape summary-bg-shape-2"></div>
      <div className="summary-bg-shape summary-bg-shape-3"></div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-primary summary-title" style={{ letterSpacing: '.015em' }}>
          🧠 AI-Generated Test Case Summaries
        </h4>
        <button
          className="btn btn-primary px-4 py-2 fw-semibold shadow summary-btn"
          disabled={!selectedSummary}
          style={{
            borderRadius: 9,
            fontSize: '1.07em',
            letterSpacing: '.016em',
            background: selectedSummary
              ? 'linear-gradient(90deg, #48b1fc 77%, #3d68f8 100%)'
              : '#b4cdee',
            border: 'none',
            opacity: selectedSummary ? 1 : 0.67,
            transition: 'all .15s',
          }}
          onClick={handleGenerateClick}
        >
          🚀 Generate Test Code
        </button>
      </div>

      <div className="row gy-4">
        {summaries.map((summaryText, index) => {
          const fileName = `Summary ${index + 1}`;
          const isSelected = selectedSummary === summaryText;
          return (
            <div className="col-md-6" key={index}>
              <div
                className={
                  'card summary-card shadow-sm h-100 ' +
                  (isSelected ? 'border-primary selected-card' : 'border-0')
                }
                onClick={() => setSelectedSummary(summaryText)}
                style={{
                  cursor: 'pointer',
                  borderRadius: 18,
                  transition: 'all .2s cubic-bezier(.4,0,.2,1)',
                  background: isSelected
                    ? 'linear-gradient(96deg, #e8f2ff 80%, #fafdff 100%)'
                    : 'linear-gradient(115deg, #fff 92%, #f3f6fa 100%)',
                  boxShadow: isSelected
                    ? '0 4px 32px 0 rgba(52,144,255,0.13)'
                    : '0 2px 10px 0 rgba(184, 200, 225, 0.09)'
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedSummary(summaryText)}
              >
                <div className="card-body">
                  <h6 className="card-title fw-bold mb-3" style={{ color: '#205eac', fontSize: '1.05em' }}>
                    {fileName}
                  </h6>
                  <p
                    className="card-text"
                    style={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit',
                      fontSize: '1.09em',
                      color: '#444',
                      marginBottom: 0,
                    }}
                  >
                    {summaryText}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .summary-bg {
          background: linear-gradient(120deg, #e3f0ff 0%, #f7faff 100%);
        }
        .summary-bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.13;
          z-index: 1;
          animation: summaryShapeFloat 7s ease-in-out infinite alternate;
        }
        .summary-bg-shape-1 {
          width: 140px;
          height: 140px;
          left: -30px;
          top: 60px;
          background: #b3e0ff;
          animation-delay: 0s;
        }
        .summary-bg-shape-2 {
          width: 90px;
          height: 90px;
          right: -20px;
          top: 180px;
          background: #a5d8ff;
          animation-delay: 2s;
        }
        .summary-bg-shape-3 {
          width: 70px;
          height: 70px;
          left: 60%;
          bottom: 30px;
          background: #c3eaff;
          transform: translateX(-50%);
          animation-delay: 1s;
        }
        @keyframes summaryShapeFloat {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-20px) scale(1.07); }
        }
        .summary-title {
          animation: summaryTitleFadeIn 1.1s;
        }
        @keyframes summaryTitleFadeIn {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: none;}
        }
        .summary-btn {
          font-size: 1.07em;
          box-shadow: 0 2px 8px rgba(0,123,255,0.08);
          transition: background .18s, box-shadow .18s, transform .18s;
        }
        .summary-btn:hover, .summary-btn:focus {
          background: linear-gradient(90deg, #3d68f8 77%, #48b1fc 100%);
          box-shadow: 0 6px 18px rgba(0,123,255,0.13);
          transform: scale(1.07);
        }
        .summary-card {
          margin-bottom: 10px;
          box-shadow: 0 2px 10px 0 rgba(184, 200, 225, 0.09);
          outline: none;
          transition: box-shadow .22s, transform .22s, border-color .22s;
        }
        .summary-card:hover {
          box-shadow: 0 8px 22px 0 rgba(52,144,255,0.13);
          transform: scale(1.018);
          border-color: #84caff !important;
          background: linear-gradient(92deg, #eaf7ff 88%, #f2f6f9 100%);
        }
        .selected-card {
          border: 2.5px solid #429cf7 !important;
        }
        @media (max-width: 768px) {
          .summary-bg-shape-1, .summary-bg-shape-2, .summary-bg-shape-3 {
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}</style>
    </div>
  );
}