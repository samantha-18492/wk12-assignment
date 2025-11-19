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
    <div className="text-center mt-4 w-100 md:w-5xl flex flex-col items-center">
      <h2 className="text-center">
        You&apos;re editing your profile.
        <br />
        Update your details below and click{" "}
        <span className="font-bold">Save</span> to make your changes live.
      </h2>
      <UserDetailsForm defaultValues={user} />
    </div>
  );
}
