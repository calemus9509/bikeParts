<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'cantidad',
        'marca',
        'descripcion',
        'precio',
        'estado'
    ];

    protected $hidden = [
        'created_at',
        'update_at'
    ];
}
