<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';
    protected $primaryKey = 'idproducto';

    protected $fillable = [
        'idproducto', 'nombre', 'descripcion', 'precio', 'cantidad', 'estado',
        'categoriaf', 'marca', 'imagenUno',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoriaF', 'idcategorias');
    }


    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
