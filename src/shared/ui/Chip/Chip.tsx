import styles from './Chip.module.scss';
import React from 'react';

export default function Chip({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <button className={styles.chip}>
      <span className={styles.text}>{children}</span>
    </button>
  );
}
