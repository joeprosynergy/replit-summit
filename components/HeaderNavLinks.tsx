"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { NavLink } from '@/shared/navigationSchema';
import { prefetchForRoute } from '@/lib/prefetchHints';
import { cn } from '@/lib/utils';

interface HeaderNavLinksProps {
  navLinks: NavLink[];
  useLightText: boolean;
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

function linkClass(useLightText: boolean, extra?: string) {
  return cn(
    'font-medium transition-colors duration-200',
    useLightText
      ? 'text-primary-foreground/90 hover:text-secondary-foreground'
      : 'text-foreground/80 hover:text-secondary',
    extra
  );
}

function NavLeaf({
  link,
  useLightText,
  onNavigate,
  className,
}: {
  link: NavLink;
  useLightText: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  if (link.isGroupLabel || link.disabled) {
    return null;
  }

  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className ?? linkClass(useLightText)}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className ?? linkClass(useLightText)}
      onClick={onNavigate}
      onMouseEnter={() => prefetchForRoute(link.href)}
    >
      {link.label}
    </Link>
  );
}

function DesktopDropdown({
  link,
  useLightText,
}: {
  link: NavLink;
  useLightText: boolean;
}) {
  const children = link.children ?? [];
  const triggerClass = linkClass(useLightText, 'inline-flex items-center gap-1 py-2');

  return (
    <div className="relative group">
      <Link href={link.href} className={triggerClass} onMouseEnter={() => prefetchForRoute(link.href)}>
        {link.label}
        <ChevronDown className="w-4 h-4 opacity-70 transition-transform group-hover:rotate-180" />
      </Link>
      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
        <div className="min-w-[220px] rounded-md border border-border bg-card shadow-lg py-2">
          {children.map((child) =>
            child.isGroupLabel ? (
              <div
                key={child.id}
                className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {child.label}
              </div>
            ) : (
              <NavLeaf
                key={child.id}
                link={child}
                useLightText={false}
                className="block px-4 py-2 text-sm text-foreground/80 hover:text-secondary hover:bg-muted"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function MobileSection({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const children = link.children ?? [];

  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-foreground/80 hover:bg-muted"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium">{link.label}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="pb-2">
          {children.map((child) =>
            child.isGroupLabel ? (
              <div
                key={child.id}
                className="px-6 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {child.label}
              </div>
            ) : (
              <NavLeaf
                key={child.id}
                link={child}
                useLightText={false}
                onNavigate={onNavigate}
                className="block px-6 py-2 text-sm text-foreground/70 hover:text-secondary hover:bg-muted"
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function HeaderNavLinks({
  navLinks,
  useLightText,
  variant,
  onNavigate,
}: HeaderNavLinksProps) {
  if (variant === 'desktop') {
    return (
      <>
        {navLinks.map((link) =>
          link.children && link.children.length > 0 ? (
            <DesktopDropdown key={link.id} link={link} useLightText={useLightText} />
          ) : (
            <NavLeaf key={link.id} link={link} useLightText={useLightText} />
          )
        )}
      </>
    );
  }

  return (
    <>
      {navLinks.map((link) =>
        link.children && link.children.length > 0 ? (
          <MobileSection key={link.id} link={link} onNavigate={onNavigate} />
        ) : (
          <NavLeaf
            key={link.id}
            link={link}
            useLightText={false}
            onNavigate={onNavigate}
            className="block px-4 py-3 text-foreground/80 hover:text-secondary hover:bg-muted border-b border-border/60"
          />
        )
      )}
    </>
  );
}
