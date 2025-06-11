import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from "react";
import { Eye, PencilIcon, Trash2Icon, PlusIcon } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer List Data',
        href: '/customers',
    },
];

interface Customer {
    id: number,
    name: string,
    code: string,
    telp: string,
    address: string,
    customer_logo: string,
    customer_logo_originalname: string,
    created_at: string,
    updated_at: string
}

export default function Indexcustomers({...props}: { customers: Customer[] }) {
    // console.log(customers);
    const { customers } = props;
    const { flash } = usePage<{flash?: {success?: string; error?: string}}>().props;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert] = useState(flash?.success || flash?.error ? true : false);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer)
        }
    }, [flashMessage])
    // console.log('flash', flash);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Alert */ }
                {/* {(flash?.success || flash?.error) && ( */}
                {showAlert && flashMessage && (
                <Alert variant={'default'} className={`${flash?.success ? 'bg-green-600' : (flash?.error ? 'bg-red-700' : '')} max-w-md text-white`}>
                    <AlertTitle className='font-bold'>{flash.success ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription className='text-white'>{flashMessage}</AlertDescription>
                </Alert>
                )}
                {/* End Alert */ }
                {/* Add Menu Data */ }
                <div className='ml-auto'>
                    <Link 
                        as='Button' 
                        href={route('customers.create')} 
                        className='flex items-center bg-green-500 hover:opacity-85 p-2 rounded-lg text-md text-white'>
                        <PlusIcon className='me-2' /> Add Customer
                    </Link>
                </div>
                {/* End Add Menu Data */ }
                {/* Table Data */ }
                <div className='overflow-hidden rounded-lg border shadow-sm'>
                    <table className="w-full table-auto">
                    <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className='p-2'>#</th>
                                <th className='p-2'>Customer</th>
                                <th className='p-2'>Code</th>
                                <th className='p-2'>logo</th>
                                <th className='p-2'>Telp.</th>
                                <th className='p-2'>Address</th>
                                <th className='p-2'>Created At</th>
                                <th className='p-2'>Updated At</th>
                                <th className='p-2'>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer, index) => (
                                <tr key={index}>
                                    <td className='px-2 py-2 text-center border'>{index + 1}</td>
                                    <td className='px-2 py-2 text-center border'>{customer.name}</td>
                                    <td className='px-2 py-2 text-center border'>{customer.code}</td>
                                    <td className='px-2 py-2 text-center border'>
                                        {customer.customer_logo && (
                                            <img src={`/erp/customers/${customer.customer_logo}`} alt={customer.name} className="h-16 w-16 object-cover" />
                                        )}
                                    </td>
                                    <td className='px-2 py-2 text-center border'>{customer.telp}</td>
                                    <td className='px-2 py-2 text-center border'>{customer.address}</td>
                                    <td className='px-2 py-2 text-center border'>{customer.created_at}</td>
                                    <td className='px-2 py-2 text-center border'>{customer.updated_at}</td>
                                    <td className='px-2 py-2 text-center border'>
                                        <Link 
                                            as='button' 
                                            className='bg-sky-500 text-white p-2 rounded-lg cursor-pointer hover:opacity-80' 
                                            href={route('customers.show', customer.id)}>
                                            <Eye size={15} />
                                        </Link>
                                        <Link 
                                            as='button' 
                                            className='bg-yellow-500 text-white p-2 rounded-lg cursor-pointer hover:opacity-80' 
                                            href={route('customers.edit', customer.id)}> 
                                            <PencilIcon size={15} />
                                        </Link>
                                        <Button
                                            className='bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:opacity-80' 
                                            onClick={() => {
                                                if(confirm('Are You Sure to Delete This Data')) {
                                                    router.delete(route('customers.destroy', customer.id), {
                                                        preserveScroll: true,
                                                    })
                                                }
                                            }}
                                            > 
                                            <Trash2Icon size={15} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className='text-center py-4 text-md font-bold'> No Data Found!</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                {/* End Table Data */}
            </div>
        </AppLayout>
    );
}
