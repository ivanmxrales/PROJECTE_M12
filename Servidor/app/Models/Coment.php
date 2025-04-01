<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Coment extends Model
{
    public function users(): hasMany{
        return $this->hasMany(User::class);
    }

    
}
