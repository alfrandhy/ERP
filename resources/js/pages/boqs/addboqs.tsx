import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Textarea, Select } from '@headlessui/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add BOQ',
        href: route('boqs.create'),
    },
];

export default function Addboqs() {

    const {data, setData, post, processing, errors, reset} = useForm({
        partno: '',
        description: '',
        material: '',
        dimension: '',
        qty: '',
        unit: '',
        type: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('data', data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add BOQ" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='ml-auto'>
                    <Link as='button' href={route('boqs.index')} className='bg-red-500 hover:opacity-85 p-2 rounded-lg text-md text-white w-fit cursor-pointer'>Back to List</Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Add BOQ Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='off'>
                            <div className='grid gap-6'>
                                {/* Part No */}
                                <div className='grid gap-2'>
                                    <label htmlFor="partno">Part No.</label>
                                    <input 
                                        value={data.partno}
                                        onChange={(e) => setData('partno', e.target.value)}
                                        id='partno'
                                        name='partno'
                                        type='text'
                                        placeholder='Part No.'
                                        autoFocus
                                        tabIndex={1}
                                    />
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
                                    />
                                </div>
                                {/* Description */}
                                {/* Material */}
                                <div className='grid gap-2'>
                                    <label htmlFor="material">Material</label>
                                    <input 
                                        value={data.material}
                                        onChange={(e) => setData('material', e.target.value)}
                                        id='material'
                                        name='material'
                                        type='text'
                                        placeholder='Material'
                                        autoFocus
                                        tabIndex={1}
                                    />
                                </div>
                                {/* Material */}
                                {/* Dimension */}
                                <div className='grid gap-2'>
                                    <label htmlFor="dimension">Dimension</label>
                                    <input 
                                        value={data.dimension}
                                        onChange={(e) => setData('dimension', e.target.value)}
                                        id='dimension'
                                        name='dimension'
                                        type='text'
                                        placeholder='Dimension'
                                        autoFocus
                                        tabIndex={1}
                                    />
                                </div>
                                {/* End Dimension */}
                                {/* QTY */}
                                <div className='grid gap-2'>
                                    <label htmlFor="qty">QTY</label>
                                    <input 
                                        value={data.qty}
                                        onChange={(e) => setData('qty', e.target.value)}
                                        id='qty'
                                        name='qty'
                                        type='number'
                                        placeholder='QTY'
                                        autoFocus
                                        tabIndex={1}
                                    />
                                </div>
                                {/* End QTY */}
                                {/* Unit */}
                                <div className='grid gap-2'>
                                    <label htmlFor="unit">Unit</label>
                                    <input 
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                        id='unit'
                                        name='unit'
                                        type='text'
                                        placeholder='Unit'
                                        autoFocus
                                        tabIndex={1}
                                    />
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
                                        tabIndex={1}>
                                        <option value="">Select One Type</option>
                                        <option value="material">Material</option>
                                        <option value="construction">Construction</option>
                                        <option value="jasa">Jasa</option>
                                    </Select>
                                </div>
                                {/* End Type */}
                            </div>
                            <Button type="submit" className="mt-2 w-fit cursor-pointer" tabIndex={4}>
                                Save Data
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
