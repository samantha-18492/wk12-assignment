import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import UserDetailsForm from "@/app/components/UserDetailsForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserReviews from "@/app/components/UserReviews";
import { UserButton } from "@clerk/nextjs";

export async function generateMetadata({ params }) {
  const { id } = await params;

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
        <div>
          <p>
            Before you start exploring, please take a moment to complete your
            profile using the form below. It helps personalise your experience
            and connect your insights to your account.
          </p>
          <p>
            Please note other users will be able to see your profile information
            so do not share anything you dont want to be seen by others.
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
        <div>
          <p>User not found</p>
          <p>Add an error.js here that redirects users to own profile</p>
        </div>
      );
    }

    //check if viewing own profile
    const isOwnProfile = loggedInUser.id === userInfo.id;

    return (
      <>
        <div>
          <h2>User profile</h2>
          <p>Username:</p>
          <p>{userInfo.username}</p>
          <p>About {userInfo.username}:</p>
          <p>{userInfo.bio}</p>
          {isOwnProfile && <Link href="/users/edit">Edit</Link>}
          {isOwnProfile && <UserButton />}
        </div>
        <div>
          <h2>Reviews left by {userInfo.username}</h2>
          <UserReviews userId={userInfo.id} isOwnProfile={isOwnProfile} />
        </div>
      </>
    );
  }
}
