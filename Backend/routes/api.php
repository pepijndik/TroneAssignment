<?php

use App\Http\Controllers\Api\CharacterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('characters', CharacterController::class)->names('characters');
    Route::post('characters/{character}/battle/{enemy}', [\App\Http\Controllers\Api\BattleController::class, 'battle'])->name('characters.attack');
});
