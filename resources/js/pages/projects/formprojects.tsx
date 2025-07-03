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

export default function formProject({ ...props }) {

    const { project , isView, isEdit } = props;

    // Add this at the top of your component, after the hooks
    console.log('Initial data:', {
        projectcode : project?.projectcode || '',
        customername : project?.customername || '',
        descriptionwork : project?.descriptionwork || '',
        projectcategory : project?.projectcategory || '',
        pono : project?.pono || '',
        sino : project?.sino || '',
        podate : project?.podate || '',
        orderdatereceived : project?.orderdatereceived || '',
        month : project?.month || '',
        year : project?.year || '',
        deliverydateaccordingtopo : project?.deliverydateaccordingtopo || '',
        deliverydate : project?.deliverydate || '',
        remark : project?.remark || '',
        location : project?.location || '',
        lastpayment : project?.lastpayment || '',
        top1 : project?.top1 || '',
        top2 : project?.top2 || '',
        top3 : project?.top3 || '',
        top4 : project?.top4 || '',
        projectperformance : project?.projectperformance || '',
    });


    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `${isView ? 'Show' : (isEdit ? 'Update' : 'Create' )} Project`,
        href: route('projects.create'),
    },
];

    const {data, setData, post, put, processing, errors, reset} = useForm({
        projectcode : project?.projectcode || '',
        customername : project?.customername || '',
        descriptionwork : project?.descriptionwork || '',
        projectcategory : project?.projectcategory || '',
        pono : project?.pono || '',
        sino : project?.sino || '',
        podate : project?.podate || '',
        orderdatereceived : project?.orderdatereceived || '',
        month : project?.month || '',
        year : project?.year || '',
        deliverydateaccordingtopo : project?.deliverydateaccordingtopo || '',
        deliverydate : project?.deliverydate || '',
        remark : project?.remark || '',
        location : project?.location || '',
        lastpayment : project?.lastpayment || '',
        top1 : project?.top1 || '',
        top2 : project?.top2 || '',
        top3 : project?.top3 || '',
        top4 : project?.top4 || '',
        projectperformance : project?.projectperformance || '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEdit){
            put(route('projects.update', project.id ), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('projects.store'), {
                onSuccess: () => reset(),
            });
        }
        // console.log('data', data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isView ? 'Show Project' : isEdit ? 'Update Project' : 'Add Project'} />
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
                        <CardTitle>{isView ? 'Show' : isEdit ? 'Update' : 'Add'} Project Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='on' encType="multipart/form-data">
                            <div className='grid gap-6'>
                                {/* Project Code */}
                                <div className='grid gap-2'>
                                    <label htmlFor="projectcode">Project Code</label>
                                    <Input 
                                        value={data.projectcode}
                                        onChange={(e) => setData('projectcode', e.target.value)}
                                        id='projectcode'
                                        name='projectcode'
                                        type='text'
                                        placeholder='Customer Name'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                        autoComplete='projectcode'
                                    />
                                    {errors.projectcode && <InputError message={errors.projectcode} />}
                                </div>
                                {/* End Project Code */}
                                {/* Part No */}
                                <div className='grid gap-2'>
                                    <label htmlFor="customername">Customer Name</label>
                                    <Input 
                                        value={data.customername}
                                        onChange={(e) => setData('customername', e.target.value)}
                                        id='customername'
                                        name='customername'
                                        type='text'
                                        placeholder='Customer Code'
                                        autoFocus
                                        tabIndex={2}
                                        disabled={isView || processing}
                                        autoComplete='customername'
                                    />
                                    {errors.customername && <InputError message={errors.customername} />}
                                </div>
                                {/* End Part No */}
                                {/* Description */}
                                <div className='grid gap-2'>
                                    <label htmlFor="descriptionwork">Work Description</label>
                                    <Textarea 
                                        value={data.descriptionwork}
                                        onChange={(e) => setData('descriptionwork', e.target.value)}
                                        id='descriptionwork'
                                        name='descriptionwork'
                                        placeholder='Address'
                                        autoFocus
                                        tabIndex={5}
                                        rows={2}
                                        disabled={isView || processing}
                                        autoComplete='descriptionwork'
                                    />
                                    {errors.descriptionwork && <InputError message={errors.descriptionwork} />}
                                </div>
                                {/* Description */}
                            </div>
                            {!isView && (
                                <Button type="submit" className="mt-2 w-fit cursor-pointer" tabIndex={4}>
                                    {processing && <LoaderCircle className='h4 w-4 animate-spin' />}
                                    {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Save'}
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
