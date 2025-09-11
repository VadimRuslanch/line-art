import './UIButton.scss';
import React from 'react';

export default function UIButton({
  handleAdd,
  children,
}: {
  handleAdd: () => void;
  state?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={handleAdd} className="UIButton">
      {children}
    </button>
  );
}
