import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";

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
}
