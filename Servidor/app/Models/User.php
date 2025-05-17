<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Post;
use App\Models\Coment;
use App\Models\Message;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Token;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function likedPosts()
    {
    return $this->belongsToMany(Post::class, 'likes', 'user_id', 'post_id')
                ->withTimestamps();
    }

   /*  public function likedPosts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'likes', 'user_id', 'post_id');
    } */

    public function coments(): HasMany
    {
        return $this->hasMany(Coment::class, 'user_id');
    }

    /* public function followers(): HasMany
    {
        return $this->hasMany(Coment::class);
    } */

    public function messages(): HasMany
    {
        return $this->hasMany(related: Message::class);
    }
    

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id')
            ->withTimestamps(); 
    }

    public function following(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'user_id')
            ->withTimestamps();
    }
}