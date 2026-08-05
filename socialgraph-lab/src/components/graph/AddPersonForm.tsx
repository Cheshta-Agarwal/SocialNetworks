import { useState, type FormEvent } from 'react'
import { useGraphStore } from '../../store/graphStore'

function AddPersonForm() {
  const { addNode } = useGraphStore()

  const [displayName, setDisplayName] = useState('')
  const [department, setDepartment] = useState('CSE')
  const [batch, setBatch] = useState('2026')

  const [role, setRole] = useState<
    'Student' | 'Alumni' | 'Recruiter' | 'Faculty'
  >('Student')

  const [company, setCompany] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!displayName.trim()) return

    addNode({
      id: crypto.randomUUID(),

      displayName: displayName.trim(),

      role,

      department,

      batch,

      company: company.trim() || undefined,
    })

    setDisplayName('')
    setCompany('')
    setDepartment('CSE')
    setBatch('2026')
    setRole('Student')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-5"
    >
      <h2 className="mb-5 text-lg font-semibold text-white">
        Add Placement Member
      </h2>

      <div className="space-y-4">

        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Full Name"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value as
                | 'Student'
                | 'Alumni'
                | 'Recruiter'
                | 'Faculty',
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
        >
          <option>Student</option>
          <option>Alumni</option>
          <option>Recruiter</option>
          <option>Faculty</option>
        </select>

        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
        />

        <input
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder="Batch"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
        />

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (Optional)"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white"
        />

      </div>

      <button
        type="submit"
        disabled={!displayName.trim()}
        className="mt-6 w-full rounded-2xl bg-cyan-400 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        Add Member
      </button>
    </form>
  )
}

export default AddPersonForm