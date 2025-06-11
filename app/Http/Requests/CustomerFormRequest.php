<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Customer;

class CustomerFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'                          => 'required|string|max:255',
            'code'                          => [
                'required',
                'string',
                'max:255',
                Rule::unique('customers')->ignore($this->customer), // Important part
            ],
            'telp'                          => 'nullable|string|max:15',
            'address'                       => 'nullable|string|max:255',
            'customer_logo'                 => 'nullable|image|mimes:jpeg,jpg,png|max:5120',
            'customer_logo_originalname'    => 'nullable|string|max:255',
        ];
    }

    public function messages() : array {
        return [
            'name.required'         => 'Define the customer name',
            'code.required'         => 'Define the code for this customer',
            'code.unique'           => 'Customer Code was used by other Customer, use another Code!',
            'customer_logo.image'   => 'The Upload Image only can import Image File (!peg,jpg,png!)',
            'customer_logo.mimes'   => 'The Upload Image cant imported only can import (!peg,jpg,png!)',
            'customer_logo.max'     => 'The Upload Image only can import max 5MB File Size',
            'telp.max'              => 'The maximum caracter is 15'
        ];
    }
}
