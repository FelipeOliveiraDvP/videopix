<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\VideoRequest;
use App\Http\Resources\VideoResource;
use App\Models\UserVideo;
use App\Models\Video;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class VideoController extends Controller
{
  /**
   * Display the list of videos.
   */
  public function index(): Response
  {
    return Inertia::render('Admin/Videos/Index', [
      'videos' => Video::orderBy('created_at', 'desc')->paginate(),
    ]);
  }

  /**
   * Show the form to create a new video.
   */
  public function create(): Response
  {
    return Inertia::render('Admin/Videos/Create');
  }

  /**
   * Store a new video.
   */
  public function store(VideoRequest $request): RedirectResponse
  {
    Video::create($request->validated());

    return Redirect::route('admin.videos.index')->with('success', 'Video criado com sucesso!');
  }

  /**
   * Show the form to edit a specific video.
   */
  public function edit(Video $video): Response
  {
    return Inertia::render('Admin/Videos/Edit', [
      'video' => new VideoResource($video),
    ]);
  }

  /**
   * Update an existing video.
   */
  public function update(Video $video, VideoRequest $request): RedirectResponse
  {
    $video->update($request->validated());

    return Redirect::route('admin.videos.index')->with('success', 'Video atualizado com sucesso!');
  }

  /**
   * Destroy an existing video.
   */
  public function destroy(Video $video): RedirectResponse
  {
    $video->delete();

    return Redirect::back()->with('success', 'Video removido com sucesso.');
  }

  /**
   * Display the customer videos home page.
   */
  public function customerVideos(): Response
  {
    return Inertia::render('Customer/Home', [
      'watched' => Auth::user()
        ->watchedVideos()
        ->orderBy('user_videos.watched_at', 'desc')
        ->paginate(),
      'videos' => Auth::user()
        ->unwatchedVideos()
        ->orderBy('created_at', 'desc')
        ->paginate(),

    ]);
  }

  /**
   * Display the watch page for a specific video.
   */
  public function watch(Video $video): Response
  {
    UserVideo::updateOrCreate(
      ['user_id' => Auth::id(), 'video_id' => $video->id],
      ['watched_at' => now()]
    );

    $watched_video = Auth::user()
      ->watchedVideos()
      ->withPivot('watched_time')
      ->where('video_id', $video->id)
      ->firstOrFail();

    return Inertia::render('Customer/Watch', [
      'video' => new VideoResource($watched_video),
      'videos' => Auth::user()
        ->unwatchedVideos()
        ->orderBy('created_at', 'desc')
        ->paginate(),
    ]);
  }

  /**
   * Update the progress of a specific video.
   */
  public function progress(Request $request, Video $video): RedirectResponse
  {
    $request->validate([
      'watched_time' => 'required|integer|min:0',
    ]);

    $user = $request->user();

    $user->watchedVideos()->syncWithoutDetaching([
      $video->id => ['watched_time' => $request->watched_time],
    ]);

    return Redirect::back();
  }

  /**
   * Mark a specific video as watched.
   */
  public function watched(Request $request, Video $video): RedirectResponse
  {
    $user = $request->user();

    $user->watchedVideos()->syncWithoutDetaching([
      $video->id => ['watched' => true],
    ]);

    return Redirect::route('customer.home');
  }
}
