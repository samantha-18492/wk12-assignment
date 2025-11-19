import { db } from "@/utils/utilities";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { redirect } from "next/navigation";

export default async function UserReviews({ userId, isOwnProfile }) {
  const reviews = (
    await db.query(
      `SELECT workout_reviews.id AS review_id, workout_reviews.content, workouts.class, workouts.episode_no, workouts.id AS workout_id FROM workout_reviews JOIN workouts ON workouts.id = workout_reviews.workout_id WHERE workout_reviews.user_id = $1`,
      [userId]
    )
  ).rows;

  if (reviews.length === 0) {
    return (
      <div>
        <p className="bg-white p-2 text-sm border-2 border-flexmills-dark-grey">
          This person hasn&apos;t shared any reviews yet.
        </p>
      </div>
    );
  }

  async function handleDelete(reviewId) {
    "use server";
    await db.query(`DELETE FROM workout_reviews WHERE id =$1`, [reviewId]);

    redirect(`/users/${userId}`);
  }

  return (
    <div className="mt-2">
      {reviews.map((review) => (
        <div
          key={review.review_id}
          className="bg-flexmills-black p-2 text-white text-sm mb-3"
        >
          <p>&quot;{review.content}&quot;</p>
          <div className="flex items-center justify-between">
            <p className="italic">
              Posted on:{" "}
              <span className="underline underline-offset-2 decoration-flexmills-green">
                <Link href={`/workouts/${review.workout_id}`}>
                  {review.class} #{review.episode_no}
                </Link>
              </span>
            </p>
            {isOwnProfile && (
              <DeleteButton
                reviewId={review.review_id}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
