import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Copy, Zap, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: Date;
  lastUsed: Date | null;
  environment: "UAT" | "PROD";
}

const ApiKeys: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Development Key",
      prefix: "loan_pk_uat_aK7h",
      createdAt: new Date(2023, 5, 12),
      lastUsed: new Date(2023, 10, 5),
      environment: "UAT"
    },
    {
      id: "2",
      name: "Testing Key",
      prefix: "loan_pk_uat_bJ9i",
      createdAt: new Date(2023, 8, 23),
      lastUsed: new Date(2023, 10, 30),
      environment: "UAT"
    },
    {
      id: "3",
      name: "Production Key",
      prefix: "loan_pk_prod_cL2m",
      createdAt: new Date(2023, 9, 15),
      lastUsed: null,
      environment: "PROD"
    }
  ]);

  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [showNewKey, setShowNewKey] = useState(false);
  const [environment, setEnvironment] = useState<"UAT" | "PROD">("UAT");

  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }

    // Generate a random key (in a real app, this would come from the backend)
    const prefix = environment === "UAT" ? "loan_pk_uat_" : "loan_pk_prod_";
    const randomKey = prefix + Math.random().toString(36).substring(2, 10);
    
    setNewKeyValue(randomKey);
    setShowNewKey(true);
    
    // Add the new key to the list
    const newKey: ApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      prefix: randomKey.substring(0, randomKey.length - 4) + "****",
      createdAt: new Date(),
      lastUsed: null,
      environment: environment
    };

    setApiKeys([...apiKeys, newKey]);
    
    toast.success("API key generated successfully!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success("API key deleted successfully");
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Never used";
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your API keys for authentication
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>
                Create and manage API keys for accessing the Loan API
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md divide-y">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="font-medium flex items-center">
                    {key.name}
                    <Badge 
                      className={`ml-2 ${key.environment === "UAT" ? "bg-amber-500" : "bg-green-500"}`}
                    >
                      {key.environment}
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
                    onClick={() => deleteKey(key.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeys;
