import './UIFAQItem.scss';
import IconPlus from '@/shared/assets/svg/plus.svg';
import IconMinus from '@/shared/assets/svg/minus.svg';
import DOMPurify from 'isomorphic-dompurify';

type Props = {
  title?: string | null;
  content?: string | null;
};

export default function UIFAQItem({ title, content }: Props) {
  const safeHtml = DOMPurify.sanitize(content ?? '', {
    USE_PROFILES: { html: true },
  });

  return (
    <div className={'UIFAQItem'}>
      <details>
        <summary className={'UIFAQItem__summary HeadlineH5'}>
          {title}
          <span>
            <IconPlus className="icon__plus" />
            <IconMinus className="icon__minus" />
          </span>
        </summary>
      </details>
      <article className="UIFAQItem__article-wr">
        <div className="UIFAQItem__article">
          <div
            className="UIFAQItem__article"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </div>
      </article>
    </div>
  );
}
