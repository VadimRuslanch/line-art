'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import './CategoriesSelect.scss';
import { useGetCategoriesCatalog } from '@/features/catalog/catalog-filters/api/useGetCategoriesCatalog';
import { useAppDispatch, useAppSelector } from '@/shared/model/hooks';
import { setCategory } from '@/features/catalog/catalog-filters/model/slice';
import Icon from './icon/iconamoon_arrow-down-2.svg';
import { selectSelectedFilters } from '@/features/catalog/catalog-filters';

type CategoryOption = {
  id: string;
  databaseId: number;
  name?: string | null;
  slug?: string | null;
};

type Props = {
  placeholder?: string;
};

export const CategoriesSelect: React.FC<Props> = ({
  placeholder = 'Выберите категорию',
}) => {
  const { categories } = useGetCategoriesCatalog();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(selectSelectedFilters);
  const options = useMemo<CategoryOption[]>(
    () => (categories ?? []) as CategoryOption[],
    [categories],
  );

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [typeahead, setTypeahead] = useState('');
  const typeTimer = useRef<number | null>(null);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const idBase = useRef(`cs-${Math.random().toString(36).slice(2)}`).current;

  useEffect(() => {
    setHighlight(0);
  }, [options.length]);

  const selectedSlug = selectedFilters.category?.[0] ?? null;
  const selected = useMemo(() => {
    if (!selectedSlug) return null;
    return options.find((opt) => opt.slug === selectedSlug) ?? null;
  }, [options, selectedSlug]);

  useEffect(() => {
    if (!selectedSlug) {
      setHighlight(0);
      return;
    }
    const idx = options.findIndex((opt) => opt.slug === selectedSlug);
    if (idx >= 0) setHighlight(idx);
  }, [options, selectedSlug]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!btnRef.current || !listRef.current) return;
      if (
        !btnRef.current.contains(e.target as Node) &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${highlight}"]`,
    );
    node?.scrollIntoView({ block: 'nearest' });
  }, [highlight, open]);

  const commit = (idx: number) => {
    const opt = options[idx];
    if (!opt) return;
    if (!opt.slug) return;
    setOpen(false);
    btnRef.current?.focus();
    dispatch(setCategory(opt.slug));
  };

  const move = (delta: number) => {
    if (!options.length) return;
    setHighlight((h) => {
      const next = (h + delta + options.length) % options.length;
      return next;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!options.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      move(1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      move(-1);
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setOpen(true);
      setHighlight(0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      setOpen(true);
      setHighlight(options.length - 1);
      return;
    }
    if (e.key === 'PageDown') {
      e.preventDefault();
      setOpen(true);
      move(5);
      return;
    }
    if (e.key === 'PageUp') {
      e.preventDefault();
      setOpen(true);
      move(-5);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (open) commit(highlight);
      else setOpen(true);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }

    const isChar = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
    if (isChar) {
      const next = (typeahead + e.key).toLowerCase();
      setTypeahead(next);
      if (typeTimer.current) window.clearTimeout(typeTimer.current);
      typeTimer.current = window.setTimeout(() => setTypeahead(''), 500);

      const start = open ? highlight + 1 : 0;
      const ring = [...options.slice(start), ...options.slice(0, start)];
      const foundIndexInRing = ring.findIndex((o) =>
        (o.name ?? '').toLowerCase().startsWith(next),
      );
      if (foundIndexInRing >= 0) {
        const idx = (start + foundIndexInRing) % options.length;
        setOpen(true);
        setHighlight(idx);
      }
    }
  };

  const selectedLabel = selected?.name ?? placeholder;

  return (
    <div className="cs-root">
      <button
        ref={btnRef}
        type="button"
        className="cs-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={selected ? `Категория: ${selected.name}` : placeholder}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="ButtonBut2-medium cs-button__label">
          {selectedLabel}
        </span>
        <Icon data-state={open} className="cs-button__icon" />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${idBase}-listbox`}
          role="listbox"
          className="cs-list"
          tabIndex={-1}
          onKeyDown={onKeyDown}
        >
          {options.length === 0 && <li className="cs-empty">Нет вариантов</li>}

          {options.map((opt, i) => {
            const isSelected = selected?.id === opt.id;
            const isActive = i === highlight;
            return (
              <li
                key={opt.id}
                id={`${idBase}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                className={[
                  'cs-option',
                  isActive ? 'is-active' : '',
                  isSelected ? 'is-selected' : '',
                ].join(' ')}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(evt) => evt.preventDefault()}
                onClick={() => commit(i)}
              >
                {opt.name}
              </li>
            );
          })}
        </ul>
      )}

      <input type="hidden" name="categoryId" value={selected?.id ?? ''} />
    </div>
  );
};
