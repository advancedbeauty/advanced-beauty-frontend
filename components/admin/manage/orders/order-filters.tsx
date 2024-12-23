'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderStatus } from '@/types/order';

export function OrderFilters() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<OrderStatus | 'ALL'>('ALL');

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
            />

            <Select value={status} onValueChange={(value: OrderStatus | 'ALL') => setStatus(value)}>
                <SelectTrigger className="max-w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    {Object.values(OrderStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                            {status}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button variant="outline">Filter</Button>
            <Button variant="outline">Reset</Button>
        </div>
    );
}
