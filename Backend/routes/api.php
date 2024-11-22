<?php

use App\Http\Controllers\Api\CharacterController;
use App\Http\Controllers\Auth\PasswordController;

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::resource('characters', CharacterController::class)->names('characters');
    Route::post('characters/{character}/battle/{enemy}', [\App\Http\Controllers\Api\BattleController::class, 'battle'])->name('characters.attack');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


