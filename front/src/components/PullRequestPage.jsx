// // src/components/PullRequestPage.jsx
// import React, { useState } from 'react';
// import { createPullRequest } from '../services/prService';

// export default function PullRequestPage() {
//   const [loading, setLoading] = useState(false);
//   const [prLink, setPrLink] = useState('');
//   const [error, setError] = useState('');

//   const handleCreatePR = () => {
//     const repo = JSON.parse(localStorage.getItem('selectedRepo'));
//     const files = JSON.parse(localStorage.getItem('selectedFiles'));
//     const code = localStorage.getItem('generatedTestCode');
//     const filePath = `__tests__/generated.test.js`;
//     console.log({ repo, files, code });


//     if (!repo || !files || !code) {
//       setError('Missing data for PR creation.');
//       return;
//     }

//     setLoading(true);
//     createPullRequest({
//       owner: repo.owner.login,
//       repo: repo.name,
//       branch: 'main',
//       filePath,
//       code,
//       commitMessage: 'Add AI-generated test cases',
//     })
//       .then((res) => {
//         setPrLink(res.data.pullRequestUrl);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Failed to create PR.');
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="text-center">
//       <h4 className="mb-4">Create GitHub Pull Request</h4>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {prLink ? (
//         <div className="alert alert-success">
//           ✅ Pull Request created: <a href={prLink} target="_blank" rel="noreferrer">{prLink}</a>
//         </div>
//       ) : (
//         <button className="btn btn-primary" onClick={handleCreatePR} disabled={loading}>
//           {loading ? 'Creating PR...' : 'Create Pull Request'}
//         </button>
//       )}
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import { createPullRequest } from '../services/prService';

// export default function PullRequestPage() {
//   const [loading, setLoading] = useState(false);
//   const [prLink, setPrLink] = useState('');
//   const [error, setError] = useState('');

//   const handleCreatePR = () => {
//     const repo = JSON.parse(localStorage.getItem('selectedRepo'));
//     const files = JSON.parse(localStorage.getItem('selectedFiles'));
//     const code = localStorage.getItem('generatedTestCode');
//     const filePath = `__tests__/generated.test.js`;

//     console.log({ repo, files, code });

//     if (!repo || !files || !code) {
//       setError('Missing data for PR creation.');
//       return;
//     }

//     // ✅ Default branch dynamically from GitHub API response
//     const branchName = repo.default_branch || 'main';

//     setLoading(true);
//     createPullRequest({
//       owner: repo.owner.login,
//       repo: repo.name,
//       branch: branchName,
//       filePath,
//       code,
//       commitMessage: 'Add AI-generated test cases',
//     })
//       .then((res) => {
//         setPrLink(res.data.pullRequestUrl);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("PR creation failed:", err.response?.data || err.message);
//         setError(`Failed to create PR: ${err.response?.data?.message || err.message}`);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="text-center">
//       <h4 className="mb-4">Create GitHub Pull Request</h4>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {prLink ? (
//         <div className="alert alert-success">
//           ✅ Pull Request created: <a href={prLink} target="_blank" rel="noreferrer">{prLink}</a>
//         </div>
//       ) : (
//         <button className="btn btn-primary" onClick={handleCreatePR} disabled={loading}>
//           {loading ? 'Creating PR...' : 'Create Pull Request'}
//         </button>
//       )}
//     </div>
//   );
// }







import React, { useState } from 'react';
import axios from 'axios';
import { createPullRequest } from '../services/prService';

export default function PullRequestPage() {
  const [loading, setLoading] = useState(false);
  const [prLink, setPrLink] = useState('');
  const [error, setError] = useState('');

  // ✅ Retry helper
  const withRetry = async (fn, retries = 3, delay = 1000) => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await fn();
      } catch (err) {
        attempt++;
        if (attempt >= retries) throw err;
        console.warn(`Retrying... Attempt ${attempt + 1} of ${retries}`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  };

  const handleCreatePR = async () => {
    const repo = JSON.parse(localStorage.getItem('selectedRepo'));
    const files = JSON.parse(localStorage.getItem('selectedFiles'));
    const code = localStorage.getItem('generatedTestCode');
    const filePath = `__tests__/generated.test.js`;

    console.log({ repo, files, code });

    if (!repo || !files || !code) {
      setError('Missing data for PR creation.');
      return;
    }

    setLoading(true);

    try {
      // ✅ Get branch (with retry)
      let branchName = repo.default_branch;
      if (!branchName) {
        const branchData = await withRetry(async () => {
          const res = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          });
          return res.data.default_branch;
        });
        branchName = branchData || 'main';
      }

      // ✅ Create PR (with retry)
      const response = await withRetry(async () => {
        return await createPullRequest({
          owner: repo.owner.login,
          repo: repo.name,
          branch: branchName,
          filePath,
          code,
          commitMessage: 'Add AI-generated test cases',
        });
      });

      setPrLink(response.data.pullRequestUrl);
    } catch (err) {
      console.error("PR creation failed:", err.response?.data || err.message);
      setError(`Failed to create PR: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">Create GitHub Pull Request</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {prLink ? (
        <div className="alert alert-success">
          ✅ Pull Request created: <a href={prLink} target="_blank" rel="noreferrer">{prLink}</a>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={handleCreatePR} disabled={loading}>
          {loading ? 'Creating PR...' : 'Create Pull Request'}
        </button>
      )}
    </div>
  );
}
