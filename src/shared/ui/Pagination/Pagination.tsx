'use client';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import classNames from 'classnames';

type PaginationProps = {
  pageCount: number;
  page: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  pageCount,
  page,
  onPageChange,
  className,
}: PaginationProps) {
  console.log(pageCount);
  if (!pageCount || pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={null}
      previousLabel={null}
      forcePage={page - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      pageCount={pageCount}
      containerClassName={classNames(styles.root, className)}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}
      breakClassName={classNames(styles.pageItem, styles.break)}
      breakLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
    />
  );
}
