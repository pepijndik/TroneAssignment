<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    /** @use HasFactory<\Database\Factories\CharacterFactory> */
    use HasFactory;

    protected $fillable = ['name', 'gamename', 'healthPoints', 'attackPoints'];

    protected $casts = [
        'healthPoints' => 'integer',
        'attackPoints' => 'integer',
    ];

    public function attack(Character $enemy)
    {
        $enemy->healthPoints -= $this->attackPoints;
        $enemy->save();
    }
}
