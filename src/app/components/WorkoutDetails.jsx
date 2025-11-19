import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa6";

export default function WorkoutDetails({ workout }) {
  return (
    <section className="bg-flexmills-black p-4 text-white md:flex">
      <Image
        src={workout.img_url}
        alt=""
        height={200}
        width={300}
        className="h-auto w-full"
      />
      <div className="md:ml-4">
        <h2 className="mt-2 text-xl  uppercase">
          {workout.class} #{workout.episode_no}
        </h2>
        <div className="flex items-center gap-4 mt-2">
          <p className="flex gap-2 text-flexmills-grey">
            <FaClock className="mt-0.5" aria-hidden /> {workout.duration} mins
          </p>
          <p className="border px-1.5 py-0.5 w-max text-flexmills-grey">
            {workout.type}
          </p>
        </div>
        <Link
          href={workout.video_url}
          className="mt-2 inline-block text-white underline underline-offset-4 decoration-flexmills-green"
        >
          Watch this class on Les Mills
        </Link>
        <div>
          <div className="mt-4">
            <span>Suitability:</span>
            {workout.tags.map((tag) => (
              <p key={tag} className="border inline-block m-1 px-2">
                {tag}
              </p>
            ))}
          </div>
          <div className="mt-4">
            <span>This workout heavily features the following moves: </span>
            {workout.exercises.map((exercise) => (
              <span key={exercise} className="lowercase">
                {exercise} |{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
