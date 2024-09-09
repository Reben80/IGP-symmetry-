import React from 'react';
import '../styles/SymmetryButton.css';

interface SymmetryButtonProps {
  onClick: () => void;
  label: string;
}

const SymmetryButton: React.FC<SymmetryButtonProps> = ({ onClick, label }) => {
  return (
    <button className="symmetry-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default SymmetryButton;