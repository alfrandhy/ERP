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

export default function formBoq({ ...props }) {

    const { boq , isView, isEdit } = props;

    // Add this at the top of your component, after the hooks
    console.log('Initial data:', {
        projectcode: boq?.projectcode || '',
        partno: boq?.partno || '',
        description: boq?.description || '',
        material: boq?.material || '',
        dimension: boq?.dimension || '',
        qty: boq?.qty || '',
        unit: boq?.unit || '',
        type: boq?.type || '',
    });


    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `${isView ? 'Show' : (isEdit ? 'Update' : 'Create' )} BOQ`,
        href: route('boqs.create'),
    },
];

    const {data, setData, post, put, processing, errors, reset} = useForm({
        projectcode: boq?.projectcode || '',
        partno: boq?.partno || '',
        description: boq?.description || '',
        material: boq?.material || '',
        dimension: boq?.dimension || '',
        qty: boq?.qty || '',
        unit: boq?.unit || '',
        type: boq?.type || '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEdit){
            put(route('boqs.update', boq.id ), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('boqs.store'), {
                onSuccess: () => reset(),
            });
        }
        // console.log('data', data);
    };

    // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.files && e.target.files.lenght > 0) {
    //          setData('uploadimage', e.target.files[0]);
    //      };
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add BOQ" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='ml-auto'>
                    <Link 
                        as='button' 
                        href={route('boqs.index')} 
                        className='flex items-center bg-red-500 hover:opacity-85 p-2 rounded-lg text-md text-white w-fit cursor-pointer'>
                        <ArrowLeftIcon /> Back to List
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{isView ? 'Show' : isEdit ? 'Update' : 'Add'} BOQ Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='off'>
                            <div className='grid gap-6'>
                                {/* Project Code */}
                                <div className='grid gap-2'>
                                    <label htmlFor="partno">Project Code</label>
                                    <Input 
                                        value={data.projectcode}
                                        onChange={(e) => setData('projectcode', e.target.value)}
                                        id='projectcode'
                                        name='projectcode'
                                        type='text'
                                        placeholder='Project Code'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.projectcode && <InputError message={errors.projectcode} />}
                                </div>
                                {/* End Project Code */}
                                {/* Part No */}
                                <div className='grid gap-2'>
                                    <label htmlFor="partno">Part No.</label>
                                    <Input 
                                        value={data.partno}
                                        onChange={(e) => setData('partno', e.target.value)}
                                        id='partno'
                                        name='partno'
                                        type='text'
                                        placeholder='Part No.'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.partno && <InputError message={errors.partno} />}
                                </div>
                                {/* End Part No */}
                                {/* Description */}
                                <div className='grid gap-2'>
                                    <label htmlFor="description">Desctiption</label>
                                    <Textarea 
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        id='description'
                                        name='description'
                                        placeholder='Description'
                                        autoFocus
                                        tabIndex={1}
                                        rows={2}
                                        disabled={isView || processing}
                                    />
                                    {errors.description && <InputError message={errors.description} />}
                                </div>
                                {/* Description */}
                                {/* Material */}
                                <div className='grid gap-2'>
                                    <label htmlFor="material">Material</label>
                                    <Input 
                                        value={data.material}
                                        onChange={(e) => setData('material', e.target.value)}
                                        id='material'
                                        name='material'
                                        type='text'
                                        placeholder='Material'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.material && <InputError message={errors.material} />}
                                </div>
                                {/* Material */}
                                {/* Dimension */}
                                <div className='grid gap-2'>
                                    <label htmlFor="dimension">Dimension</label>
                                    <Input 
                                        value={data.dimension}
                                        onChange={(e) => setData('dimension', e.target.value)}
                                        id='dimension'
                                        name='dimension'
                                        type='text'
                                        placeholder='Dimension'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.dimension && <InputError message={errors.dimension} />}
                                </div>
                                {/* End Dimension */}
                                {/* QTY */}
                                <div className='grid gap-2'>
                                    <label htmlFor="qty">QTY</label>
                                    <Input 
                                        value={data.qty}
                                        onChange={(e) => setData('qty', e.target.value)}
                                        id='qty'
                                        name='qty'
                                        type='number'
                                        placeholder='QTY'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.qty && <InputError message={errors.qty} />}
                                </div>
                                {/* End QTY */}
                                {/* Unit */}
                                <div className='grid gap-2'>
                                    <label htmlFor="unit">Unit</label>
                                    <Input 
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                        id='unit'
                                        name='unit'
                                        type='text'
                                        placeholder='Unit'
                                        autoFocus
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    />
                                    {errors.unit && <InputError message={errors.unit} />}
                                </div>
                                {/* End Unit */}
                                {/* Type */}
                                <div className='grid gap-2'>
                                    <label htmlFor="type">Type</label>
                                    <Select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)} 
                                        id='type' 
                                        name="type" 
                                        autoFocus 
                                        tabIndex={1}
                                        disabled={isView || processing}
                                    >
                                        <option value="">Select One Type</option>
                                        <option value="material">Material</option>
                                        <option value="construction">Construction</option>
                                        <option value="jasa">Jasa</option>
                                    </Select>
                                    {errors.type && <InputError message={errors.type} />}
                                </div>
                                {/* End Type */}
                                {/* Image Upload */}
                                {/* <div className='grid gap-2'>
                                    <label htmlFor="image_upload">Image Upload</label>
                                    <Input onChange={handleFileUpload} id='upload_image' name='upload_image' type='file' autoFocus tabIndex={4} />
                                    {errors.type && <InputError message={errors.type} />}
                                </div> */}
                                {/* End Image Upload */}
                            </div>
                            {!isView && (
                                <Button type="submit" className="mt-2 w-fit cursor-pointer" tabIndex={4}>
                                    {processing && <LoaderCircle className='h4 w-4 animate-spin' />}
                                    {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Save'} Boq
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
