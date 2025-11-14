import WorkoutDetails from "@/app/components/WorkoutDetails";
import { db } from "@/utils/utilities";

export default async function Page({ params }) {
  const { id } = await params;

  const workout = (
    await db.query(
      `SELECT workouts.*, ARRAY_AGG(DISTINCT tags.tag_name) AS tags, ARRAY_AGG(DISTINCT exercises.exercise_name) AS exercises FROM workouts LEFT JOIN workouts_tags ON workouts.id = workouts_tags.workout_id LEFT JOIN tags on workouts_tags.tag_id = tags.id LEFT JOIN workouts_exercises ON workouts.id = workouts_exercises.workout_id LEFT JOIN exercises ON workouts_exercises.exercise_id = exercises.id WHERE workouts.id = $1 GROUP BY workouts.id`,
      [id]
    )
  ).rows[0];

  console.log(workout);

  return (
    <div>
      <WorkoutDetails workout={workout} />
    </div>
  );
}
