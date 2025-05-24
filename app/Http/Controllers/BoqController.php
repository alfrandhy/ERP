<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Boq;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\BoqFormRequest;
use Illuminate\Support\Facedes\Log;

class BoqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boqs = Boq::latest()->get()->map(fn($boq) => [
            'id' => $boq->id,
            'projectcode' => $boq->projectcode,
            'partno' => $boq->partno,
            'description' => $boq->description,
            'material' => $boq->material,
            'dimension' => $boq->dimension,
            'qty' => $boq->qty,
            'unit' => $boq->unit,
            'type' => $boq->type,
            'created_at' => $boq->created_at->format('dMy h:m'),
            'updated_at' => $boq->updated_at->format('dMy h:m'),
        ]);
        return Inertia::render('boqs/indexboqs', [
            'boqs' => $boqs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('boqs/formboq');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BoqFormRequest $request)
    {
        // dd($request->all());
        try {

            $boq = Boq::create([
                'projectcode' => $request->projectcode,
                'partno' => $request->partno,
                'description' => $request->description,
                'material' => $request->material,
                'dimension' => $request->dimension,
                'qty' => $request->qty,
                'unit' => $request->unit,
                'type' => $request->type,
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
        return Inertia::render('boqs/formboq', [
            'boq' => $boq,
            'isView' => true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Boq $boq)
    {
        return Inertia::render('boqs/formboq', [
            'boq' => $boq,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BoqFormRequest $request, Boq $boq)
    {
        try {
            if ($boq) {
                $boq->projectcode = $request->projectcode;
                $boq->partno = $request->partno;
                $boq->description = $request->description;
                $boq->material = $request->material;
                $boq->dimension = $request->dimension;
                $boq->qty = $request->qty;
                $boq->unit = $request->unit;
                $boq->type = $request->type;

                $boq->save();
                return redirect()->route('boqs.index')->with('success', 'BOQ Updated');
            }
            return redirect()->back()->with('error', 'BOQ Not Updated, Check Again');
        } catch (Exeption $e) {
            Log::error('BOQ updated failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Boq $boq)
    {
        try {
            if ($boq) {
                $boq->delete();
                return redirect()->back()->with('success', 'BOQ Deleted');
            }
            return redirect()->back()->with('error', 'BOQ Not Deleted');
        } catch (Exception $e) {
            Log::error('BOQ deletion failed: ' . $e->getMessage());
        }
    }
}
