import './UIButton.scss';
import React from 'react';

export default function UIButton({
  handleAdd,
  state,
  children,
}: {
  handleAdd: () => void;
  state: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={state}
      className="UIButton"
    >
      {children}
    </button>
  );
}
