import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchNavigationConfig } from "@/lib/supabase/server";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navConfig = await fetchNavigationConfig();

  return (
    <>
      <Header serverConfig={navConfig?.headerConfig ?? null} />
      <main>{children}</main>
      <Footer serverConfig={navConfig?.footerConfig ?? null} />
    </>
  );
}
