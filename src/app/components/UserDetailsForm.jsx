import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { teko } from "../layout";

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
    <form
      action={handleSubmit}
      className="flex flex-col bg-flexmills-grey p-2 mt-6 justify-center items-start"
    >
      <label className={`${teko.className} uppercase text-xl`}>Username:</label>
      <input
        name="username"
        placeholder="Enter a preferred username"
        defaultValue={defaultValues?.username ?? ""}
        required
        className="bg-white border-2 border-flexmills-black p-2 w-90 placeholder-flexmills-black text-sm"
      />
      <label className={`${teko.className} uppercase text-xl mt-2`}>
        About you:
      </label>
      <textarea
        name="bio"
        placeholder="Tell us what workouts you enjoy, a bit about your fitness journey, and any mobility considerations."
        defaultValue={defaultValues?.bio ?? ""}
        required
        rows="10"
        className="bg-white border-2 border-flexmills-black p-2 w-90 placeholder-flexmills-black text-sm"
      />
      <button
        className={`${teko.className} self-center bg-flexmills-black text-white uppercase text-xl w-40 px-5 pt-2 pb-1 border-3 my-4 border-flexmills-green hover:scale-110`}
      >
        Save
      </button>
    </form>
  );
}
