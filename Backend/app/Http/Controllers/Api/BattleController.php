<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Character;

class BattleController extends Controller
{
    public function battle(Character $character, Character $enemy)
    {
        if (!$character || !$enemy) {
            return response()->json(['error' => 'Both characters must exist'], 400);
        }

        $character->attack($enemy);
        $enemy->attack($character);

        $winner = $character->healthPoints > $enemy->healthPoints ? $character : $enemy;

        return response()->json([
            'winner_id' => $winner->id,
            'character' => $character,
            'enemy' => $enemy,
        ]);
    }
}
