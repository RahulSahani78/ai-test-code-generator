// src/pages/SummaryPage.jsx
import React from 'react';
import SummaryList from '../components/SummaryList';
import { useNavigate } from 'react-router-dom';

export default function SummaryPage() {
  const navigate = useNavigate();

  const handleSummarySelect = () => {
    navigate('/generate-code');
  };

  return (
    <div>
      <SummaryList onSummarySelect={handleSummarySelect} />
    </div>
  );
}





