<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Posts/Index', [
      'posts' => Post::all()
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('Posts/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    Post::create($request->validate([
      'title' => ['required', 'max:50'],
      'body' => ['required'],
    ]));

    return to_route('posts.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Post $post)
  {
    return Inertia::render('Posts/Edit', [
      'post' => $post
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Post $post)
  {
    return Inertia::render('Posts/Edit', [
      'post' => $post
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Post $post)
  {
    $post->update($request->validate([
      'title' => ['required', 'max:50'],
      'body' => ['required'],
    ]));

    return to_route('posts.index');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Post $post)
  {
    $post->delete();
  }
}
