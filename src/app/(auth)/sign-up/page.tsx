"use client";
import AuthForm, { AuthFormValues } from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthPageShell";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const handleSignUp = async (values: AuthFormValues) => {
    const { data, error } = await authClient.signUp.email({
      name: values.name as string,
      email: values.email,
      password: values.password,
      // NEW: Sign Up form থেকে পাওয়া role better-auth-এ পাঠানো হয়
      role: values.role ?? "seeker",
      callbackURL: "/",
    });

    if (error) {
      throw new Error(error.message || "Sign up failed");
    }

    if (data) {
      console.log("Signup successful");
    }
    if(!error){
      router.push("/")
    }
  };

  return (
    <AuthShell>
      <AuthForm mode="sign-up" onSubmit={handleSignUp} />
    </AuthShell>
  );
}
