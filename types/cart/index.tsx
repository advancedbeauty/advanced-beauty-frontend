export interface BaseItem {
    id: string;
    imageSrc: string;
    category: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    otherInfo?: any;
}

export interface ServiceItem extends BaseItem {
    type: 'service';
    // Add any service-specific properties here if needed
}

export interface ShopItem extends BaseItem {
    type: 'shop';
    quantity: number; // Quantity is specific to shop items
}

// CartItem should include the common properties and any additional properties needed
export type CartItem = {
    id: string; // Unique identifier for the cart item
    itemId: string; // ID of the item (service or shop)
    quantity: number; // Quantity of the item in the cart
    appointmentDate?: Date; // Optional appointment date for services
    appointmentTime?: string; // Optional appointment time for services
    item: ServiceItem | ShopItem; // The actual item in the cart
}