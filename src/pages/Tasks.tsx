import { useState, Fragment } from 'react'
import { TASKS, ALL_PATIENTS, MEERA_VITALS, type Task } from '../data/careSyncData'
import PageHeader from '../components/shared/PageHeader'
import PatientIdentityBlock from '../components/clinical/PatientIdentityBlock'
import PatientSafetyStrip from '../components/clinical/PatientSafetyStrip'
import SeverityIndicator from '../components/status/SeverityIndicator'
import WorkflowStatus from '../components/status/WorkflowStatus'
import TimingStatus from '../components/status/TimingStatus'
import Button from '../components/buttons/Button'
import Drawer from '../components/drawers/Drawer'
import styles from './Tasks.module.css'

const GROUPS: { key: Task['group']; label: string }[] = [
  { key: 'now', label: 'Now' },
  { key: 'due-this-shift', label: 'Due this shift' },
  { key: 'handed-over', label: 'Handed over to me' },
  { key: 'waiting-on-others', label: 'Waiting on others' },
  { key: 'completed', label: 'Completed' },
]

function getRowAction(task: Task): { label: string; variant: 'primary' | 'secondary' } {
  if (task.patientId === 'CP-10482') return { label: 'Review result', variant: 'primary' }
  if (task.workflow === 'pending-approval') return { label: 'Review prescription', variant: 'primary' }
  return { label: 'Open', variant: 'secondary' }
}

function getDrawerPrimaryLabel(task: Task): string {
  if (task.patientId === 'CP-10482') return 'Review lab result'
  if (task.workflow === 'pending-approval') return 'Review prescription'
  return 'Open'
}

export default function Tasks() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [showCompleteModal, setShowCompleteModal] = useState<Task | null>(null)
  const [completeNote, setCompleteNote] = useState('')
  const [taskWorkflows, setTaskWorkflows] = useState<Record<string, Task['workflow']>>({})

  const getWorkflow = (t: Task) => taskWorkflows[t.id] ?? t.workflow

  const handleComplete = (task: Task) => {
    if (!completeNote.trim()) return
    setCompletedTasks(prev => new Set([...prev, task.id]))
    setTaskWorkflows(prev => ({ ...prev, [task.id]: 'completed' }))
    setShowCompleteModal(null)
    setCompleteNote('')
    setSelectedTask(null)
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Tasks and handovers"
        subtitle="Shift handover generated at 07:45. Tasks are grouped by urgency, ownership, and dependency."
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table} aria-label="Tasks for this shift">
          <thead>
            <tr>
              {['Severity', 'Task', 'Patient', 'Source', 'Owner', 'Due', 'Workflow', 'Action'].map(h => (
                <th key={h} scope="col" className={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUPS.map(group => {
              const groupTasks = TASKS.filter(t => t.group === group.key)
              if (groupTasks.length === 0) return null
              return (
                <Fragment key={group.key}>
                  <tr className={styles.groupRow}>
                    <td colSpan={8} className={styles.groupCell}>
                      <span className={styles.groupTitle}>{group.label}</span>
                      <span className={styles.groupCount}>{groupTasks.length}</span>
                    </td>
                  </tr>
                  {groupTasks.map(task => {
                    const isDone = completedTasks.has(task.id)
                    const isSelected = selectedTask?.id === task.id
                    const rowAction = getRowAction(task)
                    return (
                      <tr
                        key={task.id}
                        className={`${styles.tr} ${isDone ? styles.trDone : ''} ${isSelected ? styles.trActive : ''}`}
                        onClick={() => setSelectedTask(task)}
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedTask(task)
                          }
                        }}
                        aria-selected={isSelected}
                      >
                        <td className={styles.td}>
                          <SeverityIndicator severity={task.severity} compact showDot />
                        </td>
                        <td className={styles.td}>
                          <div className={`${styles.taskTitle} ${isDone ? styles.taskTitleDone : ''}`}>
                            {task.title}
                          </div>
                        </td>
                        <td className={styles.td}>
                          {task.patientName ? (
                            <div>
                              <div className={styles.taskPatient}>{task.patientName}</div>
                              <div className={styles.taskPatientId}>{task.patientId}</div>
                            </div>
                          ) : <span className={styles.noPatient}>—</span>}
                        </td>
                        <td className={styles.td}>
                          <span className={styles.source}>{task.source}</span>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.owner}>{task.owner}</span>
                        </td>
                        <td className={styles.td}>
                          <TimingStatus timing={task.timing} dueTime={task.dueTime} compact />
                        </td>
                        <td className={styles.td}>
                          <WorkflowStatus status={getWorkflow(task)} compact />
                        </td>
                        <td className={styles.td} onClick={e => e.stopPropagation()}>
                          {isDone ? (
                            <span className={styles.doneMark} aria-label="Completed">✓ Done</span>
                          ) : (
                            <div className={styles.taskActions}>
                              <Button
                                variant={rowAction.variant}
                                size="sm"
                                onClick={() => setSelectedTask(task)}
                              >
                                {rowAction.label}
                              </Button>
                              <Button
                                variant={rowAction.variant === 'primary' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => { setShowCompleteModal(task); setSelectedTask(null) }}
                              >
                                Complete
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Task detail drawer */}
      <Drawer
        open={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        title="Task detail"
        closeLabel="Close task detail"
      >
        {selectedTask && (() => {
          const patient = selectedTask.patientId
            ? (ALL_PATIENTS.find(p => p.patientId === selectedTask.patientId) ?? null)
            : null
          const isMeera = selectedTask.patientId === 'CP-10482'
          const isRohan = selectedTask.patientId === 'CP-10118'
          const isHandedOver = selectedTask.group === 'handed-over'
          const isDone = completedTasks.has(selectedTask.id)

          return (
            <div className={styles.drawerContent}>
              <div className={styles.drawerSeverity}>
                <SeverityIndicator severity={selectedTask.severity} />
              </div>
              <div className={styles.drawerTitle}>{selectedTask.title}</div>

              {patient && (
                <PatientIdentityBlock
                  patient={patient}
                  appointmentTime={isMeera ? '09:00' : undefined}
                />
              )}
              {patient && patient.allergies.length > 0 && (
                <PatientSafetyStrip allergies={patient.allergies} />
              )}

              {isMeera && (
                <div className={styles.clinicalBlock}>
                  <div className={styles.clinicalBlockTitle}>Lab result · Fasting Glucose</div>
                  <div className={styles.clinicalRow}>
                    <span className={styles.clinicalLabel}>Result</span>
                    <span className={styles.clinicalValueWarning}>
                      {MEERA_VITALS.fastingGlucose.current} {MEERA_VITALS.fastingGlucose.unit}
                    </span>
                  </div>
                  <div className={styles.clinicalRow}>
                    <span className={styles.clinicalLabel}>Previous</span>
                    <span className={styles.clinicalValueMuted}>
                      {MEERA_VITALS.fastingGlucose.previous} {MEERA_VITALS.fastingGlucose.unit}
                      {' '}· +{MEERA_VITALS.fastingGlucose.change}
                    </span>
                  </div>
                  <div className={styles.clinicalInterpretation}>
                    Above target range · Review before 09:00 consultation
                  </div>
                  <div className={styles.clinicalSource}>Central Laboratory · Today 07:45</div>
                </div>
              )}

              <div className={styles.drawerGrid}>
                <div className={styles.drawerRow}>
                  <span className={styles.drawerLabel}>Source</span>
                  <span className={styles.drawerValue}>{selectedTask.source}</span>
                </div>
                <div className={styles.drawerRow}>
                  <span className={styles.drawerLabel}>Owner</span>
                  <span className={styles.drawerValue}>{selectedTask.owner}</span>
                </div>
                <div className={styles.drawerRow}>
                  <span className={styles.drawerLabel}>Due</span>
                  <TimingStatus timing={selectedTask.timing} dueTime={selectedTask.dueTime} />
                </div>
                <div className={styles.drawerRow}>
                  <span className={styles.drawerLabel}>Workflow</span>
                  <WorkflowStatus status={taskWorkflows[selectedTask.id] ?? selectedTask.workflow} />
                </div>
              </div>

              {isHandedOver && (
                <div className={styles.handoverBlock}>
                  <div className={styles.handoverLabel}>Handover details</div>
                  <div className={styles.drawerRow}>
                    <span className={styles.drawerLabel}>From</span>
                    <span className={styles.drawerValue}>{selectedTask.handoverFrom}</span>
                  </div>
                  <div className={styles.drawerRow}>
                    <span className={styles.drawerLabel}>Reason</span>
                    <span className={styles.drawerValue}>{selectedTask.handoverReason}</span>
                  </div>
                  <div className={styles.drawerRow}>
                    <span className={styles.drawerLabel}>Acknowledged</span>
                    <span className={styles.drawerValue}>
                      {(taskWorkflows[selectedTask.id] === 'acknowledged' || selectedTask.acknowledged)
                        ? 'Yes' : 'Not yet'}
                    </span>
                  </div>
                </div>
              )}

              <div className={styles.drawerActions}>
                <Button variant="primary" size="md" fullWidth>
                  {getDrawerPrimaryLabel(selectedTask)}
                </Button>
                {isRohan && (
                  <Button variant="secondary" size="md" fullWidth>
                    Message Nurse Priya
                  </Button>
                )}
                {isHandedOver && (
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={() => setTaskWorkflows(prev => ({
                      ...prev,
                      [selectedTask.id]: 'acknowledged',
                    }))}
                  >
                    Acknowledge handover
                  </Button>
                )}
                {!isDone && (
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={() => { setSelectedTask(null); setShowCompleteModal(selectedTask) }}
                  >
                    Mark as complete
                  </Button>
                )}
              </div>
            </div>
          )
        })()}
      </Drawer>

      {/* Complete task modal */}
      {showCompleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Complete task">
            <div className={styles.modalTitle}>Complete task</div>
            <div className={styles.modalTaskTitle}>{showCompleteModal.title}</div>
            <label className={styles.modalLabel} htmlFor="complete-note">
              Completion note <span className={styles.required}>required</span>
            </label>
            <textarea
              id="complete-note"
              className={styles.modalTextarea}
              rows={3}
              placeholder="Briefly describe what was done or any relevant observations…"
              value={completeNote}
              onChange={e => setCompleteNote(e.target.value)}
            />
            <div className={styles.modalActions}>
              <Button
                variant="primary"
                size="md"
                disabled={!completeNote.trim()}
                onClick={() => handleComplete(showCompleteModal)}
              >
                Confirm completion
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => { setShowCompleteModal(null); setCompleteNote('') }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
