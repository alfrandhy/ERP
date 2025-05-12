<?php

namespace App\Http\Controllers;

use App\Models\Boq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('boqs/indexboqs');
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
    public function store(Request $request)
    {
        //
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
