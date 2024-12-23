import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { OrderStats } from './order-stats';
import { getAdminOrders, getOrderStats } from '@/actions/order/order.actions';
import { OrderStatus } from '@/types/order';
import { formatUrlString } from '@/lib/formatUrlString';

const ManageOrdersPage = async () => {
    const ordersData = await getAdminOrders({});
    const statsData = await getOrderStats();

    // Transform orders to match the Order type
    const transformedOrders =
        ordersData.success && ordersData.orders
            ? ordersData.orders.map((order) => ({
                  ...order,
                  address: JSON.parse(order.address),
                  status: order.status as OrderStatus,
              }))
            : [];

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Order Management</h1>

            {/* Stats Cards */}
            {statsData.success && statsData.stats && <OrderStats stats={statsData.stats} />}

            {/* Orders Table */}
            {ordersData.success && (
                <DataTable
                    columns={columns}
                    data={transformedOrders.map((order) => ({
                        ...order,
                        customerName: order.user.name,
                        customerAddress: `${order.address.fullName}, ${order.address.city}`,
                        items: order.orderItems.map((item) => ({
                            ...item,
                            link: `/${item.itemType === 'SERVICE' ? 'services' : 'shop'}/${formatUrlString(
                                item.itemName
                            )}`,
                        })),
                    }))}
                    pagination={ordersData.pagination}
                />
            )}
        </div>
    );
};

export default ManageOrdersPage;
