import Link from 'next/link';
import IconArrow from '@/shared/assets/svg/arrow-small.svg';

interface CategoryWithUriAndName {
  uri?: string | null;
  name?: string | null;
}

type Props<T> = {
  title: string;
  titleNumber: string;
  categoriesItems: T[];
  handleCategoryChange: (index: number) => void;
  toggleCatalog?: () => void;
};

export default function CatalogMenuItems<T extends CategoryWithUriAndName>({
  title,
  titleNumber,
  categoriesItems,
  handleCategoryChange,
  toggleCatalog,
  ...props
}: Props<T>) {
  return (
    <nav className="menuItem" {...props}>
      <div className="catalog__header">
        <button onClick={toggleCatalog} className="catalog__button">
          <IconArrow />
          <span className="SubtitleS1">{title}</span>
        </button>

        <span className="SubtitleS1">{titleNumber}</span>
      </div>
      <ul>
        {categoriesItems.map((category, index) => (
          <li key={index} onMouseEnter={() => handleCategoryChange(index)}>
            {category.uri ? (
              <Link className="BodyB1 catalogItem" href={category.uri}>
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
