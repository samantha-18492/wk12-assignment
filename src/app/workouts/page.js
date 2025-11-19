import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import Filtering from "../components/Filtering";
import { FaClock } from "react-icons/fa6";
import { teko } from "../layout";

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
    <section className="flex flex-col items-center text-center">
      <h2 className={`${teko.className} text-2xl uppercase`}>
        Your workout, your way
      </h2>
      <p className="my-2 w-100 md:w-3xl">
        Explore by exercise type and suitability to find Les Mills workouts that
        match your needs.
      </p>
      <Filtering allTypes={allTypes} allTags={allTags} />
      <p aria-live="polite" className="sr-only">
        {workouts.length} workouts found.
      </p>
      <div className="flex flex-wrap gap-3 mt-2 max-w-sm justify-center md:max-w-3xl">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <Link
              href={`/workouts/${workout.id}`}
              key={workout.id}
              className="bg-flexmills-black p-3 flex flex-row text-white w-90 md:w-180 md:p-6 border-4 border-flexmills-black hover:border-flexmills-green"
            >
              <Image
                src={workout.img_url}
                alt=""
                height={200}
                width={300}
                className="w-40 h-auto md:w-80"
              />
              <div className="flex flex-col items-start ml-2 justify-center md:text-2xl md:ml-6">
                <h2 className="uppercase">
                  {workout.class} #{workout.episode_no}
                </h2>
                <p className="flex gap-2 text-sm text-flexmills-grey py-1.5 md:text-xl">
                  <FaClock className="mt-0.5" aria-hidden />
                  {workout.duration} mins
                </p>
                <p className="text-sm text-flexmills-grey border px-1.5 py-0.5 md:text-xl">
                  {workout.type}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No workouts match your filters</p>
        )}
      </div>
    </section>
  );
}
