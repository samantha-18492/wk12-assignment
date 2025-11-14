import Image from "next/image";
import Link from "next/link";

export default function WorkoutDetails({ workout }) {
  return (
    <section>
      <Image src={workout.img_url} alt="" height={200} width={300} />
      <h2>
        {workout.class} #{workout.episode_no}
      </h2>
      <p>Duration: {workout.duration} mins</p>
      <p>Type: {workout.type}</p>
      <Link href={workout.video_url}>Video link</Link>
      <div>
        <span>Suitable for:</span>
        {workout.tags.map((tag) => (
          <span key={tag.id} className="p-2">
            {tag}
          </span>
        ))}
      </div>
      <div>
        <span>Exercises that are used heavily in this episode:</span>
        {workout.exercises.map((exercise) => (
          <span key={exercise.id} className="p-2">
            {exercise}
          </span>
        ))}
      </div>
    </section>
  );
}
