import Link from "next/link";

export default function notFound() {
  return (
    <div>
      <h2>We couldn&apos;t find that workout.</h2>
      <br />
      <p>Come back soon or browse our existing listings.</p>
      <Link href="/workouts">Browse</Link>
    </div>
  );
}
