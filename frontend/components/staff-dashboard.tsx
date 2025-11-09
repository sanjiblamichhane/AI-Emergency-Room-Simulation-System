"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Users,
  Calendar,
  Activity,
  ClipboardList,
  Search,
  Clock,
  AlertCircle,
  UserPlus,
  Ticket,
} from "lucide-react"
import { mockPatients, mockVisits, mockAppointments, mockStaff, mockTickets } from "@/lib/mock-data"

interface StaffDashboardProps {
  onBack: () => void
}

export function StaffDashboard({ onBack }: StaffDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const activeVisits = mockVisits.filter((v) => v.status !== "completed")
  const todayAppointments = mockAppointments.filter((a) => a.status === "scheduled")

  const getTriageBadge = (level: number) => {
    const variants = {
      1: { variant: "destructive" as const, label: "Critical" },
      2: { variant: "default" as const, label: "Emergency" },
      3: { variant: "secondary" as const, label: "Urgent" },
      4: { variant: "outline" as const, label: "Semi-Urgent" },
    }
    return variants[level as keyof typeof variants] || variants[4]
  }

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
              <h1 className="text-2xl font-bold">{"Medical Staff Dashboard"}</h1>
              <p className="text-sm text-muted-foreground">{"Dr. Sarah Johnson • Day Shift"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              {"12 Patients Today"}
            </Badge>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-accent text-accent-foreground">{"SJ"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="patients">
              <Users className="mr-2 h-4 w-4" />
              {"Patients"}
            </TabsTrigger>
            <TabsTrigger value="queue">
              <Ticket className="mr-2 h-4 w-4" />
              {"Queue"}
            </TabsTrigger>
            <TabsTrigger value="er-queue">
              <ClipboardList className="mr-2 h-4 w-4" />
              {"ER Queue"}
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              {"Appointments"}
            </TabsTrigger>
            <TabsTrigger value="staff">
              <Activity className="mr-2 h-4 w-4" />
              {"Staff"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            {/* Search and Stats */}
            <div className="grid gap-4 lg:grid-cols-4">
              <Card className="lg:col-span-4">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search patients by name, ID, or condition..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Total Patients"}</CardDescription>
                  <CardTitle className="text-3xl">{mockPatients.length}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Active ER Cases"}</CardDescription>
                  <CardTitle className="text-3xl">{activeVisits.length}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Today Appointments"}</CardDescription>
                  <CardTitle className="text-3xl">{todayAppointments.length}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Staff On Duty"}</CardDescription>
                  <CardTitle className="text-3xl">{mockStaff.filter((s) => s.status !== "off-duty").length}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Patient List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{"Patient Records"}</CardTitle>
                    <CardDescription>{"Access and manage patient information"}</CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {"Add Patient"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>
                              {"ID: "}
                              {patient.id}
                            </span>
                            <span>{"•"}</span>
                            <span>
                              {patient.age}
                              {" years"}
                            </span>
                            <span>{"•"}</span>
                            <span>{patient.gender}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge variant="secondary">{patient.bloodType}</Badge>
                          {patient.allergies.length > 0 && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                              <AlertCircle className="h-3 w-3" />
                              {patient.allergies.length}
                              {" allergies"}
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          {"View Record"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queue" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Waiting"}</CardDescription>
                  <CardTitle className="text-3xl">{mockTickets.filter((t) => t.status === "waiting").length}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Called"}</CardDescription>
                  <CardTitle className="text-3xl">{mockTickets.filter((t) => t.status === "called").length}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"In Service"}</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockTickets.filter((t) => t.status === "in-service").length}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Avg Wait Time"}</CardDescription>
                  <CardTitle className="text-3xl">{"47m"}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{"Active Queue Tickets"}</CardTitle>
                    <CardDescription>{"Manage patient queue and wait times"}</CardDescription>
                  </div>
                  <Button>
                    <Ticket className="mr-2 h-4 w-4" />
                    {"Issue New Ticket"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTickets
                    .filter((t) => t.status !== "completed")
                    .sort((a, b) => a.queueNumber - b.queueNumber)
                    .map((ticket) => {
                      const triage = getTriageBadge(ticket.triageLevel)
                      return (
                        <div key={ticket.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex min-w-16 flex-col items-center gap-1 rounded-lg bg-primary/10 p-3">
                              <span className="text-2xl font-bold text-primary">#{ticket.queueNumber}</span>
                              <Badge variant="outline" className="text-xs" {...triage}>
                                {`L${ticket.triageLevel}`}
                              </Badge>
                            </div>
                            <div>
                              <p className="font-medium">{ticket.patientName}</p>
                              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {"Issued: "}
                                  {ticket.issueTime.split(" ")[1]}
                                </span>
                                <span>{"•"}</span>
                                <span>
                                  {"Wait: "}
                                  {ticket.estimatedWaitTime}
                                  {"m"}
                                </span>
                                <span>{"•"}</span>
                                <span>{ticket.department}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                ticket.status === "called"
                                  ? "default"
                                  : ticket.status === "in-service"
                                    ? "default"
                                    : "secondary"
                              }
                              className="capitalize"
                            >
                              {ticket.status === "in-service" ? "In Service" : ticket.status}
                            </Badge>
                            {ticket.status === "waiting" && (
                              <Button variant="outline" size="sm">
                                {"Call Patient"}
                              </Button>
                            )}
                            {ticket.status === "called" && <Button size="sm">{"Begin Service"}</Button>}
                            {ticket.status === "in-service" && (
                              <Button variant="outline" size="sm">
                                {"Complete"}
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="er-queue" className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Waiting"}</CardDescription>
                  <CardTitle className="text-3xl">{mockVisits.filter((v) => v.status === "waiting").length}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"In Progress"}</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockVisits.filter((v) => v.status === "in-progress").length}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Critical Cases"}</CardDescription>
                  <CardTitle className="text-3xl text-destructive">
                    {mockVisits.filter((v) => v.triageLevel <= 2).length}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Avg Wait Time"}</CardDescription>
                  <CardTitle className="text-3xl">{"47m"}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{"Emergency Room Queue"}</CardTitle>
                <CardDescription>{"Real-time patient queue sorted by triage priority"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVisits
                    .filter((v) => v.status !== "completed")
                    .sort((a, b) => a.triageLevel - b.triageLevel)
                    .map((visit) => {
                      const triage = getTriageBadge(visit.triageLevel)
                      const waitTime = visit.doctorSeenTime
                        ? "In Treatment"
                        : `${Math.floor(Math.random() * 45 + 15)}m waiting`

                      return (
                        <div key={visit.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center gap-1">
                              <Badge {...triage}>{`L${visit.triageLevel}`}</Badge>
                              <span className="text-xs text-muted-foreground">{triage.label}</span>
                            </div>
                            <div>
                              <p className="font-medium">{visit.patientName}</p>
                              <p className="text-sm text-muted-foreground">{visit.chiefComplaint}</p>
                              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {"Arrived: "}
                                  {visit.arrivalTime.split(" ")[1]}
                                </span>
                                <span>{waitTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={visit.status === "in-progress" ? "default" : "secondary"}>
                              {visit.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {"Begin Treatment"}
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{"Today's Appointments"}</CardTitle>
                    <CardDescription>{"Scheduled patient visits"}</CardDescription>
                  </div>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    {"Schedule Appointment"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1 rounded-lg bg-primary/10 p-3">
                          <span className="text-xs font-medium text-primary">{appointment.time.split(" ")[0]}</span>
                          <span className="text-xs text-muted-foreground">{appointment.time.split(" ")[1]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{appointment.patientName}</p>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {"with "}
                            {appointment.doctorName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.triageLevel && (
                          <Badge {...getTriageBadge(appointment.triageLevel)}>
                            {`Level ${appointment.triageLevel}`}
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          {"View Details"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{"Staff Overview"}</CardTitle>
                <CardDescription>{"Current staff on duty and availability"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockStaff.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-accent/10 text-accent">
                            {staff.name.split(" ").slice(-1)[0].substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline" className="capitalize">
                              {staff.role}
                            </Badge>
                            <span>{"•"}</span>
                            <span className="capitalize">
                              {staff.shift}
                              {" shift"}
                            </span>
                            <span>{"•"}</span>
                            <span>
                              {staff.patientsToday}
                              {" patients today"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          staff.status === "available" ? "default" : staff.status === "busy" ? "secondary" : "outline"
                        }
                        className="capitalize"
                      >
                        {staff.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
