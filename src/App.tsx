import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/app-shell/AppShell'
import ShiftBriefing from './pages/ShiftBriefing'
import Patients from './pages/Patients'
import PatientProfile from './pages/PatientProfile'
import Appointments from './pages/Appointments'
import Messages from './pages/Messages'
import Tasks from './pages/Tasks'
import MedicalRecords from './pages/MedicalRecords'
import OperationalInsights from './pages/OperationalInsights'
import DesignSystem from './pages/DesignSystem'
import CaseStudy from './pages/CaseStudy'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/shift-briefing" replace />} />
          <Route path="/shift-briefing" element={<ShiftBriefing />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/meera-iyer" element={<PatientProfile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/operational-insights" element={<OperationalInsights />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/shift-briefing" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
