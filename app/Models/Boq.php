<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Boq extends Model
{
    protected $fillable = [
        'projectcode', "partno", "description", "material", "dimension", "qty", "unit", "type",
        // 'uploadimage', 'uploadimagename', 
    ];
}
