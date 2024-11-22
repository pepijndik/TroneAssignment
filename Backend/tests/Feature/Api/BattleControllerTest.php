<?php


use App\Models\Character;
use App\Models\User;
beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});
it('battle returns error if characters do not exist', function () {
    $response = $this->postJson('/api/characters/999/battle/999');
    $response->assertStatus(404)
        ->assertJson(['message' => 'No query results for model [App\\Models\\Character] 999']);
});

it('battle determines the winner correctly', function () {
    $character = Character::factory()->create(
        ['healthPoints' => 100,
            'attackPoints' => 10]);
    $enemy = Character::factory()->create(
        ['healthPoints' => 50,
            'attackPoints' => 5]);

    $response = $this->postJson('/api/characters/'.$character->id.'/battle/'.$enemy->id);

    $response->assertStatus(200)
        ->assertJson(
            [   'winner_id' => $character->id,
                'character' =>
                    [
                        ...$character->toArray(),
                        'healthPoints' => 95,
                    ],
                'enemy' => [
                    ...$enemy->toArray(),
                    'healthPoints' => 40,
                ]
            ]);
});
