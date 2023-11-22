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
        Schema::create('personas', function (Blueprint $table) {
            $table->id();
            $table->string("Nombre");
            $table->string("Apellido");
            $table->string("Documento");
            $table->string("Telefono");
            $table->unsignedBigInteger('rol_id');
            $table->string("Correo");
            $table->string("Usuario");
            $table->string("Contraseña");
            $table->string('reset_token')->nullable();
            $table->enum('Estado', ['A', 'I'])->default('A');
            $table->timestamps();


            // Definir la clave foránea
            $table->foreign('rol_id')->references('id')->on('rols');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personas');
    }
};
