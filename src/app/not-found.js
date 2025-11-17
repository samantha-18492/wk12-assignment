import Link from "next/link";

export default function notFound() {
  return (
    <div>
      <h2>Oops! That page doesn&apos;t exist.</h2>
      <br />
      <p>Return home to get back on track</p>
      <Link href="/">Home</Link>
    </div>
  );
}
