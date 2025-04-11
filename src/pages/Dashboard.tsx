
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Activity,
  Key,
  FileText,
  Download,
  Clock,
  BarChart4,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your Digital Intermediary Portal for Loans
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button asChild>
            <Link to="/api-keys">Generate API Key</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Active keys in UAT environment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">257</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124ms</div>
            <p className="text-xs text-muted-foreground">
              Response time in UAT
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and resources
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="justify-between" asChild>
              <Link to="/api-keys">
                <div className="flex items-center">
                  <Key className="mr-2 h-4 w-4" />
                  <span>Manage API Keys</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="justify-between" asChild>
              <Link to="/documentation">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>API Documentation</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="justify-between" asChild>
              <Link to="/collections">
                <div className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Postman Collection</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>
              Helpful documentation and guides
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="justify-between" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Integration Guide</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="justify-between" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>API Best Practices</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="justify-between" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>FAQ</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
