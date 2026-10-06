"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { usePlan } from "@/app/context/PlanContext";
import { getWorkoutById } from "@/app/utils/api";
import { Workout } from "@/app/types";

type Params = Promise<{
  id: string;
}>;

export default function WorkoutDetails({
  params,
}: {
  params: Params;
}) {
  const { id } = use(params);

  const {
    plan,
    saved,
    addToPlan,
    addToSaved,
  } = usePlan();

  const [workout, setWorkout] =
    useState<Workout | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="h-[500px] animate-pulse rounded-3xl bg-[#15171D]" />
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 text-center">
        <h1 className="text-4xl font-black">
          Workout Not Found
        </h1>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#B6FF00] px-6 py-3 font-bold text-black"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const isPlanFull = plan.length >= 5;

  const isAlreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const isAlreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gray-500 transition hover:text-[#B6FF00]"
      >
        ← Back to Library
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative min-h-[450px] overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-[#B6FF00]/30 bg-[#B6FF00]/10 px-3 py-1 text-xs font-bold uppercase text-[#B6FF00]"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight">
            {workout.name}
          </h1>

          <p className="mt-5 leading-7 text-gray-400">
            {workout.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-[#15171D] p-4">
              <p className="text-xs text-gray-500">
                Duration
              </p>
              <p className="mt-1 font-bold">
                {workout.duration} min
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#15171D] p-4">
              <p className="text-xs text-gray-500">
                Calories
              </p>
              <p className="mt-1 font-bold">
                {workout.caloriesBurned}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#15171D] p-4">
              <p className="text-xs text-gray-500">
                Sets
              </p>
              <p className="mt-1 font-bold">
                {workout.sets}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#15171D] p-4">
              <p className="text-xs text-gray-500">
                Rating
              </p>
              <p className="mt-1 font-bold">
                ★ {workout.rating}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">
              Instructions
            </h2>

            <div className="mt-4 space-y-3">
              {workout.instructions.map(
                (instruction, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl border border-white/10 bg-[#15171D] p-4"
                  >
                    <span className="font-black text-[#B6FF00]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-6 text-gray-400">
                      {instruction}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={
                isPlanFull || isAlreadyInPlan
              }
              className="flex-1 rounded-full bg-[#B6FF00] px-6 py-4 text-sm font-black text-black transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isAlreadyInPlan
                ? "Already in Plan"
                : isPlanFull
                ? "Plan Full"
                : "Add to Today's Plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={isAlreadySaved}
              className="flex-1 rounded-full border border-white/20 px-6 py-4 text-sm font-black transition hover:border-[#B6FF00] hover:text-[#B6FF00] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isAlreadySaved
                ? "Already Saved"
                : "Save for Later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}