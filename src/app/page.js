import { SignUpButton, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignUpButton />
      <SignInButton />
    </div>
  );
}
