
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  Globe, 
  BarChart, 
  AlertTriangle,
  Server,
  Info
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Environment {
  id: string;
  name: string;
  status: "Operational" | "Degraded Performance" | "Maintenance";
  baseUrl: string;
  uptime: string;
  latency: string;
}

const environments: Environment[] = [
  {
    id: "uat",
    name: "UAT",
    status: "Operational",
    baseUrl: "https://api-uat.loanportal.example",
    uptime: "99.95%",
    latency: "145ms"
  },
  {
    id: "prod",
    name: "Production",
    status: "Operational",
    baseUrl: "https://api.loanportal.example",
    uptime: "99.99%",
    latency: "98ms"
  }
];

interface Endpoint {
  id: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  status: "Operational" | "Degraded Performance" | "Maintenance";
  latency: string;
}

const endpoints: Endpoint[] = [
  {
    id: "1",
    path: "/applications",
    method: "GET",
    status: "Operational",
    latency: "120ms"
  },
  {
    id: "2",
    path: "/applications",
    method: "POST",
    status: "Operational",
    latency: "180ms"
  },
  {
    id: "3",
    path: "/applications/{id}",
    method: "GET",
    status: "Operational",
    latency: "95ms"
  },
  {
    id: "4",
    path: "/applications/{id}",
    method: "PATCH",
    status: "Operational",
    latency: "140ms"
  },
  {
    id: "5",
    path: "/applications/{id}",
    method: "DELETE",
    status: "Operational",
    latency: "110ms"
  },
  {
    id: "6",
    path: "/webhooks",
    method: "GET",
    status: "Operational",
    latency: "85ms"
  },
  {
    id: "7",
    path: "/webhooks",
    method: "POST",
    status: "Operational",
    latency: "125ms"
  }
];

const Environments: React.FC = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("uat");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-500";
      case "Degraded Performance":
        return "bg-amber-500";
      case "Maintenance":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-500";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-amber-500";
      case "PATCH":
        return "bg-purple-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Environments</h1>
          <p className="text-muted-foreground">
            View and manage API environments
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {environments.map((env) => (
          <Card key={env.id} className={selectedEnvironment === env.id ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    {env.name}
                    <Badge className={`ml-2 ${getStatusColor(env.status)}`}>
                      {env.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{env.baseUrl}</CardDescription>
                </div>
                <Button 
                  variant={selectedEnvironment === env.id ? "default" : "outline"}
                  onClick={() => setSelectedEnvironment(env.id)}
                >
                  {selectedEnvironment === env.id ? "Selected" : "Select"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">Uptime</div>
                    <div className="text-sm text-muted-foreground">{env.uptime}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">Avg. Latency</div>
                    <div className="text-sm text-muted-foreground">{env.latency}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Environment Details</CardTitle>
              <CardDescription>
                {selectedEnvironment === "uat" ? "User Acceptance Testing Environment" : "Production Environment"}
              </CardDescription>
            </div>
            <Badge className={selectedEnvironment === "uat" ? "bg-amber-500" : "bg-green-500"}>
              {selectedEnvironment === "uat" ? "UAT" : "PROD"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="endpoints">
            <TabsList className="mb-4">
              <TabsTrigger value="endpoints">
                <Globe className="mr-2 h-4 w-4" />
                Endpoints
              </TabsTrigger>
              <TabsTrigger value="status">
                <BarChart className="mr-2 h-4 w-4" />
                Status History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="endpoints">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint) => (
                    <TableRow key={endpoint.id}>
                      <TableCell>
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {endpoint.path}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(endpoint.status)} mr-2`}></div>
                          {endpoint.status}
                        </div>
                      </TableCell>
                      <TableCell>{endpoint.latency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="status">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium">All Systems Operational</div>
                      <div className="text-sm text-muted-foreground">Last updated on November 20, 2023, 09:15 AM</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Incidents</h3>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <div className="font-medium">Scheduled Maintenance Completed</div>
                        <div className="text-sm text-muted-foreground">November 15, 2023, 02:30 AM - 04:00 AM</div>
                        <p className="text-sm mt-2">
                          The scheduled maintenance has been completed successfully. All systems are now operational.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <div className="font-medium">Degraded Performance</div>
                        <div className="text-sm text-muted-foreground">November 10, 2023, 10:15 AM - 11:45 AM</div>
                        <p className="text-sm mt-2">
                          Some users experienced increased latency with the /applications POST endpoint. The issue has been resolved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environment Information</CardTitle>
          <CardDescription>
            Technical details about the {selectedEnvironment === "uat" ? "UAT" : "Production"} environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="flex items-start">
                  <Server className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">Base URL</div>
                    <div className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">
                      {selectedEnvironment === "uat" 
                        ? "https://api-uat.loanportal.example" 
                        : "https://api.loanportal.example"}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">Version</div>
                    <div className="text-sm mt-1">
                      API Version: v1.0.2 (Stable)
                      {selectedEnvironment === "uat" && (
                        <Badge className="ml-2 bg-blue-500">Beta v2.0 Available</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Environment Notes</h3>
              {selectedEnvironment === "uat" ? (
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-semibold">UAT Environment</span> - This environment is for testing purposes only. Do not use real customer data.
                  </p>
                  <p>
                    Data in this environment is refreshed weekly on Sunday at 00:00 UTC.
                  </p>
                  <p>
                    Rate limits are set to 100 requests per minute per API key.
                  </p>
                </div>
              ) : (
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-semibold">Production Environment</span> - This environment is for live applications and real customer data.
                  </p>
                  <p>
                    All data submitted to this environment is subject to our security and privacy policies.
                  </p>
                  <p>
                    Rate limits are set to 500 requests per minute per API key.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Environments;
