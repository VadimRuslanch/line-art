import './ButtonMenuCatalog.scss';
import IconArrow from '@/shared/assets/svg/arrow.svg';
import IconBurger from '@/shared/assets/svg/burger.svg';

interface ButtonMenuCatalogProps {
  onClick?: () => void;
}

export default function ButtonMenuCatalog({ onClick }: ButtonMenuCatalogProps) {
  return (
    <button
      onClick={onClick}
      className="ButtonMenuCatalog pb-3.5 pt-3.5 flex justify-center items-center rounded-lg"
    >
      <IconBurger className={'mr-2.5'} />
      <span className={'text-white ButtonMenuCatalog__text'}>
        Каталог товаров
      </span>
      <IconArrow className={'w-5 h-5 stroke-white ml-9'} />
    </button>
  );
}
