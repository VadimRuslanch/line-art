'use client';

import React, { useEffect, useRef, useState } from 'react';
import './CategoriesSelect.scss';
import { useGetCategoriesCatalog } from '@/features/catalog/catalog-filters/api/useGetCategoriesCatalog';
import { useAppDispatch } from '@/shared/model/hooks';
import { setCategory } from '@/features/catalog/catalog-filters/model/slice';
import Icon from './icon/iconamoon_arrow-down-2.svg';

type categories = {
  id: string;
  databaseId: number;
  name?: string | null;
};

type Props = {
  placeholder?: string;
};

export const CategoriesSelect: React.FC<Props> = ({
  placeholder = 'Категории',
}) => {
  const { categories } = useGetCategoriesCatalog();
  const dispatch = useAppDispatch();
  const options = categories ?? [];

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [selected, setSelected] = useState<categories | null>(null);
  const [typeahead, setTypeahead] = useState('');
  const typeTimer = useRef<number | null>(null);

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const idBase = useRef(`cs-${Math.random().toString(36).slice(2)}`).current;

  useEffect(() => {
    setHighlight(0);
  }, [options.length]);

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
    setSelected(opt);
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

  // console.log(
  //   options.map((item) => {
  //     return item.slug;
  //   }),
  // );

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
        {/*<span className="cs-button__icon" aria-hidden>*/}
        {/*  ▾*/}
        {/*</span>*/}
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
          {options.length === 0 && <li className="cs-empty">Нет категорий</li>}

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
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(i)}
              >
                {opt.name}
              </li>
            );
          })}
        </ul>
      )}

      {/* Если нужна интеграция с формой — скрытое поле */}
      <input type="hidden" name="categoryId" value={selected?.id ?? ''} />
    </div>
  );
};
