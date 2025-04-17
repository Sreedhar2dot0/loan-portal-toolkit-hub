
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ApiKeys from "./pages/ApiKeys";
import ApiManagement from "./pages/ApiManagement";
import Documentation from "./pages/Documentation";
import Collections from "./pages/Collections";
import Environments from "./pages/Environments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="/api-keys" 
            element={
              <MainLayout>
                <ApiKeys />
              </MainLayout>
            } 
          />
          <Route 
            path="/api-management" 
            element={
              <MainLayout>
                <ApiManagement />
              </MainLayout>
            } 
          />
          <Route 
            path="/documentation" 
            element={
              <MainLayout>
                <Documentation />
              </MainLayout>
            } 
          />
          <Route 
            path="/collections" 
            element={
              <MainLayout>
                <Collections />
              </MainLayout>
            } 
          />
          <Route 
            path="/environments" 
            element={
              <MainLayout>
                <Environments />
              </MainLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
