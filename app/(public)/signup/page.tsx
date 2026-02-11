import type { Metadata } from "next";
import Signup from "@/components/admin-pages/Signup";

export const metadata: Metadata = {
  title: { absolute: "Sign Up | Summit Portable Buildings" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <Signup />;
}
