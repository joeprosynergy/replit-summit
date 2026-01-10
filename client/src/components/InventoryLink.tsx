import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  
  return (
    <Link 
      to="/inventory" 
      state={{ from: location.pathname }}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default InventoryLink;
