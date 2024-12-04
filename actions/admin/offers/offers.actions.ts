'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export type Offer = {
    id: string;
    code: string;
    discount: number;
    imageSrc?: string;
    maxAmount: number;
    createdAt: Date;
    updatedAt: Date;
};

export async function createOffer(data: { code: string; discount: number; imageSrc?: string; maxAmount: number }) {
    try {
        // Check if offer code already exists
        const existingOffer = await prisma.offer.findUnique({
            where: { code: data.code.toUpperCase() },
        });

        if (existingOffer) {
            return {
                success: false,
                error: 'Offer code already exists',
            };
        }

        const offer = await prisma.offer.create({
            data: {
                code: data.code.toUpperCase(),
                discount: data.discount,
                imageSrc: data.imageSrc || '',
                maxAmount: data.maxAmount,
            },
        });
        revalidatePath('/offers');
        return { success: true, offer };
    } catch (error) {
        console.error('Create Offer error:', error);
        return { success: false, error: 'Failed to create offer' };
    }
}

export async function updateOffer(
    id: string,
    data: {
        code?: string;
        discount?: number;
        imageSrc?: string;
        maxAmount?: number;
    }
) {
    try {
        const offer = await prisma.offer.update({
            where: { id },
            data: {
                ...(data.code && { code: data.code.toUpperCase() }),
                ...(data.discount !== undefined && { discount: data.discount }),
                ...(data.imageSrc && { imageSrc: data.imageSrc }),
                ...(data.maxAmount && { maxAmount: data.maxAmount }),
            },
        });
        revalidatePath('/offers');
        return { success: true, offer };
    } catch (error) {
        console.error('Update Offer error:', error);
        return { success: false, error: 'Failed to update offer' };
    }
}

export async function deleteOffer(id: string) {
    try {
        await prisma.offer.delete({
            where: { id },
        });
        revalidatePath('/offers');
        return { success: true };
    } catch (error) {
        console.error('Delete Offer error:', error);
        return { success: false, error: 'Failed to delete offer' };
    }
}

export async function fetchOffers() {
    try {
        const offers = await prisma.offer.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { success: true, offers };
    } catch (error) {
        console.error('Fetch Offers error:', error);
        return { success: false, error: 'Failed to fetch offers' };
    }
}

export async function validateOfferCode(code: string) {
    try {
        const offer = await prisma.offer.findUnique({
            where: { code: code.toUpperCase() },
        });

        if (!offer) {
            return {
                success: false,
                error: 'Invalid offer code',
            };
        }

        return {
            success: true,
            offer,
        };
    } catch (error) {
        console.error('Validate Offer error:', error);
        return {
            success: false,
            error: 'Failed to validate offer',
        };
    }
}
