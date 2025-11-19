import Link from "next/link";
import { teko } from "@/app/layout";

export default function notFound() {
  return (
    <section className="text-center">
      <h2 className={`${teko.className} text-2xl uppercase`}>rest day</h2>
      <p className="my-2">We couldn&apos;t find that workout.</p>
      <p className="my-2">Check back soon or browse our existing workouts.</p>
      <Link
        href="/workouts"
        className={`${teko.className} bg-flexmills-green text-xl uppercase px-5 pt-3 pb-2 mt-4 inline-block hover:border-2 hover:border-flexmills-black`}
      >
        Find a workout
      </Link>
    </section>
  );
}
