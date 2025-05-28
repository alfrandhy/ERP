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
            $customerLogo = null;
            if ($request->file('customer_logo')) {
                $customerLogo = $request->file('customer_logo');
                $customerLogoOriginalName = $customerLogo->getClientOriginalName();
                $customerLogo = $customerLogo->store('erp/customer', 'public');
            }

            $customer = Customer::create([
                'name' => $request->name,
                'code' => strtoupper($request->code),
                'telp' => $request->telp,
                'address' => $request->address,
                'customer_logo' => $customerLogo,
                'customer_logo_originalname' => $customerLogoOriginalName,
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerFormRequest $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
