

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
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3">Loading repositories...</span>
      </div>
    );
  if (error)
    return (
      <p className="text-danger text-center mt-5">{error}</p>
    );

  return (
    <div
      className="container mt-5"
      style={{
        background: '#f3f6f9ff',
        minHeight: '100vh',
        borderRadius: 16,
        paddingBottom: 32,
      }}
    >
      <h3 className="mb-4 text-center text-dark fw-bold">
        <span>📦</span> Select a GitHub Repository
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
                animation: 'fadeInUp 0.3s',
              }}
            >
              <div
                className="card h-100 border-0 shadow-sm repo-card"
                style={{
                  background: 'linear-gradient(115deg, #fff 90%, #f3f6fa 100%)',
                  borderRadius: '16px',
                  transition: 'all .25s cubic-bezier(.4,0,.2,1)',
                  boxShadow: '0 4px 18px rgba(180,200,225,0.09)',
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.transform = 'scale(1.03)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              >
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <div>
                    <div className="d-flex justify-content-center mb-2">
                      <img
                        src={repo.owner?.avatar_url}
                        alt={repo.owner?.login}
                        className="rounded-circle me-2"
                        style={{
                          width: 38,
                          height: 38,
                          border: '1.5px solid #e3e8ef',
                          boxShadow: '0 0 0 2px #f3f6fa',
                          objectFit: 'cover',
                        }}
                        title={repo.owner?.login}
                      />
                    </div>
                    <h5
                      className="card-title fw-semibold mb-2"
                      style={{ color: '#222' }}
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
  className="btn custom-btn mt-3"
  id="btns"
  title="Browse files in this repository"
  onClick={() => {
    onRepoSelect(repo);
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
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .repo-card:hover {
          box-shadow: 0 10px 28px rgba(52, 144, 255, 0.13);
          border: 1px solid #b6e0fe;
        }
      `}</style>
    </div>
  );
}

