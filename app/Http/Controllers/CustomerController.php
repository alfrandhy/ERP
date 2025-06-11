<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\CustomerFormRequest;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::latest()->get()->map(fn($customer) => [
            'id' => $customer->id,
            'name' => $customer->name,
            'code' => $customer->code,
            'telp' => $customer->telp,
            'address' => $customer->address,
            'customer_logo' => $customer->customer_logo,
            'customer_logo_originalname' => $customer->customer_logo_originalname,
            'created_at' => $customer->created_at->format('dMy h:m'),
            'updated_at' => $customer->updated_at->format('dMy h:m'),
        ]);
        return Inertia::render('customers/indexcustomers', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('customers/formcustomers');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerFormRequest $request)
    {
        try {
            if ($request->hasFile('customer_logo')) {
                $image = $request->file('customer_logo');
                $extension = $image->getClientOriginalExtension();
                $fileoriginalname = $image->getClientOriginalName();
                $safeName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $request['name']);
                $filename = $safeName . '.' . $extension;

                // Define the destination path inside the public/customers directory
                $destinationPath = public_path('erp/customers');

                // Make sure the directory exists
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                // Move the uploaded file to the public/customers directory
                $image->move($destinationPath, $filename);
            } else {
                // $validated['customer_logo'] = null;
                $filename = null;
            }


            $customer = Customer::create([
                'name' => $request->name,
                'code' => strtoupper($request->code),
                'telp' => $request->telp,
                'address' => $request->address,
                'customer_logo' => $filename,
                'customer_logo_originalname' => $fileoriginalname,
            ]);

            if ($customer) {
                return redirect()->route('customers.index')
                    ->with('success', 'Customer Data inputted')
                ;
            }
            return redirect()->back()
                ->with('error', 'Customer not inputted, check again')
            ;
        } catch (Exception $e) {
            Log::error('Customer creation failed: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return Inertia::render('customers/formcustomers', [
            'customer' => $customer,
            'isView' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('customers/formcustomers', [
            'customer' => $customer,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerFormRequest $request, Customer $customer)
    {
        try {
            if ($customer) {
                $customer->name = $request->name;
                $customer->code = $request->code;
                $customer->telp = $request->telp;
                $customer->address = $request->address;
                
                if ($request->file('customer_logo')) {
                    $image = $request->file('customer_logo');
                    $extension = $image->getClientOriginalExtension();
                    $fileoriginalname = $image->getClientOriginalName();
                    $safeName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $request['name']);
                    $filename = $safeName . '.' . $extension;

                    // Define the destination path inside the public/customers directory
                    $destinationPath = public_path('erp/customers');

                    // Make sure the directory exists
                    if (!file_exists($destinationPath)) {
                        mkdir($destinationPath, 0755, true);
                    }

                    // Move the uploaded file to the public/customers directory
                    $image->move($destinationPath, $filename);

                    $customer->customer_logo = $filename;
                    $customer->customer_logo_originalname = $fileoriginalname;
                }

                $customer->save();

                return redirect()->route('customers.index')
                    ->with('success', 'Customer Data Updated')
                ;
            }
            return redirect()->back()
                ->with('error', 'Customer Data Not Updated, Please Check Again')
            ;
        } catch (\Throwable $th) {
            Log::error('Customer update failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        try {
            if ($customer) {
                $customer->delete();
                return redirect()->back()->with('success', 'Customer Deleted');
            }
            return redirect()->back()->with('error', 'Customer Not Deleted');
        } catch (Exception $e) {
            Log::error('Customer deletion failed: ' . $e->getMessage());
        }
    }
}
