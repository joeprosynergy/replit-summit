"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export function AdminNavLink() {
  const { isAdmin } = useAdminAuth();
  const pathname = usePathname();
  
  if (!isAdmin) return null;
  
  if (pathname === '/admin' || pathname === '/admin/login') return null;

  return (
    <Link
      href="/admin"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg hover:brightness-110 transition-all"
      data-testid="admin-nav-link"
    >
      <Settings className="w-4 h-4" />
      Admin
    </Link>
  );
}
