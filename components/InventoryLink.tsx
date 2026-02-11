"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface InventoryLinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A Link component that navigates to /inventory while passing the current path as state
 * so the back button on the inventory page can return to the correct page.
 */
const InventoryLink = ({ children, className, onClick }: InventoryLinkProps) => {
  const pathname = usePathname();
  
  return (
    <Link 
      href={pathname ? `/inventory?from=${encodeURIComponent(pathname)}` : '/inventory'}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default InventoryLink;
