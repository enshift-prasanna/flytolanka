import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors bg-white/80 px-3 py-1.5 rounded-full border shadow-sm backdrop-blur"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
