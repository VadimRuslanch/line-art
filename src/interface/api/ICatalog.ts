export interface ICatalogProducts {
  productCategories: ICategories;
}

interface ICategories {
  nodes: ICategory[];
}

interface ISubcategories {
  nodes: ISubcategory[];
}

interface ICategory {
  id: string;
  name: string;
  slug: string;
  children?: ISubcategories;
}

interface ISubcategory {
  id: string;
  name: string;
  slug: string;
  image: IImage;
}

interface IImage {
  altText: string;
  sourceUrl: string;
}
