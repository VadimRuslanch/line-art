'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { useLazyQuery } from '@apollo/client/react';

import {
  GetProductListByNameDocument,
  type GetProductListByNameQuery,
  type GetProductListByNameQueryVariables,
} from '@/shared/api/gql/graphql';

const DEBOUNCE_DELAY = 300;

type ProductNode = NonNullable<
  NonNullable<GetProductListByNameQuery['products']>['nodes']
>[number];

type UseProductSearchResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  results: ProductNode[];
  isOpen: boolean;
  isLoading: boolean;
  error?: unknown;
  close: () => void;
};

export function useProductSearch(): UseProductSearchResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<number | null>(null);

  const [fetchProducts, { data, loading, error }] = useLazyQuery<
    GetProductListByNameQuery,
    GetProductListByNameQueryVariables
  >(GetProductListByNameDocument, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    return () => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (!nextValue.trim()) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleFocus = useCallback(() => {
    if (value.trim()) {
      setIsOpen(true);
    }
  }, [value]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      return;
    }

    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      fetchProducts({
        variables: { searchTerm: trimmed },
      }).catch(() => {
        /* swallow errors, handled via state */
      });
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [value, fetchProducts]);

  const results = useMemo(() => {
    const nodes = data?.products?.nodes ?? [];
    return nodes.filter((node): node is ProductNode => Boolean(node));
  }, [data?.products?.nodes]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const target = event.target as Node | null;
      if (target && !containerRef.current.contains(target)) {
        close();
      }
    };

    const handleScroll = () => {
      close();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, {
      passive: true,
    });
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, close]);

  return {
    containerRef,
    value,
    onChange: handleChange,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    results,
    isOpen: isOpen && Boolean(value.trim()),
    isLoading: loading,
    error,
    close,
  };
}
