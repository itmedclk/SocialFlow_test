import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Save, Globe, Key, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const toggleShowKey = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your API configurations have been securely stored.",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Manage your API connections and automation preferences.
          </p>
        </div>

        <div className="grid gap-6">
          {/* RSS Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Content Source (RSS)</CardTitle>
              </div>
              <CardDescription>
                Define where the application looks for new content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rss-url">Google News RSS Feed URL</Label>
                <Input 
                  id="rss-url" 
                  defaultValue="https://news.google.com/rss/search?q=alternative+health+OR+integrative+medicine&hl=en-US&gl=US&ceid=US:en" 
                  className="font-mono text-xs"
                />
              </div>
              
              <div className="flex items-center justify-between border p-4 rounded-lg bg-muted/20">
                <div className="space-y-0.5">
                  <Label className="text-base">Deduplication</Label>
                  <p className="text-xs text-muted-foreground">
                    Prevent posting the same article URL twice.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                <CardTitle>API Credentials</CardTitle>
              </div>
              <CardDescription>
                Securely store keys for AI generation, Image sources, and Social posting.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* OpenAI Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>AI Content Generation</Label>
                </div>
                
                <div className="grid gap-3">
                  <div className="relative">
                    <Input 
                      type={showKeys['openai'] ? "text" : "password"} 
                      placeholder="OpenAI API Key (sk-...)" 
                      className="pr-10 font-mono"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      onClick={() => toggleShowKey('openai')}
                    >
                      {showKeys['openai'] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Model</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="gpt-4o">GPT-4o (Recommended)</option>
                        <option value="gpt-4-turbo">GPT-4 Turbo</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Temperature</Label>
                      <Input type="number" step="0.1" min="0" max="2" defaultValue="0.7" className="h-10" />
                    </div>
                  </div>

                  <div className="space-y-1 mt-2">
                    <Label className="text-xs text-muted-foreground">Custom System Prompt</Label>
                    <textarea 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="You are an expert social media manager for an alternative health brand..."
                      defaultValue="You are an expert social media manager for an alternative health brand. Rewrite the provided news article into an engaging Instagram caption. Include a disclaimer that this is not medical advice. Use 8-12 hashtags."
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Image Source Section */}
              <div className="space-y-3">
                <Label>Image Source</Label>
                <div className="grid gap-3">
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => setShowKeys(prev => ({ ...prev, unsplash: e.target.value === 'unsplash', pexels: e.target.value === 'pexels' }))}
                  >
                    <option value="wikimedia">Wikimedia Commons (Free/No Key)</option>
                    <option value="unsplash">Unsplash (Requires Key)</option>
                    <option value="pexels">Pexels (Requires Key)</option>
                    <option value="pixabay">Pixabay (Requires Key)</option>
                  </select>

                  <div className="relative">
                    <Input 
                      type={showKeys['image_api'] ? "text" : "password"} 
                      placeholder="Image Service API Key (if required)" 
                      className="pr-10 font-mono"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      onClick={() => toggleShowKey('image_api')}
                    >
                      {showKeys['image_api'] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Postly Section */}
              <div className="space-y-3">
                <Label>Postly API Key (Scheduling)</Label>
                <div className="relative">
                  <Input 
                    type={showKeys['postly'] ? "text" : "password"} 
                    placeholder="postly_..." 
                    className="pr-10 font-mono"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                    onClick={() => toggleShowKey('postly')}
                  >
                    {showKeys['postly'] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Postly Workspace ID</Label>
                <Input placeholder="ws_..." className="font-mono" />
              </div>

            </CardContent>
          </Card>

          {/* Safety Settings */}
          <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/10 dark:bg-amber-900/10">
            <CardHeader>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                <ShieldAlert className="h-5 w-5" />
                <CardTitle>Safety Constraints</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Caption Length</Label>
                  <Input type="number" defaultValue={1900} />
                  <p className="text-[10px] text-muted-foreground">Hard limit for IG safety buffer.</p>
                </div>
                <div className="space-y-2">
                  <Label>Forbidden Terms</Label>
                  <Input defaultValue="cure, miracle, guarantee, treat" />
                  <p className="text-[10px] text-muted-foreground">Comma separated words that trigger a halt.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>

        </div>
      </div>
    </Layout>
  );
}