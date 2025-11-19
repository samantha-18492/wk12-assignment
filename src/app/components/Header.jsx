import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import { MdAccountCircle } from "react-icons/md";
import { teko, racingSansOne } from "@/app/layout";

export default async function Header() {
  const { userId } = await auth();

  let userProfileLink = "/users/new";
  if (userId) {
    const loggedInUser = (
      await db.query(`SELECT id FROM user_accounts WHERE clerk_id = $1`, [
        userId,
      ])
    ).rows[0];

    if (loggedInUser) {
      userProfileLink = `/users/${loggedInUser.id}`;
    }
  }

  return (
    <header className="w-full bg-flexmills-dark-grey h-20 flex items-center justify-between px-5 text-white">
      <div>
        <Link
          href="/"
          aria-label="Flex Mills"
          className={`text-3xl ${racingSansOne.className}`}
        >
          Flex Mills
        </Link>
      </div>
      <nav
        className={`flex gap-5 uppercase ${teko.className} text-xl text-flexmills-grey`}
      >
        <SignedIn>
          <Link href="/workouts" className="pt-1  hover:text-white">
            Workouts
          </Link>
        </SignedIn>
        <Link href="/about-us" className="pt-1  hover:text-white">
          About
        </Link>
        <SignedIn>
          <Link
            href={userProfileLink}
            aria-label="Go to your profile"
            className="text-flexmills-green"
          >
            <MdAccountCircle size={30} />
          </Link>
        </SignedIn>
      </nav>
    </header>
  );
}
