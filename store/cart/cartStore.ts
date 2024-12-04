import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCart,
    clearCart,
    applyOfferCode,
    updateCartBookingInfo,
} from '@/actions/cart/cart.actions';
import { ServiceItem } from '@/types/service/service-item';
import { ShopItem } from '@/actions/admin/shop/shop-item.actions';

export interface CartItemType {
    id: string;
    itemId: string;
    quantity: number;
    appointmentDate?: Date;
    appointmentTime?: string;
    service?: ServiceItem | null;
    shop?: ShopItem | null;
    offerCode?: string;
    offerDiscount?: number;
}

export interface OfferDetails {
    code: string;
    discountAmount: number;
    discountPercentage: number;
}

export interface CartState {
    cart: CartItemType[];
    isLoading: boolean;
    error: string | null;
    offerCode?: OfferDetails;

    // Actions
    fetchCart: () => Promise<void>;
    addItem: (
        itemId: string,
        itemType: 'service' | 'shop',
        quantity?: number,
        appointmentDate?: Date,
        appointmentTime?: string
    ) => Promise<void>;
    removeItem: (cartItemId: string) => Promise<void>;
    updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
    updateBookingInfo: (cartItemId: string, appointmentDate: Date, appointmentTime: string) => Promise<void>;
    clearEntireCart: () => Promise<void>;
    applyOfferCodeToCart: (code: string) => Promise<void>;
    removeOfferCode: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            isLoading: false,
            error: null,
            offerCode: undefined,

            fetchCart: async () => {
                set({ isLoading: true, error: null });
                try {
                    const fetchedCart = await getCart();
                    set({
                        cart:
                            fetchedCart?.cartItem.map((item) => ({
                                ...item,
                                appointmentDate: item.appointmentDate ?? undefined,
                                appointmentTime: item.appointmentTime ?? undefined,
                                offerCode: item.offerCode ?? undefined,
                                offerDiscount: item.offerDiscount ?? undefined,
                            })) || [],
                        isLoading: false,
                    });
                } catch (err) {
                    set({
                        error: err instanceof Error ? err.message : 'Failed to fetch cart',
                        isLoading: false,
                    });
                }
            },

            addItem: async (itemId, itemType, quantity = 1, appointmentDate, appointmentTime) => {
                set({ isLoading: true, error: null });
                try {
                    await addToCart(itemId, itemType, quantity, appointmentDate, appointmentTime);
                    await get().fetchCart();
                } catch (err) {
                    set({
                        error: err instanceof Error ? err.message : 'Failed to add item',
                        isLoading: false,
                    });
                }
            },

            removeItem: async (cartItemId) => {
                set({ isLoading: true, error: null });
                try {
                    await removeFromCart(cartItemId);
                    await get().fetchCart();
                } catch (err) {
                    set({
                        error: err instanceof Error ? err.message : 'Failed to remove item',
                        isLoading: false,
                    });
                }
            },

            updateItemQuantity: async (cartItemId, quantity) => {
                set({ isLoading: true, error: null });
                try {
                    await updateCartItemQuantity(cartItemId, quantity);
                    await get().fetchCart();
                } catch (err) {
                    set({
                        error: err instanceof Error ? err.message : 'Failed to update quantity',
                        isLoading: false,
                    });
                }
            },

            updateBookingInfo: async (cartItemId, appointmentDate, appointmentTime) => {
                set({ isLoading: true, error: null });
                try {
                    await updateCartBookingInfo(cartItemId, appointmentDate, appointmentTime);
                    await get().fetchCart();
                } catch (err) {
                    set({
                        error: err instanceof Error ? err.message : 'Failed to update quantity',
                        isLoading: false,
                    });
                }
            },

            clearEntireCart: async () => {
                set({ isLoading: true, error: null });
                try {
                    await clearCart();
                    set({ cart: [], isLoading: false, offerCode: undefined });
                } catch (err) {
                    set({
                        error: err instanceof Error ? err.message : 'Failed to clear cart',
                        isLoading: false,
                    });
                }
            },

            applyOfferCodeToCart: async (code) => {
                set({ isLoading: true, error: null });
                try {
                    const offerDetails = await applyOfferCode(code);
                    set({
                        offerCode: offerDetails,
                        isLoading: false,
                    });
                } catch (err) {
                    set({
                        error: err instanceof Error ? err.message : 'Failed to apply offer code',
                        isLoading: false,
                    });
                }
            },

            removeOfferCode: () => {
                set({ offerCode: undefined });
            },
        }),
        {
            name: 'cart-storage',
            skipHydration: true,
        }
    )
);
