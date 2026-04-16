"use client";

import { ReactNode } from 'react';

interface InventoryLinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const SHEDSUITE_INVENTORY_URL = 'https://summitportablebuildings.shedsuite.com/821';

/**
 * A Link component that navigates directly to the ShedSuite inventory website in a new tab.
 */
const InventoryLink = ({ children, className, onClick }: InventoryLinkProps) => {
  return (
    <a
      href={SHEDSUITE_INVENTORY_URL}
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
