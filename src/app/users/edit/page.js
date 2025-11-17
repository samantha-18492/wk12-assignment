import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import UserDetailsForm from "@/app/components/UserDetailsForm";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) redirectToSignIn();

  const user = (
    await db.query(
      `SELECT username, bio FROM user_accounts WHERE clerk_id = $1`,
      [userId]
    )
  ).rows[0];

  return (
    <div>
      <h2>
        You&apos;re editing your profile. Update your details below and click
        Save to make your changes live.
      </h2>
      <UserDetailsForm defaultValues={user} />
    </div>
  );
}
