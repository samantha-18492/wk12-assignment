import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import UserDetailsForm from "@/app/components/UserDetailsForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserReviews from "@/app/components/UserReviews";
import { UserButton } from "@clerk/nextjs";
import { teko } from "@/app/layout";

export async function generateMetadata({ params }) {
  const { id } = await params;

  if (id === "new") {
    return {
      title: "Complete Your Profile | Flex Mills",
      description: "Finish setting up your Flex Mills account.",
    };
  }

  const user = (
    await db.query(`SELECT username FROM user_accounts WHERE id = $1`, [id])
  ).rows[0];

  if (!user) {
    return {
      title: "User not found",
      description: "This user does not exist on Flex Mills.",
    };
  }

  return {
    title: `${user.username}'s Profile | Flex Mills`,
    description: `Explore ${user.username}'s activity and workout reviews on Flex Mills.`,
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  const {
    isAuthenticated,
    redirectToSignIn,
    userId: loggedInClerkId,
  } = await auth();

  if (!isAuthenticated) {
    redirectToSignIn();
  }

  //check if user is in db
  const loggedInUser = (
    await db.query(`SELECT * FROM user_accounts WHERE clerk_id = $1`, [
      loggedInClerkId,
    ])
  ).rows[0];

  const placeholderId = "new";

  if (!loggedInUser) {
    if (id === placeholderId) {
      return (
        <div className="text-center mt-4 w-100 md:w-5xl flex flex-col items-center">
          <p>
            Before you dive in, please complete your profile using the form
            below. It helps tailor your experience and lets the community
            understand the perspective behind your reviews and insights.
          </p>
          <br />
          <p>
            Your profile will be visible to other users, so only include
            information you&apos;re comfortable sharing.
          </p>
          <UserDetailsForm />
        </div>
      );
    } else {
      redirect(`/users/${placeholderId}`);
    }
  }

  //fetch data for profile
  if (id !== placeholderId) {
    const userInfo = (
      await db.query(`SELECT * FROM user_accounts WHERE id = $1`, [id])
    ).rows[0];

    if (!userInfo) {
      return (
        <section className="text-center">
          <h2 className={`${teko.className} text-2xl uppercase`}>Oops!</h2>
          <p className="my-2">We couldn&apos;t find that user.</p>
          <Link
            href="/"
            className={`${teko.className} bg-flexmills-green text-xl uppercase px-5 pt-3 pb-2 mt-4 inline-block hover:border-2 hover:border-flexmills-black`}
          >
            Return home
          </Link>
        </section>
      );
    }

    //check if viewing own profile
    const isOwnProfile = loggedInUser.id === userInfo.id;

    return (
      <div className="flex flex-col w-100 md:w-5xl mt-2">
        <section className="bg-flexmills-grey p-2">
          <div className="flex items-center justify-between">
            <h2 className={`${teko.className} text-2xl uppercase`}>
              User profile
            </h2>
            <div className="flex items-center gap-4">
              {isOwnProfile && (
                <Link
                  href="/users/edit"
                  className={`${teko.className} bg-flexmills-black text-white uppercase text-xl px-5 pt-1 border-3 border-flexmills-green hover:scale-110`}
                >
                  Edit
                </Link>
              )}
              {isOwnProfile && <UserButton />}
            </div>
          </div>
          <div className="p-2 bg-flexmills-black text-white mt-2">
            <p className={`${teko.className} uppercase text-xl`}>Username:</p>
            <p className="text-sm">{userInfo.username}</p>
            <p className={`${teko.className} uppercase text-xl mt-2`}>
              About {userInfo.username}:
            </p>
            <p className="text-sm">{userInfo.bio}</p>
          </div>
        </section>
        <section className="mt-4 bg-flexmills-grey p-2">
          <h2 className={`${teko.className} text-2xl uppercase`}>
            Reviews by {userInfo.username}{" "}
          </h2>
          <UserReviews userId={userInfo.id} isOwnProfile={isOwnProfile} />
        </section>
      </div>
    );
  }
}
