import Link from 'next/link';
import IconArrow from '@/shared/assets/svg/arrow-small.svg';

interface CategoryWithUriAndName {
  uri?: string | null;
  name?: string | null;
}

export default function CatalogMenuItems<T extends CategoryWithUriAndName>({
  title,
  titleNumber,
  categoriesItems,
  handleCategoryChange,
  toggleCatalog,
  ...props
}: {
  title: string;
  titleNumber: string;
  categoriesItems: T[];
  handleCategoryChange: (index: number) => void;
  toggleCatalog?: () => void;
}) {
  return (
    <nav className="menuItem" {...props}>
      <div className="catalog__header">
        {toggleCatalog && (
          <button onClick={toggleCatalog} className="catalog__button">
            <IconArrow />
            Назад
          </button>
        )}
        <div className="titleContainer">
          <span>{title}</span>
          <span className="titleNumber">{titleNumber}</span>
        </div>
      </div>
      <ul>
        {categoriesItems.map((category, index) => (
          <li key={index} onMouseEnter={() => handleCategoryChange(index)}>
            {category.uri ? (
              <Link className="catalogItem" href={category.uri}>
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
