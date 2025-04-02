<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
  /**
   * Display the admin dashboard.
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Dashboard');
  }
}
