"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "@/app/context/PlanContext";
import type { PlanWorkout, Workout } from "@/app/types";
import { IoCheckmark } from "react-icons/io5";
import { ImCross } from "react-icons/im";

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
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [currentList, sortBy]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:py-12">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
          MY PLAN
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mt-7 flex overflow-hidden rounded-xl border border-white/10 bg-[#15171D]">
        <div className="flex-1 border-r border-white/10 px-5 py-4 md:px-6">
          <p className="text-[11px] text-gray-500">
            Exercises
          </p>

          <p className="mt-1 text-2xl font-black text-[#B6FF00] md:text-3xl">
            {metrics.exercises}
          </p>
        </div>

        <div className="flex-1 border-r border-white/10 px-5 py-4 md:px-6">
          <p className="text-[11px] text-gray-500">
            Minutes
          </p>

          <p className="mt-1 text-2xl font-black text-white md:text-3xl">
            {metrics.minutes}
          </p>
        </div>

        <div className="flex-1 px-5 py-4 md:px-6">
          <p className="text-[11px] text-gray-500">
            Calories
          </p>

          <p className="mt-1 text-2xl font-black text-white md:text-3xl">
            {metrics.calories}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex rounded-lg border border-white/10 bg-[#15171D] p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-4 py-2 text-[11px] font-medium transition ${
              activeTab === "plan"
                ? "bg-[#1D2028] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-4 py-2 text-[11px] font-medium transition ${
              activeTab === "saved"
                ? "bg-[#1D2028] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-[11px] text-gray-500 sm:block">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            className="rounded-lg border border-white/10 bg-[#15171D] px-3 py-2 text-[11px] text-gray-400 outline-none"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        {sortedList.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0F1014] px-5 py-16 text-center md:min-h-[205px]">
            <h2 className="text-lg font-black text-white">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 max-w-md text-xs text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/Workouts"
              className="mt-5 rounded-full bg-[#B6FF00] px-5 py-2.5 text-[11px] font-black text-black transition hover:scale-105"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-xl border border-white/10 bg-[#15171D] p-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex flex-wrap gap-2">
                    {item.muscleGroups.map(
                      (muscle) => (
                        <span
                          key={muscle}
                          className="text-[9px] font-bold uppercase tracking-wider text-[#B6FF00]"
                        >
                          {muscle}
                        </span>
                      )
                    )}
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-white">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-gray-500">
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
                      <span className="mt-3 inline-block text-[10px] font-bold text-[#B6FF00]">
                        ✓ COMPLETED
                      </span>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/Workout/${item.id}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold transition hover:border-[#B6FF00] hover:text-[#B6FF00]"
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
                        className="rounded-full bg-[#B6FF00] px-4 py-2 text-[10px] font-bold text-black flex items-center gap-1"
                      ><IoCheckmark/>
                        Mark as Done
                      </button>
                    )}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="rounded-full border border-red-500/30 px-4 py-2 text-[10px] font-bold text-red-400 transition hover:bg-red-500/10 flex items-center gap-1"
                  >
                    <ImCross/>
                     Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}