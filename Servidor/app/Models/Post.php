<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    //
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id')
            ->withTimestamps();
    }


    public function coments()
    {
        return $this->hasMany(Coment::class);
    }

    /* public function posts(): HasMany
    {
        return $this->hasMany(Post::class)->withTimestamps();
    } */
    protected $guarded = ['id'];



}
