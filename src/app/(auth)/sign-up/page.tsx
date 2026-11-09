"use client";
import AuthForm, { AuthFormValues } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthPageShell";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const handleSignUp = async (values: AuthFormValues) => {
    const { data, error } = await authClient.signUp.email({
      name: values.name as string, // required, The name of the user.
      email: values.email, // required, The email address of the user.
      password: values.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      callbackURL: "/", // An optional URL to redirect to after the user signs up.
    });

    if (error) {
      throw new Error(error.message || "Sign up failed");
    }

    if (data) {
      console.log("Signup successful");
    }
  };

  return (
    <AuthShell>
      <AuthForm mode="sign-up" onSubmit={handleSignUp} />
    </AuthShell>
  );
}
