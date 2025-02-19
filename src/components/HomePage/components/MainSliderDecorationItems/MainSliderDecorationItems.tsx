import '../../style/MainSliderDecorationItems.scss';
import Image from 'next/image';

const itemsList = [
  {
    id: 1,
    title: 'Широкий ассортимент',
    image: '/svg/components/cart-tick.svg',
  },
  {
    id: 12,
    title: 'Высокое качество',
    image: '/svg/components/chart-up.svg',
  },
  {
    id: 13,
    title: 'Цена от производителя',
    image: '/svg/components/tag-ruble.svg',
  },
  {
    id: 14,
    title: 'Собственный склад',
    image: '/svg/components/home.svg',
  },
];

export default function MainSliderDecorationItems() {
  return (
    <div className="MainSliderDecorationItems">
      {itemsList.map((item) => (
        <div key={item.id} className="MainSliderDecorationItems__item">
          <span className="MainSliderDecorationItems__item-title">
            {item.title}
          </span>
          <Image
            className="MainSliderDecorationItems__item-image"
            src={item.image}
            alt="image"
            width={230}
            height={230}
          />
        </div>
      ))}
    </div>
  );
}
