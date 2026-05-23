import { headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchNavigationConfig } from "@/lib/supabase/server";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navConfig = await fetchNavigationConfig();
  const hdr = await headers();
  const variant = hdr.get("x-summit-homepage-variant");
  // V2 has a light cream hero — override the / dark-hero default so the
  // header stays solid with dark text/logo while at the top of the page.
  const isDarkHeroOverride = variant === "v2" ? false : undefined;

  return (
    <>
      <Header
        serverConfig={navConfig?.headerConfig ?? null}
        isDarkHeroOverride={isDarkHeroOverride}
      />
      <main>{children}</main>
      <Footer serverConfig={navConfig?.footerConfig ?? null} />
    </>
  );
}
