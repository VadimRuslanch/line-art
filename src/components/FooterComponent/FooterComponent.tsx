import ButtonLogo from '@/shared/ui/ButtonLogo/ButtonLogo';
import Link from 'next/link';

export default function FooterComponent() {
  return (
    <footer>
      <div>
        <ButtonLogo />
        <span>©2021-2024 LINEART ALUMO</span>
        <span>Политика конфиденциальности</span>
      </div>
      <div>
        <span>Категории</span>
        <ul>
          <li>
            <Link href={'/'}>Теневой плинтус</Link>
          </li>
          <li>
            <Link href={'/'}>Скрытый плинтус</Link>
          </li>
          <li>
            <Link href={'/'}>Плинтус с подсветкой</Link>
          </li>
          <li>
            <Link href={'/'}>Алюминиевый плинтус</Link>
          </li>
          <li>
            <Link href={'/'}>Парящий плинтус</Link>
          </li>
          <li>
            <Link href={'/'}>Щелевой плинтус</Link>
          </li>
          <li>
            <Link href={'/'}>Парящий профиль</Link>
          </li>
          <li>
            <Link href={'/'}>Профиль для стеновой панели</Link>
          </li>
          <li>
            <Link href={'/'}>Алюминиевый профиль</Link>
          </li>
          <li>
            <Link href={'/'}>Алюминиевые полки</Link>
          </li>
          <li>
            <Link href={'/'}>Аксессуары</Link>
          </li>
        </ul>
      </div>
      <div>
        <span>Меню</span>
        <ul>
          <li>
            <Link href={'/'}>О компании</Link>
          </li>
          <li>
            <Link href={'/'}>Доставка</Link>
          </li>
          <li>
            <Link href={'/'}>Оплата</Link>
          </li>
          <li>
            <Link href={'/'}>Партнерам</Link>
          </li>
          <li>
            <Link href={'/'}>Блог</Link>
          </li>
          <li>
            <Link href={'/'}>FAQ</Link>
          </li>
          <li>
            <Link href={'/'}>Контакты</Link>
          </li>
        </ul>
      </div>
      <div>
        <span>Контакты</span>
        <div>
          <a>+7 (495) 790-94-55</a>
          <a>info@lineart-alumo.ru</a>
          <button>Письмо директору</button>
        </div>
      </div>
    </footer>
  );
}
