import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PipelineVisualizer } from "@/components/pipeline-visualizer";
import { LogViewer } from "@/components/log-viewer";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RefreshCw } from "lucide-react";

export default function Pipeline() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pipeline Status</h1>
            <p className="text-muted-foreground mt-1">
              Real-time view of the automation workflow.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Pause className="h-4 w-4" />
              Pause Schedule
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Play className="h-4 w-4" />
              Run Pipeline Now
            </Button>
          </div>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-primary">System Active</h3>
              <p className="text-sm text-muted-foreground">
                Next automated run scheduled for <span className="font-mono font-medium text-foreground">09:00 PST</span>
              </p>
            </div>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">
              Standing By
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Execution Visualizer</CardTitle>
            <CardDescription>Visual flow of data from RSS to Instagram</CardDescription>
          </CardHeader>
          <CardContent>
            <PipelineVisualizer />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Execution Logs</h3>
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground">
              <RefreshCw className="h-3 w-3" />
              Refresh
            </Button>
          </div>
          <LogViewer />
        </div>
      </div>
    </Layout>
  );
}