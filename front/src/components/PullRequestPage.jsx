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
import { createPullRequest } from '../services/prService';

export default function PullRequestPage() {
  const [loading, setLoading] = useState(false);
  const [prLink, setPrLink] = useState('');
  const [error, setError] = useState('');

  const handleCreatePR = async () => {
    const repo = JSON.parse(localStorage.getItem('selectedRepo'));
    const files = JSON.parse(localStorage.getItem('selectedFiles'));
    const code = localStorage.getItem('generatedTestCode');
    const filePath = '__tests__/generated.test.js';

    console.log("📦 Local Data:", { repo, files, codeLength: code?.length });

    if (!repo || !files || !code) {
      setError('⚠ Missing data for PR creation.');
      return;
    }

    const branchName = repo.default_branch || 'main';
    setLoading(true);
    setError('');

    try {
      const res = await createPullRequest({
        owner: repo.owner.login,
        repo: repo.name,
        branch: branchName,
        filePath,
        code,
        commitMessage: 'Add AI-generated test cases',
      }, 3); // retry count

      setPrLink(res.data.pullRequestUrl);
    } catch (err) {
      console.error("❌ PR creation failed:", err.response?.data || err.message);
      setError(`Failed to create PR: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">Create GitHub Pull Request</h4>

      {error && (
        <div className="alert alert-danger">
          {error} <br />
          <button className="btn btn-sm btn-warning mt-2" onClick={handleCreatePR} disabled={loading}>
            Retry Now
          </button>
        </div>
      )}

      {prLink ? (
        <div className="alert alert-success">
          ✅ Pull Request created:{" "}
          <a href={prLink} target="_blank" rel="noreferrer">{prLink}</a>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={handleCreatePR} disabled={loading}>
          {loading ? 'Creating PR...' : 'Create Pull Request'}
        </button>
      )}
    </div>
  );
}
