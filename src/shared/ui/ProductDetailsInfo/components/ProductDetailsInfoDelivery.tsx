import React from 'react';
import styles from '../ProductDetailsInfo.module.scss';

const ProductDetailsInfoDelivery: React.FC = () => {
  return (
    <div className={styles.infoContainer}>
      <article className={styles.infoBlock}>
        <h3 className={styles.title}>Виды доставки:</h3>
        <ul className={(styles.infoList, styles.gridContainer)}>
          <li className={styles.infoListItem}>
            Самовывоз: Вы можете забрать свой заказ самостоятельно по адресу:
            Домодедовское шоссе, 1, посёлок Сельхозтехника, городской округ
            Подольск, Московская область, 142116.
          </li>
          <li className={styles.infoListItem}>
            Доставка транспортной компанией: Мы не осуществляем доставку до
            терминала. При оформлении доставки необходимо указывать адрес забора
            груза - Домодедовское шоссе, 1, посёлок Сельхозтехника, городской
            округ Подольск, Московская область, 142116.
          </li>
          <li className={styles.infoListItem}>
            Курьерская доставка (СДЭК): Доступна для малогабаритных товаров не
            более 1,5 метра по стороне. Категории товаров, подходящие для
            данного вида доставки - Аксессуары для плинтуса, алюминиевые полки,
            рассеиватель РАССЕИВАТЕЛЬ 517, 518, образцы.
          </li>
        </ul>
      </article>
      <article className={styles.infoBlock}>
        <h3 className={styles.title}>Виды доставки:</h3>
        <div className={styles.gridContainer}>
          <p>
            Мы отправляем товары по всей России и странам СНГ. Возможность
            доставки в ваш регион вы можете посмотреть на сайте выбранной
            транспортной компании:
          </p>
          <ul className={styles.infoList}>
            <li className={styles.infoListItem}>
              Деловые Линии:{' '}
              <a href="https://www.dellin.ru/contacts/" target="_blank">
                https://www.dellin.ru/contacts/
              </a>
            </li>
            <li className={styles.infoListItem}>
              ВОЗОВОЗ:{' '}
              <a href="https://www.vozovoz.org/terminals/" target="_blank">
                https://www.vozovoz.org/terminals/
              </a>
            </li>
            <li className={styles.infoListItem}>
              Сократ Карго (для Калининградской области):
              <a href="https://socratcargo.ru/" target="_blank">
                https://socratcargo.ru/
              </a>
            </li>
          </ul>
        </div>
      </article>
      <article className={styles.infoBlock}>
        <h3 className={styles.title}>Стоимость доставки:</h3>
        <p>
          Цена доставки рассчитывается оператором услуг. Пожалуйста, обратите
          внимание, что при отправке товаров транспортной компанией обязательна
          услуга жесткой упаковки.
        </p>
      </article>
    </div>
  );
};

export default ProductDetailsInfoDelivery;
