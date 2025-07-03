<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'name', 'code', 'customer_logo', 'customer_logo_originalname', 'telp', 'address'
    ];

    public function customerProject(): HasMany
    {
        // If using customer ID:
        // return $this->hasMany(CustomerDetail::class);
        // If using customer name:
        return $this->hasMany(Project::class, 'customername', 'name');
    }
}
