import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";

export default async function UserDetailsForm() {
  const { userId } = await auth();

  async function handleSubmit(formData) {
    "use server";
    const data = Object.fromEntries(formData);

    await db.query(
      `INSERT INTO user_accounts (username, bio, clerk_id) VALUES ($1, $2, $3)`,
      [data.username, data.bio, userId]
    );
  }

  return (
    <form action={handleSubmit}>
      <label>Username:</label>
      <input name="username" placeholder="Enter your preferred username" />
      <label>Tell us about yourself:</label>
      <textarea
        name="bio"
        placeholder="Share a little about your background and what kind of mobility issues you're struggling with"
      />
      <button>Save</button>
    </form>
  );
}
