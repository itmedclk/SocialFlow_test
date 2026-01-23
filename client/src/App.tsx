import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Settings from "@/pages/settings";
import Pipeline from "@/pages/pipeline";
import Review from "@/pages/review";
import AuditLog from "@/pages/audit-log";
import Campaigns from "@/pages/campaigns";
import CampaignEditor from "@/pages/campaign-editor";
import CampaignDetails from "@/pages/campaign-details";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/campaigns/:id" component={CampaignEditor} />
      <Route path="/campaigns/:id/details" component={CampaignDetails} />
      <Route path="/pipeline" component={Pipeline} />
      <Route path="/review" component={Review} />
      <Route path="/logs" component={AuditLog} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;