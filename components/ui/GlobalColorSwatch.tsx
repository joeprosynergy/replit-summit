import { useGlobalColors } from '@/hooks/useGlobalColors';
import { ColorSwatch as ColorSwatchType } from '@/data/defaults/productPageTypes';

interface GlobalColorSwatchProps {
  swatch: ColorSwatchType;
  categoryId?: string;
  variant?: 'default' | 'small' | 'inline';
}

/**
 * GlobalColorSwatch - Displays a color swatch that automatically uses global colors
 * 
 * Priority for color resolution:
 * 1. If swatch has globalColorId, use that global color
 * 2. If swatch has a name, try to find matching global color by name (and category if provided)
 * 3. Fall back to local swatch color/name
 * 
 * This ensures product pages automatically display global colors when available,
 * while still supporting custom override colors.
 */
export function GlobalColorSwatch({ swatch, categoryId, variant = 'default' }: GlobalColorSwatchProps) {
  const { getColorById, colors } = useGlobalColors();
  
  // Resolve color: prefer globalColorId, then try to match by name from global palette
  let displayColor = swatch.globalColorId ? getColorById(swatch.globalColorId) : null;
  
  // If no globalColorId but has a name, try to find matching global color
  if (!displayColor && swatch.name) {
    const normalizedName = swatch.name.toLowerCase().trim();
    displayColor = colors.find(c => {
      const nameMatches = c.name.toLowerCase().trim() === normalizedName;
      // If categoryId provided, match category too (paint, metal, urethane, vinyl)
      if (categoryId && nameMatches) {
        return c.category === categoryId;
      }
      return nameMatches;
    });
  }
  
  // Fall back to local swatch data if no global match
  const name = displayColor?.name || swatch.name || 'Unknown';
  const color = displayColor?.color || swatch.color || '#808080';
  const image = displayColor?.image || swatch.image;
  
  if (variant === 'small') {
    return (
      <div className="flex items-center gap-2">
        {image ? (
          <div className="w-6 h-6 rounded-full border border-border shadow-sm overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className="w-6 h-6 rounded-full border border-border shadow-sm"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="text-sm text-muted-foreground">{name}</span>
      </div>
    );
  }
  
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        {image ? (
          <div className="w-4 h-4 rounded-full border border-border overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="text-xs text-muted-foreground">{name}</span>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="flex flex-col items-center gap-2">
      {image ? (
        <div className="w-16 h-16 rounded-full border-4 border-card shadow-md overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="w-16 h-16 rounded-full border-4 border-card shadow-md"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="text-xs text-muted-foreground text-center leading-tight max-w-[70px]">
        {name}
      </span>
    </div>
  );
}

/**
 * Simple color swatch that just takes name and color directly.
 * Still tries to match with global colors by name.
 */
export function SimpleColorSwatch({ 
  name, 
  color, 
  categoryId,
  variant = 'default' 
}: { 
  name: string; 
  color: string; 
  categoryId?: string;
  variant?: 'default' | 'small' | 'inline';
}) {
  return (
    <GlobalColorSwatch 
      swatch={{ name, color }} 
      categoryId={categoryId}
      variant={variant}
    />
  );
}

export default GlobalColorSwatch;
