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
}

export interface ShopItem extends BaseItem {
    type: 'shop';
    quantity: number;
}

export type CartItem = ServiceItem | ShopItem;