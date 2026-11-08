import AuthForm from "@/components/auth/AuthForm";
import { AuthShell } from "@/components/auth/AuthPageShell";

export default function SigninPage() {
  return (
    <AuthShell>
      <AuthForm mode="sign-in" />
    </AuthShell>
  );
}
