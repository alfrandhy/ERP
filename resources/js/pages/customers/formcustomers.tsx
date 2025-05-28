import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import InputError from "@/components/input-error";
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Textarea, Select, Input } from '@headlessui/react';
import { error } from 'console';
import React from 'react';

export default function Formcustomer({ ...props }) {

    const { customer , isView, isEdit } = props;

    // Add this at the top of your component, after the hooks
    console.log('Initial data:', {
        name: customer?.name || '',
        code: customer?.code || '',
        customer_logo: customer?.customer_logo || '',
        telp: customer?.telp || '',
        address: customer?.address || '',
    });


    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `${isView ? 'Show' : (isEdit ? 'Update' : 'Create' )} Customer`,
        href: route('customers.create'),
    },
];

    const {data, setData, post, put, processing, errors, reset} = useForm({
        name: customer?.name || '',
        code: customer?.code || '',
        customer_logo: null as File | null,
        telp: customer?.telp || '',
        address: customer?.address || '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEdit){
            put(route('customers.update', customer.id ), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('customers.store'), {
                onSuccess: () => reset(),
            });
        }
        // console.log('data', data);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('customer_logo', e.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='ml-auto'>
                    <Link 
                        as='button' 
                        href={route('customers.index')} 
                        className='flex items-center bg-red-500 hover:opacity-85 p-2 rounded-lg text-md text-white w-fit cursor-pointer'>
                        <ArrowLeftIcon /> Back to List
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{isView ? 'Show' : isEdit ? 'Update' : 'Add'} Customer Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='off'>
                            <div className='grid gap-6'>
                                {/* Project Code */}
                                <div className='grid gap-2'>
                                    <label htmlFor="name">Customer Name</label>
                                    <Input 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        id='name'
                                        name='name'
                                        type='text'
                                        placeholder='Customer Name'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.name && <InputError message={errors.name} />}
                                </div>
                                {/* End Project Code */}
                                {/* Part No */}
                                <div className='grid gap-2'>
                                    <label htmlFor="code">Customer Code</label>
                                    <Input 
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        id='code'
                                        name='code'
                                        type='text'
                                        placeholder='Customer Code'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.code && <InputError message={errors.code} />}
                                </div>
                                {/* End Part No */}
                                {/* Image Upload */}
                                <div className='grid gap-2'>
                                    <label htmlFor="customer_logo">Customer Logo</label>
                                    <Input onChange={handleFileUpload} id='customer_logo' name='customer_logo' type='file' autoFocus tabIndex={4} />
                                    {errors.customer_logo && <InputError message={errors.customer_logo} />}
                                </div> 
                                {/* End Image Upload*/}
                                {/* Part No */}
                                <div className='grid gap-2'>
                                    <label htmlFor="telp">Customer Telp</label>
                                    <Input 
                                        value={data.telp}
                                        onChange={(e) => setData('telp', e.target.value)}
                                        id='telp'
                                        name='telp'
                                        type='text'
                                        placeholder='(022) 65432111'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.telp && <InputError message={errors.telp} />}
                                </div>
                                {/* End Part No */}
                                {/* Description */}
                                <div className='grid gap-2'>
                                    <label htmlFor="address">Address</label>
                                    <Textarea 
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        id='address'
                                        name='address'
                                        placeholder='Address'
                                        autoFocus
                                        tabIndex={1}
                                        rows={2}
                                        disabled={isView || processing}
                                    />
                                    {errors.address && <InputError message={errors.address} />}
                                </div>
                                {/* Description */}
                            </div>
                            {!isView && (
                                <Button type="submit" className="mt-2 w-fit cursor-pointer" tabIndex={4}>
                                    {processing && <LoaderCircle className='h4 w-4 animate-spin' />}
                                    {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Save'} Customer
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
