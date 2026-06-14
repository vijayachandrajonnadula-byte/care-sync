// Central data source — all screens import from here
// Do not hard-code patient data inside individual components.

export const CURRENT_USER = {
  name: 'Dr. Ananya Rao',
  role: 'General Physician',
  department: 'General Medicine',
  shift: 'Morning Shift',
  setting: 'Outpatient Clinic',
  shiftStart: '07:00',
  currentTime: '08:47 AM',
} as const

// ── Patients ────────────────────────────────────────────────────

export type Sex = 'Male' | 'Female'
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
export type ClinicalSeverity = 'critical' | 'high' | 'moderate' | 'routine' | 'stable'
export type WorkflowStatus =
  | 'new'
  | 'acknowledged'
  | 'under-review'
  | 'assigned'
  | 'waiting'
  | 'blocked'
  | 'completed'
  | 'resolved'
  | 'record-updated'
  | 'pending-approval'
export type TimingStatus = 'overdue' | 'due-now' | 'due-soon' | 'due-later' | 'no-due'
export type OwnershipStatus =
  | 'unassigned'
  | 'assigned-to-me'
  | 'assigned-to-teammate'
  | 'assigned-to-team'
  | 'waiting-external'

export interface Patient {
  id: string
  patientId: string
  name: string
  age: number
  sex: Sex
  bloodGroup: BloodGroup
  allergies: string[]
  conditions: string[]
  assignedPhysician: string
  assignedNurse?: string
  status: 'active' | 'stable' | 'needs-review'
  severity: ClinicalSeverity
}

export interface Appointment {
  id: string
  patientId: string
  time: string
  visitReason: string
  flowStatus: 'scheduled' | 'checked-in' | 'in-consultation' | 'completed' | 'no-show'
  waitingMinutes?: number
  delayMinutes?: number
  checkedInTime?: string
  room?: string
  preparationNote?: string
  clinician: string
}

export interface LabResult {
  id: string
  patientId: string
  test: string
  value: string
  unit: string
  referenceRange: string
  trend: 'up' | 'down' | 'stable'
  collectedAt: string
  reviewStatus: 'new' | 'reviewed'
  owner: string
}

export interface Message {
  id: string
  from: string
  patientId: string | null
  patientName?: string
  subject: string
  body: string
  time: string
  severity: ClinicalSeverity | null
  workflow: WorkflowStatus
  owner: string
  read: boolean
  attachment?: { name: string; type: string; time: string }
}

export interface Task {
  id: string
  title: string
  patientId: string | null
  patientName?: string
  source: string
  owner: string
  dueTime: string
  timing: TimingStatus
  workflow: WorkflowStatus
  severity: ClinicalSeverity
  group: 'now' | 'due-this-shift' | 'handed-over' | 'waiting-on-others' | 'completed'
  handoverFrom?: string
  handoverReason?: string
  acknowledged?: boolean
}

// ── Primary patient: Meera Iyer ──────────────────────────────────

export const MEERA_IYER: Patient = {
  id: 'meera-iyer',
  patientId: 'CP-10482',
  name: 'Meera Iyer',
  age: 42,
  sex: 'Female',
  bloodGroup: 'B+',
  allergies: ['Penicillin'],
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  assignedPhysician: 'Dr. Ananya Rao',
  assignedNurse: 'Nurse Priya',
  status: 'needs-review',
  severity: 'high',
}

export const MEERA_VITALS = {
  fastingGlucose: { current: 142, previous: 118, unit: 'mg/dL', change: +24 },
  bloodPressure: {
    current: { systolic: 145, diastolic: 90 },
    previous: { systolic: 140, diastolic: 88 },
    unit: 'mmHg',
  },
  medicationUpdate: 'Metformin dosage updated five days ago',
}

export const MEERA_GLUCOSE_HISTORY = [
  { month: 'Sep', value: 115 },
  { month: 'Oct', value: 118 },
  { month: 'Nov', value: 122 },
  { month: 'Dec', value: 119 },
  { month: 'Jan', value: 125 },
  { month: 'Today', value: 142 },
]

export const MEERA_BP_HISTORY = [
  { month: 'Sep', systolic: 132, diastolic: 84 },
  { month: 'Oct', systolic: 136, diastolic: 86 },
  { month: 'Nov', systolic: 138, diastolic: 87 },
  { month: 'Dec', systolic: 135, diastolic: 85 },
  { month: 'Jan', systolic: 140, diastolic: 88 },
  { month: 'Today', systolic: 145, diastolic: 90 },
]

export const MEERA_LAB_RESULTS: LabResult[] = [
  {
    id: 'lab-1',
    patientId: 'CP-10482',
    test: 'Fasting Glucose',
    value: '142',
    unit: 'mg/dL',
    referenceRange: '70–100',
    trend: 'up',
    collectedAt: 'Today 07:45',
    reviewStatus: 'new',
    owner: 'Dr. Ananya Rao',
  },
  {
    id: 'lab-2',
    patientId: 'CP-10482',
    test: 'HbA1c',
    value: '7.4',
    unit: '%',
    referenceRange: '<7.0',
    trend: 'up',
    collectedAt: 'Today 07:45',
    reviewStatus: 'new',
    owner: 'Dr. Ananya Rao',
  },
  {
    id: 'lab-3',
    patientId: 'CP-10482',
    test: 'Creatinine',
    value: '0.9',
    unit: 'mg/dL',
    referenceRange: '0.6–1.2',
    trend: 'stable',
    collectedAt: 'Today 07:45',
    reviewStatus: 'reviewed',
    owner: 'Dr. Ananya Rao',
  },
  {
    id: 'lab-4',
    patientId: 'CP-10482',
    test: 'BUN',
    value: '18',
    unit: 'mg/dL',
    referenceRange: '7–25',
    trend: 'stable',
    collectedAt: 'Today 07:45',
    reviewStatus: 'reviewed',
    owner: 'Dr. Ananya Rao',
  },
]

export const MEERA_MEDICATIONS = [
  { name: 'Metformin', dose: '1000 mg', frequency: 'Twice daily', updated: 'Updated 5 days ago', updatedFlag: true },
  { name: 'Amlodipine', dose: '5 mg', frequency: 'Once daily', updated: '', updatedFlag: false },
  { name: 'Losartan', dose: '50 mg', frequency: 'Once daily', updated: '', updatedFlag: false },
]

export const MEERA_APPOINTMENT: Appointment = {
  id: 'appt-meera-1',
  patientId: 'CP-10482',
  time: '09:00',
  visitReason: 'Diabetes & HTN follow-up',
  flowStatus: 'checked-in',
  waitingMinutes: 0,
  room: 'OPD 3',
  preparationNote: 'Glucose review required',
  clinician: 'Dr. Ananya Rao',
}

// ── Secondary patients ───────────────────────────────────────────

export const ARJUN_NAIR: Patient = {
  id: 'arjun-nair',
  patientId: 'CP-10221',
  name: 'Arjun Nair',
  age: 34,
  sex: 'Male',
  bloodGroup: 'O+',
  allergies: [],
  conditions: ['General Consultation'],
  assignedPhysician: 'Dr. Ananya Rao',
  status: 'active',
  severity: 'routine',
}

export const ARJUN_APPOINTMENT: Appointment = {
  id: 'appt-arjun-1',
  patientId: 'CP-10221',
  time: '09:30',
  visitReason: 'General consultation',
  flowStatus: 'checked-in',
  waitingMinutes: 22,
  delayMinutes: 12,
  checkedInTime: '09:08',
  room: undefined,
  preparationNote: 'Room pending',
  clinician: 'Dr. Ananya Rao',
}

export const ROHAN_DAS: Patient = {
  id: 'rohan-das',
  patientId: 'CP-10118',
  name: 'Rohan Das',
  age: 52,
  sex: 'Male',
  bloodGroup: 'A+',
  allergies: [],
  conditions: ['Hypertension'],
  assignedPhysician: 'Dr. Ananya Rao',
  assignedNurse: 'Nurse Priya',
  status: 'needs-review',
  severity: 'moderate',
}

export const KAVYA_MENON: Patient = {
  id: 'kavya-menon',
  patientId: 'CP-10301',
  name: 'Kavya Menon',
  age: 29,
  sex: 'Female',
  bloodGroup: 'AB+',
  allergies: [],
  conditions: ['Thyroid Follow-up'],
  assignedPhysician: 'Dr. Ananya Rao',
  status: 'needs-review',
  severity: 'routine',
}

export const KAVYA_APPOINTMENT: Appointment = {
  id: 'appt-kavya-1',
  patientId: 'CP-10301',
  time: '10:00',
  visitReason: 'Thyroid follow-up',
  flowStatus: 'scheduled',
  preparationNote: 'Report review required',
  clinician: 'Dr. Ananya Rao',
}

export const STABLE_PATIENT: Patient = {
  id: 'sita-krishnan',
  patientId: 'CP-10099',
  name: 'Sita Krishnan',
  age: 65,
  sex: 'Female',
  bloodGroup: 'O-',
  allergies: [],
  conditions: ['Post-operative follow-up'],
  assignedPhysician: 'Dr. Ananya Rao',
  status: 'stable',
  severity: 'stable',
}

export const ALL_PATIENTS: Patient[] = [
  MEERA_IYER,
  ARJUN_NAIR,
  ROHAN_DAS,
  KAVYA_MENON,
  STABLE_PATIENT,
]

export const ALL_APPOINTMENTS: Appointment[] = [
  MEERA_APPOINTMENT,
  ARJUN_APPOINTMENT,
  { id: 'appt-rohan-1', patientId: 'CP-10118', time: '—', visitReason: 'Lisinopril refill', flowStatus: 'scheduled', clinician: 'Dr. Ananya Rao' },
  KAVYA_APPOINTMENT,
]

// ── Messages ─────────────────────────────────────────────────────

export const MESSAGES: Message[] = [
  {
    id: 'msg-1',
    from: 'Nurse Priya',
    patientId: 'CP-10482',
    patientName: 'Meera Iyer',
    subject: 'Abnormal glucose result',
    body: "Meera Iyer's fasting glucose returned at 142 mg/dL, increased from 118 mg/dL. Please review the result before her 09:00 follow-up.",
    time: '07:48 AM',
    severity: 'high',
    workflow: 'new',
    owner: 'Dr. Ananya Rao',
    read: false,
    attachment: { name: 'Comprehensive Metabolic Panel', type: 'Lab result · Today 07:45 · PDF', time: '07:45 AM' },
  },
  {
    id: 'msg-2',
    from: 'Nurse Priya',
    patientId: 'CP-10118',
    patientName: 'Rohan Das',
    subject: 'Lisinopril 10 mg refill request',
    body: 'Rohan Das is requesting a refill of Lisinopril 10 mg. He has been waiting 18 minutes. Please approve before 09:15.',
    time: '08:30 AM',
    severity: 'moderate',
    workflow: 'pending-approval',
    owner: 'Dr. Ananya Rao',
    read: false,
  },
  {
    id: 'msg-3',
    from: 'Lab System',
    patientId: 'CP-10301',
    patientName: 'Kavya Menon',
    subject: 'New diagnostic report available',
    body: 'A new thyroid panel report has been uploaded for Kavya Menon. Review is required before the 10:00 consultation.',
    time: '08:15 AM',
    severity: 'routine',
    workflow: 'new',
    owner: 'Dr. Ananya Rao',
    read: true,
  },
  {
    id: 'msg-4',
    from: 'Dr. Suresh Kumar',
    patientId: null,
    subject: 'Shift handover notes',
    body: 'Handing over 3 tasks from the night shift. Please acknowledge receipt and review the outstanding items.',
    time: 'Yesterday',
    severity: null,
    workflow: 'new',
    owner: 'Dr. Ananya Rao',
    read: true,
  },
]

// ── Tasks ─────────────────────────────────────────────────────────

export const TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Review fasting glucose result before 09:00 consultation',
    patientId: 'CP-10482',
    patientName: 'Meera Iyer',
    source: 'Lab Result #492',
    owner: 'Dr. Ananya Rao',
    dueTime: '09:00',
    timing: 'due-now',
    workflow: 'new',
    severity: 'high',
    group: 'now',
  },
  {
    id: 'task-2',
    title: 'Approve Lisinopril 10 mg prescription refill',
    patientId: 'CP-10118',
    patientName: 'Rohan Das',
    source: 'Nurse Priya',
    owner: 'Dr. Ananya Rao',
    dueTime: '09:15',
    timing: 'due-soon',
    workflow: 'pending-approval',
    severity: 'moderate',
    group: 'now',
  },
  {
    id: 'task-3',
    title: 'Review new diagnostic report before consultation',
    patientId: 'CP-10301',
    patientName: 'Kavya Menon',
    source: 'Lab system',
    owner: 'Dr. Ananya Rao',
    dueTime: 'Before 10:00',
    timing: 'due-soon',
    workflow: 'new',
    severity: 'routine',
    group: 'due-this-shift',
  },
  {
    id: 'task-4',
    title: 'Review missed follow-up list',
    patientId: null,
    source: 'Care Coordination',
    owner: 'Dr. Ananya Rao',
    dueTime: 'This shift',
    timing: 'due-later',
    workflow: 'waiting',
    severity: 'routine',
    group: 'due-this-shift',
  },
  {
    id: 'task-5',
    title: 'Acknowledge night shift handover tasks',
    patientId: null,
    source: 'Night shift handover',
    owner: 'Dr. Ananya Rao',
    dueTime: 'ASAP',
    timing: 'due-now',
    workflow: 'new',
    severity: 'routine',
    group: 'handed-over',
    handoverFrom: 'Dr. Suresh Kumar',
    handoverReason: 'Night shift ended — 3 outstanding tasks',
    acknowledged: false,
  },
  {
    id: 'task-6',
    title: 'Pending lab review — CBC panel',
    patientId: null,
    source: 'Lab Queue',
    owner: 'Dr. Ananya Rao',
    dueTime: 'Today',
    timing: 'due-later',
    workflow: 'waiting',
    severity: 'routine',
    group: 'waiting-on-others',
  },
]

// ── Operational Insights ──────────────────────────────────────────

export const ARRIVALS_DATA = [
  { hour: '07:00', expected: 5, actual: 5 },
  { hour: '08:00', expected: 7, actual: 7 },
  { hour: '09:00', expected: 9, actual: 13 },
  { hour: '10:00', expected: 10, actual: 15 },
  { hour: '11:00', expected: 10, actual: 14 },
  { hour: '12:00', expected: 9, actual: 12 },
  { hour: '13:00', expected: 8, actual: 10 },
  { hour: '14:00', expected: 8, actual: 9 },
  { hour: '15:00', expected: 8, actual: 8 },
  { hour: '16:00', expected: 8, actual: 7 },
]

export const DEPT_WORKLOAD = [
  {
    dept: 'General Medicine',
    active: 14,
    capacity: 16,
    avgWait: '42m',
    status: 'high' as const,
    action: 'Deploy float nurse',
  },
  {
    dept: 'Cardiology',
    active: 8,
    capacity: 12,
    avgWait: '28m',
    status: 'moderate' as const,
    action: 'Monitor closely',
  },
  {
    dept: 'Orthopedics',
    active: 6,
    capacity: 10,
    avgWait: '18m',
    status: 'stable' as const,
    action: 'No action needed',
  },
]

// ── Audit log ─────────────────────────────────────────────────────

export const AUDIT_LOG = [
  {
    id: 'audit-1',
    actor: 'Dr. Ananya Rao',
    action: 'Updated medication',
    record: 'Metformin dosage',
    previousState: '500 mg twice daily',
    newState: '1000 mg twice daily',
    dateTime: 'Today 07:45',
    source: 'Clinical record',
  },
  {
    id: 'audit-2',
    actor: 'Nurse Priya',
    action: 'Uploaded lab result',
    record: 'Fasting glucose — Lab #492',
    previousState: '—',
    newState: '142 mg/dL',
    dateTime: 'Today 07:45',
    source: 'Central Laboratory',
  },
  {
    id: 'audit-3',
    actor: 'Dr. Ananya Rao',
    action: 'Reviewed prescription',
    record: 'Amlodipine 5 mg',
    previousState: '2.5 mg',
    newState: '5 mg',
    dateTime: '5 days ago',
    source: 'Clinical record',
  },
]

// ── Shift briefing summary ────────────────────────────────────────

export const SHIFT_SUMMARY = {
  immediateActions: 3,
  dueThisShift: 4,
  briefingStrip: '1 abnormal result · 2 new patient messages · 1 medication update · 3 inherited tasks',
  followThrough: [
    { workstream: 'Missed follow-ups', items: 2, oldest: 'Oldest 4 days', owner: 'Care coordination', risk: 'Moderate', nextAction: 'Review list' },
    { workstream: 'Pending lab reviews', items: 4, oldest: 'Oldest 2 days', owner: 'Dr. Ananya Rao', risk: 'High', nextAction: 'Open lab queue' },
    { workstream: 'Handover tasks', items: 3, oldest: 'From night shift', owner: 'Morning shift team', risk: 'Moderate', nextAction: 'Acknowledge all' },
    { workstream: 'No-show change', items: '+2 percentage points', oldest: 'This week', owner: 'Admin team', risk: 'Low', nextAction: 'View pattern' },
  ],
}

export const NEXT_90_MIN = [
  { time: '09:00', patient: 'Meera Iyer', patientId: 'CP-10482', visit: 'Diabetes & HTN follow-up', note: 'Review required', severity: 'high' as ClinicalSeverity },
  { time: '09:30', patient: 'Arjun Nair', patientId: 'CP-10221', visit: 'General consultation', note: 'Checked in, waiting', severity: 'routine' as ClinicalSeverity },
  { time: '10:00', patient: 'Kavya Menon', patientId: 'CP-10301', visit: 'Thyroid follow-up', note: 'Report available', severity: 'routine' as ClinicalSeverity },
]
