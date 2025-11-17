import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UserDetailsForm({ defaultValues }) {
  const { userId } = await auth();

  async function handleSubmit(formData) {
    "use server";
    const data = Object.fromEntries(formData);

    const previousInfo = (
      await db.query(`SELECT * FROM user_accounts where clerk_id = $1`, [
        userId,
      ])
    ).rows[0];

    if (previousInfo) {
      await db.query(
        `UPDATE user_accounts SET username = $1, bio = $2 WHERE clerk_id = $3`,
        [data.username, data.bio, userId]
      );

      redirect(`/users/${previousInfo.id}`);
    } else {
      const result = await db.query(
        `INSERT INTO user_accounts (username, bio, clerk_id) VALUES ($1, $2, $3) RETURNING id`,
        [data.username, data.bio, userId]
      );

      redirect(`/users/${result.rows[0].id}`);
    }
  }

  return (
    <form action={handleSubmit}>
      <label>Username:</label>
      <input
        name="username"
        placeholder="Enter your preferred username"
        defaultValue={defaultValues?.username ?? ""}
        required
      />
      <label>Tell us about yourself:</label>
      <textarea
        name="bio"
        placeholder="Share a little about your background and what kind of mobility issues you're struggling with"
        defaultValue={defaultValues?.bio ?? ""}
        required
      />
      <button>Save</button>
    </form>
  );
}
