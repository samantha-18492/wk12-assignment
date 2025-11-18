import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { teko } from "./layout";
import Image from "next/image";

export default function Home() {
  return (
    <section className="mt-5 flex flex-col items-center text-center">
      <h2 className={`${teko.className} text-2xl mb-10 uppercase`}>
        Workouts that work for you
      </h2>
      <div className="relative">
        <Image
          src="https://lmimirroralphapvr.azureedge.net/static/media/33408/86af3982-911c-42c6-8bb6-b0ba4a0ea18a/hero_cozycardio_1_960x540.jpg"
          alt=""
          width={960}
          height={540}
          className="opacity-75"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-4">
          <SignUpButton
            className={`${teko.className} bg-flexmills-black text-white uppercase text-xl px-5 pt-2 pb-1 border-3 border-flexmills-green hover:scale-110`}
          />
          <SignInButton
            className={`${teko.className} bg-flexmills-black text-white uppercase text-xl px-5 pt-2 pb-1 border-3 border-flexmills-green hover:scale-110`}
          />
        </div>
      </div>
      <h3 className="my-5 w-80">
        Your guide to Les Mills workouts that work with your body and help you
        thrive
      </h3>
    </section>
  );
}
