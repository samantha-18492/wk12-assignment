import WorkoutDetails from "@/app/components/WorkoutDetails";
import { db } from "@/utils/utilities";
import Link from "next/link";

export default async function Page({ params }) {
  const { id } = await params;

  const workout = (
    await db.query(
      `SELECT workouts.*, ARRAY_AGG(DISTINCT tags.tag_name) AS tags, ARRAY_AGG(DISTINCT exercises.exercise_name) AS exercises FROM workouts LEFT JOIN workouts_tags ON workouts.id = workouts_tags.workout_id LEFT JOIN tags on workouts_tags.tag_id = tags.id LEFT JOIN workouts_exercises ON workouts.id = workouts_exercises.workout_id LEFT JOIN exercises ON workouts_exercises.exercise_id = exercises.id WHERE workouts.id = $1 GROUP BY workouts.id`,
      [id]
    )
  ).rows[0];

  const reviews = (
    await db.query(
      `SELECT workout_reviews.*, user_accounts.username, user_accounts.clerk_id FROM workout_reviews JOIN user_accounts ON user_accounts.id = workout_reviews.user_id WHERE workout_reviews.workout_id = $1`,
      [id]
    )
  ).rows;

  return (
    <>
      <section>
        <WorkoutDetails workout={workout} />
      </section>
      <section>
        <h2>What&apos;s this workout like?</h2>
        {reviews.length === 0 ? (
          <div>
            <p>
              This workout hasn&apos;t been reviewed yet. Share your thoughts
              using the form below.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id}>
              <p>&quot;{review.content}&quot;</p>
              <Link href={`/users/${review.user_id}`}>{review.user_id}</Link>
            </div>
          ))
        )}
      </section>
    </>
  );
}
