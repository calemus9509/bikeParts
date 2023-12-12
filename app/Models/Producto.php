<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    protected $table = 'productos';
    protected $primaryKey = 'idproducto';

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoriaF', 'idcategorias');
    }



    protected $fillable = [
        'idproducto',
        'nombre',
        'cantidad',
        'descripcion',
        'precio',
        'categoriaF',
        'empresa_id',
        'estado',
        'marca',
        'imagenes'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
