
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Code, 
  Settings, 
  CheckCircle, 
  Circle,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface DocSection {
  id: string;
  title: string;
  content: string;
}

const documentationSections: DocSection[] = [
  {
    id: "intro",
    title: "Introduction",
    content: `
      <h3>Welcome to the Loan API</h3>
      <p>The Loan API allows you to integrate with our loan processing system to submit loan applications, check loan status, and retrieve loan details.</p>
      <p>This documentation provides all the information you need to successfully integrate with our API.</p>
    `
  },
  {
    id: "auth",
    title: "Authentication",
    content: `
      <h3>Authentication</h3>
      <p>All API requests must include an API key in the header:</p>
      <pre>
Authorization: Bearer YOUR_API_KEY
      </pre>
      <p>API keys are environment-specific. Make sure to use the correct key for UAT and Production environments.</p>
    `
  },
  {
    id: "endpoints",
    title: "Endpoints",
    content: `
      <h3>Available Endpoints</h3>
      <p>The Loan API provides the following endpoints:</p>
      <ul>
        <li><strong>POST /applications</strong> - Submit a new loan application</li>
        <li><strong>GET /applications/{id}</strong> - Get details of a specific application</li>
        <li><strong>GET /applications</strong> - List all applications</li>
        <li><strong>PATCH /applications/{id}</strong> - Update an existing application</li>
        <li><strong>DELETE /applications/{id}</strong> - Cancel an application</li>
      </ul>
    `
  },
  {
    id: "errors",
    title: "Error Handling",
    content: `
      <h3>Error Responses</h3>
      <p>The API uses standard HTTP status codes to indicate success or failure of a request.</p>
      <p>Error responses will include a JSON body with the following structure:</p>
      <pre>
{
  "error": {
    "code": "error_code",
    "message": "A human-readable error message",
    "details": { 
      // Additional error information
    }
  }
}
      </pre>
    `
  },
  {
    id: "rate-limits",
    title: "Rate Limits",
    content: `
      <h3>Rate Limits</h3>
      <p>The API enforces the following rate limits:</p>
      <ul>
        <li>UAT Environment: 100 requests per minute</li>
        <li>Production Environment: 500 requests per minute</li>
      </ul>
      <p>Rate limit information is included in the response headers:</p>
      <pre>
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1605133800
      </pre>
    `
  },
  {
    id: "webhooks",
    title: "Webhooks",
    content: `
      <h3>Webhooks</h3>
      <p>The API can send webhooks to notify you of important events:</p>
      <ul>
        <li><strong>application.created</strong> - When a new application is created</li>
        <li><strong>application.updated</strong> - When an application is updated</li>
        <li><strong>application.approved</strong> - When an application is approved</li>
        <li><strong>application.declined</strong> - When an application is declined</li>
      </ul>
      <p>Configure your webhook endpoints in the Settings section.</p>
    `
  }
];

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = documentationSections.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">
            API reference and integration guides
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        <div className="md:border-r pr-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-1">
              {filteredSections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={`w-full justify-start ${activeSection === section.id ? "bg-accent" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {activeSection === section.id ? (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <Circle className="mr-2 h-4 w-4" />
                  )}
                  {section.title}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <Tabs defaultValue="reference">
            <TabsList className="mb-4">
              <TabsTrigger value="reference">
                <Code className="mr-2 h-4 w-4" />
                API Reference
              </TabsTrigger>
              <TabsTrigger value="guides">
                <FileText className="mr-2 h-4 w-4" />
                Integration Guides
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                API Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reference" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="documentation-content">
                    {filteredSections.map((section) => (
                      <div 
                        key={section.id} 
                        className={activeSection === section.id ? "" : "hidden"}
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guides" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Integration Guides</h2>
                  <p className="mb-4">Follow these guides to get started with the Loan API:</p>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-semibold">Getting Started</h3>
                      <p className="text-sm text-muted-foreground mb-4">Learn the basics of integrating with our API.</p>
                      <Button variant="outline" size="sm">Read Guide</Button>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-semibold">Submitting Applications</h3>
                      <p className="text-sm text-muted-foreground mb-4">How to submit loan applications via the API.</p>
                      <Button variant="outline" size="sm">Read Guide</Button>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-semibold">Webhook Implementation</h3>
                      <p className="text-sm text-muted-foreground mb-4">Set up webhooks to receive real-time updates.</p>
                      <Button variant="outline" size="sm">Read Guide</Button>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-semibold">Error Handling</h3>
                      <p className="text-sm text-muted-foreground mb-4">Best practices for handling API errors.</p>
                      <Button variant="outline" size="sm">Read Guide</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">API Settings</h2>
                  <p className="mb-4">Configure your API integration settings:</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Webhook URLs</h3>
                      <p className="text-sm text-muted-foreground mb-2">Enter URLs where you want to receive webhook events</p>
                      <Input placeholder="https://your-domain.com/webhooks" className="mb-2" />
                      <Button size="sm">Save Webhook URL</Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">API Version</h3>
                      <p className="text-sm text-muted-foreground mb-2">Select which API version to use</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">v1 (Stable)</Button>
                        <Button variant="outline" size="sm">v2 (Beta)</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">IP Whitelisting</h3>
                      <p className="text-sm text-muted-foreground mb-2">Restrict API access to specific IP addresses</p>
                      <Input placeholder="192.168.1.1" className="mb-2" />
                      <Button size="sm">Add IP Address</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
