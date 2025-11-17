import { db } from "@/utils/utilities";
import Link from "next/link";

export default async function UserReviews({ userId }) {
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
        </div>
      ))}
    </div>
  );
}
