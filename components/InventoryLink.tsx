"use client";

import { ReactNode } from 'react';

interface InventoryLinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const LOTLINE_INVENTORY_URL = 'https://lotoffice.app/t/summit/inventory';

/**
 * A Link component that navigates directly to Lotline inventory in a new tab.
 */
const InventoryLink = ({ children, className, onClick }: InventoryLinkProps) => {
  return (
    <a
      href={LOTLINE_INVENTORY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default InventoryLink;
