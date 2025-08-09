import React, { useEffect, useState } from 'react';
import { getUserRepos, getPublicRepos } from '../services/githubService';
import { useNavigate } from 'react-router-dom';

export default function RepoList({ onRepoSelect, githubUsername }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = githubUsername
          ? await getPublicRepos(githubUsername)
          : await getUserRepos();
        setRepos(response.data);
      } catch (err) {
        setError('Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [githubUsername]);
if (loading)
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center repo-loader-bg" style={{zIndex: 9999}}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" style={{ width: 48, height: 48 }} role="status" />
        <h6 className="mt-2 text-primary fw-semibold">Loading repositories...</h6>
      </div>
      <style>{`
        .repo-loader-bg {
          background: linear-gradient(120deg, #e3f0ff 0%, #fafdff 100%);
        }
      `}</style>
    </div>
  );
if (error)
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center repo-loader-bg" style={{zIndex: 9999}}>
      <div className="alert alert-danger shadow-sm px-4 py-3 fw-semibold">
        {error}
      </div>
      <style>{`
        .repo-loader-bg {
          background: linear-gradient(120deg, #ffe3e3 0%, #fafdff 100%);
        }
      `}</style>
    </div>
  );
  return (
    <div
      className="container mt-5 repo-bg"
      style={{
        minHeight: '100vh',
        borderRadius: 16,
        paddingBottom: 32,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background shapes */}
      <div className="repo-bg-shape repo-bg-shape-1"></div>
      <div className="repo-bg-shape repo-bg-shape-2"></div>
      <div className="repo-bg-shape repo-bg-shape-3"></div>
      <h3 className="mb-4 text-center text-dark fw-bold repo-title-animate">
        <span>📦</span> Your GitHub Repository
      </h3>

      {repos.length === 0 ? (
        <div className="text-center text-muted">No repositories found.</div>
      ) : (
        <div className="row justify-content-center">
          {repos.map((repo) => (
            <div
              className="col-md-5 col-lg-4 mb-4"
              key={repo.id}
              style={{
                animation: 'fadeInUp 0.5s',
              }}
            >
              <div
                className="card h-100 border-0 shadow-sm repo-card interactive-repo-card"
                style={{
                  background: 'linear-gradient(115deg, #fff 90%, #f3f6fa 100%)',
                  borderRadius: '16px',
                  transition: 'all .25s cubic-bezier(.4,0,.2,1)',
                  boxShadow: '0 4px 18px rgba(180,200,225,0.09)',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <div>
                    <div className="d-flex justify-content-center mb-2">
                      {/* <img
                        src={repo.owner?.avatar_url}
                        alt={repo.owner?.login}
                        className="rounded-circle me-2"
                        style={{
                          width: 38,
                          height: 38,
                          border: '1.5px solid #e3e8ef',
                          boxShadow: '0 0 0 2px #f3f6fa',
                          objectFit: 'cover',
                          transition: 'box-shadow .22s',
                        }}
                        title={repo.owner?.login}
                      /> */}
                    </div>
                    <h5
                      className="card-title fw-semibold mb-2"
                      style={{ color: '#222', letterSpacing: '.01em' }}
                    >
                      {repo.name}
                    </h5>
                    {repo.description && (
                      <p className="text-muted small mb-0">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <button
                    className="btn custom-btn mt-3 repo-btn-animate"
                    id="btns"
                    title="Browse files in this repository"
                    onClick={() => {
                      onRepoSelect(repo);
                      localStorage.setItem('selectedRepo', JSON.stringify(repo)); 
                      navigate('/select-files');
                    }}
                  >
                    <span role="img" aria-label="view files">📂</span> View Files
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .repo-bg {
          background: linear-gradient(120deg, #e3f0ff 0%, #f3f6f9 100%);
        }
        .repo-bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.18;
          z-index: 1;
          animation: repoShapeFloat 7s ease-in-out infinite alternate;
        }
        .repo-bg-shape-1 {
          width: 180px;
          height: 180px;
          left: -50px;
          top: 80px;
          background: #b3e0ff;
          animation-delay: 0s;
        }
        .repo-bg-shape-2 {
          width: 120px;
          height: 120px;
          right: -30px;
          top: 220px;
          background: #a5d8ff;
          animation-delay: 2s;
        }
        .repo-bg-shape-3 {
          width: 90px;
          height: 90px;
          left: 60%;
          bottom: 30px;
          background: #c3eaff;
          transform: translateX(-50%);
          animation-delay: 1s;
        }
        @keyframes repoShapeFloat {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-20px) scale(1.07); }
        }
        .repo-title-animate {
          animation: repoTitleFadeIn 1.1s;
        }
        @keyframes repoTitleFadeIn {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: none;}
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .interactive-repo-card {
          transition: transform .22s cubic-bezier(.4,0,.2,1), box-shadow .22s;
        }
        .interactive-repo-card:hover {
          transform: scale(1.04);
          box-shadow: 0 10px 28px rgba(52, 144, 255, 0.13);
          border: 1px solid #b6e0fe;
        }
        .interactive-repo-card:hover .card-title {
          color: #007bff;
          text-shadow: 0 2px 8px #e3f0ff;
        }
        .repo-btn-animate {
          font-weight: 600;
          border-radius: 7px;
          min-width: 120px;
          background: linear-gradient(90deg, #e3f0ff 0%, #b3e0ff 100%);
          color: #007bff;
          border: none;
          box-shadow: 0 2px 8px rgba(0,123,255,0.08);
          transition: background .18s, box-shadow .18s, transform .18s;
        }
        .repo-btn-animate:hover, .repo-btn-animate:focus {
          background: linear-gradient(90deg, #b3e0ff 0%, #e3f0ff 100%);
          color: #0056b3;
          box-shadow: 0 6px 18px rgba(0,123,255,0.13);
          transform: scale(1.07);
        }
        .interactive-repo-card:hover::after {
          content: '';
          position: absolute;
          left: 50%; top: 10px;
          width: 100px; height: 0;
          pointer-events: none;
          background: url('https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@master/static/img/confetti.png') repeat-x;
          background-size: contain;
          transform: translateX(-50%);
          animation: confettiDrop 1.2s linear;
        }
        @keyframes confettiDrop {
          0% { height: 0; opacity: 1; }
          100% { height: 40px; opacity: 0; }
        }
        @media (max-width: 768px) {
          .repo-bg-shape-1, .repo-bg-shape-2, .repo-bg-shape-3 {
            width: 60px !important;
            height: 60px !important;
          }
          .repo-card {
            border-radius: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
