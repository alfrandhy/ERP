<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = ['projectcode', 'customername', 'descriptionwork', 'projectcategory', 'pono', 'sino', 'podate', 'orderdatereceived', 'month', 'year', 'deliverydateaccordingtopo', 'deliverydate', 'remark', 'location', 'lastpayment', 'top1', 'top2', 'top3', 'top4', 'projectperformance'];

    public function customer(): BelongsTo
    {
        // If using customer ID:
        // return $this->belongsTo(Customer::class);
        // If using customer name:
        return $this->belongsTo(Customer::class, 'name', 'customername');
    }
}
