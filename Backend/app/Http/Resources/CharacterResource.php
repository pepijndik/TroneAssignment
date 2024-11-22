<?php

namespace App\Http\Resources;

use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Character
 */
class CharacterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'gamename' => $this->gamename,
            'healthPoints' => $this->healthPoints,
            'attackPoints' => $this->attackPoints,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
