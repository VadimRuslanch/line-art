import styles from '@/shared/ui/layout/SideMenuComponent/SideMenuComponent.module.scss';
import Link from 'next/link';

interface CategoryWithUriAndName {
  uri?: string | null;
  name?: string | null;
}

export default function CatalogMenuItems<T extends CategoryWithUriAndName>({
  title,
  titleNumber,
  categoriesItems,
  handleCategoryChange,
}: {
  title: string;
  titleNumber: string;
  categoriesItems: T[];
  handleCategoryChange: (index: number) => void;
}) {
  return (
    <nav className={styles.menuItem}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
        <span className={styles.titleNumber}>{titleNumber}</span>
      </div>
      <ul>
        {categoriesItems.map((category, index) => (
          <li key={index} onMouseEnter={() => handleCategoryChange(index)}>
            {category.uri ? (
              <Link className={styles.catalogItem} href={category.uri}>
                {category.name}
              </Link>
            ) : (
              category.name
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
