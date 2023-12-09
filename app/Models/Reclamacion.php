<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reclamacion extends Model
{
    use HasFactory;
    protected $table = 'reclamaciones';

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empre_id', 'id');
    }

    protected $fillable = [
        'id',
        'reclamacion',
        'empre_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
