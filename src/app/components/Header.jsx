import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full">
      <nav>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <SignedIn>
            <Link href="/workouts">Workouts</Link>
          </SignedIn>
          <Link href="/about-us">About</Link>
        </div>
        <div>
          <SignedIn>
            <Link href="/users">Profile</Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
