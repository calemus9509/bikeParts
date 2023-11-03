<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoMotos extends Model
{
    use HasFactory;

    protected $table = 'tipomotos';
    protected $fillable = [
        'nombre',
        'estado'

    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
