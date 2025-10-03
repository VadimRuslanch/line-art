import './FAQHomePage.scss';
import FAQ from '@/widgets/FAQ/FAQ';

export default function FAQHomePage() {
  return (
    <div>
      <h2 className={'FAQHomePage__title HeadlineH2'}>Полезная информация</h2>
      <FAQ />
    </div>
  );
}
