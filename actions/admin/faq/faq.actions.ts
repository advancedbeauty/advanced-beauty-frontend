'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// export type FAQ = {
//     id: string;
//     question: string;
//     answer: string;
//     createdAt: Date;
//     updatedAt: Date;
// };

export async function createFAQ(data: { question: string; answer: string }) {
    try {
        const faq = await prisma.faq.create({
            data: {
                question: data.question,
                answer: data.answer,
            },
        });
        revalidatePath('/faq');
        return { success: true, faq };
    } catch (error) {
        console.error('Create FAQ error:', error);
        return { success: false, error: 'Failed to create FAQ' };
    }
}

export async function updateFAQ(id: string, data: { question?: string; answer?: string }) {
    try {
        const faq = await prisma.faq.update({
            where: { id },
            data: {
                ...(data.question && { question: data.question }),
                ...(data.answer && { answer: data.answer }),
            },
        });
        revalidatePath('/faq');
        return { success: true, faq };
    } catch (error) {
        console.error('Update FAQ error:', error);
        return { success: false, error: 'Failed to update FAQ' };
    }
}

export async function deleteFAQ(id: string) {
    try {
        await prisma.faq.delete({
            where: { id },
        });
        revalidatePath('/faq');
        return { success: true };
    } catch (error) {
        console.error('Delete FAQ error:', error);
        return { success: false, error: 'Failed to delete FAQ' };
    }
}

export async function fetchFAQs() {
    try {
        const faqs = await prisma.faq.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        });
        return { success: true, faqs };
    } catch (error) {
        console.error('Fetch FAQs error:', error);
        return { success: false, error: 'Failed to fetch FAQs' };
    }
}
