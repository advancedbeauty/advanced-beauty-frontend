'use client';

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQ, fetchFAQs } from '@/actions/admin/faq/faq.actions';

const FaqContent = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);

    useEffect(() => {
        const loadFAQs = async () => {
            const response = await fetchFAQs();
            if (response.success) {
                setFaqs(response.faqs || []);
            }
        };
        loadFAQs();
    }, []);

    return (
        <Accordion type="single" collapsible>
            {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className='hover:no-underline text-xl font-medium'>
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className='text-base text-neutral-700'>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default FaqContent;
