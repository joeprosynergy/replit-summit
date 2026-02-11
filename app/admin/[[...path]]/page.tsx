import type { Metadata } from "next";
import AdminRouter from "./AdminRouter";

export const metadata: Metadata = {
  title: "Admin | Summit Portable Buildings",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminRouter />;
}
