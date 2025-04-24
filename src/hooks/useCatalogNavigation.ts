import { useState } from 'react';

export default function useCatalogNavigation(
  initialCategory = 0,
  initialCategoryItem = 0,
) {
  const [activeCategory, setActiveCategory] = useState<number>(initialCategory);
  const [activeCategoryItem, setActiveCategoryItem] =
    useState<number>(initialCategoryItem);

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setActiveCategoryItem(0);
  };

  const handleCategoryItemChange = (index: number) => {
    setActiveCategoryItem(index);
  };

  return {
    activeCategory,
    activeCategoryItem,
    handleCategoryChange,
    handleCategoryItemChange,
  };
}
