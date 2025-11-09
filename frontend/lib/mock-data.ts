// Mock data for the healthcare dashboard system

export type UserRole = "patient" | "staff" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  insuranceType: string
  bloodType: string
  allergies: string[]
  conditions: string[]
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorName: string
  date: string
  time: string
  type: string
  status: "scheduled" | "completed" | "cancelled"
  triageLevel?: number
}

export interface Visit {
  id: string
  patientId: string
  patientName: string
  arrivalTime: string
  triageTime: string
  triageLevel: number
  doctorSeenTime?: string
  exitTime?: string
  status: "waiting" | "in-progress" | "completed"
  chiefComplaint: string
}

export interface StaffMember {
  id: string
  name: string
  role: "doctor" | "nurse" | "specialist"
  shift: "day" | "evening" | "night"
  patientsToday: number
  status: "available" | "busy" | "off-duty"
}

export interface QueueTicket {
  id: string
  patientId: string
  patientName: string
  issueTime: string
  queueNumber: number
  estimatedWaitTime: number
  triageLevel: number
  status: "waiting" | "called" | "in-service" | "completed"
  department: string
}

export interface Survey {
  id: string
  patientId: string
  patientName: string
  visitId: string
  submittedDate: string
  ratings: {
    overallExperience: number
    waitTime: number
    staffProfessionalism: number
    cleanliness: number
    communication: number
  }
  wouldRecommend: boolean
  comments?: string
}

// Mock current user
export const mockUsers: User[] = [
  { id: "1", name: "John Patient", email: "patient@example.com", role: "patient" },
  { id: "2", name: "Dr. Sarah Johnson", email: "doctor@example.com", role: "staff" },
  { id: "3", name: "Admin User", email: "admin@example.com", role: "admin" },
]

// Mock patient data
export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Patient",
    age: 45,
    gender: "Male",
    insuranceType: "Private",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
  },
  {
    id: "P002",
    name: "Emily Davis",
    age: 32,
    gender: "Female",
    insuranceType: "Medicare",
    bloodType: "A+",
    allergies: [],
    conditions: ["Asthma"],
  },
  {
    id: "P003",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    insuranceType: "Private",
    bloodType: "B-",
    allergies: ["Latex"],
    conditions: ["Coronary Artery Disease"],
  },
  {
    id: "P004",
    name: "Lisa Anderson",
    age: 28,
    gender: "Female",
    insuranceType: "Medicaid",
    bloodType: "AB+",
    allergies: [],
    conditions: [],
  },
  {
    id: "P005",
    name: "Robert Wilson",
    age: 71,
    gender: "Male",
    insuranceType: "Medicare",
    bloodType: "O-",
    allergies: ["Sulfa drugs"],
    conditions: ["COPD", "Osteoarthritis"],
  },
]

// Mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "John Patient",
    doctorName: "Dr. Sarah Johnson",
    date: "2025-11-15",
    time: "10:00 AM",
    type: "Follow-up",
    status: "scheduled",
  },
  {
    id: "A002",
    patientId: "P001",
    patientName: "John Patient",
    doctorName: "Dr. Michael Lee",
    date: "2025-11-08",
    time: "2:00 PM",
    type: "Consultation",
    status: "completed",
  },
  {
    id: "A003",
    patientId: "P002",
    patientName: "Emily Davis",
    doctorName: "Dr. Sarah Johnson",
    date: "2025-11-10",
    time: "11:30 AM",
    type: "Check-up",
    status: "scheduled",
    triageLevel: 3,
  },
  {
    id: "A004",
    patientId: "P003",
    patientName: "Michael Brown",
    doctorName: "Dr. James Wilson",
    date: "2025-11-09",
    time: "9:00 AM",
    type: "Emergency",
    status: "scheduled",
    triageLevel: 2,
  },
]

// Mock ER visits
export const mockVisits: Visit[] = [
  {
    id: "V001",
    patientId: "P002",
    patientName: "Emily Davis",
    arrivalTime: "2025-11-08 08:30",
    triageTime: "2025-11-08 08:35",
    triageLevel: 3,
    doctorSeenTime: "2025-11-08 09:15",
    status: "in-progress",
    chiefComplaint: "Chest pain",
  },
  {
    id: "V002",
    patientId: "P003",
    patientName: "Michael Brown",
    arrivalTime: "2025-11-08 09:00",
    triageTime: "2025-11-08 09:05",
    triageLevel: 2,
    status: "waiting",
    chiefComplaint: "Severe abdominal pain",
  },
  {
    id: "V003",
    patientId: "P004",
    patientName: "Lisa Anderson",
    arrivalTime: "2025-11-08 07:45",
    triageTime: "2025-11-08 07:50",
    triageLevel: 4,
    doctorSeenTime: "2025-11-08 08:30",
    exitTime: "2025-11-08 09:45",
    status: "completed",
    chiefComplaint: "Minor laceration",
  },
  {
    id: "V004",
    patientId: "P005",
    patientName: "Robert Wilson",
    arrivalTime: "2025-11-08 10:15",
    triageTime: "2025-11-08 10:18",
    triageLevel: 1,
    doctorSeenTime: "2025-11-08 10:20",
    status: "in-progress",
    chiefComplaint: "Difficulty breathing",
  },
]

// Mock staff
export const mockStaff: StaffMember[] = [
  {
    id: "S001",
    name: "Dr. Sarah Johnson",
    role: "doctor",
    shift: "day",
    patientsToday: 12,
    status: "busy",
  },
  {
    id: "S002",
    name: "Dr. Michael Lee",
    role: "doctor",
    shift: "day",
    patientsToday: 8,
    status: "available",
  },
  {
    id: "S003",
    name: "Nurse Jennifer White",
    role: "nurse",
    shift: "day",
    patientsToday: 15,
    status: "busy",
  },
  {
    id: "S004",
    name: "Dr. James Wilson",
    role: "specialist",
    shift: "evening",
    patientsToday: 6,
    status: "available",
  },
  {
    id: "S005",
    name: "Nurse Maria Garcia",
    role: "nurse",
    shift: "evening",
    patientsToday: 10,
    status: "busy",
  },
]

export const mockTickets: QueueTicket[] = [
  {
    id: "T001",
    patientId: "P002",
    patientName: "Emily Davis",
    issueTime: "2025-11-08 08:30",
    queueNumber: 15,
    estimatedWaitTime: 35,
    triageLevel: 3,
    status: "in-service",
    department: "Emergency Room",
  },
  {
    id: "T002",
    patientId: "P003",
    patientName: "Michael Brown",
    issueTime: "2025-11-08 09:00",
    queueNumber: 16,
    estimatedWaitTime: 45,
    triageLevel: 2,
    status: "waiting",
    department: "Emergency Room",
  },
  {
    id: "T003",
    patientId: "P005",
    patientName: "Robert Wilson",
    issueTime: "2025-11-08 10:15",
    queueNumber: 17,
    estimatedWaitTime: 15,
    triageLevel: 1,
    status: "called",
    department: "Emergency Room",
  },
  {
    id: "T004",
    patientId: "P004",
    patientName: "Lisa Anderson",
    issueTime: "2025-11-08 10:30",
    queueNumber: 18,
    estimatedWaitTime: 60,
    triageLevel: 4,
    status: "waiting",
    department: "Emergency Room",
  },
  {
    id: "T005",
    patientId: "P001",
    patientName: "John Patient",
    issueTime: "2025-11-08 10:45",
    queueNumber: 19,
    estimatedWaitTime: 75,
    triageLevel: 3,
    status: "waiting",
    department: "Emergency Room",
  },
]

export const mockSurveys: Survey[] = [
  {
    id: "SV001",
    patientId: "P004",
    patientName: "Lisa Anderson",
    visitId: "V003",
    submittedDate: "2025-11-08",
    ratings: {
      overallExperience: 5,
      waitTime: 4,
      staffProfessionalism: 5,
      cleanliness: 5,
      communication: 5,
    },
    wouldRecommend: true,
    comments: "Excellent care and very professional staff. The wait time was reasonable.",
  },
  {
    id: "SV002",
    patientId: "P002",
    patientName: "Emily Davis",
    visitId: "V001",
    submittedDate: "2025-11-07",
    ratings: {
      overallExperience: 3,
      waitTime: 2,
      staffProfessionalism: 4,
      cleanliness: 4,
      communication: 4,
    },
    wouldRecommend: true,
    comments: "Good care but the wait time was too long. Staff was helpful once seen.",
  },
  {
    id: "SV003",
    patientId: "P003",
    patientName: "Michael Brown",
    visitId: "V002",
    submittedDate: "2025-11-06",
    ratings: {
      overallExperience: 4,
      waitTime: 4,
      staffProfessionalism: 5,
      cleanliness: 4,
      communication: 4,
    },
    wouldRecommend: true,
    comments: "Very satisfied with the emergency care received. Dr. Johnson was excellent.",
  },
  {
    id: "SV004",
    patientId: "P001",
    patientName: "John Patient",
    visitId: "V005",
    submittedDate: "2025-11-05",
    ratings: {
      overallExperience: 4,
      waitTime: 3,
      staffProfessionalism: 5,
      cleanliness: 5,
      communication: 4,
    },
    wouldRecommend: true,
    comments: "Professional and caring staff. Facility is very clean.",
  },
  {
    id: "SV005",
    patientId: "P005",
    patientName: "Robert Wilson",
    visitId: "V004",
    submittedDate: "2025-11-04",
    ratings: {
      overallExperience: 5,
      waitTime: 5,
      staffProfessionalism: 5,
      cleanliness: 5,
      communication: 5,
    },
    wouldRecommend: true,
    comments: "Outstanding emergency response. I was seen immediately due to my condition.",
  },
]

// Analytics data
export const mockAnalytics = {
  totalPatients: 428,
  avgWaitTime: 47,
  erVisitsToday: 124,
  bedOccupancy: 85,
  patientSatisfaction: 4.2,
  avgLengthOfStay: 2.4,
  approvalRating: 88,
  surveyResponseRate: 67,
  npsScore: 72,
}

export const mockWaitTimeData = [
  { time: "12 AM", minutes: 35 },
  { time: "3 AM", minutes: 28 },
  { time: "6 AM", minutes: 42 },
  { time: "9 AM", minutes: 58 },
  { time: "12 PM", minutes: 65 },
  { time: "3 PM", minutes: 52 },
  { time: "6 PM", minutes: 48 },
  { time: "9 PM", minutes: 41 },
]

export const mockTriageDistribution = [
  { level: "Level 1", count: 45, percentage: 10 },
  { level: "Level 2", count: 90, percentage: 21 },
  { level: "Level 3", count: 180, percentage: 42 },
  { level: "Level 4", count: 113, percentage: 27 },
]
