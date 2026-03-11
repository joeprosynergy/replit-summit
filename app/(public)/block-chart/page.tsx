/**
 * Block Chart Page - Site Prep Information
 * Linked from Buyer's Guide Step 3
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cloudinaryImages } from '@/lib/cloudinary';

const summitLogo = "/assets/summit-logo.png";

export const metadata: Metadata = {
  title: { absolute: "Block Chart & Site Prep Guide | Summit Portable Buildings" },
  description: "Complete guide to concrete block requirements, runner spacing, building heights, and site preparation for Summit Portable Buildings delivery.",
  alternates: {
    canonical: "https://summitbuildings.com/block-chart",
  },
  robots: { index: false, follow: false },
};

export default function BlockChartPage() {
  return (
    <>
      <main className="pt-20 bg-muted min-h-screen">
        {/* Back to Buyer's Guide Button */}
        <div className="sticky top-20 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container-custom py-3">
            <Link href="/buyers-guide">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Buyer's Guide
              </Button>
            </Link>
          </div>
        </div>

        <div className="container-custom py-8">

          {/* ==================== PAGE 1 (was 4): BLOCK CHART TABLE ==================== */}
          <section className="bg-background rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img src={summitLogo} alt="Summit Portable Buildings" className="h-10 md:h-14" />
                <h2 className="text-lg md:text-xl font-heading font-bold text-primary">Block Chart</h2>
              </div>
              <p className="text-xs text-muted-foreground">4" = 4"x8"x16" Solid Cap Block | 8" = 8"x8"x16" Concrete Block</p>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-[10px] md:text-xs border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border border-primary-foreground/30 p-1 md:p-2 text-left" rowSpan={2}>Drop</th>
                    <th className="border border-primary-foreground/30 p-1 md:p-2" rowSpan={2}>Width</th>
                    <th className="border border-primary-foreground/30 p-1" colSpan={2}>12' Long</th>
                    <th className="border border-primary-foreground/30 p-1" colSpan={2}>16' Long</th>
                    <th className="border border-primary-foreground/30 p-1" colSpan={2}>20' Long</th>
                    <th className="border border-primary-foreground/30 p-1" colSpan={2}>24' Long</th>
                    <th className="border border-primary-foreground/30 p-1" colSpan={2}>28' Long</th>
                    <th className="border border-primary-foreground/30 p-1" colSpan={2}>32' Long</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700" colSpan={2}>36' Long</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700" colSpan={2}>40' Long</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700" colSpan={2}>44' Long</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700" colSpan={2}>48' Long</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700" colSpan={2}>52' Long</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700" colSpan={2}>56' Long</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700" colSpan={2}>60' Long</th>
                  </tr>
                  <tr className="bg-primary/80 text-primary-foreground text-[8px]">
                    <th className="border border-primary-foreground/30 p-1">4"</th>
                    <th className="border border-primary-foreground/30 p-1">8"</th>
                    <th className="border border-primary-foreground/30 p-1">4"</th>
                    <th className="border border-primary-foreground/30 p-1">8"</th>
                    <th className="border border-primary-foreground/30 p-1">4"</th>
                    <th className="border border-primary-foreground/30 p-1">8"</th>
                    <th className="border border-primary-foreground/30 p-1">4"</th>
                    <th className="border border-primary-foreground/30 p-1">8"</th>
                    <th className="border border-primary-foreground/30 p-1">4"</th>
                    <th className="border border-primary-foreground/30 p-1">8"</th>
                    <th className="border border-primary-foreground/30 p-1">4"</th>
                    <th className="border border-primary-foreground/30 p-1">8"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">4"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">8"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">4"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">8"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">4"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">8"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">4"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">8"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">4"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">8"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">4"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">8"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">4"</th>
                    <th className="border border-primary-foreground/30 p-1 bg-red-700">8"</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 4" of Drop - Green */}
                  <tr className="bg-green-100">
                    <td rowSpan={3} className="border p-1 font-bold bg-green-200 text-center">4"</td>
                    <td className="border p-1 text-center font-medium">8' Wide</td>
                    <td className="border p-1 text-center">8</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">12</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">14</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">-</td>
                    <td colSpan={14} rowSpan={3} className="border p-2 text-center bg-red-100 text-red-800 text-[9px] align-middle">
                      A laser level Concrete Pad, Compacted Rock pad, or Compacted Dirt Pad is required for 40' and Longer Buildings for Warranty Purposes and settling issues.
                    </td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border p-1 text-center font-medium">10' Wide</td>
                    <td className="border p-1 text-center">8</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">12</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">14</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">-</td>
                  </tr>
                  <tr className="bg-green-100">
                    <td className="border p-1 text-center font-medium">12', 14, & 16'</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">-</td>
                  </tr>

                  {/* 8" of Drop - Yellow */}
                  <tr className="bg-yellow-100">
                    <td rowSpan={3} className="border p-1 font-bold bg-yellow-200 text-center">8"</td>
                    <td className="border p-1 text-center font-medium">8' Wide</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">-</td>
                    <td colSpan={14} rowSpan={3} className="border p-2 text-center bg-red-100 text-red-800 text-[9px] align-middle">
                      A laser level Concrete Pad, Compacted Rock pad, or Compacted Dirt Pad is required for 40' and Longer Buildings for Warranty Purposes and settling issues.
                    </td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border p-1 text-center font-medium">10' Wide</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">-</td>
                  </tr>
                  <tr className="bg-yellow-100">
                    <td className="border p-1 text-center font-medium">12', 14, & 16'</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">40</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">48</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">56</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">64</td><td className="border p-1 text-center">-</td>
                    <td className="border p-1 text-center">72</td><td className="border p-1 text-center">-</td>
                  </tr>

                  {/* 12" of Drop - Orange */}
                  <tr className="bg-orange-100">
                    <td rowSpan={3} className="border p-1 font-bold bg-orange-200 text-center">12"</td>
                    <td className="border p-1 text-center font-medium">8' Wide</td>
                    <td className="border p-1 text-center">8</td><td className="border p-1 text-center">8</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">12</td><td className="border p-1 text-center">12</td>
                    <td className="border p-1 text-center">14</td><td className="border p-1 text-center">14</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">18</td>
                    <td colSpan={14} rowSpan={3} className="border p-2 text-center bg-red-100 text-red-800 text-[9px] align-middle">
                      A laser level Concrete Pad, Compacted Rock pad, or Compacted Dirt Pad is required for 40' and Longer Buildings for Warranty Purposes and settling issues.
                    </td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border p-1 text-center font-medium">10' Wide</td>
                    <td className="border p-1 text-center">8</td><td className="border p-1 text-center">8</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">12</td><td className="border p-1 text-center">12</td>
                    <td className="border p-1 text-center">14</td><td className="border p-1 text-center">14</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">18</td>
                  </tr>
                  <tr className="bg-orange-100">
                    <td className="border p-1 text-center font-medium">12', 14, & 16'</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">28</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">36</td>
                  </tr>

                  {/* 16" of Drop - Pink/Red */}
                  <tr className="bg-pink-100">
                    <td rowSpan={3} className="border p-1 font-bold bg-pink-200 text-center">16"</td>
                    <td className="border p-1 text-center font-medium">8' Wide</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">8</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">12</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">14</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">-</td>
                    <td colSpan={14} rowSpan={3} className="border p-2 text-center bg-red-100 text-red-800 text-[9px] align-middle">
                      A laser level Concrete Pad, Compacted Rock pad, or Compacted Dirt Pad is required for 40' and Longer Buildings for Warranty Purposes and settling issues.
                    </td>
                  </tr>
                  <tr className="bg-pink-50">
                    <td className="border p-1 text-center font-medium">10' Wide</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">8</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">10</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">12</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">14</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">-</td>
                  </tr>
                  <tr className="bg-pink-100">
                    <td className="border p-1 text-center font-medium">12', 14, & 16'</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">40</td><td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">48</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">56</td><td className="border p-1 text-center">28</td>
                    <td className="border p-1 text-center">64</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">72</td><td className="border p-1 text-center">36</td>
                  </tr>

                  {/* 20" of Drop - Purple */}
                  <tr className="bg-purple-100">
                    <td rowSpan={3} className="border p-1 font-bold bg-purple-200 text-center">20"</td>
                    <td className="border p-1 text-center font-medium">8' Wide</td>
                    <td className="border p-1 text-center">8</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">12</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">14</td><td className="border p-1 text-center">28</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">36</td>
                    <td colSpan={14} rowSpan={3} className="border p-2 text-center bg-red-100 text-red-800 text-[9px] align-middle">
                      A laser level Concrete Pad, Compacted Rock pad, or Compacted Dirt Pad is required for 40' and Longer Buildings for Warranty Purposes and settling issues.
                    </td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border p-1 text-center font-medium">10' Wide</td>
                    <td className="border p-1 text-center">8</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">12</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">14</td><td className="border p-1 text-center">28</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">36</td>
                  </tr>
                  <tr className="bg-purple-100">
                    <td className="border p-1 text-center font-medium">12', 14, & 16'</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">40</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">48</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">56</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">64</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">72</td>
                  </tr>

                  {/* 24" of Drop - Gray */}
                  <tr className="bg-gray-200">
                    <td rowSpan={3} className="border p-1 font-bold bg-gray-300 text-center">24"</td>
                    <td className="border p-1 text-center font-medium">8' Wide</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">28</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">36</td>
                    <td colSpan={14} rowSpan={3} className="border p-2 text-center bg-red-100 text-red-800 text-[9px] align-middle">
                      A laser level Concrete Pad, Compacted Rock pad, or Compacted Dirt Pad is required for 40' and Longer Buildings for Warranty Purposes and settling issues.
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border p-1 text-center font-medium">10' Wide</td>
                    <td className="border p-1 text-center">16</td><td className="border p-1 text-center">16</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">20</td>
                    <td className="border p-1 text-center">24</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">28</td><td className="border p-1 text-center">28</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">36</td><td className="border p-1 text-center">36</td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="border p-1 text-center font-medium">12', 14, & 16'</td>
                    <td className="border p-1 text-center">32</td><td className="border p-1 text-center">32</td>
                    <td className="border p-1 text-center">40</td><td className="border p-1 text-center">40</td>
                    <td className="border p-1 text-center">48</td><td className="border p-1 text-center">48</td>
                    <td className="border p-1 text-center">56</td><td className="border p-1 text-center">56</td>
                    <td className="border p-1 text-center">64</td><td className="border p-1 text-center">64</td>
                    <td className="border p-1 text-center">72</td><td className="border p-1 text-center">72</td>
                  </tr>

                  {/* 28" of Drop - Blue */}
                  <tr className="bg-blue-100">
                    <td rowSpan={3} className="border p-1 font-bold bg-blue-200 text-center">28"</td>
                    <td className="border p-1 text-center font-medium">8' Wide</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">13</td><td className="border p-1 text-center">30</td>
                    <td className="border p-1 text-center">15</td><td className="border p-1 text-center">36</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">42</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">48</td>
                    <td className="border p-1 text-center">23</td><td className="border p-1 text-center">54</td>
                    <td colSpan={14} rowSpan={3} className="border p-2 text-center bg-red-100 text-red-800 text-[9px] align-middle">
                      A laser level Concrete Pad, Compacted Rock pad, or Compacted Dirt Pad is required for 40' and Longer Buildings for Warranty Purposes and settling issues.
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border p-1 text-center font-medium">10' Wide</td>
                    <td className="border p-1 text-center">10</td><td className="border p-1 text-center">24</td>
                    <td className="border p-1 text-center">13</td><td className="border p-1 text-center">30</td>
                    <td className="border p-1 text-center">15</td><td className="border p-1 text-center">36</td>
                    <td className="border p-1 text-center">18</td><td className="border p-1 text-center">42</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">48</td>
                    <td className="border p-1 text-center">23</td><td className="border p-1 text-center">54</td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td className="border p-1 text-center font-medium">12', 14, & 16'</td>
                    <td className="border p-1 text-center">20</td><td className="border p-1 text-center">48</td>
                    <td className="border p-1 text-center">25</td><td className="border p-1 text-center">60</td>
                    <td className="border p-1 text-center">30</td><td className="border p-1 text-center">72</td>
                    <td className="border p-1 text-center">35</td><td className="border p-1 text-center">84</td>
                    <td className="border p-1 text-center">40</td><td className="border p-1 text-center">96</td>
                    <td className="border p-1 text-center">45</td><td className="border p-1 text-center">108</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Warranty Notes Below Table */}
            <div className="mt-6 space-y-4 text-sm border-t pt-4">
              <div>
                <p><strong>WARRANTY & DELIVERY CHARGES (For Buildings up to 36' long):</strong> Customer agrees to Forfeit all Warranty if Building is Blocked and Leveled higher than 24" from ground to runner. If more than 24" you agree to Forfeit any & All Warranty. In addition you will be charged $100/Hr for anything over 2 Hours of labor from time of arrival.</p>
              </div>
              <div>
                <p><strong>(For Buildings 40' or longer):</strong> A Laser Level Concrete Pad, Compacted Rock Pad, or Compacted Dirt Pad is required. Customer agrees to Forfeit all Warranty if Building is Blocked and Leveled higher than 12" from ground, gravel, or concrete to runner. In addition you will be charged $100/Hr for anything over 2 Hours of labor from time of arrival.</p>
              </div>
              <div>
                <p><strong>Site Prep Requirements:</strong> Customer is responsible for removal of tree stumps, tree limbs, barriers, and any obstacles that would hinder delivery and setup. A path at least 2' wider than building and 17' high should be cleared to allow for building to pass thru. A wider path is required if straight path is not possible. Buyer agrees to provide a clear, unobstructed access to building site. At time of delivery, if driver judges he cannot deliver building because of obstructions, safety concerns, or inadequate site prep, delivery may be refused and a $300.00 charge applies. Used Concrete Blocks will void warranty.</p>
              </div>
              <p className="text-center font-bold text-primary">SEE BELOW FOR MORE SITE PREP DETAILS</p>
            </div>
          </section>

          {/* ==================== PAGE 2: RUNNER SPACING ==================== */}
          <section className="bg-background rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <img src={summitLogo} alt="Summit Portable Buildings" className="h-14 md:h-20" />
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                Runner Spacing on Portable Buildings
              </h2>
            </div>

            {/* Runner Diagrams - SVG based to exactly match PDF */}
            <div className="space-y-12 max-w-3xl mx-auto">
              
              {/* 8' Wide - 2 runners */}
              <div>
                <h3 className="text-center font-bold mb-4">8' Wide actual width 7' 11" (95")</h3>
                <svg viewBox="0 0 500 80" className="w-full max-w-xl mx-auto" style={{ height: 'auto' }}>
                  {/* Building bar */}
                  <rect x="50" y="5" width="400" height="20" fill="#C9A227" stroke="#8B7355" strokeWidth="1"/>
                  {/* Runner blocks - positioned at 15.75" and 79.25" from left (scaled) */}
                  <rect x="116" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="369" y="25" width="15" height="18" fill="#1a1a1a"/>
                  {/* 60" measurement line with arrows pointing INWARD */}
                  <line x1="131" y1="47" x2="369" y2="47" stroke="black" strokeWidth="1"/>
                  <polygon points="131,47 139,44 139,50" fill="black"/>
                  <polygon points="369,47 361,44 361,50" fill="black"/>
                  <text x="250" y="44" textAnchor="middle" fontSize="12" fontWeight="bold">60"</text>
                  {/* Bottom measurement lines - tick marks going down */}
                  <line x1="50" y1="55" x2="50" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="124" y1="55" x2="124" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="376" y1="55" x2="376" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="55" x2="450" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="50" y1="67" x2="450" y2="67" stroke="black" strokeWidth="1"/>
                  {/* Measurement labels */}
                  <text x="124" y="78" textAnchor="middle" fontSize="10">15.75"</text>
                  <text x="376" y="78" textAnchor="middle" fontSize="10">79.25"</text>
                  <text x="450" y="78" textAnchor="middle" fontSize="10">95"</text>
                </svg>
              </div>

              {/* 10' Wide - 2 runners */}
              <div>
                <h3 className="text-center font-bold mb-4">10' Wide actual width 9' 10.5" (118.5")</h3>
                <svg viewBox="0 0 500 80" className="w-full max-w-xl mx-auto" style={{ height: 'auto' }}>
                  <rect x="50" y="5" width="400" height="20" fill="#C9A227" stroke="#8B7355" strokeWidth="1"/>
                  {/* Runner blocks - positioned at 27.5" and 91" from left */}
                  <rect x="143" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="342" y="25" width="15" height="18" fill="#1a1a1a"/>
                  {/* 60" measurement with inward arrows */}
                  <line x1="158" y1="47" x2="342" y2="47" stroke="black" strokeWidth="1"/>
                  <polygon points="158,47 166,44 166,50" fill="black"/>
                  <polygon points="342,47 334,44 334,50" fill="black"/>
                  <text x="250" y="44" textAnchor="middle" fontSize="12" fontWeight="bold">60"</text>
                  {/* Bottom measurement lines */}
                  <line x1="50" y1="55" x2="50" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="150" y1="55" x2="150" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="350" y1="55" x2="350" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="55" x2="450" y2="70" stroke="black" strokeWidth="1"/>
                  <line x1="50" y1="67" x2="450" y2="67" stroke="black" strokeWidth="1"/>
                  <text x="150" y="78" textAnchor="middle" fontSize="10">27.5"</text>
                  <text x="350" y="78" textAnchor="middle" fontSize="10">91"</text>
                  <text x="450" y="78" textAnchor="middle" fontSize="10">118.5"</text>
                </svg>
              </div>

              {/* 12' Wide - 4 runners */}
              <div>
                <h3 className="text-center font-bold mb-4">12' Wide actual width 11' 6" (138")</h3>
                <svg viewBox="0 0 500 95" className="w-full max-w-xl mx-auto" style={{ height: 'auto' }}>
                  <rect x="50" y="5" width="400" height="20" fill="#C9A227" stroke="#8B7355" strokeWidth="1"/>
                  {/* 4 runner blocks */}
                  <rect x="70" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="163" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="322" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="415" y="25" width="15" height="18" fill="#1a1a1a"/>
                  {/* 60" center span with inward arrows */}
                  <line x1="178" y1="47" x2="322" y2="47" stroke="black" strokeWidth="1"/>
                  <polygon points="178,47 186,44 186,50" fill="black"/>
                  <polygon points="322,47 314,44 314,50" fill="black"/>
                  <text x="250" y="44" textAnchor="middle" fontSize="12" fontWeight="bold">60"</text>
                  {/* 7.5" edge measurements with vertical lines */}
                  <line x1="50" y1="43" x2="50" y2="52" stroke="black" strokeWidth="1"/>
                  <line x1="78" y1="43" x2="78" y2="52" stroke="black" strokeWidth="1"/>
                  <text x="64" y="58" textAnchor="middle" fontSize="9">7.5"</text>
                  <line x1="422" y1="43" x2="422" y2="52" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="43" x2="450" y2="52" stroke="black" strokeWidth="1"/>
                  <text x="436" y="58" textAnchor="middle" fontSize="9">7.5"</text>
                  {/* Bottom measurement lines */}
                  <line x1="50" y1="65" x2="50" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="78" y1="65" x2="78" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="170" y1="65" x2="170" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="330" y1="65" x2="330" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="422" y1="65" x2="422" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="65" x2="450" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="50" y1="77" x2="450" y2="77" stroke="black" strokeWidth="1"/>
                  <text x="78" y="92" textAnchor="middle" fontSize="9">9.25"</text>
                  <text x="170" y="92" textAnchor="middle" fontSize="9">37.25"</text>
                  <text x="330" y="92" textAnchor="middle" fontSize="9">100.75"</text>
                  <text x="410" y="92" textAnchor="middle" fontSize="9">128.75"</text>
                  <text x="450" y="92" textAnchor="middle" fontSize="9">138"</text>
                </svg>
              </div>

              {/* 14' Wide - 4 runners */}
              <div>
                <h3 className="text-center font-bold mb-4">14' Wide actual width 13' 10.5" (166.5")</h3>
                <svg viewBox="0 0 500 95" className="w-full max-w-xl mx-auto" style={{ height: 'auto' }}>
                  <rect x="50" y="5" width="400" height="20" fill="#C9A227" stroke="#8B7355" strokeWidth="1"/>
                  <rect x="70" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="175" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="310" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="415" y="25" width="15" height="18" fill="#1a1a1a"/>
                  {/* 60" with inward arrows */}
                  <line x1="190" y1="47" x2="310" y2="47" stroke="black" strokeWidth="1"/>
                  <polygon points="190,47 198,44 198,50" fill="black"/>
                  <polygon points="310,47 302,44 302,50" fill="black"/>
                  <text x="250" y="44" textAnchor="middle" fontSize="12" fontWeight="bold">60"</text>
                  {/* 7.5" edge measurements */}
                  <line x1="50" y1="43" x2="50" y2="52" stroke="black" strokeWidth="1"/>
                  <line x1="78" y1="43" x2="78" y2="52" stroke="black" strokeWidth="1"/>
                  <text x="64" y="58" textAnchor="middle" fontSize="9">7.5"</text>
                  <line x1="422" y1="43" x2="422" y2="52" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="43" x2="450" y2="52" stroke="black" strokeWidth="1"/>
                  <text x="436" y="58" textAnchor="middle" fontSize="9">7.5"</text>
                  {/* Bottom measurements */}
                  <line x1="50" y1="65" x2="50" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="78" y1="65" x2="78" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="182" y1="65" x2="182" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="318" y1="65" x2="318" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="422" y1="65" x2="422" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="65" x2="450" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="50" y1="77" x2="450" y2="77" stroke="black" strokeWidth="1"/>
                  <text x="78" y="92" textAnchor="middle" fontSize="9">9.25"</text>
                  <text x="182" y="92" textAnchor="middle" fontSize="9">51.5"</text>
                  <text x="318" y="92" textAnchor="middle" fontSize="9">115"</text>
                  <text x="405" y="92" textAnchor="middle" fontSize="9">157.25"</text>
                  <text x="450" y="92" textAnchor="middle" fontSize="9">166.5"</text>
                </svg>
              </div>

              {/* 16' Wide - 4 runners */}
              <div>
                <h3 className="text-center font-bold mb-4">16' Wide actual width 15' 2" (182")</h3>
                <svg viewBox="0 0 500 95" className="w-full max-w-xl mx-auto" style={{ height: 'auto' }}>
                  <rect x="50" y="5" width="400" height="20" fill="#C9A227" stroke="#8B7355" strokeWidth="1"/>
                  <rect x="70" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="183" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="302" y="25" width="15" height="18" fill="#1a1a1a"/>
                  <rect x="415" y="25" width="15" height="18" fill="#1a1a1a"/>
                  {/* 60" with inward arrows */}
                  <line x1="198" y1="47" x2="302" y2="47" stroke="black" strokeWidth="1"/>
                  <polygon points="198,47 206,44 206,50" fill="black"/>
                  <polygon points="302,47 294,44 294,50" fill="black"/>
                  <text x="250" y="44" textAnchor="middle" fontSize="12" fontWeight="bold">60"</text>
                  {/* 7.5" edge measurements */}
                  <line x1="50" y1="43" x2="50" y2="52" stroke="black" strokeWidth="1"/>
                  <line x1="78" y1="43" x2="78" y2="52" stroke="black" strokeWidth="1"/>
                  <text x="64" y="58" textAnchor="middle" fontSize="9">7.5"</text>
                  <line x1="422" y1="43" x2="422" y2="52" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="43" x2="450" y2="52" stroke="black" strokeWidth="1"/>
                  <text x="436" y="58" textAnchor="middle" fontSize="9">7.5"</text>
                  {/* Bottom measurements */}
                  <line x1="50" y1="65" x2="50" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="78" y1="65" x2="78" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="190" y1="65" x2="190" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="310" y1="65" x2="310" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="422" y1="65" x2="422" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="450" y1="65" x2="450" y2="80" stroke="black" strokeWidth="1"/>
                  <line x1="50" y1="77" x2="450" y2="77" stroke="black" strokeWidth="1"/>
                  <text x="78" y="92" textAnchor="middle" fontSize="9">9.25"</text>
                  <text x="190" y="92" textAnchor="middle" fontSize="9">59.25"</text>
                  <text x="310" y="92" textAnchor="middle" fontSize="9">122.75"</text>
                  <text x="400" y="92" textAnchor="middle" fontSize="9">172.75"</text>
                  <text x="450" y="92" textAnchor="middle" fontSize="9">182"</text>
                </svg>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-10 space-y-3 text-sm border-t pt-6">
              <p><strong>*Actual Building Length</strong> is exactly as stated in Pricing Guide or Catalog.</p>
              <p><strong>4"x6" Treated Runners:</strong> Actual Runner dimensions are 3.5"x5.5" w/ 1" notch for Floor Joists to interlock. 3.5" exposed below Joists. Each Runner is treated for ground contact.</p>
            </div>

            {/* Basic Site Prep Info */}
            <div className="mt-8 border-t pt-6">
              <h3 className="font-bold text-lg mb-4">Basic Site Prep Info...</h3>
              
              <div className="space-y-4 text-sm">
                <p><strong>If Placed on the Ground...</strong>Ensure Site is within 16" of level. Measure out the desired spot where each corner of building would be. Using a string level, or laser level check site for the amount of slope from highest corner to lowest corner. If more then 16" of slope consider moving to a different area or building a level pad. If Area is not level ensure Concrete Blocks are on site prior to the arrival of your building. Concrete Blocks needed are 4"x8"x16" Solid Concrete Block & 8"x8"x16" Standard Concrete Block. The amount needed depends on how un-level site is.</p>

                <p><strong>If Placed on the Rock Pad...</strong> <em>(RECOMMENDED AS MOST EFFICIENT AND COST EFFECTIVE. It reduces moisture levels and lengthens life of building.)</em> Measure out the desired spot where each corner of building would be. Using a string level, or laser level check site for the amount of slope from highest corner to lowest corner. If more than 16" of slope consider moving to a different area or building a level rock pad. Build your rock pad at least 4' longer & 4' wider then building and then slope off gradually to surrounding areas. If retaining walls are used please allow enough room for delivery equipment to move around edge of building (approximately 5' or more per side). Rock should be limestone 1" in size with some fines mixed in and 4" inches thick minimum. River Rock is not recommended due being less stable.</p>

                <p><strong>If Placed on Piers:</strong> Concrete Piers should be 8' on center (6' on center for heavy duty applications) & 12-24" in diameter or 24"x24". Piers should be flush with ground unless otherwise discussed with delivery personnel. A 24" wide Pier can also be used the width of building with 1 every 8'. Concrete Blocks can be used if need to finish leveling building. Concrete Blocks Needed are 4"x8"x16" Solid Concrete Block & 8"x8"x16" Standard Concrete Block. The amount needed depends on how un-level site is.</p>

                <p><strong>If Placed on Concrete Pad:</strong> A Concrete Pad is a great idea but it comes with an added cost. We recommend a minimum of 4" of Concrete with a gradual slope up to pad to ensure a smooth delivery. We recommend pad width and length to be the exact size of building dimensions.</p>
              </div>
            </div>
          </section>

          {/* ==================== PAGE 3: BUILDING HEIGHTS ==================== */}
          <section className="bg-background rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-primary text-center mb-2">
              Overall Building Heights, Floor to Wall Heights, Floor to Rafter Height, & Loft to Peak Height
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 mt-8">
              {/* Pro Series Lofted Barn */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary text-primary-foreground p-4">
                  <h3 className="font-bold text-lg">Pro Series (LP) Lofted Barn Styles</h3>
                  <p className="text-sm opacity-90">Wall Height - Sub-Floor to Top Plate | <strong>6' 7.5" (79.5")</strong></p>
                </div>
                
                <div className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={cloudinaryImages.proLoftedBarn || cloudinaryImages.loftedBarn1} 
                      alt="Pro Series Lofted Barn" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Sub-Floor to Peak (under rafter)</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>8' Wide: 10' 0" (120")</li>
                        <li>10' Wide: 10' 4.25" (124.25")</li>
                        <li>12' Wide: 10' 8.25" (128.25")</li>
                        <li>14' Wide: 10' 11.5" (131.5")</li>
                        <li>16' Wide: 11' 1.5" (133.5")</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Runner to Peak (bottom of runner to ridge cap)</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>8' Wide: 11' 3.5" (135.5")</li>
                        <li>10' Wide: 11' 7.75" (139.75")</li>
                        <li>12' Wide: 11' 11.75" (143.75")</li>
                        <li>14' Wide: 12' 3" (147")</li>
                        <li>16' Wide: 12' 5" (149")</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-sm">Loft-Floor to Peak (under rafter)</h4>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                      <li>8' Wide: 3' 0" (36")</li>
                      <li>10' Wide: 3' 5" (41")</li>
                      <li>12' Wide: 3' 7" (43")</li>
                      <li>14' Wide: 3' 9.5" (45.5")</li>
                      <li>16' Wide: 3' 11.5" (47.5")</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Series A-Frame */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary text-primary-foreground p-4">
                  <h3 className="font-bold text-lg">Pro Series (LP) A-Frame Styles</h3>
                  <p className="text-sm opacity-90">Wall Height - Sub-Floor to Top Plate | <strong>7' 9.5" (93.5")</strong></p>
                </div>
                
                <div className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={cloudinaryImages.proUtility || cloudinaryImages.utilityShed1} 
                      alt="Pro Series A-Frame" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Sub-Floor to Peak (under rafter)</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>8' Wide: 9' 4.25" (112.25")</li>
                        <li>10' Wide: 9' 9.25" (124.25")</li>
                        <li>12' Wide: 10' 9.25" (129.25")</li>
                        <li>14' Wide: 10' 7.25" (127.25")</li>
                        <li>16' Wide: 10' 10.25" (130.25")</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Runner to Peak (bottom of runner to ridge cap)</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>8' Wide: 10' 7.75" (127.75")</li>
                        <li>10' Wide: 11' 7.75" (139.75")</li>
                        <li>12' Wide: 12' 1" (145")</li>
                        <li>14' Wide: 12' 0.75" (144.75")</li>
                        <li>16' Wide: 12' 3.75" (147.75")</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== PAGE 4: VISUAL EXAMPLES ==================== */}
          <section className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
            
            {/* TOP ROW - Using actual images from PDF */}
            <div className="grid grid-cols-12 gap-2 mb-2">
              {/* Left column: Gravel Pad sheds with logo */}
              <div className="col-span-5">
                <img 
                  src="https://res.cloudinary.com/dwhwbbbev/image/upload/v1768948956/Image_1-21-26_at_03.17_1_mmuai2.jpg" 
                  alt="Compacted Laser Level Gravel Pad with slope off on each side" 
                  className="w-full h-auto rounded"
                />
              </div>
              
              {/* Right column: Two lofted garages */}
              <div className="col-span-7">
                <img 
                  src="https://res.cloudinary.com/dwhwbbbev/image/upload/v1768948955/Image_1-21-26_at_03.17_1_fs5yvm.jpg" 
                  alt="12x32 and 16x44 Lofted Garages on level gravel pads" 
                  className="w-full h-auto rounded"
                />
              </div>
            </div>

            {/* MIDDLE ROW */}
            <div className="grid grid-cols-12 gap-2 mb-2">
              {/* 32' Building on Gravel Pad */}
              <div className="col-span-5">
                <img 
                  src="https://res.cloudinary.com/dwhwbbbev/image/upload/v1768948956/Image_1-21-26_at_03.17_1_rra26p.jpg" 
                  alt="32 foot Building on Gravel Pad plus Concrete Blocks" 
                  className="w-full h-auto rounded"
                />
              </div>
              
              {/* Concrete pad and almost level yard */}
              <div className="col-span-7">
                <img 
                  src="https://res.cloudinary.com/dwhwbbbev/image/upload/v1768948956/Image_1-21-26_at_03.17_1_inzf8f.jpg" 
                  alt="Utilizing existing un-level concrete pad and almost level yard with single block" 
                  className="w-full h-auto rounded"
                />
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className="mb-4">
              <img 
                src="https://res.cloudinary.com/dwhwbbbev/image/upload/v1768948956/Image_1-21-26_at_03.17_1_tibabe.jpg" 
                alt="Warranty Loss Example - 14x44 Garage 32 inches out of level with unusable entrance" 
                className="w-full h-auto rounded"
              />
            </div>
          </section>

          {/* ==================== DELIVERY CHECKLIST (Separate Section) ==================== */}
          <section className="bg-background rounded-lg shadow-md p-6 md:p-8 mb-8">

            {/* Block Types */}
            <div className="flex flex-wrap justify-center gap-8 mb-8 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="w-32 h-16 bg-gradient-to-b from-gray-400 to-gray-500 rounded mx-auto mb-2 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">4"x8"x16"</span>
                </div>
                <p className="font-bold text-sm">Solid Concrete Block</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-20 bg-gradient-to-b from-gray-500 to-gray-600 rounded mx-auto mb-2 flex items-center justify-center shadow-md relative">
                  <div className="absolute top-2 left-4 w-4 h-12 bg-gray-700 rounded"></div>
                  <div className="absolute top-2 right-4 w-4 h-12 bg-gray-700 rounded"></div>
                  <span className="text-white font-bold text-xs z-10">8"x8"x16"</span>
                </div>
                <p className="font-bold text-sm">Standard Concrete Block</p>
              </div>
            </div>

            {/* Delivery Checklist */}
            <h3 className="font-bold text-xl text-primary mb-4">Delivery Checklist:</h3>
            <ol className="space-y-3 list-decimal list-outside ml-6 text-sm">
              <li>Are you ready to take delivery of your Summit Building?</li>
              <li>Is site prepped and ready or is none needed?</li>
              <li>Is there good access from road or street to site? Going in straight line a path 2' wider than building and branches trimmed up to 17' from ground is required. <span className="font-bold text-red-600">NOTE!! IF MAKING A TURN A MUCH MUCH WIDER PATH IS REQUIRED.</span> If County Road needs branches trimmed you are responsible to trim or Contact the County Road Department trim for you.</li>
              <li>Are there obstacles such as overhanging tree limbs, mailboxes, fence posts, high banks, retaining walls, house overhangs, low wires, culverts, posts, septic tanks, ect in the path for delivery?</li>
              <li>Has permit been obtained if needed? (Most times Private Lake Communities, Private Subdivisions, Towns/Cities, & some Counties require permits. Delivery is normally not schedule till permit is obtained and proof of copy is presented. Customer is responsible to obtain permit if needed)</li>
              <li>Are we setting building on ground and leveling w/ blocks or do you have a level rock or concrete pad?</li>
              <li>If setting on Concrete Blocks do have them available and setting next to site but not in the way of getting building to the site? Need help choosing correct blocks and the amount? See the Block Chart. (usually provided at time of sale).</li>
              <li>If placing building on your Concrete Blocks always start with a 4"x8"x16" Solid Concrete Block. These blocks should be available at Lowes, Home Depot, Menards, & other Building Supply Stores. We place your Concrete Blocks under every runner every 8' on center. If more height is needed you will need 8'x8'x16' Standard Concrete Blocks. These blocks should be available at Lowes, Home Depot, Menards, & other Building Supply Stores. <strong>See Block Photos above.</strong></li>
              <li><strong>WARRANTY & DELIVERY CHARGES per signed invoice (For Buildings up to 36' long):</strong> Customer agrees to Forfeit all Warranty if Building is Blocked and Leveled higher than 24" from ground to runner. If more than 24" you agree to Forfeit any & All Warranty. <span className="text-red-600">In addition you will be charged $100/Hr for anything over 2 Hours of labor from time of arrival.</span> Keep in mind you gain an additional 4" from bottom of Runner to Floor Joists. This means 24" of Blocks will give you 28" to Floor Joists.</li>
              <li><strong>WARRANTY & DELIVERY CHARGES per signed invoice (For Buildings 40' or longer):</strong> A Laser Level Concrete Pad, Compacted Rock Pad, or Compacted Dirt Pad is required. Customer agrees to Forfeit all Warranty if Building is Blocked and Leveled higher than 12" from ground, gravel, or concrete to runner. <span className="text-red-600">In addition you will be charged $100/Hr for anything over 2 Hours of labor from time of arrival.</span> Keep in mind you gain an additional 4" from bottom of Runner to Floor Joists. This means 12" of Blocks will give you 16" to Floor Joists.</li>
              <li>Using <strong className="underline">(used)</strong> Concrete Blocks will <strong>Void Warranty</strong> (per signed invoice)</li>
              <li>If there are any questions or concerns about potential delivery complications please send photos/50 sec videos from multiple angles to 573-747-7150 or to person you are communicating with about delivery.</li>
            </ol>
          </section>

          {/* Back to Buyer's Guide - Bottom */}
          <div className="text-center py-8">
            <Link href="/buyers-guide">
              <Button variant="hero" size="lg" className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Buyer's Guide
              </Button>
            </Link>
          </div>
        </div>
      </main>

    </>
  );
}
