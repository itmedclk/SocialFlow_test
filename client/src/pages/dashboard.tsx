import { Layout } from "@/components/layout";
import { PipelineVisualizer } from "@/components/pipeline-visualizer";
import { LogViewer } from "@/components/log-viewer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpRight, 
  CalendarDays, 
  CheckCircle2, 
  AlertTriangle,
  FileCheck,
  Instagram,
  RefreshCw,
  Clock
} from "lucide-react";

export default function Dashboard() {
  return (
    <Layout>
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitoring automated workflow for "Alternative Health News"
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileCheck className="h-4 w-4" />
            View Audit Log
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/25">
            <RefreshCw className="h-4 w-4" />
            Trigger Run Now
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur shadow-sm hover:shadow-md transition-all border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Schedule</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">09:00 PST</div>
            <p className="text-xs text-muted-foreground mt-1">in 14 hours 32 mins</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur shadow-sm hover:shadow-md transition-all border-emerald-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">98.5%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur shadow-sm hover:shadow-md transition-all border-indigo-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Posts Created</CardTitle>
            <Instagram className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">342</div>
            <p className="text-xs text-muted-foreground mt-1">Total automated posts</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur shadow-sm hover:shadow-md transition-all border-amber-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Safety Flags</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">Posts blocked this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Pipeline View */}
      <Card className="border-border/60 shadow-lg">
        <CardHeader>
          <CardTitle>Live Execution Status</CardTitle>
          <CardDescription>Visualizing current workflow steps and node status</CardDescription>
        </CardHeader>
        <CardContent className="px-0 md:px-6">
          <PipelineVisualizer />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">System Logs</h3>
            <Badge variant="outline" className="font-mono text-xs">ID: run_8f3d2a1</Badge>
          </div>
          <LogViewer />
        </div>

        {/* Generated Content Preview */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Content Preview</h3>
          <Card className="overflow-hidden border-border/60 shadow-md">
            <div className="relative aspect-square w-full bg-muted">
              <img 
                src="/sample-post.jpg" 
                alt="Post Preview" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded-md">
                Pending Approval
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="text-xs font-normal bg-blue-50 text-blue-700 border-blue-100">
                  Healthy Lifestyle
                </Badge>
                <span className="text-xs text-muted-foreground">1,450 chars</span>
              </div>
              <p className="text-sm text-foreground/80 line-clamp-4 leading-relaxed">
                ✨ Discover the power of mindfulness in your daily routine. Recent studies suggest that just 10 minutes a day can significantly reduce stress levels...
                <br/><br/>
                This content is for informational purposes only and is not medical advice.
              </p>
              <div className="pt-2 flex flex-wrap gap-1">
                {["#mindfulness", "#health", "#wellness", "#holistic"].map(tag => (
                  <span key={tag} className="text-xs text-blue-600 font-medium">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}