"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Save, Trash2, Edit, Code, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useCodeSnippets, CodeSnippet } from '@/hooks/useCodeSnippets';

export default function AdminCodeSnippets() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const { snippets, isLoading, isSaving, saveSnippets, addSnippet } = useCodeSnippets();
  const [editedSnippets, setEditedSnippets] = useState<CodeSnippet[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    location: 'head' as CodeSnippet['location'],
    enabled: true,
  });

  // Initialize editedSnippets when snippets load
  useEffect(() => {
    if (!isLoading) {
      setEditedSnippets(snippets);
    }
  }, [isLoading, snippets]);

  const handleSave = async () => {
    const success = await saveSnippets(editedSnippets);
    if (success) {
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    setEditedSnippets(snippets);
    setHasChanges(false);
  };

  const handleToggleEnabled = (id: string) => {
    setEditedSnippets(prev => 
      prev.map(s => s.id === id ? { ...s, enabled: !s.enabled, updatedAt: new Date().toISOString() } : s)
    );
    setHasChanges(true);
  };

  const handleDeleteSnippet = (id: string) => {
    setEditedSnippets(prev => prev.filter(s => s.id !== id));
    setHasChanges(true);
  };

  const openAddDialog = () => {
    setEditingSnippet(null);
    setFormData({
      name: '',
      description: '',
      code: '',
      location: 'head',
      enabled: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (snippet: CodeSnippet) => {
    setEditingSnippet(snippet);
    setFormData({
      name: snippet.name,
      description: snippet.description || '',
      code: snippet.code,
      location: snippet.location,
      enabled: snippet.enabled,
    });
    setIsDialogOpen(true);
  };

  const handleSaveSnippet = () => {
    if (!formData.name || !formData.code) return;

    if (editingSnippet) {
      // Update existing
      setEditedSnippets(prev =>
        prev.map(s =>
          s.id === editingSnippet.id
            ? { ...s, ...formData, updatedAt: new Date().toISOString() }
            : s
        )
      );
    } else {
      // Add new
      const newSnippet = addSnippet(formData);
      setEditedSnippets(prev => [...prev, newSnippet]);
    }

    setHasChanges(true);
    setIsDialogOpen(false);
    setEditingSnippet(null);
  };

  const getLocationLabel = (location: CodeSnippet['location']) => {
    switch (location) {
      case 'head':
        return 'Head (before </head>)';
      case 'body-start':
        return 'Body Start (after <body>)';
      case 'body-end':
        return 'Body End (before </body>)';
      default:
        return location;
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    router.replace("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-padding bg-background">
        <div className="container-custom">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
            <h1 className="text-4xl font-bold mb-2">Code Snippets</h1>
            <p className="text-muted-foreground">
              Add custom code like Google Tag Manager, analytics scripts, or other third-party integrations.
              These snippets will be injected into every page on the site.
            </p>
          </div>

          <div className="mb-6 flex gap-4 justify-between">
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Code Snippet
            </Button>
            
            {hasChanges && (
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </div>

          {editedSnippets.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Code className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No code snippets yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add your first code snippet to get started. Common uses include Google Tag Manager,
                  Facebook Pixel, or custom analytics scripts.
                </p>
                <Button onClick={openAddDialog}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Snippet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {editedSnippets.map((snippet) => (
                <Card key={snippet.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          {snippet.name}
                          {!snippet.enabled && (
                            <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                              Disabled
                            </span>
                          )}
                        </CardTitle>
                        {snippet.description && (
                          <CardDescription className="mt-1">
                            {snippet.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={snippet.enabled}
                          onCheckedChange={() => handleToggleEnabled(snippet.id)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(snippet)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSnippet(snippet.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>Location: {getLocationLabel(snippet.location)}</span>
                      <span>•</span>
                      <span>Last updated: {new Date(snippet.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto max-h-32">
                      <code>{snippet.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Add/Edit Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingSnippet ? 'Edit Code Snippet' : 'Add Code Snippet'}
                </DialogTitle>
                <DialogDescription>
                  Add custom JavaScript, tracking codes, or other scripts to your site.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Google Tag Manager"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of what this code does"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Injection Location *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value: CodeSnippet['location']) =>
                      setFormData(prev => ({ ...prev, location: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head">Head (before &lt;/head&gt;) - For GTM, meta tags</SelectItem>
                      <SelectItem value="body-start">Body Start (after &lt;body&gt;) - For GTM noscript</SelectItem>
                      <SelectItem value="body-end">Body End (before &lt;/body&gt;) - For analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Code *</Label>
                  <Textarea
                    id="code"
                    placeholder="Paste your code here..."
                    className="font-mono text-sm min-h-[200px]"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste the complete code including &lt;script&gt; tags if needed.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="enabled"
                    checked={formData.enabled}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
                  />
                  <Label htmlFor="enabled">Enable this snippet</Label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveSnippet}
                  disabled={!formData.name || !formData.code}
                >
                  {editingSnippet ? 'Update Snippet' : 'Add Snippet'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}
