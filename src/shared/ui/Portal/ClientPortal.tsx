'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  containerId?: string;
};

export default function ClientPortal({
  children,
  containerId = 'portal-root',
}: Props) {
  const [mounted, setMounted] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);
  const createdRef = useRef(false);

  useEffect(() => {
    let container = document.getElementById(containerId) as HTMLElement | null;

    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
      createdRef.current = true; // сами создали — потом удалим
    }

    elRef.current = container;
    setMounted(true);

    return () => {
      if (createdRef.current && container?.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, [containerId]);

  if (!mounted || !elRef.current) return null;
  return createPortal(children, elRef.current);
}
