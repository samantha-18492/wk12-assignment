export default function UserDetailsForm() {
  return (
    <form>
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
