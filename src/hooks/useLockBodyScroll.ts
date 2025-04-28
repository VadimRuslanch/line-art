import { useLayoutEffect } from 'react';

export function useLockBodyScroll(isLocked: boolean) {
  useLayoutEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}
