export interface Catalog {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children: {
    nodes: Catalog[];
  };
}

export interface CatalogData {
  productCategories: {
    nodes: Catalog[];
  };
}

export interface MainSliderData {
  page: {
    homeMainSlider: {
      main_slider: Slider[];
    };
  };
}

export interface Slider {
  title: string;
  id: number;
  description: string;
  image: {
    node: {
      sourceUrl: string;
    };
  };
}

export interface PromotionalLinkData {
  page: {
    promotionalBlock: {
      promotion: PromotionalLink[];
      novelty: PromotionalLink[];
    };
  };
}

export interface PromotionalLink {
  alt: string;
  link: string;
  image: {
    node: {
      sourceUrl: string;
    };
  };
}
