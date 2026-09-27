<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobApplicationController;
use Illuminate\Support\Facades\Route;

// Guest Routes
Route::middleware('guest')->group(function () {
    Route::get('/', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/login', [AuthController::class, 'showLogin']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [JobApplicationController::class, 'index'])->name('dashboard');
    Route::get('/job-applications/pdf', [JobApplicationController::class, 'downloadPdf'])->name('job-applications.pdf');
    Route::post('/job-applications', [JobApplicationController::class, 'store'])->name('job-applications.store');
    Route::put('/job-applications/{jobApplication}', [JobApplicationController::class, 'update'])->name('job-applications.update');
    Route::patch('/job-applications/{jobApplication}/status', [JobApplicationController::class, 'updateStatus'])->name('job-applications.update-status');
    Route::delete('/job-applications/{jobApplication}', [JobApplicationController::class, 'destroy'])->name('job-applications.destroy');
});
