"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(user: any) {
    try {
        const newUser = await prisma.user.create({
            data: user,
        });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
