import WorkoutDetails from "@/app/components/WorkoutDetails";
import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { teko } from "@/app/layout";

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
    <div className="flex-col items-center mt-4 w-100 md:w-5xl">
      <WorkoutDetails workout={workout} />
      <section className="bg-flexmills-grey mt-5">
        <h2 className={`${teko.className} text-xl uppercase pt-2 px-2`}>
          What&apos;s {workout.class} #{workout.episode_no} like?
        </h2>
        <p className="text-sm px-2">
          Learn from others&apos; experiences to see if this workout is right
          for you.
        </p>
        {reviews.length === 0 ? (
          <div className="p-2 mt-2">
            <p className="bg-white p-2 text-sm border-2 border-flexmills-dark-grey">
              This workout hasn&apos;t been reviewed yet. Take the first rep and
              share your experience with the community using the form below.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-2 mt-2">
              <p className="bg-flexmills-black p-2 text-white text-sm">
                &quot;{review.content}&quot; <br />
                <Link
                  href={`/users/${review.user_id}`}
                  className="underline underline-offset-2 decoration-flexmills-green italic"
                >
                  {review.username}
                </Link>
              </p>
            </div>
          ))
        )}
      </section>
      <section className="bg-flexmills-grey mt-5">
        <form action={handleSubmit} className="flex flex-col">
          <h2 className={`${teko.className} text-xl uppercase pt-2 px-2`}>
            Share your experience of {workout.class} #{workout.episode_no}
          </h2>
          <p className="text-sm px-2">
            Let the community know how this workout was for you. Your review
            will be visible with your profile so others can learn from your
            experience.
          </p>
          <textarea
            name="content"
            placeholder="Tell us what you enjoyed, what you adapted, and how the workout was for you"
            required
            rows="10"
            className="bg-white p-2 text-sm mt-2 mx-2 placeholder-flexmills-black border-2 border-flexmills-dark-grey"
          />
          <button
            type="submit"
            className={`${teko.className} self-center bg-flexmills-black text-white uppercase text-xl w-40 px-5 pt-2 pb-1 border-3 my-4 border-flexmills-green hover:scale-110`}
          >
            Submit
          </button>
        </form>
      </section>
      <div className="flex justify-end">
        <Link
          href="/workouts"
          className={`${teko.className} uppercase text-xl bg-flexmills-green mt-4 pt-2 pb-1 px-4 border-2 border-flexmills-green hover:border-flexmills-dark-grey`}
        >
          Back
        </Link>
      </div>
    </div>
  );
}
