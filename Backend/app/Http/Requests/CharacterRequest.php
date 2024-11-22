<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CharacterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string','unique:App\Models\Character,name'],
            'gamename' => ['required', 'string', 'unique:App\Models\Character,gamename'],
            'healthPoints' => ['required', 'integer','min:1'],
            'attackPoints' => ['required', 'integer','min:1'],
        ];
    }
}
