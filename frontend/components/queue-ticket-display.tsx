"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Hash, AlertTriangle, CheckCircle2 } from "lucide-react"
import type { QueueTicket } from "@/lib/mock-data"

interface QueueTicketDisplayProps {
  ticket: QueueTicket
}

export function QueueTicketDisplay({ ticket }: QueueTicketDisplayProps) {
  const getStatusColor = (status: QueueTicket["status"]) => {
    switch (status) {
      case "waiting":
        return "secondary"
      case "called":
        return "default"
      case "in-service":
        return "default"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getTriageBadge = (level: number) => {
    const variants = {
      1: { variant: "destructive" as const, label: "Critical", icon: AlertTriangle },
      2: { variant: "default" as const, label: "Emergency", icon: AlertTriangle },
      3: { variant: "secondary" as const, label: "Urgent", icon: Clock },
      4: { variant: "outline" as const, label: "Semi-Urgent", icon: Clock },
    }
    return variants[level as keyof typeof variants] || variants[4]
  }

  const triage = getTriageBadge(ticket.triageLevel)
  const TriageIcon = triage.icon

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{"Queue Ticket"}</CardTitle>
            <CardDescription>{ticket.department}</CardDescription>
          </div>
          <Badge variant={getStatusColor(ticket.status)} className="text-xs capitalize">
            {ticket.status === "in-service" ? "In Service" : ticket.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-primary/10 p-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Hash className="h-6 w-6 text-primary" />
            <span className="text-5xl font-bold text-primary">{ticket.queueNumber}</span>
          </div>
          <p className="text-sm text-muted-foreground">{"Your Queue Number"}</p>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{"Estimated Wait"}</span>
            </div>
            <span className="text-lg font-bold">
              {ticket.estimatedWaitTime}
              {" min"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <TriageIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{"Priority Level"}</span>
            </div>
            <Badge {...triage}>
              {triage.label}
              {" (L"}
              {ticket.triageLevel}
              {")"}
            </Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{"Issued Time"}</span>
            </div>
            <span className="text-sm font-semibold">{ticket.issueTime.split(" ")[1]}</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-balance text-xs text-muted-foreground">
            {
              "Please stay in the waiting area. You will be called when it's your turn. Estimated wait times may vary based on emergency cases."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
