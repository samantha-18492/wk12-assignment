import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const workouts = (await db.query(`SELECT * FROM workouts`)).rows;
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (isAuthenticated == false) {
    redirectToSignIn();
  }
  return (
    <div className="flex flex-col items-center text-center">
      <p>Choose a workout</p>
      <div className="flex flex-wrap gap-5 mt-12 max-w-sm justify-center md:max-w-3xl">
        {workouts.map((workout) => (
          <Link href={`workouts/${workout.id}`} key={workout.id}>
            <h2>
              {workout.class} #{workout.episode_no}
            </h2>
            <Image src={workout.img_url} alt="" height={200} width={300} />
          </Link>
        ))}
      </div>
    </div>
  );
}
