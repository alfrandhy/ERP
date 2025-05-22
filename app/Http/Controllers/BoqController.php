<?php

namespace App\Http\Controllers;

use App\Models\Boq;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facedes\Log;
use App\Http\Requests\BoqFormRequest;
use Inertia\Inertia;

class BoqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boqs = Boq::latest()->get();
        return Inertia::render('boqs/indexboqs', [
            'boqs' => $boqs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('boqs/addboqs');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BoqFormRequest $request)
    {
        // dd($request->all());
        try {
            $uploadImage = null;
            if ($request->file('uploadimage')) {
                $uploadImage = $request->file('uploadimage');
                $uploadImageOriginalName = $uploadImage->getClientOriginalName();
                $uploadImage = $uploadImage->store('boqs', 'public/image/boqs');
            }

            $boq = Boq::create([
                'projectcode' => $request->projectcode,
                'partno' => $request->partno,
                'description' => $request->description,
                'material' => $request->material,
                'dimension' => $request->dimension,
                'qty' => $request->qty,
                'unit' => $request->unit,
                'type' => $request->type,
                // 'uploadimage' => $uploadImage,
                // 'uploadimagename' => $uploadImageOriginalName,
            ]);

            if ($boq) {
                return redirect()->route('boqs.index')
                    ->with('success', 'BOQ inputted')
                ;
            }
            return redirect()->back()
                ->with('error', 'BOQ not inputted, check again')
            ;
        } catch (Exception $e) {
            log::error('BOQ creation failed: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Boq $boq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Boq $boq)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Boq $boq)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Boq $boq)
    {
        //
    }
}
