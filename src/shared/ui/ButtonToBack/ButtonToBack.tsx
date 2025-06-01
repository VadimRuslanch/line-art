import styles from './ButtonToBack.module.scss';
import IconArrow from '@/shared/assets/svg/arrow-left.svg';
import { useRouter } from 'next/navigation';

export default function ButtonToBack() {
  const router = useRouter();

  return (
    <button onClick={router.back} className={styles.button}>
      <IconArrow />
      Назад
    </button>
  );
}
