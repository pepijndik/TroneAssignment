<?php

use App\Models\User;
beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});
it('Get all characters', function () {
    //Fake characters 1
    \App\Models\Character::factory()->create()->count(1);
    $response = $this->get('/api/characters');

    $response->assertStatus(200);
});

it('Get one character', function () {
    \App\Models\Character::factory()->create([
        'id' => 1,
        'name' => 'Test',
        'gamename' => 'Test',
        'healthPoints' => 100,
        'attackPoints' => 100,
        "created_at" => "2024-11-22T09:28:57.000000Z",
        "updated_at" => "2024-11-22T09:28:57.000000Z"
    ]);

    $response = $this->get('/api/characters/1');

    $response->assertStatus(200)->assertJson([
        'character' => [
            'id' => 1,
            'name' => 'Test',
            'gamename' => 'Test',
            'healthPoints' => 100,
            'attackPoints' => 100,
            "created_at" => "2024-11-22T09:28:57.000000Z",
            "updated_at" => "2024-11-22T09:28:57.000000Z"
        ]
    ]);
});

it('Create new character', function () {

    $response = $this->post('/api/characters', [
        'name' => 'Test',
        'gamename' => 'Test',
        'healthPoints' => 100,
        'attackPoints' => 100,
    ]);

    $response->assertStatus(200);
});


it('Cannot create new character when Points not positive', function () {
    $user = User::factory()->create();
    $this->actingAs($user);
    //Fake characters 1

    $response = $this->post('/api/characters', [
        'name' => 'Test',
        'gamename' => 'Test',
        'healthPoints' => -1,
        'attackPoints' => -1,
    ]);

    $response->assertStatus(302)->assertSessionHasErrors(['healthPoints', 'attackPoints']);
});

it('Can Update character', function () {

    //Fake characters 1
    $char = \App\Models\Character::factory()->create([
        'id' => 1,
    ]);
    $response = $this->put('/api/characters/1', [
        'name' => $char->name,
        'gamename' => "My Game",
        'healthPoints' => $char->healthPoints,
        'attackPoints' => $char->attackPoints,
    ]);

    $response->assertStatus(200);
});

it('Cannot Update character when Points not positive', function () {

    $char = \App\Models\Character::factory()->create([
        'id' => 1,
    ]);
    $response = $this->put('/api/characters/1', [
        'name' => $char->name,
        'gamename' => "My Game",
        'healthPoints' => -1,
        'attackPoints' => $char->attackPoints,
    ]);

    $response->assertStatus(302)->assertSessionHasErrors(['healthPoints']);
});
