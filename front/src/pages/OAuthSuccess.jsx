
// src/pages/OauthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OauthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
   

    if (token) {
      localStorage.setItem('githubToken', token); // Store token in local storage
      navigate('/repolist'); // ✅ Redirect to /repolist instead of /select-files
    }
  }, [searchParams, navigate]);

  return <p>Logging in with GitHub...</p>;
}


