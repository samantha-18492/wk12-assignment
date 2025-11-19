import Link from "next/link";
import { teko } from "./layout";

export default function notFound() {
  return (
    <section className="text-center">
      <h2 className={`${teko.className} text-2xl uppercase`}>Oops! </h2>
      <p className="my-2">That page doesn&apos;t exist.</p>
      <p className="my-2">Head home to get moving in the right direction.</p>
      <Link
        href="/"
        className={`${teko.className} bg-flexmills-green text-xl uppercase px-5 pt-2 pb-1 mt-4 inline-block hover:border-2 hover:border-flexmills-black`}
      >
        Home
      </Link>
    </section>
  );
}
