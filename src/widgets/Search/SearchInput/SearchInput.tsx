'use client';

import Link from 'next/link';

import IconSearch from '@/shared/assets/svg/search.svg';

import { useProductSearch } from './model/useProductSearch';
import './SearchInput.scss';

const DROPDOWN_ID = 'header-search-dropdown';

export function SearchInput() {
  const {
    containerRef,
    value,
    onChange,
    onFocus,
    onKeyDown,
    results,
    isOpen,
    isLoading,
    error,
    close,
  } = useProductSearch();

  const hasResults = results.length > 0;

  return (
    <div className="header__search-container" ref={containerRef}>
      <label className="header__search-label" htmlFor="search">
        <IconSearch />
        <input
          id="search"
          className="header__search"
          type="search"
          placeholder="Search products"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={DROPDOWN_ID}
        />
      </label>

      {isOpen && (
        <div className="header__search-dropdown" id={DROPDOWN_ID} role="listbox">
          {isLoading ? (
            <div className="header__search-dropdown-state">Loading...</div>
          ) : error ? (
            <div className="header__search-dropdown-state">
              Failed to load results
            </div>
          ) : hasResults ? (
            <ul className="header__search-dropdown-list">
              {results.map((product, index) => {
                const key =
                  product.databaseId ??
                  product.slug ??
                  `${product.name ?? 'product'}-${index}`;
                const name = product.name ?? 'Unnamed product';

                if (!product.slug) {
                  return (
                    <li
                      key={key}
                      className="header__search-dropdown-item header__search-dropdown-item--disabled"
                      role="option"
                      aria-disabled="true"
                      aria-selected="false"
                    >
                      {name}
                    </li>
                  );
                }

                return (
                  <li
                    key={key}
                    className="header__search-dropdown-item"
                    role="option"
                    aria-selected="false"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="header__search-dropdown-link"
                      onClick={close}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="header__search-dropdown-state">Nothing found</div>
          )}
        </div>
      )}
    </div>
  );
}
