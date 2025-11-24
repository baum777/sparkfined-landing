import AccordionItem from '../shared/AccordionItem';
import Card from '../shared/Card';
import ModuleHeading from '../shared/ModuleHeading';
import SectionShell from '../shared/SectionShell';

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQProps = {
  id: string;
  items: FAQItem[];
};

export function FAQ({ id, items }: FAQProps) {
  return (
    <SectionShell id={id}>
      <ModuleHeading title="FAQ" subtitle="Honest answers for Solana meme traders" alignment="center" />
      <div className="faq-grid">
        {items.map((item) => (
          <Card key={item.question} variant="outlined" padding="md">
            <AccordionItem question={item.question} answer={item.answer} />
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

export default FAQ;
