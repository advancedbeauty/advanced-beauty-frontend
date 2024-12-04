import { create } from 'zustand';
import { OrderData } from '@/types/order';

interface OrderStore {
    currentOrder: OrderData | null;
    setCurrentOrder: (order: OrderData) => void;
    resetOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
    currentOrder: null,
    setCurrentOrder: (order) => set({ currentOrder: order }),
    resetOrder: () => set({ currentOrder: null }),
}));
