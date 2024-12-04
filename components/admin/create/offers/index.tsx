'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2Icon, EditIcon, TrashIcon, UploadIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { createOffer, updateOffer, deleteOffer, fetchOffers, Offer } from '@/actions/admin/offers/offers.actions';
import { uploadImageToDrive } from '@/actions/google-drive-upload/googleDriveUpload.actions';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { formatPrice } from '@/lib/formatPrice';

interface ApiResponse {
    success: boolean;
    offer?: Offer;
    offers?: Offer[];
    error?: string;
}

const OfferManagement = () => {
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState({
        create: false,
        delete: '',
        edit: false,
        upload: false,
        fetch: true,
    });
    const itemsPerPage = 10;
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadOffers = async () => {
            setIsLoading((prev) => ({ ...prev, fetch: true }));
            try {
                const result = await fetchOffers();
                if (result.success && result.offers) {
                    setOffers(result.offers);
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch offers');
            } finally {
                setIsLoading((prev) => ({ ...prev, fetch: false }));
            }
        };
        loadOffers();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        setIsLoading((prev) => ({ ...prev, upload: true }));

        try {
            const result = await uploadImageToDrive(file);
            if (result.success && result.url) {
                setImageSrc(result.url);
                toast.success('Image uploaded successfully');
            } else {
                toast.error(result.error || 'Image upload failed');
            }
        } catch (error) {
            console.log(error);
            toast.error('Image upload failed');
        } finally {
            setIsLoading((prev) => ({ ...prev, upload: false }));
        }
    };

    const handleSubmit = async () => {
        // Validate inputs
        if (!code.trim()) {
            toast.error('Please enter an offer code');
            return;
        }

        const discountValue = parseFloat(discount);
        if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
            toast.error('Please enter a valid discount percentage (1-100)');
            return;
        }

        const maxAmountValue = parseInt(maxAmount);
        if (isNaN(maxAmountValue) || maxAmountValue <= 0) {
            toast.error('Please enter a valid maximum amount limit');
            return;
        }

        if (!imageSrc) {
            toast.error('Please upload an image');
            return;
        }

        setIsLoading((prev) => ({ ...prev, create: true }));

        try {
            const offerData = {
                code: code.toUpperCase(),
                discount: discountValue,
                imageSrc,
                maxAmount: maxAmountValue
            };

            let result: ApiResponse;
            if (editingOffer) {
                result = await updateOffer(editingOffer.id, offerData);
                if (result.success) {
                    setOffers((prev) =>
                        prev.map((offer) => (offer.id === editingOffer.id ? { ...offer, ...offerData } : offer))
                    );
                    toast.success('Offer updated successfully');
                    setEditingOffer(null);
                } else {
                    toast.error(result.error || 'Failed to update offer');
                }
            } else {
                result = await createOffer(offerData);
                if (result.success && result.offer) {
                    setOffers((prev) => [result.offer!, ...prev]);
                    toast.success('Offer created successfully');
                } else {
                    toast.error(result.error || 'Failed to create offer');
                }
            }

            // Reset form
            setCode('');
            setDiscount('');
            setMaxAmount('');
            setImageSrc('');
            setImagePreview(null);
        } catch (error) {
            console.log(error);
            toast.error('An error occurred');
        } finally {
            setIsLoading((prev) => ({ ...prev, create: false }));
        }
    };

    const handleEdit = (offer: Offer) => {
        setEditingOffer(offer);
        setCode(offer.code);
        setDiscount(offer.discount.toString());
        setMaxAmount(offer.maxAmount.toString());
        setImageSrc(offer.imageSrc || '');
        setImagePreview(offer.imageSrc || '');
    };

    const handleCancelEdit = () => {
        setEditingOffer(null);
        setCode('');
        setDiscount('');
        setMaxAmount('');
        setImageSrc('');
        setImagePreview(null);
    };

    const handleDelete = async (id: string) => {
        setIsLoading((prev) => ({ ...prev, delete: id }));
        try {
            const result = await deleteOffer(id);
            if (result.success) {
                setOffers(offers.filter((offer) => offer.id !== id));
                toast.success('Offer deleted successfully');
            } else {
                toast.error('Failed to delete offer');
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred');
        } finally {
            setIsLoading((prev) => ({ ...prev, delete: '' }));
        }
    };

    // Pagination & Search Logic
    const filteredOffers = offers.filter((offer) => offer.code.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginatedOffers = filteredOffers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

    return (
        <div className="w-full p-6 space-y-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{editingOffer ? 'Edit' : 'Create'} Offer</CardTitle>
                    <CardDescription>
                        {editingOffer ? 'Modify' : 'Add'} an offer with code, discount, and image
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input placeholder="Offer Code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <Input
                            placeholder="Discount Percentage"
                            type="number"
                            min="1"
                            max="100"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                        <Input
                            placeholder="Maximum Amount"
                            type="number"
                            min="1"
                            value={maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value)}
                        />
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading.upload}
                            >
                                {isLoading.upload ? (
                                    <Loader2Icon className="mr-2 animate-spin" />
                                ) : (
                                    <UploadIcon className="mr-2" />
                                )}
                                Upload Image
                            </Button>
                            {imagePreview && (
                                <div className="mt-4 flex flex-col items-center">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={1000}
                                        height={1000}
                                        className="max-h-48 object-cover"
                                    />
                                    <p className="mt-2 text-sm text-gray-500 break-words max-w-full">{imageSrc}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={!code || !discount || !imageSrc || isLoading.create}
                    >
                        {isLoading.create ? (
                            <Loader2Icon className="mr-2 animate-spin" />
                        ) : editingOffer ? (
                            'Update Offer'
                        ) : (
                            'Create Offer'
                        )}
                    </Button>
                    {editingOffer && (
                        <Button variant="outline" onClick={handleCancelEdit}>
                            <XIcon className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Offers</CardTitle>
                    <CardDescription>List of existing offers</CardDescription>
                    <div className="mt-4">
                        <Input
                            placeholder="Search Offers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading.fetch ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2Icon className="animate-spin w-10 h-10" />
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-1/6">Image</TableHead>
                                        <TableHead className="w-1/4">Offer Code</TableHead>
                                        <TableHead className="w-1/4">Discount</TableHead>
                                        <TableHead className="w-1/4">MaxAmount</TableHead>
                                        <TableHead className="w-1/4">Created At</TableHead>
                                        <TableHead className="w-1/6 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedOffers.map((offer) => (
                                        <TableRow key={offer.id}>
                                            <TableCell>
                                                <Image
                                                    src={offer.imageSrc || ''}
                                                    alt={offer.code}
                                                    width={1000}
                                                    height={1000}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            </TableCell>
                                            <TableCell>{offer.code}</TableCell>
                                            <TableCell>{offer.discount}%</TableCell>
                                            <TableCell>{offer.maxAmount}</TableCell>
                                            <TableCell>{new Date(offer.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right space-x-2 flex">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleEdit(offer)}
                                                    disabled={isLoading.edit}
                                                >
                                                    <EditIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(offer.id)}
                                                    disabled={isLoading.delete === offer.id}
                                                >
                                                    {isLoading.delete === offer.id ? (
                                                        <Loader2Icon className="animate-spin h-4 w-4" />
                                                    ) : (
                                                        <TrashIcon className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Previous
                                </Button>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next <ChevronRightIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default OfferManagement;
