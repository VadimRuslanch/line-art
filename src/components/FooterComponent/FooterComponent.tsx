import './Footer.scss';
import ButtonLogo from '@/shared/ui/ButtonLogo/ButtonLogo';
import Link from 'next/link';

export default function FooterComponent() {
  return (
    <footer className={'footer'}>
      <div className={'footer__logo'}>
        <ButtonLogo />
      </div>

      <div className={'footer__navigation footer__contacts'}>
        <span className="footer-navigation__title">Контакты</span>
        <ul className="footer-navigation__list">
          <li className="footer-navigation__list-item">
            <a>+7 (495) 790-94-55</a>
          </li>
          <li className="footer-navigation__list-item">
            <a>info@lineart-alumo.ru</a>
          </li>
          <button className="footer__button">Письмо директору</button>
        </ul>
      </div>

      <div className={'footer__navigation footer__categories'}>
        <span className={'footer-navigation__title'}>Категории</span>
        <ul className="footer-navigation__list">
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Теневой плинтус</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Скрытый плинтус</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Плинтус с подсветкой</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Алюминиевый плинтус</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Парящий плинтус</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Щелевой плинтус</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Парящий профиль</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Профиль для стеновой панели</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Алюминиевый профиль</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Алюминиевые полки</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Аксессуары</Link>
          </li>
        </ul>
      </div>

      <div className={'footer__navigation footer__menu'}>
        <span className={'footer-navigation__title'}>Меню</span>
        <ul className="footer-navigation__list">
          <li className="footer-navigation__list-item">
            <Link href={'/'}>О компании</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Доставка</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Оплата</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Партнерам</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>Блог</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/'}>FAQ</Link>
          </li>
          <li>
            <Link href={'/'}>Контакты</Link>
          </li>
        </ul>
      </div>

      <div className={'footer__info'}>
        <span className="footer__info-text">©2021-2024 LINEART ALUMO</span>
        <span className="footer__info-text">Политика конфиденциальности</span>
      </div>
    </footer>
  );
}
