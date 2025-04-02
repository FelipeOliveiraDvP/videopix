<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VideoController extends Controller
{
  /**
   * Display the list of videos.
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Videos/Index');
  }

  /**
   * Show the form to create a new video.
   */
  public function create(): Response
  {
    return Inertia::render('Admin/Videos/Create');
  }

  /**
   * Show the form to edit a specific video.
   */
  public function edit(): Response
  {
    return Inertia::render('Admin/Videos/Edit');
  }

  /**
   * Store a new video.
   */
  public function store(): Response
  {
    return Inertia::render('Admin/Videos/Index');
  }

  /**
   * Update an existing video.
   */
  public function update(): Response
  {
    return Inertia::render('Admin/Videos/Edit');
  }

  /**
   * Destroy an existing video.
   */
  public function destroy(): Response
  {
    return Inertia::render('Admin/Videos/Index');
  }

  /**
   * Display the customer videos home page.
   */
  public function customerVideos(): Response
  {
    return Inertia::render('Customer/Home', [
      'users_count' => users_count(),
    ]);
  }

  /**
   * Display the watch page for a specific video.
   */
  public function watch(): Response
  {
    return Inertia::render('Customer/Watch');
  }

  /**
   * Update the progress of a specific video.
   */
  public function progress(): Response
  {
    return Inertia::render('Customer/Watch');
  }

  /**
   * Mark a specific video as watched.
   */
  public function watched(): Response
  {
    return Inertia::render('Customer/Watch');
  }
}
