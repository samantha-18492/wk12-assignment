import { db } from "@/utils/utilities";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { redirect } from "next/dist/server/api-utils";

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
        <p>This person hasn&apos;t shared any reviews yet.</p>
      </div>
    );
  }

  async function handleDelete(reviewId) {
    "use server";
    await db.query(`DELETE FROM workout_reviews WHERE id =$1`, [reviewId]);

    redirect(`/users/${userId}`);
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.review_id}>
          <p>
            Posted about:{" "}
            <Link href={`/workouts/${review.workout_id}`}>
              {review.class} #{review.episode_no}
            </Link>
          </p>
          <p>&apos;{review.content}&apos;</p>
          {isOwnProfile && (
            <DeleteButton
              reviewId={review.review_id}
              handleDelete={handleDelete}
            />
          )}
        </div>
      ))}
    </div>
  );
}
