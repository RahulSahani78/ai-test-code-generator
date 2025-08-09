import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('github_token'); // Adjust based on your auth logic

  return isAuthenticated ? children : <Navigate to="/login" />;
}
