<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectFormRequest;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::latest()->get()->map(fn($project) => [
            'id' => $project->id,
            'projectcode' => $project->projectcode,
            'customername' => $project->customername,
            'descriptionwork' => $project->descriptionwork,
            'projectcategory' => $project->projectcategory,
            'pono' => $project->pono,
            'sino' => $project->sino,
            'podate' => $project->podate,
            'orderdatereceived' => $project->orderdatereceived,
            'month' => $project->month,
            'year' => $project->year,
            'deliverydateaccordingtopo' => $project->deliverydateaccordingtopo,
            'deliverydate' => $project->deliverydate,
            'remark' => $project->remark,
            'location' => $project->location,
            'lastpayment' => $project->lastpayment,
            'top1' => $project->top1,
            'top2' => $project->top2,
            'top3' => $project->top3,
            'top4' => $project->top4,
            'projectperformance' => $project->projectperformance,
            'created_at' => $customer->created_at->format('dMy h:m'),
            'updated_at' => $customer->updated_at->format('dMy h:m'),
        ]);
        return Inertia::render('projects/indexprojects', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
