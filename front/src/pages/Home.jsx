
// import React from 'react';
// import { Link } from 'react-router-dom';
// import OAuthLogin from '../components/OAuthLogin'; // adjust path if needed

// export default function Home() {
//   return (
//     <div
//       className="container d-flex align-items-start justify-content-center"
//       style={{
//         minHeight: '100vh',
//         paddingTop: '80px',
//         backgroundColor: '#f5f7fa', // light subtle background
//       }}
//     >
//       <div
//         className="text-center shadow p-5 rounded"
//         style={{
//           maxWidth: '600px',
//           width: '100%',
//           backgroundColor: '#ffffff', // clean white card
//           border: '1px solid #e0e0e0', // subtle border
//         }}
//       >
//         <h1 className="mb-4" style={{ color: '#007bff', fontWeight: '600' }}>
//           Test Case Generator
//         </h1>
//         <p className="lead mb-4" style={{ color: '#495057' }}>
//           🚀 Easily connect your GitHub, select code files, and generate automated test cases using AI!
//         </p>

//         {/* GitHub Login Button */}
//         <OAuthLogin />

//         <p className="mt-4" style={{ color: '#6c757d', fontSize: '0.9rem' }}>
//           🔒 Don't worry, we only access your repositories with your permission.
//         </p>
//       </div>
//     </div>
//   );
// }



import OAuthLogin from '../components/OAuthLogin'; // adjust path if needed

export default function Home() {
  return (
    <div
      className="container d-flex align-items-start justify-content-center home-bg"
      style={{
        minHeight: '100vh',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background circles */}
      <div className="bg-animated-circle bg-circle-1"></div>
      <div className="bg-animated-circle bg-circle-2"></div>
      <div className="bg-animated-circle bg-circle-3"></div>
      <div
        className="text-center shadow p-5 rounded animate__animated animate__fadeInDown"
        style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.97)',
          border: '1px solid #e0e0e0',
          zIndex: 2,
          position: 'relative',
        }}
      >
        <h1 className="mb-4" style={{ color: '#007bff', fontWeight: '700', letterSpacing: '.02em', textShadow: '0 2px 8px #e3f0ff' }}>
          Test Case Generator
        </h1>
        <p className="lead mb-4" style={{ color: '#495057', fontSize: '1.18rem', fontWeight: 500 }}>
          🚀 Easily connect your GitHub, select code files, and generate automated test cases using AI!
        </p>

        {/* GitHub Login Button */}
        <div className="animate__animated animate__fadeInUp animate__delay-1s">
          <OAuthLogin />
        </div>

        <p className="mt-4" style={{ color: '#6c757d', fontSize: '0.95rem', fontWeight: 500 }}>
          🔒 Don't worry, we only access your repositories with your permission.
        </p>
      </div>
      <style>{`
        .home-bg {
          background: linear-gradient(120deg, #e3f0ff 0%, #f5f7fa 100%);
        }
        .bg-animated-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.22;
          animation: floatUp 7s ease-in-out infinite alternate;
          z-index: 1;
        }
        .bg-circle-1 {
          width: 220px;
          height: 220px;
          left: -60px;
          top: 60px;
          background: #b3e0ff;
          animation-delay: 0s;
        }
        .bg-circle-2 {
          width: 160px;
          height: 160px;
          right: -40px;
          top: 180px;
          background: #a5d8ff;
          animation-delay: 2s;
        }
        .bg-circle-3 {
          width: 120px;
          height: 120px;
          left: 50%;
          bottom: 40px;
          background: #c3eaff;
          transform: translateX(-50%);
          animation-delay: 1s;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-30px) scale(1.07); }
        }
        .animate__animated {
          animation-duration: 1.1s;
          animation-fill-mode: both;
        }
        .animate__fadeInDown {
          animation-name: fadeInDown;
        }
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        .animate__delay-1s {
          animation-delay: 0.7s;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate3d(0, -40px, 0);}
          to { opacity: 1; transform: none;}
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0);}
          to { opacity: 1; transform: none;}
        }
        @media (max-width: 768px) {
          .text-center.shadow.p-5.rounded {
            padding: 2rem !important;
          }
          .bg-circle-1, .bg-circle-2, .bg-circle-3 {
            width: 90px !important;
            height: 90px !important;
          }
        }
      `}</style>
    </div>
  );
}