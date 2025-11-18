import WorkoutDetails from "@/app/components/WorkoutDetails";
import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const workout = (
    await db.query(`SELECT class, episode_no FROM workouts WHERE id = $1`, [id])
  ).rows[0];

  return {
    title: `${workout.class} #${workout.episode_no} | Flex Mills`,
    description: `Learn more about ${workout.class} #${workout.episode_no} on Flex Mills.`,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (isAuthenticated == false) {
    redirectToSignIn();
  }

  const workout = (
    await db.query(
      `SELECT workouts.*, ARRAY_AGG(DISTINCT tags.tag_name) AS tags, ARRAY_AGG(DISTINCT exercises.exercise_name) AS exercises FROM workouts LEFT JOIN workouts_tags ON workouts.id = workouts_tags.workout_id LEFT JOIN tags on workouts_tags.tag_id = tags.id LEFT JOIN workouts_exercises ON workouts.id = workouts_exercises.workout_id LEFT JOIN exercises ON workouts_exercises.exercise_id = exercises.id WHERE workouts.id = $1 GROUP BY workouts.id`,
      [id]
    )
  ).rows[0];

  if (!workout) {
    notFound();
  }

  const reviews = (
    await db.query(
      `SELECT workout_reviews.*, user_accounts.username, user_accounts.clerk_id FROM workout_reviews JOIN user_accounts ON user_accounts.id = workout_reviews.user_id WHERE workout_reviews.workout_id = $1`,
      [id]
    )
  ).rows;

  async function handleSubmit(formData) {
    "use server";

    const content = formData.get("content");

    const res = await db.query(
      `SELECT id FROM user_accounts WHERE clerk_id = $1`,
      [userId]
    );

    const currentUserId = res.rows[0].id;

    await db.query(
      `INSERT INTO workout_reviews (user_id, workout_id, content) VALUES ($1, $2, $3)`,
      [currentUserId, id, content]
    );

    redirect(`/workouts/${id}`);
  }

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
              <Link href={`/users/${review.user_id}`}>{review.username}</Link>
            </div>
          ))
        )}
      </section>
      <section>
        <form action={handleSubmit}>
          <h2>
            Share your experience of {workout.class} #{workout.episode_no}
          </h2>
          <p>Your contribution helps...</p>
          <textarea name="content" placeholder="Try to include" required />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
