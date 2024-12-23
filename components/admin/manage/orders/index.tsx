import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { OrderStats } from './order-stats';
import { OrderFilters } from './order-filters';
import { getAdminOrders, getOrderStats } from '@/actions/order/order.actions';

const ManageOrdersPage = async () => {
    const ordersData = await getAdminOrders({});
    const statsData = await getOrderStats();

    // Transform orders to match the Order type
    const transformedOrders = ordersData.success && ordersData.orders
        ? ordersData.orders.map(order => ({
            ...order,
            address: JSON.parse(order.address)
        }))
        : [];

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Order Management</h1>

            {/* Stats Cards */}
            {statsData.success && statsData.stats && <OrderStats stats={statsData.stats} />}

            {/* Filters */}
            <OrderFilters />

            {/* Orders Table */}
            {ordersData.success && (
                <DataTable 
                    columns={columns} 
                    data={transformedOrders} 
                    pagination={ordersData.pagination} 
                />
            )}
        </div>
    );
};

export default ManageOrdersPage;
