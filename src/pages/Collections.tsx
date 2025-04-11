
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  ExternalLink, 
  Code, 
  ChevronRight,
  GitBranch,
  FileJson
} from "lucide-react";
import { toast } from "sonner";

interface Collection {
  id: string;
  name: string;
  description: string;
  environment: "UAT" | "PROD" | "Both";
  lastUpdated: string;
}

const collections: Collection[] = [
  {
    id: "1",
    name: "Loan API - Complete Collection",
    description: "All API endpoints for the loan processing system.",
    environment: "Both",
    lastUpdated: "2023-11-15"
  },
  {
    id: "2",
    name: "Loan API - Application Endpoints",
    description: "Endpoints for submitting and managing loan applications.",
    environment: "Both",
    lastUpdated: "2023-11-10"
  },
  {
    id: "3",
    name: "Loan API - User Management",
    description: "Endpoints for managing users and permissions.",
    environment: "Both",
    lastUpdated: "2023-10-28"
  },
  {
    id: "4",
    name: "Loan API - Webhooks",
    description: "Test and manage webhook configurations.",
    environment: "UAT",
    lastUpdated: "2023-10-15"
  }
];

const Collections: React.FC = () => {
  const downloadCollection = (id: string, name: string) => {
    // In a real app, this would initiate a download
    toast.success(`Downloading ${name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Collections</h1>
          <p className="text-muted-foreground">
            Download Postman collections and environment files
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Collections</CardTitle>
            <CardDescription>
              Download Postman collections for the Loan API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collections.map((collection) => (
                <div key={collection.id} className="border rounded-md p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">{collection.description}</p>
                      <div className="text-xs text-muted-foreground">
                        Last updated: {collection.lastUpdated}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadCollection(collection.id, collection.name)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Run in Postman
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Files</CardTitle>
            <CardDescription>
              Download Postman environment files for different environments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <div className="space-y-2">
                  <h3 className="font-medium">UAT Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Configuration for the UAT testing environment.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success("Downloading UAT environment")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Environment
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Production Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Configuration for the Production environment.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success("Downloading Production environment")}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Environment
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Clients</CardTitle>
            <CardDescription>
              Generate API clients for different programming languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <div className="text-2xl mb-2">
                  <Code className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">JavaScript</div>
                <div className="text-xs text-muted-foreground">Node.js client</div>
                <ChevronRight className="h-4 w-4 mt-2" />
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <div className="text-2xl mb-2">
                  <Code className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Python</div>
                <div className="text-xs text-muted-foreground">Python client</div>
                <ChevronRight className="h-4 w-4 mt-2" />
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <div className="text-2xl mb-2">
                  <Code className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Java</div>
                <div className="text-xs text-muted-foreground">Java client</div>
                <ChevronRight className="h-4 w-4 mt-2" />
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <div className="text-2xl mb-2">
                  <Code className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">C#</div>
                <div className="text-xs text-muted-foreground">.NET client</div>
                <ChevronRight className="h-4 w-4 mt-2" />
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <div className="text-2xl mb-2">
                  <Code className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">PHP</div>
                <div className="text-xs text-muted-foreground">PHP client</div>
                <ChevronRight className="h-4 w-4 mt-2" />
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <div className="text-2xl mb-2">
                  <Code className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium">Ruby</div>
                <div className="text-xs text-muted-foreground">Ruby client</div>
                <ChevronRight className="h-4 w-4 mt-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>
              Other helpful tools and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <GitBranch className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">OpenAPI Specification</div>
                  <div className="text-sm text-muted-foreground">Download the OpenAPI spec file</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 justify-start">
                <FileJson className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Sample Responses</div>
                  <div className="text-sm text-muted-foreground">Example responses for all endpoints</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Collections;
