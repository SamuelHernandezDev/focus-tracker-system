//frontend\app\(public)\login\page.tsx
import LoginForm from "@/modules/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}