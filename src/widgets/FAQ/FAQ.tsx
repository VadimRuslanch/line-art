import './FAQ.scss';
import UIFAQItem from '@/shared/ui/UIElements/UIFAQItem/UIFAQItem';
import { GetPostsByCategory } from '@/entities/post/model/useGetPostsByCategory';

export default function FAQ() {
  const posts = GetPostsByCategory('faq');

  return (
    <section className={'FAQ'}>
      <section className="FAQ">
        {posts?.map((post) => (
          <UIFAQItem key={post.id} title={post.title} content={post.content} />
        ))}
      </section>
    </section>
  );
}
