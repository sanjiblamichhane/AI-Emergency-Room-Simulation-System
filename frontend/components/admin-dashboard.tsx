// components/admin-dashboard.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, Settings, Activity, Star, Bot } from "lucide-react"
import { SimulationPlanner } from "@/components/simulation-planner" // Import the new component

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  // This component is now much simpler. All complex logic is in SimulationPlanner.
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">System Administration</h1>
              <p className="text-sm text-muted-foreground">Meridian City Hospital • East ER Location</p>
            </div>
          </div>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="simulation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="simulation">
              <Bot className="mr-2 h-4 w-4" />
              Simulation & Planning
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <Star className="mr-2 h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* --- ANALYTICS TAB (Placeholder Content) --- */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  This section would show live KPIs and charts. Data fetching has been disabled to focus on the simulation tool as requested.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* --- SIMULATION TAB (Now uses the dedicated component) --- */}
          <TabsContent value="simulation">
            <SimulationPlanner />
          </TabsContent>

          {/* --- FEEDBACK TAB (Placeholder Content) --- */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Patient Feedback</CardTitle>
                <CardDescription>This section would display patient survey results and comments.</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}