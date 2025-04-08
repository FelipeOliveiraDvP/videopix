<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PackageUpdateRequest;
use App\Models\Package;
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
    return Inertia::render('Admin/Packages/Index', [
      'packages' => Package::get(),
    ]);
  }

  /**
   * Show the form to edit a specific package.
   */
  public function edit(Package $package): Response
  {
    return Inertia::render('Admin/Packages/Edit', [
      'package' => $package,
    ]);
  }

  /**
   * Update an existing package.
   */
  public function update(PackageUpdateRequest $request, Package $package): RedirectResponse
  {
    $package->update($request->validated());

    return redirect()
      ->route('admin.packages.index')
      ->with('success', 'Pacote atualizado com sucesso.');
  }

  /**
   * Display the customer packages list.
   */
  public function customerPackages(): Response
  {
    return Inertia::render('Customer/Packages', [
      'packages' => Package::get(),
    ]);
  }
}
