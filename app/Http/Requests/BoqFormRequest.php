<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BoqFormRequest extends FormRequest
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
            'projectcode'   => 'required|string|max:255',
            'partno'        => 'required|string|max:255',
            'description'   => 'required|string',
            'material'      => 'required|string|max:255',
            'dimension'     => 'required|string|max:255',
            'qty'           => 'required|numeric|max:255',
            'unit'          => 'required|string|max:255',
            'type'          => 'required|string|max:255',
            // 'upload_image'  => 'nullable|image|mimes:jpeg,jpg,png|max:5120',
        ];
    }

    public function messages() : array {
        return [
            'projectcode.required'  => 'Define the project for this part',
            'partno.required'       => 'Define the Part No. / Part DWG No.',
            'description.required'  => 'Define the description for this part',
            'material.required'     => 'Define the material for this part',
            'dimension.required'    => 'Define the dimension for this part',
            'qty.required'          => 'Define the qty for this part',
            'unit.required'         => 'Define the unit for this part',
            'type.required'         => 'Define the type of for this part',
            // 'uploadimage.image'     => 'The Upload Image only can import Image File (!peg,jpg,png!)',
            // 'uploadimage.mimes'     => 'The Upload Image cant imported only can import (!peg,jpg,png!)',
            // 'uploadimage.max'       => 'The Upload Image only can import max 5MB File Size',
        ];
    }
}
