import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, MoreVertical, Calendar, Globe, Settings2, Clock, Trash2, Edit } from "lucide-react";
import { Link } from "wouter";

interface Campaign {
  id: string;
  name: string;
  topic: string;
  schedule: string;
  status: "active" | "paused";
  lastRun: string;
  nextRun: string;
  sources: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Alternative Health Daily",
    topic: "Health & Wellness",
    schedule: "Daily at 09:00 PST",
    status: "active",
    lastRun: "Today, 09:00 AM",
    nextRun: "Tomorrow, 09:00 AM",
    sources: 3
  },
  {
    id: "2",
    name: "Tech Startup News",
    topic: "Technology",
    schedule: "Weekdays at 08:00 EST",
    status: "paused",
    lastRun: "Yesterday, 08:00 AM",
    nextRun: "Paused",
    sources: 5
  },
  {
    id: "3",
    name: "Motivational Quotes",
    topic: "Lifestyle",
    schedule: "Hourly (9am-5pm)",
    status: "active",
    lastRun: "10 mins ago",
    nextRun: "In 50 mins",
    sources: 1
  }
];

export default function Campaigns() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Automation Campaigns</h1>
            <p className="text-muted-foreground mt-1">
              Manage different content topics, schedules, and configurations.
            </p>
          </div>
          <Link href="/campaigns/new">
            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Create New Campaign
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_CAMPAIGNS.map((campaign) => (
            <Card key={campaign.id} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge variant="secondary" className="font-normal text-xs">
                      {campaign.topic}
                    </Badge>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={campaign.status === "active" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400" 
                      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400"
                    }
                  >
                    {campaign.status === "active" ? "Active" : "Paused"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/70" />
                    <span>{campaign.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary/70" />
                    <span>{campaign.sources} RSS Sources Configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary/70" />
                    <span>Next: <span className="font-medium text-foreground">{campaign.nextRun}</span></span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t bg-muted/5 flex justify-between gap-2">
                <div className="flex gap-2">
                  <Link href={`/campaigns/${campaign.id}`}>
                    <Button variant="outline" size="sm" className="h-8 gap-1.5">
                      <Settings2 className="h-3.5 w-3.5" />
                      Configure
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className={campaign.status === "active" 
                    ? "h-8 text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30" 
                    : "h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                  }
                >
                  {campaign.status === "active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Add New Placeholder Card */}
          <Link href="/campaigns/new">
            <Card className="h-full border-dashed border-2 flex flex-col items-center justify-center p-6 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer min-h-[200px]">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Add New Campaign</h3>
              <p className="text-sm text-center max-w-[200px]">
                Configure a new topic, schedule, and automation rules.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
}