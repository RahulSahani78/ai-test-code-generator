import React from 'react';

const OAuthLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  return (
    <div className="container mt-5">
      <h3>Login with GitHub</h3>
      <button onClick={handleLogin} className="btn btn-dark">
        Login with GitHub
      </button>
    </div>
  );
};

export default OAuthLogin;



