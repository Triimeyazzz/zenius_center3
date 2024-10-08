<?php
namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ];
    }

    public function authenticate()
    {
        $credentials = $this->only('email', 'password');

        if (!\Auth::guard('siswa')->attempt($credentials)) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }
    }
}
