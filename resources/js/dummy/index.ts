import { Package, Video } from "@/types";

export const dummyVideos: Video[] = [
  {
    id: 1,
    url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    duration: 3600,
    price: 0.5,
    watched_time: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    url: "https://www.youtube.com/watch?v=Cs8NuWUv8n4",
    duration: 900,
    price: 0.5,
    watched_time: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    url: "https://www.youtube.com/watch?v=m8sQAOS6shI",
    duration: 1800,
    price: 0.5,
    watched_time: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    url: "https://www.youtube.com/watch?v=cTX-1nNxsLU",
    duration: 600,
    price: 0.5,
    watched_time: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

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
