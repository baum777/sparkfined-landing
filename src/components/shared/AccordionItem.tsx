import { useState } from 'react';

export type AccordionItemProps = {
  question: string;
  answer: string;
};

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`accordion-item ${open ? 'open' : ''}`}>
      <button className="accordion-trigger" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{question}</span>
        <span className="accordion-caret" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && <p className="accordion-answer">{answer}</p>}
    </div>
  );
}

export default AccordionItem;
