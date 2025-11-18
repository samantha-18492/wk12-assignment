import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import Filtering from "../components/Filtering";

export default async function Page({ searchParams }) {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) {
    redirectToSignIn();
  }
  const params = await searchParams;
  const selectedType = params?.type || "";
  const selectedTag = params?.tag || "";

  console.log("Selected type:", selectedType);
  console.log("Selected tag:", selectedTag);

  const data = await db.query(
    `SELECT DISTINCT type FROM workouts ORDER by type ASC`
  );
  const allTypes = data.rows.map((row) => row.type);
  const allTags = (await db.query(`SELECT * FROM tags ORDER BY tag_name ASC`))
    .rows;

  let workouts;

  if (selectedType && selectedTag) {
    workouts = (
      await db.query(
        `SELECT workouts.* FROM workouts JOIN workouts_tags ON workouts.id = workouts_tags.workout_id JOIN tags ON workouts_tags.tag_id = tags.id WHERE workouts.type = $1 AND tags.tag_name = $2`,
        [selectedType, selectedTag]
      )
    ).rows;
  } else if (selectedTag) {
    workouts = (
      await db.query(
        `SELECT workouts.* FROM workouts JOIN workouts_tags on workouts.id = workouts_tags.workout_id JOIN tags ON workouts_tags.tag_id = tags.id WHERE tags.tag_name = $1`,
        [selectedTag]
      )
    ).rows;
  } else if (selectedType) {
    workouts = (
      await db.query(`SELECT * FROM workouts WHERE type = $1`, [selectedType])
    ).rows;
  } else {
    workouts = (await db.query(`SELECT * FROM workouts`)).rows;
  }

  return (
    <div className="flex flex-col items-center text-center">
      <p>Choose a workout</p>
      <Filtering allTypes={allTypes} allTags={allTags} />
      <div className="flex flex-wrap gap-5 mt-12 max-w-sm justify-center md:max-w-3xl">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <Link href={`/workouts/${workout.id}`} key={workout.id}>
              <h2>
                {workout.class} #{workout.episode_no}
              </h2>
              <Image
                src={workout.img_url}
                alt=""
                height={200}
                width={300}
                className="w-full h-auto"
              />
            </Link>
          ))
        ) : (
          <p>No workouts match your filters</p>
        )}
      </div>
    </div>
  );
}
