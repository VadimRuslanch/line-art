import './UIFAQItem.scss';
import IconPlus from '@/shared/assets/svg/plus.svg';
import IconMinus from '@/shared/assets/svg/minus.svg';

export default function UIFAQItem() {
  return (
    <div className={'UIFAQItem'}>
      <details>
        <summary className={'UIFAQItem__summary HeadlineH5'}>
          Что такое теневой плинтус?
          <span>
            <IconPlus className="icon__plus" />
            <IconMinus className="icon__minus" />
          </span>
        </summary>
      </details>
      <article className="UIFAQItem__article-wr">
        <div className="UIFAQItem__article">
          <div>текст</div>
        </div>
      </article>
    </div>
  );
}
