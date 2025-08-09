// import React, { useEffect, useState } from 'react';
// import { getRepoFiles } from '../services/githubService';
// import { useNavigate } from 'react-router-dom';

// function SelectFilesPage({ selectedRepo }) {
//   const [files, setFiles] = useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
    
//     if (!selectedRepo) return;
//     setLoading(true);

//     const fetchFiles = async () => {
//       try {
//         const res = await getRepoFiles(
//           selectedRepo.owner.login,
//           selectedRepo.name,
//           selectedRepo.default_branch || 'main'
//         );
//         setFiles(res.data);
//       } catch (err) {
//         console.error('Error fetching files:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, [selectedRepo]);

//   const handleCheckboxChange = (file) => {
//     setSelectedFiles((prev) =>
//       prev.includes(file)
//         ? prev.filter((f) => f !== file)
//         : [...prev, file]
//     );
//   };

//   const handleProceed = () => {
//     navigate('/summaries', { state: { selectedFiles, selectedRepo } });
//   };

//   if (!selectedRepo)
//     return (
//       <div className="d-flex min-vh-100 justify-content-center align-items-center bg-light">
//         <div className="alert alert-warning">Please select a repository first.</div>
//       </div>
//     );

// if (loading)
//   return (
//     <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center select-files-loader-bg" style={{zIndex: 9999}}>
//       <div className="text-center">
//         <div className="spinner-border text-primary mb-3" style={{ width: 48, height: 48 }} role="status" />
//         <h6 className="mt-2 text-primary fw-semibold">Loading files...</h6>
//       </div>
//       <style>{`
//         .select-files-loader-bg {
//           background: linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%);
//         }
//       `}</style>
//     </div>
//   );

// // If no files found
// if (!loading && files.length === 0)
//   return (
//     <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center select-files-loader-bg" style={{zIndex: 9999}}>
//       <div className="alert alert-info shadow-sm px-4 py-3 fw-semibold">
//         <span role="img" aria-label="file">📂</span> No files found in this repository.<br />
//         Please select another repository or check if it contains code files.
//       </div>
//       <style>{`
//         .select-files-loader-bg {
//           background: linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%);
//         }
//       `}</style>
//     </div>
//   );

//   return (
//     <div
//       className="container py-5 select-files-bg"
//       style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
//     >
//       {/* Animated background shapes */}
//       <div className="select-files-bg-shape select-files-bg-shape-1"></div>
//       <div className="select-files-bg-shape select-files-bg-shape-2"></div>
//       <div className="select-files-bg-shape select-files-bg-shape-3"></div>

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="m-0 fw-bold select-files-title" style={{ letterSpacing: '.01em', color: '#414569' }}>
//           <span role="img" aria-label="files">📄</span> Files in: <span className="text-primary">{selectedRepo.name}</span>
//         </h4>
//         <button
//           className="btn btn-primary px-4 py-2 fw-semibold shadow-sm select-files-btn"
//           style={{
//             borderRadius: 8,
//             background: selectedFiles.length
//               ? 'linear-gradient(94deg, #47bfff 80%, #4f8cff 100%)'
//               : '#b6c8e3',
//             border: 'none',
//             opacity: selectedFiles.length ? 1 : 0.7,
//             transition: 'all .19s'
//           }}
//           onClick={handleProceed}
//           disabled={selectedFiles.length === 0}
//         >
//           Proceed to Summary
//         </button>
//       </div>

//       <div
//         className="card shadow-sm border-0 select-files-card"
//         style={{ borderRadius: 18, zIndex: 2, position: 'relative' }}
//       >
//         <ul className="list-group list-group-flush" style={{ borderRadius: 15 }}>
//           {files.map((file, idx) => (
//             <li
//               key={idx}
//               className={
//                 "list-group-item d-flex align-items-center file-list-item " +
//                 (selectedFiles.includes(file) ? "file-list-item-selected" : "")
//               }
//               style={{
//                 border: 0,
//                 transition: 'background .23s, box-shadow .23s',
//                 cursor: 'pointer',
//                 fontSize: '1.09em',
//                 borderRadius: 12,
//                 margin: '4px 8px'
//               }}
//               onClick={() => handleCheckboxChange(file)}
//             >
//               <input
//                 type="checkbox"
//                 className="form-check-input me-3"
//                 style={{
//                   accentColor: '#3da9fc',
//                   boxShadow: '0 0 0 2px #e9f5fd'
//                 }}
//                 checked={selectedFiles.includes(file)}
//                 onChange={() => handleCheckboxChange(file)}
//                 onClick={e => e.stopPropagation()}
//               />
//               <span
//                 style={{
//                   fontWeight: selectedFiles.includes(file) ? 600 : 500,
//                   color: selectedFiles.includes(file) ? '#2563eb' : '#2d323f',
//                   transition: 'color .18s'
//                 }}
//               >
//                 {file.path || file.name}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <style>{`
//         .select-files-bg {
//           background: linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%);
//         }
//         .select-files-bg-shape {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.15;
//           z-index: 1;
//           animation: selectFilesShapeFloat 7s ease-in-out infinite alternate;
//         }
//         .select-files-bg-shape-1 {
//           width: 160px;
//           height: 160px;
//           left: -40px;
//           top: 80px;
//           background: #b3e0ff;
//           animation-delay: 0s;
//         }
//         .select-files-bg-shape-2 {
//           width: 110px;
//           height: 110px;
//           right: -25px;
//           top: 220px;
//           background: #a5d8ff;
//           animation-delay: 2s;
//         }
//         .select-files-bg-shape-3 {
//           width: 80px;
//           height: 80px;
//           left: 60%;
//           bottom: 30px;
//           background: #c3eaff;
//           transform: translateX(-50%);
//           animation-delay: 1s;
//         }
//         @keyframes selectFilesShapeFloat {
//           0% { transform: translateY(0) scale(1); }
//           100% { transform: translateY(-20px) scale(1.07); }
//         }
//         .select-files-title {
//           animation: selectFilesTitleFadeIn 1.1s;
//         }
//         @keyframes selectFilesTitleFadeIn {
//           from { opacity: 0; transform: translateY(-30px);}
//           to { opacity: 1; transform: none;}
//         }
//         .select-files-btn {
//           font-size: 1.07em;
//           box-shadow: 0 2px 8px rgba(0,123,255,0.08);
//           transition: background .18s, box-shadow .18s, transform .18s;
//         }
//         .select-files-btn:hover, .select-files-btn:focus {
//           background: linear-gradient(94deg, #4f8cff 80%, #47bfff 100%);
//           box-shadow: 0 6px 18px rgba(0,123,255,0.13);
//           transform: scale(1.07);
//         }
//         .select-files-card {
//           animation: selectFilesCardFadeIn 1.2s;
//         }
//         @keyframes selectFilesCardFadeIn {
//           from { opacity: 0; transform: translateY(30px);}
//           to { opacity: 1; transform: none;}
//         }
//         .file-list-item {
//           background: #f9fbfd;
//           margin-bottom: 2px;
//           transition: background .23s, box-shadow .23s;
//         }
//         .file-list-item:hover {
//           background: #e7f0fa;
//           box-shadow: 0 1px 10px 0 rgba(60,180,235,0.09);
//           transform: scale(1.01);
//         }
//         .file-list-item-selected {
//           background: #deefff !important;
//           box-shadow: 0 2px 12px 0 rgba(60,180,235,0.13);
//         }
//         .file-list-item input[type='checkbox']:focus {
//           outline: 2px solid #3da9fc;
//         }
//         @media (max-width: 768px) {
//           .select-files-bg-shape-1, .select-files-bg-shape-2, .select-files-bg-shape-3 {
//             width: 60px !important;
//             height: 60px !important;
//           }
//           .select-files-card {
//             border-radius: 10px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default SelectFilesPage;




import React, { useEffect, useState } from 'react';
import { getRepoFiles } from '../services/githubService';
import { useNavigate } from 'react-router-dom';

function SelectFilesPage({ selectedRepo: propSelectedRepo }) {
  const [selectedRepo, setSelectedRepo] = useState(propSelectedRepo);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedRepo) {
      // Agar prop me repo nahi mila toh localStorage se try karo
      const storedRepo = localStorage.getItem('selectedRepo');
      if (storedRepo) {
        setSelectedRepo(JSON.parse(storedRepo));
      } else {
        // Repo na mile toh loading hata do
        setLoading(false);
      }
      return;
    }

    setLoading(true);

    const fetchFiles = async () => {
      try {
        const res = await getRepoFiles(
          selectedRepo.owner.login,
          selectedRepo.name,
          selectedRepo.default_branch || 'main'
        );
        setFiles(res.data);
      } catch (err) {
        console.error('Error fetching files:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [selectedRepo]);

  const handleCheckboxChange = (file) => {
    setSelectedFiles((prev) =>
      prev.includes(file)
        ? prev.filter((f) => f !== file)
        : [...prev, file]
    );
  };

  const handleProceed = () => {
    navigate('/summaries', { state: { selectedFiles, selectedRepo } });
  };

  if (!selectedRepo)
    return (
      <div className="d-flex min-vh-100 justify-content-center align-items-center bg-light">
        <div className="alert alert-warning">Please select a repository first.</div>
      </div>
    );

  if (loading)
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center select-files-loader-bg"
        style={{ zIndex: 9999 }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            style={{ width: 48, height: 48 }}
            role="status"
          />
          <h6 className="mt-2 text-primary fw-semibold">Loading files...</h6>
        </div>
        <style>{`
          .select-files-loader-bg {
            background: linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%);
          }
        `}</style>
      </div>
    );

  if (!loading && files.length === 0)
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center select-files-loader-bg"
        style={{ zIndex: 9999 }}
      >
        <div className="alert alert-info shadow-sm px-4 py-3 fw-semibold">
          <span role="img" aria-label="file">
            📂
          </span>{' '}
          No files found in this repository.
          <br />
          Please select another repository or check if it contains code files.
        </div>
        <style>{`
          .select-files-loader-bg {
            background: linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%);
          }
        `}</style>
      </div>
    );

  return (
    <div
      className="container py-5 select-files-bg"
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Animated background shapes */}
      <div className="select-files-bg-shape select-files-bg-shape-1"></div>
      <div className="select-files-bg-shape select-files-bg-shape-2"></div>
      <div className="select-files-bg-shape select-files-bg-shape-3"></div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4
          className="m-0 fw-bold select-files-title"
          style={{ letterSpacing: '.01em', color: '#414569' }}
        >
          <span role="img" aria-label="files">
            📄
          </span>{' '}
          Files in: <span className="text-primary">{selectedRepo.name}</span>
        </h4>
        <button
          className="btn btn-primary px-4 py-2 fw-semibold shadow-sm select-files-btn"
          style={{
            borderRadius: 8,
            background: selectedFiles.length
              ? 'linear-gradient(94deg, #47bfff 80%, #4f8cff 100%)'
              : '#b6c8e3',
            border: 'none',
            opacity: selectedFiles.length ? 1 : 0.7,
            transition: 'all .19s',
          }}
          onClick={handleProceed}
          disabled={selectedFiles.length === 0}
        >
          Proceed to Summary
        </button>
      </div>

      <div
        className="card shadow-sm border-0 select-files-card"
        style={{ borderRadius: 18, zIndex: 2, position: 'relative' }}
      >
        <ul className="list-group list-group-flush" style={{ borderRadius: 15 }}>
          {files.map((file, idx) => (
            <li
              key={idx}
              className={
                'list-group-item d-flex align-items-center file-list-item ' +
                (selectedFiles.includes(file) ? 'file-list-item-selected' : '')
              }
              style={{
                border: 0,
                transition: 'background .23s, box-shadow .23s',
                cursor: 'pointer',
                fontSize: '1.09em',
                borderRadius: 12,
                margin: '4px 8px',
              }}
              onClick={() => handleCheckboxChange(file)}
            >
              <input
                type="checkbox"
                className="form-check-input me-3"
                style={{
                  accentColor: '#3da9fc',
                  boxShadow: '0 0 0 2px #e9f5fd',
                }}
                checked={selectedFiles.includes(file)}
                onChange={() => handleCheckboxChange(file)}
                onClick={(e) => e.stopPropagation()}
              />
              <span
                style={{
                  fontWeight: selectedFiles.includes(file) ? 600 : 500,
                  color: selectedFiles.includes(file) ? '#2563eb' : '#2d323f',
                  transition: 'color .18s',
                }}
              >
                {file.path || file.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .select-files-bg {
          background: linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%);
        }
        .select-files-bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
          z-index: 1;
          animation: selectFilesShapeFloat 7s ease-in-out infinite alternate;
        }
        .select-files-bg-shape-1 {
          width: 160px;
          height: 160px;
          left: -40px;
          top: 80px;
          background: #b3e0ff;
          animation-delay: 0s;
        }
        .select-files-bg-shape-2 {
          width: 110px;
          height: 110px;
          right: -25px;
          top: 220px;
          background: #a5d8ff;
          animation-delay: 2s;
        }
        .select-files-bg-shape-3 {
          width: 80px;
          height: 80px;
          left: 60%;
          bottom: 30px;
          background: #c3eaff;
          transform: translateX(-50%);
          animation-delay: 1s;
        }
        @keyframes selectFilesShapeFloat {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-20px) scale(1.07);
          }
        }
        .select-files-title {
          animation: selectFilesTitleFadeIn 1.1s;
        }
        @keyframes selectFilesTitleFadeIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .select-files-btn {
          font-size: 1.07em;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.08);
          transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
        }
        .select-files-btn:hover,
        .select-files-btn:focus {
          background: linear-gradient(94deg, #4f8cff 80%, #47bfff 100%);
          box-shadow: 0 6px 18px rgba(0, 123, 255, 0.13);
          transform: scale(1.07);
        }
        .select-files-card {
          animation: selectFilesCardFadeIn 1.2s;
        }
        @keyframes selectFilesCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .file-list-item {
          background: #f9fbfd;
          margin-bottom: 2px;
          transition: background 0.23s, box-shadow 0.23s;
        }
        .file-list-item:hover {
          background: #e7f0fa;
          box-shadow: 0 1px 10px 0 rgba(60, 180, 235, 0.09);
          transform: scale(1.01);
        }
        .file-list-item-selected {
          background: #deefff !important;
          box-shadow: 0 2px 12px 0 rgba(60, 180, 235, 0.13);
        }
        .file-list-item input[type='checkbox']:focus {
          outline: 2px solid #3da9fc;
        }
        @media (max-width: 768px) {
          .select-files-bg-shape-1,
          .select-files-bg-shape-2,
          .select-files-bg-shape-3 {
            width: 60px !important;
            height: 60px !important;
          }
          .select-files-card {
            border-radius: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default SelectFilesPage;
