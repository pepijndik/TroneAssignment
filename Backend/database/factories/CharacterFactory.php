<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\character>
 */
class CharacterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'gamename' => $this->faker->unique()->name,
            'healthPoints' => $this->faker->numberBetween(0, 100),
            'attackPoints' => $this->faker->numberBetween(0, 100),
        ];
    }
}
