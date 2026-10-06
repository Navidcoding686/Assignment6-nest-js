"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "@/app/context/PlanContext";
import type { PlanWorkout, Workout } from "@/app/types";

type Tab = "plan" | "saved";

function isPlanWorkout(
  item: PlanWorkout | Workout
): item is PlanWorkout {
  return "isDone" in item;
}

export default function MyPlan() {
  const {
    plan,
    saved,
    metrics,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] =
    useState<Tab>("plan");

  const [sortBy, setSortBy] =
    useState("duration");

  const currentList =
    activeTab === "plan" ? plan : saved;

  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return (
          b.caloriesBurned -
          a.caloriesBurned
        );
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [currentList, sortBy]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B6FF00]">
          Your Training
        </p>

        <h1 className="mt-3 text-5xl font-black">
          My Plan
        </h1>

        <p className="mt-3 text-gray-500">
          Manage today's workouts and your saved exercises.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#15171D] p-6">
          <p className="text-sm text-gray-500">
            Exercises
          </p>

          <p className="mt-2 text-4xl font-black text-[#B6FF00]">
            {metrics.exercises}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#15171D] p-6">
          <p className="text-sm text-gray-500">
            Total Minutes
          </p>

          <p className="mt-2 text-4xl font-black">
            {metrics.minutes}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#15171D] p-6">
          <p className="text-sm text-gray-500">
            Calories
          </p>

          <p className="mt-2 text-4xl font-black">
            {metrics.calories}
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-5 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-3 text-sm font-bold transition ${
              activeTab === "plan"
                ? "bg-[#B6FF00] text-black"
                : "border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-3 text-sm font-bold transition ${
              activeTab === "saved"
                ? "bg-[#B6FF00] text-black"
                : "border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value)
          }
          className="rounded-full border border-white/10 bg-[#15171D] px-5 py-3 text-sm text-white outline-none"
        >
          <option value="duration">
            Sort: Duration
          </option>

          <option value="calories">
            Sort: Calories
          </option>

          <option value="rating">
            Sort: Rating
          </option>
        </select>
      </div>

      <div className="mt-8 space-y-4">
        {sortedList.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#15171D] px-6 py-20 text-center">
            <h2 className="text-3xl font-black">
              NOTHING HERE YET
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              Browse the workout library and add exercises
              to your plan.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#B6FF00] px-6 py-3 text-sm font-black text-black"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          sortedList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#15171D] p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  {item.muscleGroups.map(
                    (muscle) => (
                      <span
                        key={muscle}
                        className="text-[10px] font-bold uppercase tracking-wider text-[#B6FF00]"
                      >
                        {muscle}
                      </span>
                    )
                  )}
                </div>

                <h3 className="mt-2 text-xl font-bold">
                  {item.name}
                </h3>

                <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span>
                    {item.duration} min
                  </span>

                  <span>
                    {item.caloriesBurned} kcal
                  </span>

                  <span>
                    ★ {item.rating}
                  </span>
                </div>

                {activeTab === "plan" &&
                  isPlanWorkout(item) &&
                  item.isDone && (
                    <span className="mt-3 inline-block text-xs font-bold text-[#B6FF00]">
                      ✓ COMPLETED
                    </span>
                  )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/workout/${item.id}`}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold transition hover:border-[#B6FF00] hover:text-[#B6FF00]"
                >
                  View Details
                </Link>

                {activeTab === "plan" &&
                  isPlanWorkout(item) &&
                  !item.isDone && (
                    <button
                      onClick={() =>
                        markAsDone(item.id)
                      }
                      className="rounded-full bg-[#B6FF00] px-4 py-2 text-xs font-bold text-black"
                    >
                      ✓ Done
                    </button>
                  )}

                <button
                  onClick={() =>
                    activeTab === "plan"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="rounded-full border border-red-500/30 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/10"
                >
                  ✕ Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}