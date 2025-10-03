import './UIChip.scss';
import React from 'react';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const UIChip: React.FC<ChipProps> = ({ children, ...props }) => {
  return (
    <button className="chip" {...props}>
      <span className="ButtonBut2-medium">{children}</span>
    </button>
  );
};

export default UIChip;
