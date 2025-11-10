'use client';

import './FAQHomePage.scss';
import FAQ from '@/widgets/FAQ/FAQ';
import { GetPostsByCategory } from '@/entities/post/model/useGetPostsByCategory';

export default function FAQHomePage() {
  const posts = GetPostsByCategory('faq');

  if (posts && posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className={'FAQHomePage__title HeadlineH2'}>Полезная информация</h2>
      <FAQ />
    </div>
  );
}
