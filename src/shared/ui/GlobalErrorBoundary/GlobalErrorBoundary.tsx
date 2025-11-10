'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type BoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type BoundaryState = {
  hasError: boolean;
};

class Boundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Global UI error boundary caught an error', error, info);
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            style={{
              padding: '32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <p className="BodyB2">
              Что-то пошло не так. Мы уже работаем над решением проблемы.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                padding: '10px 16px',
                borderRadius: '4px',
                border: '1px solid currentColor',
                cursor: 'pointer',
              }}
            >
              Обновить страницу
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export function GlobalErrorBoundary({
  children,
  fallback,
}: BoundaryProps): ReactNode {
  const pathname = usePathname();

  return (
    <Boundary key={pathname} fallback={fallback}>
      {children}
    </Boundary>
  );
}
