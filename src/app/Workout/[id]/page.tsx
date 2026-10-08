"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { usePlan } from "@/app/context/PlanContext";
import { getWorkoutById } from "@/app/utils/api";
import { Workout } from "@/app/types";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";

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
        <div className="h-[400px] animate-pulse rounded-3xl bg-[#15171D] sm:h-[500px]" />
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 text-center">
        <h1 className="text-3xl font-black sm:text-4xl">
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
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 sm:py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gray-500 transition hover:text-[#B6FF00]"
      >
        ← Back to Library
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Image */}
        <div className="relative min-h-[350px] overflow-hidden rounded-lg border border-white/10 bg-[#15171D] sm:min-h-[450px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#1E2330] px-3 py-1 text-sm font-semibold text-white"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-8 rounded-lg bg-[#1E2330] px-4 py-3">
            <div className="flex justify-between gap-4 py-2">
              <p className="text-gray-300">Equipment</p>
              <p className="text-right font-semibold text-white">
                {workout.equipment}
              </p>
            </div>

            <div className="flex justify-between gap-4 border-t border-gray-600 py-2">
              <p className="text-gray-300">Difficulty</p>
              <p className="font-semibold text-white">
                {workout.difficulty}
              </p>
            </div>

            <div className="flex justify-between gap-4 border-t border-gray-600 py-2">
              <p className="text-gray-300">Sets</p>
              <p className="font-semibold text-white">
                {workout.sets}
              </p>
            </div>

            <div className="flex justify-between gap-4 border-t border-gray-600 py-2">
              <p className="text-gray-300">Reps</p>
              <p className="font-semibold text-white">
                {workout.reps}
              </p>
            </div>

            <div className="flex justify-between gap-4 border-t border-gray-600 py-2">
              <p className="text-gray-300">Duration</p>
              <p className="font-semibold text-white">
                {workout.duration} min
              </p>
            </div>

            <div className="flex justify-between gap-4 border-t border-gray-600 py-2">
              <p className="text-gray-300">Calories</p>
              <p className="font-semibold text-white">
                {workout.caloriesBurned} kcal
              </p>
            </div>

            <div className="flex justify-between gap-4 border-t border-gray-600 py-2">
              <p className="text-gray-300">Rating</p>
              <p className="font-semibold text-white">
                ★ {workout.rating}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">
              INSTRUCTIONS
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pl-5 text-white">
              {workout.instructions.map(
                (instruction, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-700 py-2 pl-2 text-sm leading-6 text-gray-300"
                  >
                    {instruction}
                  </li>
                )
              )}
            </ol>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull || isAlreadyInPlan}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#B6FF00] px-6 py-4 text-sm font-black text-black transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IoMdAddCircleOutline className="text-xl" />

              {isAlreadyInPlan
                ? "Already in Plan"
                : isPlanFull
                ? "Plan Full"
                : "Add to Today's Plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={isAlreadySaved}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-black transition hover:border-[#B6FF00] hover:text-[#B6FF00] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CiBookmark className="text-xl" />

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