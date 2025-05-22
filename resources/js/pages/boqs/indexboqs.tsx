import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {useState, useEffect} from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'BOQ Data',
        href: '/boqs',
    },
]

export default function Indexboqs({boqs}: {boqs: []}) {
    // console.log(boqs);
    const { flash } = usePage<{flash?: {success?: string; error?: string}}>().props;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer)
        }
    }, [flashMessage])
    // console.log('flash', flash);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="BOQ" />
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
                    <Link as='Button' href={route('boqs.create')} className='bg-green-500 hover:opacity-85 p-2 rounded-lg text-md text-white'>Add Data</Link>
                </div>
                {/* End Add Menu Data */ }
                {/* Table Data */ }
                <div className='overflow-hidden rounded-lg border shadow-sm'>
                    <table className="w-full table-auto">
                    <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className='p-2'>#</th>
                                <th className='p-2'>Project Code</th>
                                <th className='p-2'>Part No.</th>
                                <th className='p-2'>Descrtiption</th>
                                <th className='p-2'>Material</th>
                                <th className='p-2'>Dimension</th>
                                <th className='p-2'>QTY</th>
                                <th className='p-2'>Unit</th>
                                <th className='p-2'>Type</th>
                                <th className='p-2'>Created At</th>
                                <th className='p-2'>Updated At</th>
                                <th className='p-2'>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        {boqs.map((boq, index) => (
                            <tr>
                                <td className='px-2 py-2 text-center border'>{index + 1}</td>
                                <td className='px-2 py-2 text-center border'>{boq.projectcode}</td>
                                <td className='px-2 py-2 text-center border'>{boq.partno}</td>
                                <td className='px-2 py-2 text-center border'>{boq.description}</td>
                                <td className='px-2 py-2 text-center border'>{boq.material}</td>
                                <td className='px-2 py-2 text-center border'>{boq.dimension}</td>
                                <td className='px-2 py-2 text-center border'>{boq.qty}</td>
                                <td className='px-2 py-2 text-center border'>{boq.unit}</td>
                                <td className='px-2 py-2 text-center border'>{boq.type}</td>
                                <td className='px-2 py-2 text-center border'>{boq.created_at}</td>
                                <td className='px-2 py-2 text-center border'>{boq.updated_at}</td>
                                <td className='px-2 py-2 text-center border'>Action</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                {/* End Table Data */}
            </div>
        </AppLayout>
    );
}
