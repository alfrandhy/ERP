import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'BOQ Data',
        href: '/boqs',
    },
];

export default function Indexboqs() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="BOQ" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
                                <th className='p-2'>Created At</th>
                                <th className='p-2'>Updated At</th>
                                <th className='p-2'>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td className='px-2 py-2 text-center border'>1</td>
                                <td className='px-2 py-2 text-center border'>Data</td>
                                <td className='px-2 py-2 text-center border'>Data</td>
                                <td className='px-2 py-2 text-center border'>Data</td>
                                <td className='px-2 py-2 text-center border'>Data</td>
                                <td className='px-2 py-2 text-center border'>Data</td>
                                <td className='px-2 py-2 text-center border'>Data</td>
                                <td className='px-2 py-2 text-center border'>Data</td>
                                <td className='px-2 py-2 text-center border'>DateTime</td>
                                <td className='px-2 py-2 text-center border'>DateTime</td>
                                <td className='px-2 py-2 text-center border'>Action</td>
                            </tr>
                    </tbody>
                    </table>
                </div>
                {/* End Table Data */}
            </div>
        </AppLayout>
    );
}
