import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import { MdAccountCircle } from "react-icons/md";

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
    <header className="w-full">
      <nav>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <SignedIn>
            <Link href="/workouts">Workouts</Link>
          </SignedIn>
          <Link href="/about-us">About</Link>
          <SignedIn>
            <Link href={userProfileLink}>
              <MdAccountCircle />
            </Link>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
