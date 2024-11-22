<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CharacterRequest;
use App\Http\Resources\CharacterResource;
use App\Models\Character;

class CharacterController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            'characters' => CharacterResource::collection(Character::all())
        ]);
    }

    /**
     * @param Character $character
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Character $character)
    {
        return response()->json([
            'character' => new CharacterResource($character)
        ]);
    }

    public function store(CharacterRequest $request)
    {

        $character = Character::create( $request->validated());

        return response()->json([
            'character' => new CharacterResource($character)
        ]);
    }

    public function update(CharacterRequest $request, Character $character)
    {


        $character->update($request->validated());
        return response()->json([
            'characters' => new CharacterResource($character->refresh())
        ]);
    }

    public function destroy(Character $character)
    {
        $character->delete();
        return response()->json([
            'message' => 'Character deleted'
        ]);
    }
}
