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
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const createdRef = useRef(false);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    let container = document.getElementById(containerId) as HTMLElement | null;

    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
      createdRef.current = true;
    }

    containerRef.current = container;

    const timer = window.setTimeout(() => {
      setPortalNode(container);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      if (createdRef.current && container?.parentNode) {
        container.parentNode.removeChild(container);
      }
      containerRef.current = null;
    };
  }, [containerId]);

  if (!portalNode) return null;
  return createPortal(children, portalNode);
}
