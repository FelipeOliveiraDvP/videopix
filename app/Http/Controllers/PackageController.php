<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PackageController extends Controller
{
  /**
   * Display the list of packages.
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Packages/Index');
  }

  /**
   * Show the form to edit a specific package.
   */
  public function edit(): Response
  {
    return Inertia::render('Admin/Packages/Edit');
  }

  /**
   * Update an existing package.
   */
  public function update(): Response
  {
    return Inertia::render('Admin/Packages/Edit');
  }
}
