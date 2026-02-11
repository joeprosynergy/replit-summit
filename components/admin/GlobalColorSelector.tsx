"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, Palette } from 'lucide-react';
import { useGlobalColors } from '@/hooks/useGlobalColors';
import { GlobalColor } from '@/shared/globalColorsSchema';

interface GlobalColorSelectorProps {
  selectedColorId?: string;
  onSelectColor: (colorId: string) => void;
}

export function GlobalColorSelector({ selectedColorId, onSelectColor }: GlobalColorSelectorProps) {
  const { colors, isLoading } = useGlobalColors();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filterColors = (category: string) => {
    return colors
      .filter(c => c.category === category)
      .filter(c => searchTerm === '' || c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const handleSelect = (color: GlobalColor) => {
    onSelectColor(color.id);
    setIsOpen(false);
  };

  const handleRadioChange = (colorId: string) => {
    const color = colors.find(c => c.id === colorId);
    if (color) handleSelect(color);
  };

  const selectedColor = colors.find(c => c.id === selectedColorId);

  if (isLoading) {
    return <Button variant="outline" size="sm" disabled>Loading colors...</Button>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="w-4 h-4 mr-2" />
          {selectedColor ? `Global: ${selectedColor.name}` : 'Select Global Color'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select from Global Color Palette</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Search Colors</Label>
            <Input
              id="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="paint">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="paint">Paint</TabsTrigger>
              <TabsTrigger value="metal">Metal</TabsTrigger>
              <TabsTrigger value="urethane">Urethane</TabsTrigger>
              <TabsTrigger value="vinyl">Vinyl</TabsTrigger>
            </TabsList>

            <TabsContent value="paint" className="space-y-2">
              <RadioGroup value={selectedColorId} onValueChange={handleRadioChange}>
                <div className="grid grid-cols-2 gap-3">
                  {filterColors('paint').map((color) => (
                    <div
                      key={color.id}
                      className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-accent ${
                        selectedColorId === color.id ? 'border-primary bg-accent' : 'border-border'
                      }`}
                      onClick={() => handleSelect(color)}
                    >
                      <RadioGroupItem value={color.id} id={color.id} />
                      {color.image ? (
                        <div className="w-10 h-10 rounded border-2 border-border overflow-hidden flex-shrink-0">
                          <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded border-2 border-border flex-shrink-0"
                          style={{ backgroundColor: color.color }}
                        />
                      )}
                      <Label htmlFor={color.id} className="cursor-pointer flex-1">
                        {color.name}
                      </Label>
                      {selectedColorId === color.id && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </TabsContent>

            <TabsContent value="metal" className="space-y-2">
              <RadioGroup value={selectedColorId} onValueChange={handleRadioChange}>
                <div className="grid grid-cols-2 gap-3">
                  {filterColors('metal').map((color) => (
                    <div
                      key={color.id}
                      className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-accent ${
                        selectedColorId === color.id ? 'border-primary bg-accent' : 'border-border'
                      }`}
                      onClick={() => handleSelect(color)}
                    >
                      <RadioGroupItem value={color.id} id={color.id} />
                      {color.image ? (
                        <div className="w-10 h-10 rounded border-2 border-border overflow-hidden flex-shrink-0">
                          <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded border-2 border-border flex-shrink-0"
                          style={{ backgroundColor: color.color }}
                        />
                      )}
                      <Label htmlFor={color.id} className="cursor-pointer flex-1">
                        {color.name}
                      </Label>
                      {selectedColorId === color.id && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </TabsContent>

            <TabsContent value="urethane" className="space-y-2">
              <RadioGroup value={selectedColorId} onValueChange={handleRadioChange}>
                <div className="grid grid-cols-2 gap-3">
                  {filterColors('urethane').map((color) => (
                    <div
                      key={color.id}
                      className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-accent ${
                        selectedColorId === color.id ? 'border-primary bg-accent' : 'border-border'
                      }`}
                      onClick={() => handleSelect(color)}
                    >
                      <RadioGroupItem value={color.id} id={color.id} />
                      {color.image ? (
                        <div className="w-10 h-10 rounded border-2 border-border overflow-hidden flex-shrink-0">
                          <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded border-2 border-border flex-shrink-0"
                          style={{ backgroundColor: color.color }}
                        />
                      )}
                      <Label htmlFor={color.id} className="cursor-pointer flex-1">
                        {color.name}
                      </Label>
                      {selectedColorId === color.id && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </TabsContent>

            <TabsContent value="vinyl" className="space-y-2">
              <RadioGroup value={selectedColorId} onValueChange={handleRadioChange}>
                <div className="grid grid-cols-2 gap-3">
                  {filterColors('vinyl').map((color) => (
                    <div
                      key={color.id}
                      className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-accent ${
                        selectedColorId === color.id ? 'border-primary bg-accent' : 'border-border'
                      }`}
                      onClick={() => handleSelect(color)}
                    >
                      <RadioGroupItem value={color.id} id={color.id} />
                      {color.image ? (
                        <div className="w-10 h-10 rounded border-2 border-border overflow-hidden flex-shrink-0">
                          <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded border-2 border-border flex-shrink-0"
                          style={{ backgroundColor: color.color }}
                        />
                      )}
                      <Label htmlFor={color.id} className="cursor-pointer flex-1">
                        {color.name}
                      </Label>
                      {selectedColorId === color.id && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
