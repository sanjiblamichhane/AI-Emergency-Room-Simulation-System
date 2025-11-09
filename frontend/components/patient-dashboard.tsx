"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Calendar,
  FileText,
  MessageSquare,
  Activity,
  Heart,
  Droplet,
  AlertTriangle,
  Clock,
  Phone,
  Ticket,
  Star,
} from "lucide-react"
import { mockPatients, mockAppointments, mockTickets } from "@/lib/mock-data"
import { QueueTicketDisplay } from "@/components/queue-ticket-display"
import { SurveyForm } from "@/components/survey-form"

interface PatientDashboardProps {
  onBack: () => void
}

export function PatientDashboard({ onBack }: PatientDashboardProps) {
  const patient = mockPatients[0]
  const patientAppointments = mockAppointments.filter((apt) => apt.patientId === patient.id)
  const patientTicket = mockTickets.find((t) => t.patientId === patient.id)

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
              <h1 className="text-2xl font-bold">{"Patient Portal"}</h1>
              <p className="text-sm text-muted-foreground">
                {"Welcome back, "}
                {patient.name}
              </p>
            </div>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto">
            <TabsTrigger value="overview">
              <Activity className="mr-2 h-4 w-4" />
              {"Overview"}
            </TabsTrigger>
            <TabsTrigger value="ticket">
              <Ticket className="mr-2 h-4 w-4" />
              {"My Ticket"}
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              {"Appointments"}
            </TabsTrigger>
            <TabsTrigger value="records">
              <FileText className="mr-2 h-4 w-4" />
              {"Records"}
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="mr-2 h-4 w-4" />
              {"Messages"}
            </TabsTrigger>
            <TabsTrigger value="survey">
              <Star className="mr-2 h-4 w-4" />
              {"Survey"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {patientTicket && patientTicket.status !== "completed" && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Ticket className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{"Active Queue Ticket"}</CardTitle>
                      <CardDescription>
                        {"You have an active ticket. Queue number: "}
                        <span className="font-bold text-primary">#{patientTicket.queueNumber}</span>
                        {" • Estimated wait: "}
                        <span className="font-bold text-primary">
                          {patientTicket.estimatedWaitTime}
                          {" min"}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Next Appointment"}</CardDescription>
                  <CardTitle className="text-2xl">{"Nov 15"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{"Dr. Sarah Johnson"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Blood Type"}</CardDescription>
                  <CardTitle className="text-2xl">{patient.bloodType}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-destructive" />
                    <p className="text-sm text-muted-foreground">{"Universal Donor"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Active Conditions"}</CardDescription>
                  <CardTitle className="text-2xl">{patient.conditions.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{"Managed conditions"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>{"Allergies"}</CardDescription>
                  <CardTitle className="text-2xl">{patient.allergies.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <p className="text-sm text-muted-foreground">{"Known allergies"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Summary */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{"Health Summary"}</CardTitle>
                  <CardDescription>{"Your current health information"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{"Age"}</span>
                      <span className="text-sm text-muted-foreground">
                        {patient.age}
                        {" years"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{"Gender"}</span>
                      <span className="text-sm text-muted-foreground">{patient.gender}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{"Insurance"}</span>
                      <Badge variant="secondary">{patient.insuranceType}</Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="mb-2 text-sm font-semibold">{"Active Conditions"}</h4>
                    <div className="flex flex-wrap gap-2">
                      {patient.conditions.map((condition) => (
                        <Badge key={condition} variant="outline" className="gap-1">
                          <Heart className="h-3 w-3" />
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="mb-2 text-sm font-semibold">{"Allergies"}</h4>
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{"Upcoming Appointments"}</CardTitle>
                  <CardDescription>{"Your scheduled visits"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patientAppointments
                      .filter((apt) => apt.status === "scheduled")
                      .slice(0, 3)
                      .map((appointment) => (
                        <div key={appointment.id} className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{appointment.type}</p>
                            <p className="text-xs text-muted-foreground">{appointment.doctorName}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {appointment.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                          <Badge>{appointment.status}</Badge>
                        </div>
                      ))}
                  </div>
                  <Button className="mt-4 w-full bg-transparent" variant="outline">
                    {"Schedule New Appointment"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{"Quick Actions"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                    <Phone className="h-6 w-6" />
                    {"Request Prescription Refill"}
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                    <MessageSquare className="h-6 w-6" />
                    {"Message Your Doctor"}
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                    <FileText className="h-6 w-6" />
                    {"View Test Results"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ticket" className="space-y-6">
            {patientTicket ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <QueueTicketDisplay ticket={patientTicket} />
                <Card>
                  <CardHeader>
                    <CardTitle>{"Queue Information"}</CardTitle>
                    <CardDescription>{"Important information about your visit"}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">{"What to expect:"}</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span>{"•"}</span>
                          <span>{"Wait times are estimates and may change based on emergency cases"}</span>
                        </li>
                        <li className="flex gap-2">
                          <span>{"•"}</span>
                          <span>{"Critical patients will be prioritized regardless of queue number"}</span>
                        </li>
                        <li className="flex gap-2">
                          <span>{"•"}</span>
                          <span>{"Please remain in the waiting area so we can call you"}</span>
                        </li>
                        <li className="flex gap-2">
                          <span>{"•"}</span>
                          <span>{"Your queue number will be displayed on the screen when ready"}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="mb-2 font-semibold">{"Current Status:"}</h4>
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-sm">
                          {"There are approximately "}
                          <span className="font-bold text-primary">
                            {
                              mockTickets.filter(
                                (t) => t.queueNumber < patientTicket.queueNumber && t.status === "waiting",
                              ).length
                            }
                          </span>
                          {" patients ahead of you in the queue."}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <Button className="w-full bg-transparent" variant="outline">
                        {"Refresh Wait Time"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{"No Active Ticket"}</CardTitle>
                  <CardDescription>{"You don't have an active queue ticket at this time"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4 py-8">
                    <Ticket className="h-16 w-16 text-muted-foreground" />
                    <p className="text-center text-muted-foreground">
                      {"Queue tickets are issued when you check in at the emergency room or clinic."}
                    </p>
                    <Button>{"Request Virtual Check-In"}</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Existing Appointments tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{"All Appointments"}</CardTitle>
                <CardDescription>{"View and manage your appointments"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-muted-foreground">{appointment.doctorName}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          appointment.status === "completed"
                            ? "secondary"
                            : appointment.status === "cancelled"
                              ? "destructive"
                              : "default"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Existing Records tab */}
          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{"Medical Records"}</CardTitle>
                <CardDescription>{"Access your health documents and history"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Blood Test Results - Oct 2025", date: "Oct 28, 2025", type: "Lab" },
                    { name: "Annual Physical Exam", date: "Sep 15, 2025", type: "Visit" },
                    { name: "Prescription History", date: "Updated Nov 8, 2025", type: "Medication" },
                    { name: "Immunization Records", date: "Updated Jan 10, 2025", type: "Vaccine" },
                  ].map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{record.name}</p>
                          <p className="text-sm text-muted-foreground">{record.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{record.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Existing Messages tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{"Messages"}</CardTitle>
                <CardDescription>{"Communicate with your healthcare providers"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      from: "Dr. Sarah Johnson",
                      subject: "Follow-up on your recent visit",
                      date: "Nov 7, 2025",
                      unread: true,
                    },
                    {
                      from: "Meridian City Pharmacy",
                      subject: "Your prescription is ready",
                      date: "Nov 5, 2025",
                      unread: false,
                    },
                    {
                      from: "Appointment Reminder",
                      subject: "Upcoming appointment on Nov 15",
                      date: "Nov 3, 2025",
                      unread: false,
                    },
                  ].map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                        message.unread ? "bg-primary/5" : ""
                      }`}
                    >
                      <MessageSquare
                        className={`h-5 w-5 ${message.unread ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${message.unread ? "text-primary" : ""}`}>{message.from}</p>
                          <span className="text-xs text-muted-foreground">{message.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.subject}</p>
                      </div>
                      {message.unread && (
                        <Badge variant="default" className="ml-2">
                          {"New"}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full bg-transparent" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {"Compose New Message"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="survey" className="space-y-6">
            <SurveyForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
