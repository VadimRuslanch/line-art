'use client';
import { useState } from 'react';
import Link from 'next/link';
import './ModalMenuCatalog.scss';
import IconArrow from '@/shared/assets/svg/arrow.svg';
import { Catalog } from '@/shared/types/api';

export default function ModalMenuCatalog({
  categories,
}: {
  categories: Catalog[];
}) {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openSubCategory, setSubOpenCategory] = useState<number | null>(null);

  const handleMouseEnterCategory = (id: number) => {
    setOpenCategory(id);
  };

  const handleMouseEnterSubCategory = (id: number) => {
    setSubOpenCategory(id);
  };

  // const handleMouseLeave = () => {
  //   setOpenCategory(null);
  // };

  return (
    <div className="absolute w-full flex">
      <div className="w-full py-6 bg-gray-50 border border-custom-accent rounded-2xl">
        {categories.map((item, index: number) => (
          <div
            key={item.id}
            className="relative group"
            onMouseEnter={() => handleMouseEnterCategory(index)}
          >
            <Link
              href={''}
              className="flex items-center justify-between py-1 px-4"
            >
              <span className="font-medium text-sm leading-normal">
                {item.name}
              </span>
              <IconArrow className="link__icon-arrow" />
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute -mr-1 -right-1/2">
        {openCategory &&
          categories[openCategory] &&
          categories[openCategory].children.nodes.length > 0 && (
            <div className="w-full py-6 bg-gray-50 border border-custom-accent rounded-2xl">
              {categories[openCategory].children.nodes.map(
                (item, index: number) => (
                  <Link
                    key={item.id}
                    href={''}
                    className="flex items-center justify-between"
                    onMouseEnter={() => handleMouseEnterSubCategory(index)}
                  >
                    <span className="font-medium text-sm leading-normal">
                      {item.name}
                    </span>
                    <IconArrow className="link__icon-arrow" />
                  </Link>
                ),
              )}
            </div>
          )}
      </div>
      <div className="absolute -mr-2 -right-full">
        {openCategory &&
          openSubCategory &&
          categories[openCategory].children.nodes[openSubCategory] &&
          categories[openCategory].children.nodes[openSubCategory].children
            .nodes.length > 0 && (
            <div className="w-full py-6 bg-gray-50 border border-custom-accent rounded-2xl">
              {categories[openCategory].children.nodes[
                openSubCategory
              ].children.nodes.map((sub, index: number) => (
                <Link
                  key={sub.id}
                  href={''}
                  className="flex items-center justify-between"
                  onMouseEnter={() => handleMouseEnterSubCategory(index)}
                >
                  <span className="font-medium text-sm leading-normal">
                    {sub.name}
                  </span>
                  <IconArrow className="link__icon-arrow" />
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
