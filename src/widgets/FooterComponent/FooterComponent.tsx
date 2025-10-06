'use client';

import './Footer.scss';
import ButtonLogo from '@/shared/ui/ButtonLogo/ButtonLogo';
import Link from 'next/link';
import { useCategoriesParents } from '@/entities/category/model/useCategoriesParents';

export default function FooterComponent() {
  const { categories } = useCategoriesParents();
  return (
    <footer className={'footer'}>
      <div className={'footer__logo'}>
        <ButtonLogo />
      </div>

      <div className={'footer__navigation footer__contacts'}>
        <span className="footer-navigation__title">Контакты</span>
        <ul className="footer-navigation__list">
          <li className="footer-navigation__list-item">
            <a href="tel:+7 (495) 790-94-55">+7 (495) 790-94-55</a>
          </li>
          <li className="footer-navigation__list-item">
            <a href="mailto:info@lineart-alumo.ru">info@lineart-alumo.ru</a>
          </li>
          <button className="footer__button">Письмо директору</button>
        </ul>
      </div>

      <div className={'footer__navigation footer__categories'}>
        <span className={'footer-navigation__title'}>Категории</span>
        <ul className="footer-navigation__list">
          {categories.map((category) => (
            <li
              className="footer-navigation__list-item"
              key={category.databaseId}
            >
              <Link href={category.slug!}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={'footer__navigation footer__menu'}>
        <span className={'footer-navigation__title'}>Меню</span>
        <ul className="footer-navigation__list">
          <li className="footer-navigation__list-item">
            <Link href={'/public'}>О компании</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/public'}>Доставка</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/public'}>Оплата</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/public'}>Партнерам</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/public'}>Блог</Link>
          </li>
          <li className="footer-navigation__list-item">
            <Link href={'/public'}>FAQ</Link>
          </li>
          <li>
            <Link href={'/public'}>Контакты</Link>
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
