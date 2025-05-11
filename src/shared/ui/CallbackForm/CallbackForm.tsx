import styles from './CallbackForm.module.scss';
import Link from 'next/link';

export default function CallbackForm() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Детали заказа</span>
      <div className={styles.inputItems}>
        <div className={styles.inputItem}>
          <span className={styles.labelText}>Ваше имя</span>
          <label className={styles.labelInput}>
            <input className={styles.input} />
          </label>
        </div>
        <div className={styles.inputItem}>
          <span className={styles.labelText}>Телефон для связи</span>
          <label className={styles.labelInput}>
            <input className={styles.input} />
          </label>
        </div>
        <div className={styles.inputItem}>
          <span className={styles.labelText}>E-mail</span>
          <label className={styles.labelInput}>
            <input className={styles.input} />
          </label>
        </div>
      </div>
      <div className={styles.submitBlock}>
        <span className={styles.submitSum}>Сумма заказа: </span>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" className={styles.checkbox} />
          <span className={styles.checkboxText}>
            Я согласен с&nbsp;
            <Link href="/policy">политикой конфиденциальности</Link>
          </span>
        </label>
        <button className={styles.submitButton}>Отправить заказ</button>
      </div>
    </div>
  );
}
