/**
 * Global Colors Schema
 * Centralized color palette that can be referenced across all pages
 */

export interface GlobalColor {
  id: string;
  name: string;
  color: string; // Hex color code
  image?: string; // Optional image URL
  category: string; // e.g., "paint", "metal", "shingles"
}

export interface GlobalColorsConfig {
  colors: GlobalColor[];
}

export const defaultGlobalColors: GlobalColorsConfig = {
  colors: [
    // Paint Colors
    { id: 'paint-white', name: 'White', color: '#FFFFFF', category: 'paint' },
    { id: 'paint-clay', name: 'Clay', color: '#C4A586', category: 'paint' },
    { id: 'paint-buckskin', name: 'Buckskin', color: '#D4B896', category: 'paint' },
    { id: 'paint-utility-brown', name: 'Utility Brown', color: '#8B6F47', category: 'paint' },
    { id: 'paint-durango', name: 'Durango', color: '#A67C52', category: 'paint' },
    { id: 'paint-forest-green', name: 'Forest Green', color: '#2E4A2E', category: 'paint' },
    { id: 'paint-barn-red', name: 'Barn Red', color: '#8B3A3A', category: 'paint' },
    { id: 'paint-slate-blue', name: 'Slate Blue', color: '#6B7F99', category: 'paint' },
    { id: 'paint-charcoal', name: 'Charcoal', color: '#3C3C3C', category: 'paint' },
    
    // Metal Colors
    { id: 'metal-white', name: 'White', color: '#F5F5F5', category: 'metal' },
    { id: 'metal-light-stone', name: 'Light Stone', color: '#D4C4B0', category: 'metal' },
    { id: 'metal-clay', name: 'Clay', color: '#C4A586', category: 'metal' },
    { id: 'metal-pewter-gray', name: 'Pewter Gray', color: '#8B8680', category: 'metal' },
    { id: 'metal-charcoal', name: 'Charcoal', color: '#3C3C3C', category: 'metal' },
    { id: 'metal-black', name: 'Black', color: '#1A1A1A', category: 'metal' },
    { id: 'metal-barn-red', name: 'Barn Red', color: '#8B3A3A', category: 'metal' },
    
    // Urethane Stains
    { id: 'urethane-golden-oak', name: 'Golden Oak', color: '#C19A6B', category: 'urethane' },
    { id: 'urethane-natural-cedar', name: 'Natural Cedar', color: '#A87B5B', category: 'urethane' },
    { id: 'urethane-chestnut', name: 'Chestnut', color: '#954535', category: 'urethane' },
    { id: 'urethane-mesquite', name: 'Mesquite', color: '#8B6F47', category: 'urethane' },
    { id: 'urethane-red-mahogany', name: 'Red Mahogany', color: '#6B3434', category: 'urethane' },
    { id: 'urethane-coffee', name: 'Coffee', color: '#4A3426', category: 'urethane' },
    { id: 'urethane-dark-walnut', name: 'Dark Walnut', color: '#3E2A23', category: 'urethane' },
    
    // Vinyl Colors
    { id: 'vinyl-white', name: 'White', color: '#FFFFFF', category: 'vinyl' },
    { id: 'vinyl-almond', name: 'Almond', color: '#EFDECD', category: 'vinyl' },
    { id: 'vinyl-clay', name: 'Clay', color: '#C4A586', category: 'vinyl' },
    { id: 'vinyl-gray', name: 'Gray', color: '#808080', category: 'vinyl' },
    { id: 'vinyl-pewter', name: 'Pewter', color: '#8B8680', category: 'vinyl' },
    { id: 'vinyl-brown', name: 'Brown', color: '#6B4423', category: 'vinyl' },
    { id: 'vinyl-black', name: 'Black', color: '#1A1A1A', category: 'vinyl' },
  ]
};
