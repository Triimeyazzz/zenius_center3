<?php

namespace Tests\Unit;

use App\Models\Pengguna;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PenggunaTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function pengguna_dapat_dibuat()
    {
        $pengguna = Pengguna::create([
            'nama' => 'John Doe',
            'email' => 'john@example.com',
            'kata_sandi' => bcrypt('password'),
            'role' => 'user'
        ]);

        $this->assertDatabaseHas('pengguna', [
            'email' => 'john@example.com'
        ]);
    }
}

