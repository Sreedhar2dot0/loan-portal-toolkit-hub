import React, { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Key, 
  Shield, 
  Webhook, 
  Zap, 
  Trash2, 
  Plus, 
  Check, 
  Copy, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  Server,
  BarChart,
  Clock,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: Date;
  lastUsed: Date | null;
}

interface IpAddress {
  id: string;
  address: string;
  description: string;
  createdAt: Date;
}

interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: Date;
}

interface Endpoint {
  id: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  status: "Operational" | "Degraded Performance" | "Maintenance";
  latency: string;
  description?: string;
}

interface EnvironmentDetails {
  baseUrl: string;
  uptime: string;
  latency: string;
  version: string;
  status: "Operational" | "Degraded Performance" | "Maintenance";
  notes: string[];
  rateLimit: string;
}

const sampleApiKeys: Record<string, ApiKey[]> = {
  dev: [
    {
      id: "1",
      name: "Development Key",
      prefix: "loan_pk_dev_aK7h",
      createdAt: new Date(2023, 5, 12),
      lastUsed: new Date(2023, 10, 5)
    }
  ],
  uat: [
    {
      id: "2",
      name: "Testing Key",
      prefix: "loan_pk_uat_bJ9i",
      createdAt: new Date(2023, 8, 23),
      lastUsed: new Date(2023, 10, 30)
    }
  ],
  prod: [
    {
      id: "3",
      name: "Production Key",
      prefix: "loan_pk_prod_cL2m",
      createdAt: new Date(2023, 9, 15),
      lastUsed: null
    }
  ]
};

const sampleIpAddresses: Record<string, IpAddress[]> = {
  dev: [
    {
      id: "1",
      address: "192.168.1.1",
      description: "Office IP",
      createdAt: new Date(2023, 6, 15)
    }
  ],
  uat: [
    {
      id: "2",
      address: "203.0.113.1",
      description: "Test Environment",
      createdAt: new Date(2023, 8, 10)
    }
  ],
  prod: [
    {
      id: "3",
      address: "198.51.100.1",
      description: "Production Server",
      createdAt: new Date(2023, 9, 20)
    }
  ]
};

const sampleWebhooks: Record<string, Webhook[]> = {
  dev: [
    {
      id: "1",
      url: "https://dev.example.com/webhook",
      events: ["loan.created", "loan.updated"],
      active: true,
      createdAt: new Date(2023, 6, 20)
    }
  ],
  uat: [
    {
      id: "2",
      url: "https://uat.example.com/webhook",
      events: ["loan.created", "loan.approved"],
      active: true,
      createdAt: new Date(2023, 8, 15)
    }
  ],
  prod: [
    {
      id: "3",
      url: "https://prod.example.com/webhook",
      events: ["loan.created", "loan.approved", "loan.disbursed"],
      active: false,
      createdAt: new Date(2023, 10, 5)
    }
  ]
};

const sampleEndpoints: Record<string, Endpoint[]> = {
  dev: [
    {
      id: "1",
      path: "/applications",
      method: "GET",
      status: "Operational",
      latency: "150ms",
      description: "Retrieve all loan applications"
    },
    {
      id: "2",
      path: "/applications",
      method: "POST",
      status: "Operational",
      latency: "200ms",
      description: "Create a new loan application"
    },
    {
      id: "3",
      path: "/applications/{id}",
      method: "GET",
      status: "Operational",
      latency: "120ms",
      description: "Retrieve a specific loan application"
    }
  ],
  uat: [
    {
      id: "1",
      path: "/applications",
      method: "GET",
      status: "Operational",
      latency: "120ms",
      description: "Retrieve all loan applications"
    },
    {
      id: "2",
      path: "/applications",
      method: "POST",
      status: "Operational",
      latency: "180ms",
      description: "Create a new loan application"
    },
    {
      id: "3",
      path: "/applications/{id}",
      method: "GET",
      status: "Operational",
      latency: "95ms",
      description: "Retrieve a specific loan application"
    },
    {
      id: "4",
      path: "/applications/{id}",
      method: "PATCH",
      status: "Operational",
      latency: "140ms",
      description: "Update a loan application"
    }
  ],
  prod: [
    {
      id: "1",
      path: "/applications",
      method: "GET",
      status: "Operational",
      latency: "90ms",
      description: "Retrieve all loan applications"
    },
    {
      id: "2",
      path: "/applications",
      method: "POST",
      status: "Operational",
      latency: "150ms",
      description: "Create a new loan application"
    },
    {
      id: "3",
      path: "/applications/{id}",
      method: "GET",
      status: "Operational",
      latency: "75ms",
      description: "Retrieve a specific loan application"
    },
    {
      id: "4",
      path: "/applications/{id}",
      method: "PATCH",
      status: "Operational",
      latency: "120ms",
      description: "Update a loan application"
    },
    {
      id: "5",
      path: "/applications/{id}",
      method: "DELETE",
      status: "Operational",
      latency: "100ms",
      description: "Delete a loan application"
    }
  ]
};

const environmentDetails: Record<string, EnvironmentDetails> = {
  dev: {
    baseUrl: "https://api-dev.loanportal.example",
    uptime: "99.5%",
    latency: "180ms",
    version: "v1.2.3-dev",
    status: "Operational",
    notes: [
      "Development environment for testing integrations",
      "Data is reset every Sunday at 00:00 UTC",
      "Sandbox environment - no real transactions processed"
    ],
    rateLimit: "50 requests per minute"
  },
  uat: {
    baseUrl: "https://api-uat.loanportal.example",
    uptime: "99.95%",
    latency: "145ms",
    version: "v1.2.0",
    status: "Operational",
    notes: [
      "User Acceptance Testing environment",
      "Data is persistent but not production data",
      "Use for final validation before production"
    ],
    rateLimit: "100 requests per minute"
  },
  prod: {
    baseUrl: "https://api.loanportal.example",
    uptime: "99.99%",
    latency: "98ms",
    version: "v1.1.8",
    status: "Operational",
    notes: [
      "Production environment for live transactions",
      "All activity is logged and monitored",
      "High availability infrastructure with redundancy"
    ],
    rateLimit: "500 requests per minute"
  }
};

const ApiManagement: React.FC = () => {
  const [currentEnvironment, setCurrentEnvironment] = useState<"dev" | "uat" | "prod">("dev");
  
  const [apiKeys, setApiKeys] = useState<Record<string, ApiKey[]>>(sampleApiKeys);
  const [ipAddresses, setIpAddresses] = useState<Record<string, IpAddress[]>>(sampleIpAddresses);
  const [webhooks, setWebhooks] = useState<Record<string, Webhook[]>>(sampleWebhooks);
  const [endpoints, setEndpoints] = useState<Record<string, Endpoint[]>>(sampleEndpoints);
  
  const [newKeyName, setNewKeyName] = useState("");
  const [newIpAddress, setNewIpAddress] = useState("");
  const [newIpDescription, setNewIpDescription] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState("");
  
  const [showNewKey, setShowNewKey] = useState(false);
  const [newKeyValue, setNewKeyValue] = useState("");

  const formatDate = (date: Date | null) => {
    if (!date) return "Never used";
    return date.toLocaleDateString();
  };

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }

    const prefix = 
      currentEnvironment === "dev" ? "loan_pk_dev_" : 
      currentEnvironment === "uat" ? "loan_pk_uat_" : "loan_pk_prod_";
    const randomKey = prefix + Math.random().toString(36).substring(2, 10);
    
    setNewKeyValue(randomKey);
    setShowNewKey(true);
    
    const newKey: ApiKey = {
      id: (apiKeys[currentEnvironment].length + 1).toString(),
      name: newKeyName,
      prefix: randomKey.substring(0, randomKey.length - 4) + "****",
      createdAt: new Date(),
      lastUsed: null
    };

    setApiKeys({
      ...apiKeys,
      [currentEnvironment]: [...apiKeys[currentEnvironment], newKey]
    });
    
    setNewKeyName("");
    toast.success("API key generated successfully!");
  };

  const deleteApiKey = (id: string) => {
    setApiKeys({
      ...apiKeys,
      [currentEnvironment]: apiKeys[currentEnvironment].filter(key => key.id !== id)
    });
    toast.success("API key deleted successfully");
  };

  const addIpAddress = () => {
    if (!newIpAddress.trim()) {
      toast.error("Please enter an IP address");
      return;
    }

    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(newIpAddress)) {
      toast.error("Please enter a valid IP address");
      return;
    }

    const newIp: IpAddress = {
      id: (ipAddresses[currentEnvironment].length + 1).toString(),
      address: newIpAddress,
      description: newIpDescription,
      createdAt: new Date()
    };

    setIpAddresses({
      ...ipAddresses,
      [currentEnvironment]: [...ipAddresses[currentEnvironment], newIp]
    });

    setNewIpAddress("");
    setNewIpDescription("");
    toast.success("IP address added successfully");
  };

  const deleteIpAddress = (id: string) => {
    setIpAddresses({
      ...ipAddresses,
      [currentEnvironment]: ipAddresses[currentEnvironment].filter(ip => ip.id !== id)
    });
    toast.success("IP address removed successfully");
  };

  const addWebhook = () => {
    if (!newWebhookUrl.trim()) {
      toast.error("Please enter a webhook URL");
      return;
    }

    try {
      new URL(newWebhookUrl);
    } catch (_) {
      toast.error("Please enter a valid URL");
      return;
    }

    const events = newWebhookEvents.split(",").map(e => e.trim()).filter(e => e);
    
    if (events.length === 0) {
      toast.error("Please enter at least one event");
      return;
    }

    const newWebhook: Webhook = {
      id: (webhooks[currentEnvironment].length + 1).toString(),
      url: newWebhookUrl,
      events: events,
      active: true,
      createdAt: new Date()
    };

    setWebhooks({
      ...webhooks,
      [currentEnvironment]: [...webhooks[currentEnvironment], newWebhook]
    });

    setNewWebhookUrl("");
    setNewWebhookEvents("");
    toast.success("Webhook added successfully");
  };

  const toggleWebhookStatus = (id: string) => {
    setWebhooks({
      ...webhooks,
      [currentEnvironment]: webhooks[currentEnvironment].map(webhook => {
        if (webhook.id === id) {
          return { ...webhook, active: !webhook.active };
        }
        return webhook;
      })
    });
  };

  const deleteWebhook = (id: string) => {
    setWebhooks({
      ...webhooks,
      [currentEnvironment]: webhooks[currentEnvironment].filter(webhook => webhook.id !== id)
    });
    toast.success("Webhook removed successfully");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "dev": return "bg-blue-500";
      case "uat": return "bg-amber-500";
      case "prod": return "bg-green-500";
      default: return "";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-500";
      case "POST": return "bg-green-500";
      case "PUT": return "bg-amber-500";
      case "PATCH": return "bg-purple-500";
      case "DELETE": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational": return "bg-green-500";
      case "Degraded Performance": return "bg-amber-500";
      case "Maintenance": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
          <p className="text-muted-foreground">
            Manage your API keys, IP whitelisting, and webhooks
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Environment</CardTitle>
          <CardDescription>
            Select an environment to manage its settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button 
              variant={currentEnvironment === "dev" ? "default" : "outline"} 
              onClick={() => setCurrentEnvironment("dev")}
              className={currentEnvironment === "dev" ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              Development
            </Button>
            <Button 
              variant={currentEnvironment === "uat" ? "default" : "outline"} 
              onClick={() => setCurrentEnvironment("uat")}
              className={currentEnvironment === "uat" ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              UAT
            </Button>
            <Button 
              variant={currentEnvironment === "prod" ? "default" : "outline"} 
              onClick={() => setCurrentEnvironment("prod")}
              className={currentEnvironment === "prod" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              Production
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Environment Details</CardTitle>
              <CardDescription>
                Information about the {currentEnvironment.toUpperCase()} environment
              </CardDescription>
            </div>
            <Badge className={getStatusColor(environmentDetails[currentEnvironment].status)}>
              {environmentDetails[currentEnvironment].status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">Base URL</span>
              </div>
              <div className="bg-muted p-2 rounded font-mono text-sm break-all">
                {environmentDetails[currentEnvironment].baseUrl}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">API Version</span>
              </div>
              <div className="text-sm">
                {environmentDetails[currentEnvironment].version}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Statistics</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">Uptime</div>
                    <div className="text-sm text-muted-foreground">{environmentDetails[currentEnvironment].uptime}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-blue-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">Avg. Latency</div>
                    <div className="text-sm text-muted-foreground">{environmentDetails[currentEnvironment].latency}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="font-medium mb-2">Environment Notes</div>
            <ul className="space-y-2 text-sm">
              {environmentDetails[currentEnvironment].notes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-sm">
              <span className="font-medium">Rate Limit:</span> {environmentDetails[currentEnvironment].rateLimit}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Endpoints</span>
          </TabsTrigger>
          <TabsTrigger value="ip-whitelist" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>IP Whitelisting</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            <span>Webhooks</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys for {currentEnvironment.toUpperCase()}</CardTitle>
                  <CardDescription>
                    Manage API keys for authentication in the {currentEnvironment.toUpperCase()} environment
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      <span>New Key</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create API Key</DialogTitle>
                      <DialogDescription>
                        Enter a name for your new API key
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="key-name" className="text-sm font-medium">
                          Key Name
                        </label>
                        <Input
                          id="key-name"
                          placeholder="e.g. Production API Key"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={generateApiKey}>Generate Key</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {showNewKey && (
                <div className="mb-6 p-4 border rounded-md bg-green-50 relative">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium">API Key Generated</h3>
                  </div>
                  <p className="text-sm mb-2">Copy this key now. You won't be able to see it again!</p>
                  <div className="flex items-center">
                    <code className="bg-white px-3 py-2 rounded border flex-grow font-mono text-sm break-all">
                      {newKeyValue}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(newKeyValue)}
                      className="ml-2"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0"
                    onClick={() => setShowNewKey(false)}
                  >
                    ×
                  </Button>
                </div>
              )}

              <div className="border rounded-md divide-y">
                {apiKeys[currentEnvironment].length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No API keys found for this environment</p>
                  </div>
                ) : (
                  apiKeys[currentEnvironment].map((key) => (
                    <div key={key.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center">
                          {key.name}
                          <Badge 
                            className={`ml-2 ${getEnvironmentColor(currentEnvironment)}`}
                          >
                            {currentEnvironment.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground api-key">{key.prefix}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>Created: {formatDate(key.createdAt)}</span>
                          <span>•</span>
                          <span>Last used: {formatDate(key.lastUsed)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3 md:mt-0">
                        <Button variant="outline" size="sm" className="h-8">
                          <Zap className="h-3.5 w-3.5 mr-1" />
                          <span>Generate</span>
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="h-8"
                          onClick={() => deleteApiKey(key.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Endpoints for {currentEnvironment.toUpperCase()}</CardTitle>
                  <CardDescription>
                    Available API endpoints in the {currentEnvironment.toUpperCase()} environment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Method</TableHead>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Latency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {endpoints[currentEnvironment].length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                          No endpoints available in this environment
                        </TableCell>
                      </TableRow>
                    ) : (
                      endpoints[currentEnvironment].map((endpoint) => (
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
                            {endpoint.description || "—"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(endpoint.status)} mr-2`}></div>
                              {endpoint.status}
                            </div>
                          </TableCell>
                          <TableCell>{endpoint.latency}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-md">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 mr-2" />
                  <span className="font-medium">Base URL</span>
                </div>
                <div className="font-mono text-sm break-all">
                  {environmentDetails[currentEnvironment].baseUrl}
                </div>
                <p className="text-sm mt-2">
                  Append the endpoint path to this base URL to make API requests.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip-whitelist">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>IP Whitelisting for {currentEnvironment.toUpperCase()}</CardTitle>
                  <CardDescription>
                    Manage allowed IP addresses for the {currentEnvironment.toUpperCase()} environment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Input
                      placeholder="IP Address (e.g. 192.168.1.1)"
                      value={newIpAddress}
                      onChange={(e) => setNewIpAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Description (optional)"
                      value={newIpDescription}
                      onChange={(e) => setNewIpDescription(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={addIpAddress}>Add IP Address</Button>

                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ipAddresses[currentEnvironment].length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                            No IP addresses have been whitelisted
                          </TableCell>
                        </TableRow>
                      ) : (
                        ipAddresses[currentEnvironment].map((ip) => (
                          <TableRow key={ip.id}>
                            <TableCell className="font-medium">{ip.address}</TableCell>
                            <TableCell>{ip.description || "—"}</TableCell>
                            <TableCell>{formatDate(ip.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteIpAddress(ip.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhooks for {currentEnvironment.toUpperCase()}</CardTitle>
                  <CardDescription>
                    Configure webhooks to receive notifications for events in the {currentEnvironment.toUpperCase()} environment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="webhook-url" className="text-sm font-medium">
                    Webhook URL
                  </label>
                  <Input
                    id="webhook-url"
                    placeholder="https://example.com/webhook"
                    value={newWebhookUrl}
                    onChange={(e) => setNewWebhookUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="webhook-events" className="text-sm font-medium">
                    Events (comma separated)
                  </label>
                  <Textarea
                    id="webhook-events"
                    placeholder="loan.created, loan.approved, loan.disbursed"
                    value={newWebhookEvents}
                    onChange={(e) => setNewWebhookEvents(e.target.value)}
                  />
                </div>
                <Button onClick={addWebhook}>Add Webhook</Button>

                <div className="border rounded-md divide-y">
                  {webhooks[currentEnvironment].length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      <p>No webhooks configured for this environment</p>
                    </div>
                  ) : (
                    webhooks[currentEnvironment].map((webhook) => (
                      <div key={webhook.id} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <div className="font-medium break-all">{webhook.url}</div>
                            <div className="text-sm text-muted-foreground">
                              Events: {webhook.events.join(", ")}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Created: {formatDate(webhook.createdAt)}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={webhook.active}
                                onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                              />
                              <span className="text-sm">{webhook.active ? "Active" : "Inactive"}</span>
                            </div>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteWebhook(webhook.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiManagement;
