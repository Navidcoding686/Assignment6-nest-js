"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/app/components/WorkoutCard";
import { Workout } from "@/app/types";
import { getAllWorkouts } from "@/app/utils/api";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-16"
    >
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B6FF00]">
          The Library
        </p>

        <h2 className="mt-3 text-3xl font-black sm:text-4xl">
          THE LIBRARY
        </h2>

        <p className="mt-3 text-sm text-gray-500 sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[390px] animate-pulse rounded-2xl bg-[#15171D]"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}