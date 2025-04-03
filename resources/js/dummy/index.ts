import { Package, Video } from "@/types";

export const dummyVideos: Video[] = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  url: `https://www.youtube.com/embed/mzJ4vCjSt28`,
  duration: Math.floor(Math.random() * 300) + 60, // Random duration between 60 and 360 seconds
  watched_time: 0,
  price: Math.floor(Math.random() * 20), // Random price between 0 and 20
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

export const dummyPackages: Package[] = [
  {
    id: 1,
    name: "Bronze",
    price: 10,
    withdraw_percentage: 0.1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Prata",
    price: 20,
    withdraw_percentage: 0.2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Ouro",
    price: 30,
    withdraw_percentage: 0.3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Diamante",
    price: 40,
    withdraw_percentage: 0.4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Platina",
    price: 50,
    withdraw_percentage: 0.5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
