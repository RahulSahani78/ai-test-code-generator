// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} Test Case Generator App. All rights reserved.</p>
        <small>Built with  using React and Bootstrap</small>
      </div>
    </footer>
  );
}
