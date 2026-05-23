import type { Metadata } from "next";
import HomePageV2Client from "./HomePageV2Client";

export const metadata: Metadata = {
  title: { absolute: "Summit V2 Homepage Preview" },
  description: "Internal preview of the v2 homepage layout for Summit Portable Buildings.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://summitbuildings.com/v2" },
};

export default function HomeV2Page() {
  return <HomePageV2Client />;
}
