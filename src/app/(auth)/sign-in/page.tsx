"use client";
import AuthForm, { AuthFormValues } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthPageShell";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const handleSignIn = async (values: AuthFormValues) => {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (error) {
      throw new Error(error.message || "Sign in failed");
    }

    if (data) {
      // NEW: সফল sign-in-এর পরে home page-এ redirect
      router.push("/");
    }
  };
  return (
    <AuthShell>
      <AuthForm mode="sign-in" onSubmit={handleSignIn} />
    </AuthShell>
  );
}
