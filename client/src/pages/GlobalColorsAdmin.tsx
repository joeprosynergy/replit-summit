import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useGlobalColors } from '@/hooks/useGlobalColors';
import InlineEditableColorSwatch from '@/components/admin/InlineEditableColorSwatch';
import { GlobalColor } from '../../../shared/globalColorsSchema';

export default function GlobalColorsAdmin() {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const { colors, isLoading, isSaving, saveColors } = useGlobalColors();
  const [editedColors, setEditedColors] = useState<GlobalColor[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize editedColors when colors load
  if (!isLoading && editedColors.length === 0) {
    setEditedColors(colors);
  }

  const handleColorChange = (index: number, updates: { name?: string; color?: string; image?: string }) => {
    const newColors = [...editedColors];
    newColors[index] = { ...newColors[index], ...updates };
    setEditedColors(newColors);
    setHasChanges(true);
  };

  const handleAddColor = (category: string) => {
    const newColor: GlobalColor = {
      id: `${category}-${Date.now()}`,
      name: 'New Color',
      color: '#808080',
      category,
    };
    setEditedColors([...editedColors, newColor]);
    setHasChanges(true);
  };

  const handleDeleteColor = (index: number) => {
    const newColors = editedColors.filter((_, i) => i !== index);
    setEditedColors(newColors);
    setHasChanges(true);
  };

  const handleSave = async () => {
    const success = await saveColors(editedColors);
    if (success) {
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    setEditedColors(colors);
    setHasChanges(false);
  };

  const getColorsByCategory = (category: string) => {
    return editedColors.map((color, index) => ({ color, originalIndex: index }))
      .filter(({ color }) => color.category === category);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-padding bg-background">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Global Color Palette</h1>
            <p className="text-muted-foreground">
              Manage colors that appear across all product pages. Changes here will update everywhere the colors are used.
            </p>
          </div>

          {hasChanges && (
            <div className="mb-6 flex gap-4 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}

          <Tabs defaultValue="paint" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="paint">Paint</TabsTrigger>
              <TabsTrigger value="metal">Metal</TabsTrigger>
              <TabsTrigger value="urethane">Urethane</TabsTrigger>
            </TabsList>

            <TabsContent value="paint">
              <Card>
                <CardHeader>
                  <CardTitle>Paint Siding Colors</CardTitle>
                  <CardDescription>Standard paint colors for siding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-6 mb-6">
                    {getColorsByCategory('paint').map(({ color, originalIndex }) => (
                      <InlineEditableColorSwatch
                        key={color.id}
                        name={color.name}
                        color={color.color}
                        image={color.image}
                        onChange={(updates) => handleColorChange(originalIndex, updates)}
                        onDelete={() => handleDeleteColor(originalIndex)}
                        isEditMode={true}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAddColor('paint')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Paint Color
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metal">
              <Card>
                <CardHeader>
                  <CardTitle>Metal Siding Colors</CardTitle>
                  <CardDescription>Standard metal colors for siding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-6 mb-6">
                    {getColorsByCategory('metal').map(({ color, originalIndex }) => (
                      <InlineEditableColorSwatch
                        key={color.id}
                        name={color.name}
                        color={color.color}
                        image={color.image}
                        onChange={(updates) => handleColorChange(originalIndex, updates)}
                        onDelete={() => handleDeleteColor(originalIndex)}
                        isEditMode={true}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAddColor('metal')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Metal Color
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="urethane">
              <Card>
                <CardHeader>
                  <CardTitle>Urethane Stain Colors</CardTitle>
                  <CardDescription>Urethane stain colors for wood siding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-6 mb-6">
                    {getColorsByCategory('urethane').map(({ color, originalIndex }) => (
                      <InlineEditableColorSwatch
                        key={color.id}
                        name={color.name}
                        color={color.color}
                        image={color.image}
                        onChange={(updates) => handleColorChange(originalIndex, updates)}
                        onDelete={() => handleDeleteColor(originalIndex)}
                        isEditMode={true}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleAddColor('urethane')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Urethane Color
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
