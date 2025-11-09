"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BarChart3,
  Users,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Bed,
  AlertTriangle,
  Star,
  ThumbsUp,
} from "lucide-react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart,
  Bar,
  BarChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  mockAnalytics,
  mockWaitTimeData,
  mockTriageDistribution,
  mockPatients,
  mockStaff,
  mockVisits,
  mockSurveys,
} from "@/lib/mock-data"

interface AdminDashboardProps {
  onBack: () => void
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  const avgRatings = {
    overall: (mockSurveys.reduce((sum, s) => sum + s.ratings.overallExperience, 0) / mockSurveys.length).toFixed(1),
    waitTime: (mockSurveys.reduce((sum, s) => sum + s.ratings.waitTime, 0) / mockSurveys.length).toFixed(1),
    staff: (mockSurveys.reduce((sum, s) => sum + s.ratings.staffProfessionalism, 0) / mockSurveys.length).toFixed(1),
    cleanliness: (mockSurveys.reduce((sum, s) => sum + s.ratings.cleanliness, 0) / mockSurveys.length).toFixed(1),
    communication: (mockSurveys.reduce((sum, s) => sum + s.ratings.communication, 0) / mockSurveys.length).toFixed(1),
  }

  const surveyData = [
    { category: "Overall", rating: Number.parseFloat(avgRatings.overall) },
    { category: "Wait Time", rating: Number.parseFloat(avgRatings.waitTime) },
    { category: "Staff", rating: Number.parseFloat(avgRatings.staff) },
    { category: "Cleanliness", rating: Number.parseFloat(avgRatings.cleanliness) },
    { category: "Communication", rating: Number.parseFloat(avgRatings.communication) },
  ]

  const recommendationRate = ((mockSurveys.filter((s) => s.wouldRecommend).length / mockSurveys.length) * 100).toFixed(
    0,
  )

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
              <h1 className="text-2xl font-bold">{"System Administration"}</h1>
              <p className="text-sm text-muted-foreground">{"Meridian City Hospital • East ER Location"}</p>
            </div>
          </div>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            {"Settings"}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              {"Analytics"}
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <Star className="mr-2 h-4 w-4" />
              {"Feedback"}
            </TabsTrigger>
            <TabsTrigger value="operations">
              <Activity className="mr-2 h-4 w-4" />
              {"Operations"}
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              {"Users"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {"Total Patients (90 days)"}
                  </CardDescription>
                  <CardTitle className="text-3xl">{mockAnalytics.totalPatients}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-chart-3" />
                    <span className="text-chart-3">{"12%"}</span>
                    <span className="text-muted-foreground">{"vs last period"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {"Avg Wait Time"}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {mockAnalytics.avgWaitTime}
                    {"m"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingDown className="h-4 w-4 text-destructive" />
                    <span className="text-destructive">{"8%"}</span>
                    <span className="text-muted-foreground">{"above target"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    {"Bed Occupancy"}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {mockAnalytics.bedOccupancy}
                    {"%"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-chart-5" />
                    <span className="text-muted-foreground">{"Near capacity"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {"Approval Rating"}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {mockAnalytics.approvalRating}
                    {"%"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-chart-3" />
                    <span className="text-chart-3">{"5%"}</span>
                    <span className="text-muted-foreground">{"improvement"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{"Wait Time Trends"}</CardTitle>
                  <CardDescription>{"Average wait times throughout the day"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      minutes: {
                        label: "Wait Time (minutes)",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockWaitTimeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="minutes"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--chart-1))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"Triage Level Distribution"}</CardTitle>
                  <CardDescription>{"Patient breakdown by acuity level"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Patients",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockTriageDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ level, percentage }) => `${level}: ${percentage}%`}
                          outerRadius={80}
                          fill="hsl(var(--chart-1))"
                          dataKey="count"
                        >
                          {mockTriageDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Additional Metrics */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>{"Operational Efficiency"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"Seen within 15 min"}</span>
                    <span className="font-semibold">{"40%"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"Avg Length of Stay"}</span>
                    <span className="font-semibold">
                      {mockAnalytics.avgLengthOfStay}
                      {"hrs"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"Daily Throughput"}</span>
                    <span className="font-semibold">{"400+ patients"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"Staff Performance"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"Active Staff"}</span>
                    <span className="font-semibold">
                      {mockStaff.filter((s) => s.status !== "off-duty").length}
                      {"/"}
                      {mockStaff.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"Avg Patients/Doctor"}</span>
                    <span className="font-semibold">{"10"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"Staff Utilization"}</span>
                    <span className="font-semibold">{"87%"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"Resource Usage"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"ER Beds Available"}</span>
                    <span className="font-semibold">{"6/40"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"Fast-Track Open"}</span>
                    <span className="font-semibold">{"2/8"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{"ICU Capacity"}</span>
                    <span className="font-semibold">{"92%"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {"Overall Rating"}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {avgRatings.overall}
                    {"/5"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i <= Number.parseFloat(avgRatings.overall) ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    {"Would Recommend"}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {recommendationRate}
                    {"%"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {mockSurveys.filter((s) => s.wouldRecommend).length}
                    {" of "}
                    {mockSurveys.length}
                    {" respondents"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    {"Response Rate"}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {mockAnalytics.surveyResponseRate}
                    {"%"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {mockSurveys.length}
                    {" surveys completed"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    {"NPS Score"}
                  </CardDescription>
                  <CardTitle className="text-3xl">{mockAnalytics.npsScore}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="default">{"Good"}</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{"Satisfaction Breakdown"}</CardTitle>
                  <CardDescription>{"Average ratings by category"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      rating: {
                        label: "Rating",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={surveyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rating" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"Recent Feedback"}</CardTitle>
                  <CardDescription>{"Latest patient comments"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {mockSurveys
                      .filter((s) => s.comments)
                      .slice(0, 4)
                      .map((survey) => (
                        <div key={survey.id} className="rounded-lg border p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i <= survey.ratings.overallExperience ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{survey.submittedDate}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{survey.comments}</p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {"— "}
                            {survey.patientName}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{"Detailed Ratings"}</CardTitle>
                <CardDescription>{"Performance metrics by category"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Overall Experience"}</p>
                      <p className="text-sm text-muted-foreground">{"General patient satisfaction"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i <= Number.parseFloat(avgRatings.overall) ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold">{avgRatings.overall}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Wait Time Satisfaction"}</p>
                      <p className="text-sm text-muted-foreground">{"Patient perception of wait times"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i <= Number.parseFloat(avgRatings.waitTime) ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold">{avgRatings.waitTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Staff Professionalism"}</p>
                      <p className="text-sm text-muted-foreground">{"Quality of staff interactions"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i <= Number.parseFloat(avgRatings.staff) ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold">{avgRatings.staff}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Facility Cleanliness"}</p>
                      <p className="text-sm text-muted-foreground">{"Cleanliness and hygiene standards"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i <= Number.parseFloat(avgRatings.cleanliness) ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold">{avgRatings.cleanliness}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Communication Quality"}</p>
                      <p className="text-sm text-muted-foreground">{"Clarity of information provided"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i <= Number.parseFloat(avgRatings.communication) ? "fill-chart-4 text-chart-4" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold">{avgRatings.communication}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{"System Status"}</CardTitle>
                  <CardDescription>{"Real-time operational metrics"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-chart-3" />
                      <span className="font-medium">{"ER System"}</span>
                    </div>
                    <Badge>{"Operational"}</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-chart-3" />
                      <span className="font-medium">{"Patient Records"}</span>
                    </div>
                    <Badge>{"Online"}</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-chart-5" />
                      <span className="font-medium">{"Lab Integration"}</span>
                    </div>
                    <Badge variant="secondary">{"Delayed"}</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-chart-3" />
                      <span className="font-medium">{"Pharmacy System"}</span>
                    </div>
                    <Badge>{"Operational"}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"Active Alerts"}</CardTitle>
                  <CardDescription>{"System notifications and warnings"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">{"High Bed Occupancy"}</p>
                      <p className="text-sm text-muted-foreground">
                        {"ER beds at 85% capacity - consider discharge planning"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-chart-4/50 bg-chart-4/5 p-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-chart-4" />
                    <div>
                      <p className="font-medium text-chart-4">{"Wait Time Above Target"}</p>
                      <p className="text-sm text-muted-foreground">
                        {"Average wait time is 47 minutes (target: 15 minutes)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border p-4">
                    <Activity className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{"Staff Shift Change"}</p>
                      <p className="text-sm text-muted-foreground">{"Evening shift begins in 2 hours"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{"Current ER Activity"}</CardTitle>
                <CardDescription>{"Live patient flow overview"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{"Waiting"}</span>
                      <Badge variant="outline">{mockVisits.filter((v) => v.status === "waiting").length}</Badge>
                    </div>
                    <p className="text-2xl font-bold">{mockVisits.filter((v) => v.status === "waiting").length}</p>
                    <p className="text-xs text-muted-foreground">{"patients in queue"}</p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{"In Treatment"}</span>
                      <Badge variant="outline">{mockVisits.filter((v) => v.status === "in-progress").length}</Badge>
                    </div>
                    <p className="text-2xl font-bold">{mockVisits.filter((v) => v.status === "in-progress").length}</p>
                    <p className="text-xs text-muted-foreground">{"active cases"}</p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{"Critical"}</span>
                      <Badge variant="destructive">
                        {mockVisits.filter((v) => v.triageLevel <= 2 && v.status !== "completed").length}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-destructive">
                      {mockVisits.filter((v) => v.triageLevel <= 2 && v.status !== "completed").length}
                    </p>
                    <p className="text-xs text-muted-foreground">{"urgent cases"}</p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{"Completed"}</span>
                      <Badge variant="secondary">{mockVisits.filter((v) => v.status === "completed").length}</Badge>
                    </div>
                    <p className="text-2xl font-bold">{mockVisits.filter((v) => v.status === "completed").length}</p>
                    <p className="text-xs text-muted-foreground">{"today"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{mockPatients.length}</CardTitle>
                  <CardDescription>{"Registered Patients"}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{mockStaff.length}</CardTitle>
                  <CardDescription>{"Staff Members"}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{"3"}</CardTitle>
                  <CardDescription>{"System Administrators"}</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{"Staff Directory"}</CardTitle>
                    <CardDescription>{"Manage medical staff accounts"}</CardDescription>
                  </div>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    {"Add Staff Member"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStaff.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant="outline" className="capitalize">
                            {staff.role}
                          </Badge>
                          <span>
                            {"ID: "}
                            {staff.id}
                          </span>
                          <span>{"•"}</span>
                          <span className="capitalize">
                            {staff.shift}
                            {" shift"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            staff.status === "available" ? "default" : staff.status === "busy" ? "secondary" : "outline"
                          }
                          className="capitalize"
                        >
                          {staff.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {"Manage"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{"Access Control"}</CardTitle>
                <CardDescription>{"User permissions and role management"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Patient Portal Access"}</p>
                      <p className="text-sm text-muted-foreground">{"View personal health records and appointments"}</p>
                    </div>
                    <Badge variant="secondary">
                      {mockPatients.length}
                      {" users"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Medical Staff Access"}</p>
                      <p className="text-sm text-muted-foreground">{"Full patient records and clinical operations"}</p>
                    </div>
                    <Badge variant="secondary">
                      {mockStaff.length}
                      {" users"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{"Administrator Access"}</p>
                      <p className="text-sm text-muted-foreground">{"System oversight and user management"}</p>
                    </div>
                    <Badge variant="secondary">{"3 users"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
