import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/app/types";

export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/Workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#15171D] transition duration-300 hover:-translate-y-1 hover:border-[#B6FF00]/50"
    >
      <div className="relative h-[245px] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-300"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {workout.equipment}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-gray-400">
          <span>{workout.duration} min</span>

          <span>{workout.caloriesBurned} kcal</span>

          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}