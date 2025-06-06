<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'name', 'code', 'customer_logo', 'customer_logo_originalname', 'telp', 'address'
    ];
}
