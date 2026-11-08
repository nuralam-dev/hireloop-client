import AuthForm from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthPageShell";

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthForm mode="sign-up" />
    </AuthShell>
  );
}
