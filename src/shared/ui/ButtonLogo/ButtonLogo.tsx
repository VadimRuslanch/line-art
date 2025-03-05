import styles from './ButtonLogo.module.scss';
import IconLogo from '@/shared/assets/svg/logo.svg';

const ButtonLogo = () => {
  return (
    <button className={styles.button}>
      <IconLogo className={styles.logo} />
    </button>
  );
};

export default ButtonLogo;
