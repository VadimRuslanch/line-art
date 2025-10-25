import './UIButton.scss';
import React from 'react';

interface UIButtonProps {
  handleAdd: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function UIButton({
  handleAdd,
  children,
  disabled = false,
}: UIButtonProps) {
  return (
    <button
      type="button"
      onClick={handleAdd}
      className="UIButton"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
