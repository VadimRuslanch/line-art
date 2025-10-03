import './UIFavorite.scss';
import IconHeart from '@/shared/assets/svg/heart.svg';

export default function UIFavorite() {
  return (
    <button className="UIFavorite">
      <IconHeart className="UIFavorite__icon" />
    </button>
  );
}
