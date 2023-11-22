<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $fillable = [
        'Modo_Entraga',
        'Cantidad',
        'Precio'
    ];

    protected $hidden = [
        'created_at',
        'update_at'
    ];
}
