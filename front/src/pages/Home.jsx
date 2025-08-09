
// import React from 'react';
// import { Link } from 'react-router-dom';
// import OAuthLogin from '../components/OAuthLogin'; // adjust path if needed

// export default function Home() {
//   return (
//     <div className="container d-flex align-items-start justify-content-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
//       <div className="text-center shadow p-5 rounded bg-light" style={{ maxWidth: '600px', width: '100%' }}>
//         <h1 className="mb-4 text-primary">Test Case Generator</h1>
//         <p className="lead mb-4">
//           🚀 Easily connect your GitHub, select code files, and generate automated test cases using AI!
//         </p>

//         {/* GitHub Login Button */}
//         <OAuthLogin />

//         <p className="mt-3 text-muted">
//           Don't worry, we only access your repositories with your permission.
//         </p>
//       </div>
//     </div>
//   );
// }




import React from 'react';
import { Link } from 'react-router-dom';
import OAuthLogin from '../components/OAuthLogin'; // adjust path if needed

export default function Home() {
  return (
    <div
      className="container d-flex align-items-start justify-content-center"
      style={{
        minHeight: '100vh',
        paddingTop: '80px',
        backgroundColor: '#f5f7fa', // light subtle background
      }}
    >
      <div
        className="text-center shadow p-5 rounded"
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#ffffff', // clean white card
          border: '1px solid #e0e0e0', // subtle border
        }}
      >
        <h1 className="mb-4" style={{ color: '#007bff', fontWeight: '600' }}>
          Test Case Generator
        </h1>
        <p className="lead mb-4" style={{ color: '#495057' }}>
          🚀 Easily connect your GitHub, select code files, and generate automated test cases using AI!
        </p>

        {/* GitHub Login Button */}
        <OAuthLogin />

        <p className="mt-4" style={{ color: '#6c757d', fontSize: '0.9rem' }}>
          🔒 Don't worry, we only access your repositories with your permission.
        </p>
      </div>
    </div>
  );
}
