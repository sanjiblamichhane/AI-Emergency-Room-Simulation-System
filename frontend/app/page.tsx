"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Stethoscope, Shield } from "lucide-react"
import { PatientDashboard } from "@/components/patient-dashboard"
import { StaffDashboard } from "@/components/staff-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import type { UserRole } from "@/lib/mock-data"

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  if (selectedRole === "patient") {
    return <PatientDashboard onBack={() => setSelectedRole(null)} />
  }

  if (selectedRole === "staff") {
    return <StaffDashboard onBack={() => setSelectedRole(null)} />
  }

  if (selectedRole === "admin") {
    return <AdminDashboard onBack={() => setSelectedRole(null)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">Meridian City Hospital</h1>
          <p className="text-balance text-lg text-muted-foreground md:text-xl">
            {"Comprehensive Healthcare Management System"}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <UserCircle className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Patient Portal</CardTitle>
              <CardDescription className="text-balance text-center">
                {"Access your health records, appointments, and communicate with providers"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setSelectedRole("patient")} className="w-full" size="lg">
                {"Enter as Patient"}
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-accent/10 p-6">
                  <Stethoscope className="h-12 w-12 text-accent" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Medical Staff</CardTitle>
              <CardDescription className="text-balance text-center">
                {"Manage patient records, appointments, and clinical operations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setSelectedRole("staff")} className="w-full" size="lg" variant="outline">
                {"Enter as Staff"}
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-chart-3/10 p-6">
                  <Shield className="h-12 w-12 text-chart-3" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Administrator</CardTitle>
              <CardDescription className="text-balance text-center">
                {"System oversight, user management, and analytics dashboard"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setSelectedRole("admin")} className="w-full" size="lg" variant="outline">
                {"Enter as Admin"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">{"About This System"}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-medium text-primary">{"Reduce Wait Tiime"}</h3>
              <p className="text-sm text-muted-foreground">
                {"Secure, tailored interfaces for patients, medical staff, and administrators"}
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-primary">{"Gain Visibility"}</h3>
              <p className="text-sm text-muted-foreground">
                {"Built with data privacy and security standards in mind"}
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-primary">{"Patient's Satisfaction"}</h3>
              <p className="text-sm text-muted-foreground">{"Optimized for desktop, tablet, and mobile devices"}</p>
            </div>
          </div>
        </div>
          <p className="text-center">Note: This application is created for Datathon project at East Texas A&M University. 2025.</p>
      </div>
    </div>
  )
}
