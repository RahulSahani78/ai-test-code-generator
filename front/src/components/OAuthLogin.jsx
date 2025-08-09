import React from 'react';

const OAuthLogin = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/github`;
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



