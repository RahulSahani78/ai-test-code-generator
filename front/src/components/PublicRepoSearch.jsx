
import React, { useState, useRef } from 'react';
import { getPublicRepos } from '../services/githubService';

export default function PublicRepoSearch({ onRepoSelect }) {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const fetchRepos = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setRepos([]);

    try {
      const res = await getPublicRepos(username.trim());
      if (res.data.length === 0) {
        setError('No public repositories found.');
      } else {
        setRepos(res.data);
      }
    } catch (err) {
      setError('Failed to fetch repositories. Please check the username and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchRepos();
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h4 className="mb-4 d-flex align-items-center">
            <i className="bi bi-github me-2" style={{ fontSize: '1.5rem' }}></i>
            Search Public GitHub Repositories
          </h4>

          <div className="card p-4 shadow-sm">
            <div className="mb-3">
              <input
                type="text"
                ref={inputRef}
                className="form-control"
                placeholder="Enter GitHub username (e.g., alex123)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="GitHub Username"
                autoFocus
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary px-4"
                onClick={fetchRepos}
                disabled={loading || !username.trim()}
              >
                {loading ? 'Loading...' : 'Search'}
              </button>
            </div>

            {error && (
              <div className="alert alert-danger mt-3 text-center" role="alert">
                {error}
              </div>
            )}

            {repos.length > 0 && (
              <div className="list-group mt-4">
                {repos.map((repo) => (
                  <button
                    key={repo.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => onRepoSelect(repo)}
                    aria-label={`Select repository ${repo.full_name}`}
                  >
                    {repo.full_name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
