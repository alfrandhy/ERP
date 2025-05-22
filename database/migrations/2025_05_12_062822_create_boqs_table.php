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
        Schema::create('boqs', function (Blueprint $table) {
            $table->id();
            $table->string('projectcode');
            $table->string('partno')->unique('partno');
            $table->text('description');
            $table->string('material');
            $table->string('dimension');
            $table->string('qty');
            $table->string('unit');
            $table->string('type');
            // $table->string('uploadimage');
            // $table->string('uploadimagename');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boqs');
    }
};
