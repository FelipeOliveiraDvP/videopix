import { Video } from "@/types";

export const dummyVideos: Video[] = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  url: `https://www.youtube.com/embed/mzJ4vCjSt28`,
  duration: Math.floor(Math.random() * 300) + 60, // Random duration between 60 and 360 seconds
  watched_time: 0,
  price: Math.floor(Math.random() * 20), // Random price between 0 and 20
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));
