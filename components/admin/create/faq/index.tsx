'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2Icon, EditIcon, TrashIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { createFAQ, updateFAQ, deleteFAQ, fetchFAQs, FAQ } from '@/actions/admin/faq/faq.actions';
import toast from 'react-hot-toast';

interface ApiResponse {
    success: boolean;
    faq?: FAQ;
    faqs?: FAQ[];
    error?: string;
}

const HomeFAQManagement = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [faqs, setFAQs] = useState<FAQ[]>([]);
    const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
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

    useEffect(() => {
        const loadFAQs = async () => {
            setIsLoading((prev) => ({ ...prev, fetch: true }));
            try {
                const result = await fetchFAQs();
                if (result.success && result.faqs) {
                    setFAQs(result.faqs);
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch FAQs');
            } finally {
                setIsLoading((prev) => ({ ...prev, fetch: false }));
            }
        };
        loadFAQs();
    }, []);

    const handleSubmit = async () => {
        if (!question.trim() || !answer.trim()) {
            toast.error('Please fill all fields');
            return;
        }

        setIsLoading((prev) => ({ ...prev, create: true }));

        try {
            const faqData = {
                question,
                answer
            };

            let result: ApiResponse;
            if (editingFAQ) {
                result = await updateFAQ(editingFAQ.id, faqData);
                if (result.success) {
                    setFAQs((prev) => prev.map((faq) => (faq.id === editingFAQ.id ? { ...faq, ...faqData } : faq)));
                    toast.success('FAQ updated successfully');
                    setEditingFAQ(null);
                } else {
                    toast.error('Failed to update FAQ');
                }
            } else {
                result = await createFAQ(faqData);
                if (result.success && result.faq) {
                    setFAQs((prev) => [result.faq!, ...prev]);
                    toast.success('FAQ created successfully');
                } else {
                    toast.error('Failed to create FAQ');
                }
            }

            // Reset form
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.log(error);
            toast.error('An error occurred');
        } finally {
            setIsLoading((prev) => ({ ...prev, create: false }));
        }
    };

    const handleEdit = (faq: FAQ) => {
        setEditingFAQ(faq);
        setQuestion(faq.question);
        setAnswer(faq.answer);
    };

    const handleCancelEdit = () => {
        setEditingFAQ(null);
        setQuestion('');
        setAnswer('');
    };

    const handleDelete = async (id: string) => {
        setIsLoading((prev) => ({ ...prev, delete: id }));
        try {
            const result = await deleteFAQ(id);
            if (result.success) {
                setFAQs(faqs.filter((faq) => faq.id !== id));
                toast.success('FAQ deleted successfully');
            } else {
                toast.error('Failed to delete FAQ');
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred');
        } finally {
            setIsLoading((prev) => ({ ...prev, delete: '' }));
        }
    };

    // Pagination & Search Logic
    const filteredFAQs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginatedFAQs = filteredFAQs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);

    return (
        <div className="w-full p-6 space-y-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{editingFAQ ? 'Edit' : 'Create'} FAQ</CardTitle>
                    <CardDescription>
                        {editingFAQ ? 'Modify' : 'Add'} a FAQ with question, answer
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        <Textarea placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={!question || !answer|| isLoading.create}
                    >
                        {isLoading.create ? (
                            <Loader2Icon className="mr-2 animate-spin" />
                        ) : editingFAQ ? (
                            'Update FAQ'
                        ) : (
                            'Create FAQ'
                        )}
                    </Button>
                    {editingFAQ && (
                        <Button variant="outline" onClick={handleCancelEdit}>
                            <XIcon className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>FAQs</CardTitle>
                    <CardDescription>List of existing FAQs</CardDescription>
                    <div className="mt-4">
                        <Input
                            placeholder="Search FAQs..."
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
                                        <TableHead className="w-1/4">Question</TableHead>
                                        <TableHead className="w-1/3">Answer</TableHead>
                                        <TableHead className="w-1/6">Created At</TableHead>
                                        <TableHead className="w-1/6 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedFAQs.map((faq) => (
                                        <TableRow key={faq.id}>
                                            <TableCell>{faq.question}</TableCell>
                                            <TableCell>{faq.answer}</TableCell>
                                            <TableCell>{new Date(faq.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleEdit(faq)}
                                                    disabled={isLoading.edit}
                                                >
                                                    <EditIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(faq.id)}
                                                    disabled={isLoading.delete === faq.id}
                                                >
                                                    {isLoading.delete === faq.id ? (
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

export default HomeFAQManagement;
