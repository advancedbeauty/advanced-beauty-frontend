'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Order, OrderStatus } from '@/types/order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, XCircle, CheckCircle } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatPrice } from '@/lib/formatPrice';
import Link from 'next/link';
import { useUpdateOrderStatus } from '@/hooks/use-update-order-status';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const OrderActionsCell = ({ order }: { order: Order }) => {
    const { updateOrderStatus, isLoading } = useUpdateOrderStatus();

    const handleStatusUpdate = async (status: OrderStatus) => {
        await updateOrderStatus(order.id, status);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/orders/${order.id}`} className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Link>
                </DropdownMenuItem>
                {order.status === OrderStatus.PENDING && (
                    <>
                        <DropdownMenuItem
                            onClick={() => handleStatusUpdate(OrderStatus.PROCESSING)}
                            disabled={isLoading}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept Order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger className="flex items-center text-red-600">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Order
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to cancel this order? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>No, keep order</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleStatusUpdate(OrderStatus.CANCELLED)}
                                            disabled={isLoading}
                                        >
                                            Yes, cancel order
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.PENDING:
                return 'bg-yellow-100 text-yellow-800';
            case OrderStatus.PROCESSING:
                return 'bg-blue-100 text-blue-800';
            case OrderStatus.COMPLETED:
                return 'bg-green-100 text-green-800';
            case OrderStatus.CANCELLED:
                return 'bg-red-100 text-red-800';
            case OrderStatus.REFUNDED:
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return <Badge className={`${getStatusColor(status)} px-3 py-1`}>{status.replace(/_/g, ' ')}</Badge>;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'orderNumber',
        header: 'Order ID',
        cell: ({ row }) => <div className="font-medium">{row.original.orderNumber}</div>,
    },
    {
        accessorKey: 'user',
        header: 'Customer',
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <div>
                    <div className="font-medium">{user?.name || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">{user?.email || 'N/A'}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'orderItems',
        header: 'Items',
        cell: ({ row }) => {
            const items = row.original.orderItems;
            return (
                <div className="max-w-[200px]">
                    {items.map((item, index) => (
                        <div key={item.id} className="text-sm">
                            {index + 1}. {item.itemName} ({item.quantity}x)
                            {index < items.length - 1 && <br />}
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'totalAmount',
        header: 'Amount',
        cell: ({ row }) => <div className="font-medium">{formatPrice(row.original.totalAmount)}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
    },
    {
        accessorKey: 'address',
        header: 'Address',
        cell: ({ row }) => {
            const address = row.original.address;
            return (
                <div className="text-sm">
                    {address.fullName}<br />
                    {address.addressLine1}<br />
                    {address.addressLine2 && <>{address.addressLine2}<br /></>}
                    {address.city}, {address.postalCode}<br />
                    {address.country}
                </div>
            );
        },
    },
    {
        accessorKey: 'phone',
        header: 'Phone No.',
        cell: ({ row }) => {
            const address = row.original.address;
            return (
                <div className="text-sm">
                    {address.phoneNumber}
                </div>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({ row }) => (
            <div className="text-sm">
                {new Date(row.original.createdAt).toLocaleDateString('en-GB')}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <OrderActionsCell order={row.original} />,
    },
];
