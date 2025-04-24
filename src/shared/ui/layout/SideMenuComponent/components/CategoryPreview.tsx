import styles from '@/shared/ui/layout/SideMenuComponent/SideMenuComponent.module.scss';
import Image from 'next/image';
import { ImageCoreFragment } from '@/generated/graphql';

export default function CategoryPreview({
  image,
}: {
  image: ImageCoreFragment | null;
}) {
  return (
    <Image
      src={image?.sourceUrl ?? '/images/info.jpg'}
      alt={image?.altText ?? 'Заглушка'}
      className={styles.image}
      width={602}
      height={770}
      loading="lazy"
    />
  );
}
