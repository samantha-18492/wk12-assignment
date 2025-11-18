import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { teko } from "./layout";

export default function Home() {
  return (
    <section className="mt-5">
      <SignUpButton
        className={`${teko.className} bg-flexmills-black text-white uppercase text-xl border-2 border-flexmills-green px-5 py-2 m-5`}
      />
      <SignInButton
        className={`${teko.className} bg-flexmills-black text-white uppercase text-xl border-2 border-flexmills-green px-5 py-2 m-5`}
      />
    </section>
  );
}
