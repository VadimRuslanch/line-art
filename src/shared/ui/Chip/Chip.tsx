import styles from './Chip.module.scss';
import React from 'react';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ children, ...props }) => {
  return (
    <button className={styles.chip} {...props}>
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Chip;
