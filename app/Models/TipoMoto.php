<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoMoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'Nombre',
        'Estado'
    ];

    protected $hidden = [
        'created_at',
        'update_at'
    ];
}
