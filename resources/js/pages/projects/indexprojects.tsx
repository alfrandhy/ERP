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
        title: 'Project List',
        href: '/projects',
    },
];

interface Project {
    id : number,
    projectcode : string,
    customername : string,
    descriptionwork : string,
    projectcategory : string,
    pono : string,
    sino : string,
    podate : string,
    orderdatereceived : string,
    month : string,
    year : string,
    deliverydateaccordingtopo : string,
    deliverydate : string,
    remark : string,
    location : string,
    lastpayment : string,
    top1 : string,
    top2 : string,
    top3 : string,
    top4 : string,
    projectperformance : string,
    created_at : string,
    updated_at : string
}

export default function indexProjects({...props}: { projects: Project[] }) {
    // console.log(projects);
    const { projects } = props;
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
            <Head title="Project" />
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
                        href={route('projects.create')} 
                        className='flex items-center bg-green-500 hover:opacity-85 p-2 rounded-lg text-md text-white'>
                        <PlusIcon className='me-2' /> Add Project
                    </Link>
                </div>
                {/* End Add Menu Data */ }
                {/* Table Data */ }
                <div className='overflow-hidden rounded-lg border shadow-sm'>
                    <table className="w-full table-auto">
                    <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className='p-2'>#</th>
                                <th className='p-2'>Project Code</th>
                                <th className='p-2'>Customer</th>
                                <th className='p-2'>Work Description</th>
                                <th className='p-2'>PO No.</th>
                                <th className='p-2'>SI No.</th>
                                <th className='p-2'>Created At</th>
                                <th className='p-2'>Updated At</th>
                                <th className='p-2'>Action</th>
                            </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <tr key={index}>
                                    <td className='px-2 py-2 text-center border'>{index + 1}</td>
                                    <td className='px-2 py-2 text-center border'>{project.projectcode}</td>
                                    <td className='px-2 py-2 text-center border'>{project.customername}</td>
                                    <td className='px-2 py-2 text-center border'>{project.descriptionwork}</td>
                                    <td className='px-2 py-2 text-center border'>{project.pono}</td>
                                    <td className='px-2 py-2 text-center border'>{project.sino}</td>
                                    <td className='px-2 py-2 text-center border'>{project.created_at}</td>
                                    <td className='px-2 py-2 text-center border'>{project.updated_at}</td>
                                    <td className='px-2 py-2 text-center border'>
                                        <Link 
                                            as='button' 
                                            className='bg-sky-500 text-white p-2 rounded-lg cursor-pointer hover:opacity-80' 
                                            href={route('projects.show', project.id)}>
                                            <Eye size={15} />
                                        </Link>
                                        <Link 
                                            as='button' 
                                            className='bg-yellow-500 text-white p-2 rounded-lg cursor-pointer hover:opacity-80' 
                                            href={route('projects.edit', project.id)}> 
                                            <PencilIcon size={15} />
                                        </Link>
                                        <Button
                                            className='bg-red-500 text-white p-2 rounded-lg cursor-pointer hover:opacity-80' 
                                            onClick={() => {
                                                if(confirm('Are You Sure to Delete This Data')) {
                                                    router.delete(route('projects.destroy', project.id), {
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
