import { Workout } from "@/app/types";

const API_URL =
  "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await res.json();

  return data;
}

export async function getWorkoutById(
  id: string
): Promise<Workout> {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Workout not found");
  }

  const data = await res.json();

  return data;
}