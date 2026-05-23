"use client";

/**
 * Homepage V2 — Side-by-side preview for design comparison.
 *
 * Uses the existing (public) layout's Header + Footer.
 * Live-site content (We Understand, Your Guide, Imagine This) is reused
 * verbatim from homeDefaults; V2-only sections (Find Your Style, Summit
 * Standard, How It Works, Stories, Service Area, Final CTA) are introduced
 * here. Hero CTAs match the live site so the comparison is apples-to-apples.
 */

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Package,
  Hammer,
  Shield,
  Truck,
  Home,
  Car,
  Lock,
  Clock,
  TrendingUp,
  Quote,
  Phone,
  Star,
} from "lucide-react";
import { cloudinaryImages } from "@/lib/cloudinary";
import { homeDefaults } from "@/data/defaults/homeDefaults";
import { useEditableTestimonials } from "@/hooks/useEditableTestimonials";

type StyleCategory = "all" | "storage" | "barn" | "modern" | "living" | "specialty";

const FILTERS: Array<{ key: StyleCategory; label: string }> = [
  { key: "all", label: "All Styles" },
  { key: "storage", label: "Storage" },
  { key: "barn", label: "Barns & Lofts" },
  { key: "modern", label: "Modern" },
  { key: "living", label: "Cabins & Living" },
  { key: "specialty", label: "Specialty" },
];

interface StyleCard {
  id: string;
  name: string;
  subtitle: string;
  blurb: string;
  image: string;
  href: string;
  category: StyleCategory;
  badge?: { label: string; tone: "popular" | "specialty" };
}

const STYLE_CARDS: StyleCard[] = [
  {
    id: "utility",
    name: "Utility",
    subtitle: "Traditional A-Frame",
    blurb: "The workhorse. Perfect for tools, mowers, ATVs, and seasonal storage.",
    image: cloudinaryImages.utilityShed3,
    href: "/styles/utility",
    category: "storage",
    badge: { label: "Most Popular", tone: "popular" },
  },
  {
    id: "barn",
    name: "Lofted Barn",
    subtitle: "Gambrel Roof",
    blurb: "Maximum headroom and classic barn aesthetics. Ideal for workshops and equipment.",
    image: cloudinaryImages.sideLoftedBarn4,
    href: "/styles/barn",
    category: "barn",
  },
  {
    id: "modern",
    name: "Modern",
    subtitle: "Single Slope Roof",
    blurb: "Clean lines and maximum interior space. Perfect for contemporary properties.",
    image: cloudinaryImages.modernShed,
    href: "/styles/modern",
    category: "modern",
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    subtitle: "Year-Round Growing",
    blurb: "Built specifically for serious gardeners. Polycarbonate panels and ventilation options.",
    image: cloudinaryImages.greenhouse1,
    href: "/styles/greenhouse",
    category: "specialty",
    badge: { label: "Specialty", tone: "specialty" },
  },
  {
    id: "animal-shelters",
    name: "Animal Shelters",
    subtitle: "Livestock & Pets",
    blurb: "Designed for horses, goats, chickens, and more. Heavy-duty and easy to clean.",
    image: cloudinaryImages.animalShelter1,
    href: "/styles/animal-shelters",
    category: "specialty",
  },
];

const STAKES_ICONS = [Package, Home, Shield];
const IMAGINE_ICONS = [Car, Shield, Hammer, TrendingUp, Lock, Clock];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function HomePageV2Client() {
  const [activeFilter, setActiveFilter] = useState<StyleCategory>("all");
  const { testimonials } = useEditableTestimonials();
  const visibleTestimonials = testimonials
    .filter((t) => t.is_visible !== false)
    .slice(0, 3);

  const visibleCards =
    activeFilter === "all"
      ? STYLE_CARDS
      : STYLE_CARDS.filter((c) => c.category === activeFilter);

  return (
    <div className="v2-root antialiased bg-[#f8f5f0] text-[#1e3149] pt-28">
      {/* Scoped styles for V2 typography + small animations */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap");
        .v2-root {
          font-family: "Open Sans", system-ui, sans-serif;
        }
        .v2-heading {
          font-family: "Playfair Display", Georgia, serif;
          letter-spacing: -0.02em;
        }
        .v2-quote-mark {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 4rem;
          line-height: 1;
          color: #d4c9b8;
        }
        .v2-modern-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .v2-modern-btn:hover {
          transform: translateY(-1px);
        }
        .v2-building-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .v2-building-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
            0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
        .v2-building-card .v2-building-image {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .v2-building-card:hover .v2-building-image {
          transform: scale(1.06);
        }
        .v2-value-prop {
          transition: all 0.2s ease;
        }
        .v2-value-prop:hover {
          transform: translateY(-2px);
        }
        .v2-process-step:not(:last-child)::after {
          content: "";
          position: absolute;
          left: 2.25rem;
          top: 3.25rem;
          bottom: -1.5rem;
          width: 2px;
          background: linear-gradient(to bottom, #e5e0d8, transparent);
        }
      `}</style>

      {/* HERO */}
      <header className="bg-[#f8f5f0]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-12 min-h-[80vh] lg:min-h-[78vh]">
            {/* Left content */}
            <div className="lg:col-span-7 px-6 lg:pl-12 xl:pl-20 flex items-center py-16 lg:py-0">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white border border-[#e5e0d8] rounded-full px-4 h-9 text-sm font-medium mb-6 shadow-sm">
                  <span className="w-2 h-2 bg-[#b85c3a] rounded-full animate-pulse" />
                  <span>Handcrafted in Missouri since 2016</span>
                </div>

                <h1 className="v2-heading text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.05] font-bold text-[#1e3149]">
                  Built for<br />
                  your land.<br />
                  Backed by<br />
                  craftsmanship.
                </h1>

                <p className="mt-6 text-xl sm:text-2xl text-[#4a5568] max-w-lg">
                  Premium portable buildings, delivered and set up across Missouri,
                  Illinois, Kentucky &amp; Arkansas.
                </p>

                {/* CTAs — match the LIVE site buttons (primary + secondary) */}
                <div className="mt-9 flex flex-col sm:flex-row gap-4">
                  <a
                    href={homeDefaults.heroButton1Link}
                    target={homeDefaults.heroButton1OpenInNewTab ? "_blank" : undefined}
                    rel={homeDefaults.heroButton1OpenInNewTab ? "noopener noreferrer" : undefined}
                    className="v2-modern-btn group inline-flex items-center justify-center gap-3 bg-[#b85c3a] hover:bg-[#a14f32] text-white text-lg font-semibold px-9 h-[62px] rounded-2xl shadow-lg shadow-[#b85c3a]/25"
                  >
                    <span>{homeDefaults.heroButton1Text}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
                  </a>

                  {homeDefaults.heroButton2OpenInNewTab ? (
                    <a
                      href={homeDefaults.heroButton2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="v2-modern-btn inline-flex items-center justify-center gap-3 border-2 border-[#1e3149] hover:bg-[#1e3149] hover:text-white text-[#1e3149] text-lg font-semibold px-8 h-[62px] rounded-2xl transition-all"
                    >
                      {homeDefaults.heroButton2Text}
                    </a>
                  ) : (
                    <Link
                      href={homeDefaults.heroButton2Link}
                      className="v2-modern-btn inline-flex items-center justify-center gap-3 border-2 border-[#1e3149] hover:bg-[#1e3149] hover:text-white text-[#1e3149] text-lg font-semibold px-8 h-[62px] rounded-2xl transition-all"
                    >
                      {homeDefaults.heroButton2Text}
                    </Link>
                  )}
                </div>

                <div className="mt-8 flex items-center gap-4 text-sm">
                  <div className="flex items-center -space-x-2">
                    <span className="w-7 h-7 bg-[#1e3149] rounded-full ring-2 ring-[#f8f5f0]" />
                    <span className="w-7 h-7 bg-[#b85c3a] rounded-full ring-2 ring-[#f8f5f0]" />
                    <span className="w-7 h-7 bg-[#4a5568] rounded-full ring-2 ring-[#f8f5f0]" />
                  </div>
                  <p className="text-[#5c6b7a]">
                    <span className="font-semibold text-[#1e3149]">1,000+ families</span>{" "}
                    have trusted Summit
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Hero visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center bg-[#f8f5f0] lg:rounded-l-3xl overflow-hidden px-6 lg:px-8 py-8 lg:py-12">
              <img
                src="/v2-hero.jpeg"
                alt="Summit portable building"
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* TRUST / STATS BAR */}
      <div className="border-y border-[#e5e0d8] bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 py-8 lg:py-7 text-center lg:text-left">
            <div>
              <div className="text-3xl font-semibold text-[#1e3149] tabular-nums">1,000+</div>
              <div className="text-sm text-[#5c6b7a] mt-0.5">Buildings Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-[#1e3149]">5</div>
              <div className="text-sm text-[#5c6b7a] mt-0.5">Up to 5-Year Warranty</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-[#1e3149]">Family Owned</div>
              <div className="text-sm text-[#5c6b7a] mt-0.5">Since 2016</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-[#1e3149]">Free Delivery</div>
              <div className="text-sm text-[#5c6b7a] mt-0.5">Within 50 miles from Farmington</div>
            </div>
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <div className="flex lg:justify-start justify-center items-baseline gap-2">
                <div className="text-3xl font-semibold text-[#1e3149]">4</div>
                <div className="text-[#b85c3a] text-sm font-bold tracking-widest">STATES</div>
              </div>
              <div className="text-sm text-[#5c6b7a]">MO • IL • KY • AR</div>
            </div>
          </div>
        </div>
      </div>

      {/* WE UNDERSTAND — live content in V2 layout */}
      <section className="max-w-screen-2xl mx-auto py-20 px-6 lg:px-12">
        <div className="max-w-3xl">
          <div className="text-[#b85c3a] font-semibold tracking-[2px] text-sm uppercase">
            {homeDefaults.stakesTagline}
          </div>
          <h2 className="v2-heading text-4xl sm:text-5xl lg:text-6xl tracking-[-2.4px] font-bold mt-2">
            {homeDefaults.stakesHeading}
          </h2>
          <p className="mt-4 text-xl text-[#4a5568]">
            {homeDefaults.stakesSubheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {homeDefaults.stakesPainPoints.map((point, i) => {
            const Icon = STAKES_ICONS[i] || Package;
            return (
              <div
                key={i}
                className="v2-value-prop bg-white border border-[#e5e0d8] rounded-3xl p-7"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#b85c3a]/10 text-[#b85c3a] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-semibold text-2xl tracking-tight text-[#1e3149]">
                  {point.title}
                </div>
                <p className="mt-3 text-[#4a5568] leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-xl text-[#b85c3a] font-semibold">
          {homeDefaults.stakesClosingText}
        </p>
      </section>

      {/* FIND YOUR STYLE — new V2 section */}
      <section id="styles" className="max-w-screen-2xl mx-auto pt-12 pb-14 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <div className="text-[#b85c3a] font-semibold tracking-[2px] text-sm">
              FIND YOUR STYLE
            </div>
            <h2 className="v2-heading text-4xl sm:text-5xl lg:text-6xl tracking-[-2.4px] font-bold mt-1">
              Choose the perfect building
            </h2>
          </div>
          <p className="text-xl text-[#4a5568] max-w-md mt-4 md:mt-0 md:text-right">
            Every style is fully customizable in our 3D configurator.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => {
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={`px-5 h-10 rounded-2xl text-sm font-semibold border transition-colors ${
                  active
                    ? "bg-[#1e3149] text-white border-[#1e3149]"
                    : "border-[#d4c9b8] hover:border-[#1e3149] bg-white text-[#1e3149]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className="v2-building-card group bg-white rounded-3xl overflow-hidden border border-[#e5e0d8]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f1e9df]">
                <img
                  src={card.image}
                  alt={`${card.name} portable building`}
                  className="v2-building-image w-full h-full object-cover"
                />
                {card.badge && (
                  <div
                    className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow ${
                      card.badge.tone === "popular"
                        ? "bg-white/95 text-[#1e3149]"
                        : "bg-emerald-700 text-white"
                    }`}
                  >
                    {card.badge.label}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="font-semibold text-2xl tracking-tight text-[#1e3149]">
                  {card.name}
                </div>
                <div className="text-[#5c6b7a]">{card.subtitle}</div>
                <p className="text-sm text-[#4a5568] mt-3 leading-snug">{card.blurb}</p>
                <div className="mt-5 flex gap-3">
                  <Link
                    href={card.href}
                    className="flex-1 text-center text-sm font-semibold border border-[#d4c9b8] hover:bg-[#f8f5f0] py-3 rounded-2xl transition"
                  >
                    Explore
                  </Link>
                  <a
                    href="https://summitbuildings.shedpro.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-semibold bg-[#b85c3a] text-white py-3 rounded-2xl hover:bg-[#a14f32] transition"
                  >
                    Configure
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-9">
          <Link
            href="/styles"
            className="inline-flex items-center text-[#b85c3a] font-semibold hover:underline"
          >
            View the complete collection and all options →
          </Link>
        </div>
      </section>

      {/* YOUR GUIDE — live content in V2 layout */}
      <section className="bg-white border-y border-[#e5e0d8]">
        <div className="max-w-screen-2xl mx-auto py-20 px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="text-[#b85c3a] font-semibold tracking-[2px] text-sm uppercase">
                {homeDefaults.guideTagline}
              </div>
              <h2 className="v2-heading text-4xl sm:text-5xl lg:text-6xl tracking-[-2.4px] font-bold mt-2">
                {homeDefaults.guideHeading}
              </h2>
              <p className="mt-6 text-xl text-[#1e3149] font-semibold">
                {homeDefaults.guideParagraph1}
              </p>
              <p className="mt-4 text-lg text-[#4a5568] leading-relaxed">
                {homeDefaults.guideParagraph2}
              </p>
              <p className="mt-4 text-lg text-[#4a5568] leading-relaxed">
                {homeDefaults.guideParagraph3}
              </p>
              <p className="mt-4 text-lg text-[#4a5568] leading-relaxed">
                {homeDefaults.guideParagraph4}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                {homeDefaults.guideStats.map((stat, i) => (
                  <div key={i} className="bg-[#f8f5f0] rounded-2xl p-5">
                    <div className="text-3xl font-bold text-[#1e3149] tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#5c6b7a] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {homeDefaults.guideCredentials.map((cred, i) => (
                  <div
                    key={i}
                    className="bg-[#f8f5f0] rounded-2xl p-6 border border-[#e5e0d8]"
                  >
                    <div className="font-mono text-xs tracking-[2px] text-[#b85c3a] uppercase">
                      {cred.sublabel}
                    </div>
                    <div className="font-semibold text-xl mt-2 text-[#1e3149]">
                      {cred.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SUMMIT STANDARD — new V2 section */}
      <section id="standard" className="bg-[#1e3149] py-20 text-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <div className="uppercase tracking-[3px] text-[#b85c3a] text-sm font-semibold">
              The Summit Standard
            </div>
            <h2 className="v2-heading text-white text-4xl sm:text-5xl lg:text-6xl tracking-[-2.6px] leading-none mt-3 font-bold">
              We build buildings that last a lifetime.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="v2-value-prop bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-7 backdrop-blur">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <Hammer className="w-6 h-6" />
              </div>
              <div className="font-semibold text-2xl tracking-tight">Premium Materials</div>
              <p className="mt-3 text-white/70">
                LP SmartSide or metal siding, 29-gauge steel roofing, and 3/4&quot; tongue
                and groove floors.
              </p>
            </div>
            <div className="v2-value-prop bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-7 backdrop-blur">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <Home className="w-6 h-6" />
              </div>
              <div className="font-semibold text-2xl tracking-tight">Master Craftsmen</div>
              <p className="mt-3 text-white/70">
                Every building is hand-built by skilled Missouri craftsmen with decades of
                experience.
              </p>
            </div>
            <div className="v2-value-prop bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-7 backdrop-blur">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <div className="font-semibold text-2xl tracking-tight">
                Up to 5-Year Warranty
              </div>
              <p className="mt-3 text-white/70">
                Fully transferable warranty on structure and siding. We stand behind every
                building we deliver.
              </p>
            </div>
            <div className="v2-value-prop bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-7 backdrop-blur">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <div className="font-semibold text-2xl tracking-tight">
                Delivered &amp; Set Up
              </div>
              <p className="mt-3 text-white/70">
                Our crew brings it to your property, levels it, and leaves it ready to use.
                Free within 50 miles from Farmington.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — new V2 section */}
      <section id="process" className="max-w-screen-2xl mx-auto py-20 px-6 lg:px-12">
        <div className="text-center mb-12">
          <div className="text-[#b85c3a] tracking-[2px] font-semibold text-sm">
            THREE SIMPLE STEPS
          </div>
          <h2 className="v2-heading text-4xl sm:text-5xl lg:text-6xl tracking-[-2.4px] mt-2 font-bold">
            Getting your building is easy
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              n: 1,
              title: "Design It Online",
              desc:
                "Use our powerful 3D configurator to choose style, size, colors, doors, windows, and upgrades. See live pricing in real time.",
            },
            {
              n: 2,
              title: "We Build It",
              desc:
                "Our craftsmen hand-build your building using premium materials. Every structure is inspected before it leaves our shop.",
            },
            {
              n: 3,
              title: "We Deliver & Set Up",
              desc:
                "We bring it to your property, set it perfectly level, and walk you through everything. Ready the same day.",
            },
          ].map((step) => (
            <div key={step.n} className="v2-process-step relative">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-[#f8f5f0] text-[#1e3149] flex items-center justify-center text-3xl font-bold border border-[#e5e0d8]">
                  {step.n}
                </div>
                <div className="font-semibold text-2xl tracking-tight">{step.title}</div>
              </div>
              <p className="mt-4 pl-[72px] text-[#4a5568]">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://summitbuildings.shedpro.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-modern-btn inline-flex items-center gap-3 bg-[#b85c3a] text-white font-semibold px-8 h-14 rounded-2xl text-lg"
          >
            Start Your 3D Design Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* STORIES — new V2 section */}
      <section id="stories" className="bg-white py-20 border-y border-[#e5e0d8]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">
            <div>
              <div className="text-[#b85c3a] font-semibold tracking-widest text-sm">
                REAL FAMILIES. REAL RESULTS.
              </div>
              <h2 className="v2-heading text-4xl sm:text-5xl tracking-[-2px] mt-2 font-bold">
                What our customers say
              </h2>
            </div>
            <Link
              href="/gallery"
              className="mt-3 lg:mt-0 text-sm font-semibold text-[#b85c3a] hover:underline"
            >
              See more projects →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((t) => (
              <div key={t.id} className="bg-[#f8f5f0] rounded-3xl p-8 relative">
                <Quote className="w-8 h-8 text-[#d4c9b8] absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#b85c3a] fill-[#b85c3a]"
                    />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-[#2c3a4d]">{t.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#d4c9b8] rounded-full flex items-center justify-center text-xs font-bold text-[#1e3149]">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-[#b85c3a] font-medium">
                      {t.source || "Google Review"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA — new V2 section */}
      <section className="max-w-screen-2xl mx-auto py-20 px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-x-12 items-center">
          <div className="lg:col-span-5">
            <div className="text-[#b85c3a] text-sm tracking-[2px] font-semibold">
              WE COME TO YOU
            </div>
            <h3 className="v2-heading text-4xl sm:text-5xl tracking-[-2.2px] leading-none mt-3 font-bold">
              Proudly serving four states
            </h3>

            <div className="mt-8 space-y-2 text-lg">
              <div className="flex items-center gap-3">
                <span className="font-semibold w-8">MO</span>
                <span className="text-[#5c6b7a]">Missouri — our home base</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold w-8">IL</span>
                <span className="text-[#5c6b7a]">Southern Illinois</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold w-8">KY</span>
                <span className="text-[#5c6b7a]">Western Kentucky</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold w-8">AR</span>
                <span className="text-[#5c6b7a]">Northeast Arkansas</span>
              </div>
            </div>

            <p className="mt-6 text-[#5c6b7a]">
              Free delivery and professional setup within 50 miles from Farmington.
            </p>
          </div>

          <div className="lg:col-span-7 mt-10 lg:mt-0">
            <div className="bg-white border border-[#e5e0d8] rounded-3xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="font-mono text-xs tracking-[3px] text-[#b85c3a]">
                  FREE DELIVERY
                </div>
                <div className="font-semibold text-3xl mt-1">50 mi</div>
                <div className="text-sm mt-1 text-[#5c6b7a]">From Farmington, MO</div>
              </div>
              <div>
                <div className="font-mono text-xs tracking-[3px] text-[#b85c3a]">
                  OUTSIDE RADIUS?
                </div>
                <div className="font-semibold text-3xl mt-1">Available</div>
                <div className="text-sm mt-1 text-[#5c6b7a]">Delivery fee quoted</div>
              </div>
              <div>
                <div className="font-mono text-xs tracking-[3px] text-[#b85c3a]">
                  ON-SITE
                </div>
                <div className="font-semibold text-3xl mt-1">Setup</div>
                <div className="text-sm mt-1 text-[#5c6b7a]">Included at no extra cost</div>
              </div>
              <div>
                <div className="font-mono text-xs tracking-[3px] text-[#b85c3a]">
                  NEXT STEPS
                </div>
                <a
                  href="#styles"
                  className="inline-block mt-2 text-[#b85c3a] font-semibold underline decoration-1 underline-offset-4"
                >
                  Browse styles →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGINE THIS — live content in V2 layout */}
      <section className="bg-[#f8f5f0] py-20 border-t border-[#e5e0d8]">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-[#b85c3a] font-semibold tracking-[2px] text-sm uppercase">
              {homeDefaults.imagineTagline}
            </div>
            <h2 className="v2-heading text-4xl sm:text-5xl lg:text-6xl tracking-[-2.4px] mt-2 font-bold">
              {homeDefaults.imagineHeading}
            </h2>
            <p className="mt-5 text-lg text-[#4a5568]">
              {homeDefaults.imagineSubheading}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {homeDefaults.imagineBenefits.map((benefit, i) => {
              const Icon = IMAGINE_ICONS[i] || Car;
              return (
                <div
                  key={i}
                  className="v2-value-prop flex items-center gap-4 bg-white rounded-2xl p-6 border border-[#e5e0d8]"
                >
                  <div className="w-12 h-12 bg-[#b85c3a]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#b85c3a]" />
                  </div>
                  <p className="text-[#1e3149] font-medium leading-snug">{benefit}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA — new V2 section */}
      <div className="bg-[#1e3149] py-16 text-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="v2-heading text-3xl sm:text-4xl lg:text-5xl tracking-[-1.6px] font-bold leading-tight">
              Ready to get the space you actually need?
            </h3>
            <p className="mt-4 text-xl text-white/70">
              Talk to a real person who knows buildings. Or jump straight into the 3D builder.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5737474700"
                className="v2-modern-btn inline-flex items-center justify-center gap-3 border-2 border-white/70 hover:bg-white hover:text-[#1e3149] font-semibold text-lg h-[58px] px-8 rounded-2xl transition"
              >
                <Phone className="w-5 h-5" />
                Call (573) 747-4700
              </a>
              <a
                href="https://summitbuildings.shedpro.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="v2-modern-btn inline-flex items-center justify-center gap-3 bg-[#b85c3a] hover:bg-[#a14f32] font-semibold text-lg h-[58px] px-10 rounded-2xl"
              >
                Launch the 3D Configurator
              </a>
            </div>

            <p className="mt-6 text-xs text-white/50 tracking-wider">
              NO CREDIT CHECK FINANCING AVAILABLE • 5-YEAR WARRANTY • BUILT IN MISSOURI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
