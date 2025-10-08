'use client';

import './Footer.scss';
import ButtonLogo from '@/shared/ui/ButtonLogo/ButtonLogo';
import Link from 'next/link';
import { useCategoriesParents } from '@/entities/category/model/useCategoriesParents';
import IconArrow from '@/shared/assets/svg/arrow-left.svg';

export default function FooterComponent() {
  const { categories } = useCategoriesParents();
  return (
    <footer className={'footer'}>
      <div className={'footer__logo'}>
        <ButtonLogo />
      </div>

      <ul className="footer__contacts">
        <li className="footer-contacts-item">
          <a className="HeadlineH5" href="tel:+7 (495) 790-94-55">
            +7 (495) 790-94-55
          </a>
        </li>
        <li className="footer-contacts-item">
          <a className="HeadlineH5" href="mailto:info@lineart-alumo.ru">
            info@lineart-alumo.ru
          </a>
        </li>
      </ul>

      <div className={'footer__info'}>
        <span className="BodyB2">©2021-2025 LINEART ALUMO</span>
        <span className="BodyB2">Политика конфиденциальности</span>
      </div>

      <button className="footer__button">
        <span className="ButtonBut1">Письмо директору</span>
        <IconArrow className="footer__button-icon" />
      </button>

      <div className="footer__navigation">
        <ul
          className={`footer__navigation-list footer__categories ${categories.length > 7 ? 'footer__categories--2col' : ''}`}
        >
          {categories.map((category) => (
            <li
              className="footer-navigation__list-item"
              key={category.databaseId}
            >
              <Link className="BodyB1" href={category.slug!}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="footer__navigation-list footer__menu">
          <li className="footer-navigation__list-item">
            <Link className="BodyB1" href={'/public'}>
              О компании
            </Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link className="BodyB1" href={'/public'}>
              Доставка
            </Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link className="BodyB1" href={'/public'}>
              Оплата
            </Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link className="BodyB1" href={'/public'}>
              Партнерам
            </Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link className="BodyB1" href={'/public'}>
              Блог
            </Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link className="BodyB1" href={'/public'}>
              FAQ
            </Link>
          </li>
          <li>
            <Link className="BodyB1" href={'/public'}>
              Контакты
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
