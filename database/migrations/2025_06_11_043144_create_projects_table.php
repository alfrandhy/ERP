<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('projectcode')->unique('projectcode'); // Unique project code
            $table->string('customername'); // This will reference the name in customers table
            $table->text('descriptionwork');
            $table->string('projectcategory');
            $table->string('pono');
            $table->string('sino');
            $table->string('podate');
            $table->string('orderdatereceived');
            $table->string('month');
            $table->string('year');
            $table->string('deliverydateaccordingtopo');
            $table->string('deliverydate');
            $table->string('remark');
            $table->string('location');
            $table->string('lastpayment');
            $table->string('top1');
            $table->string('top2');
            $table->string('top3');
            $table->string('top4');
            $table->string('projectperformance');
            $table->timestamps();
            
            // Foreign key constraint
            // $table->foreign('customername')
            //       ->references('name') // Ensure this matches the column in customers
            //       ->on('customers')
            //       ->onDelete('cascade'); // Optional: define behavior on delete
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('projects', function (Blueprint $table) {
        //     $table->dropForeign(['customername']); // Drop foreign key constraint
        // });
        Schema::dropIfExists('projects');
    }
};
