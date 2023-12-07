<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;
    protected $table = 'empresas';

    public function admin()
    {
        return $this->belongsTo(Persona::class, 'admin_id', 'id');
    }

    protected $fillable = [
        'nombre',
        'descripcion',
        'nit',
        'imagen',
        'estado',
        'direccion',
        'telefono',
        'admin_id',
        'logo',
        'vision',
        'mision',
        'correo',
        'instagram',
        'marca_aliada',
    ];

    protected $hiddens = [
        'created_at',
        'updated_at',
    ];
}
