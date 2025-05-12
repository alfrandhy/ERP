<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Boq extends Model
{
    protected $fillable = [
        "partno", "description", "material", "dimension", "qty", "unit", "type", 
    ];
}
