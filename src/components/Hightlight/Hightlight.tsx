import Image from 'next/image';
import { FC } from 'react';
import styles from './Hightlight.module.scss';

interface HightlightProps {
  id: string;
  title: string;
  short_description: string;
  vegan: boolean;
  vegetarian: boolean;
  slug: string;
}

const Hightlight: FC<HightlightProps> = ({
  id,
  title,
  short_description,
  vegan,
  vegetarian,
  slug,
}) => {
  // Trunctuation using CSS, lineclamp
  // const shortDesciption = short_description.substring(0, 100) + '...';
  const vegetarianTag = vegetarian ? 'Vegetarian' : null;
  const veganTag = vegan ? 'Vegan' : null;

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {(vegetarianTag || veganTag) && (
          <div className={styles.tag}>{vegetarianTag || veganTag}</div>
        )}
        <Image src="/image/food.jpg" alt={title} layout="fill" objectFit="cover" />
        <div className={styles.gradientContainer} />
        <div className={styles.textOverlay}>
          <h3>{title}</h3>
          <p>{short_description}</p>
        </div>
      </div>
    </div>
  );
};

export default Hightlight;
