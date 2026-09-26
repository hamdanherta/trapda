<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\JobApplication;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Tests\TestCase;

class TrapdaApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_with_username_and_password()
    {
        $response = $this->post('/register', [
            'username' => 'testuser',
            'password' => 'secret123',
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertDatabaseHas('users', [
            'username' => 'testuser',
        ]);
        $this->assertAuthenticated();
    }

    public function test_user_can_login_with_username_and_password()
    {
        $user = User::create([
            'username' => 'john_doe',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->post('/login', [
            'username' => 'john_doe',
            'password' => 'password123',
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertAuthenticatedAs($user);
    }

    public function test_authenticated_user_can_create_job_application()
    {
        $user = User::create([
            'username' => 'applicant',
            'password' => Hash::make('password123'),
        ]);

        $this->actingAs($user);

        $response = $this->post('/job-applications', [
            'position_name' => 'Frontend Developer',
            'company_name' => 'Tech Corp',
            'location' => 'Jakarta',
            'status' => 'Dikirim',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('job_applications', [
            'user_id' => $user->id,
            'position_name' => 'Frontend Developer',
            'company_name' => 'Tech Corp',
            'location' => 'Jakarta',
            'status' => 'Dikirim',
        ]);
    }

    public function test_quick_one_click_status_change()
    {
        $user = User::create([
            'username' => 'applicant',
            'password' => Hash::make('password123'),
        ]);

        $app = JobApplication::create([
            'user_id' => $user->id,
            'position_name' => 'Backend Engineer',
            'company_name' => 'Unicorn Startup',
            'location' => 'Bandung',
            'status' => 'Dikirim',
            'applied_at' => now(),
        ]);

        $this->actingAs($user);

        $response = $this->patch("/job-applications/{$app->id}/status", [
            'status' => 'Wawancara',
        ]);

        $response->assertRedirect();
        $this->assertEquals('Wawancara', $app->fresh()->status);
    }

    public function test_auto_rejection_after_one_month_in_dikirim_status()
    {
        $user = User::create([
            'username' => 'old_applicant',
            'password' => Hash::make('password123'),
        ]);

        // Application created 40 days ago with status 'Dikirim'
        $oldApp = JobApplication::create([
            'user_id' => $user->id,
            'position_name' => 'Fullstack Developer',
            'company_name' => 'Old Enterprise',
            'location' => 'Surabaya',
            'status' => 'Dikirim',
            'applied_at' => Carbon::now()->subDays(40),
        ]);

        $this->actingAs($user);

        // Fetch dashboard which triggers auto-rejection check
        $this->get('/dashboard');

        $this->assertEquals('Ditolak', $oldApp->fresh()->status);
    }

    public function test_statistics_calculation()
    {
        $user = User::create([
            'username' => 'stats_user',
            'password' => Hash::make('password123'),
        ]);

        JobApplication::create([
            'user_id' => $user->id,
            'position_name' => 'Pos 1',
            'company_name' => 'Comp A',
            'location' => 'Jakarta',
            'status' => 'Wawancara',
            'applied_at' => now(),
        ]);

        JobApplication::create([
            'user_id' => $user->id,
            'position_name' => 'Pos 2',
            'company_name' => 'Comp B',
            'location' => 'Jakarta',
            'status' => 'Diterima',
            'applied_at' => now(),
        ]);

        $this->actingAs($user);

        $response = $this->get('/dashboard');
        $response->assertStatus(200);

        $inertiaProps = $response->original->getData()['page']['props'];
        $stats = $inertiaProps['stats'];

        $this->assertEquals(2, $stats['total_all']);
        $this->assertEquals(1, $stats['total_interview']);
        $this->assertEquals(1, $stats['total_accepted']);
        $this->assertEquals(50.0, $stats['percent_interview']);
        $this->assertEquals(50.0, $stats['percent_accepted']);
        $this->assertEquals(50.0, $stats['winrate']);
    }
}
