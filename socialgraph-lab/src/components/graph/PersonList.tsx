import { GraduationCap, BriefcaseBusiness, UserCheck, Users } from 'lucide-react'
import { useGraphStore } from '../../store/graphStore'

function PersonList() {
  const { graph, removeNode } = useGraphStore()

  function roleIcon(role: string) {
    switch (role) {
      case 'Student':
        return <GraduationCap className="h-4 w-4 text-cyan-300" />

      case 'Alumni':
        return <UserCheck className="h-4 w-4 text-emerald-300" />

      case 'Recruiter':
        return <BriefcaseBusiness className="h-4 w-4 text-amber-300" />

      default:
        return <Users className="h-4 w-4 text-violet-300" />
    }
  }

  return (
    <div className="flex h-full flex-col">

      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

        <h2 className="text-sm font-semibold text-white">
          Placement Members ({graph.nodes.length})
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto">

        {graph.nodes.length === 0 && (

          <p className="px-4 py-5 text-sm text-slate-400">

            No members added yet.

          </p>

        )}

        {graph.nodes.map((person) => (

          <div
            key={person.id}
            className="border-b border-white/5 px-4 py-4 transition hover:bg-white/5"
          >

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  {roleIcon(person.role)}

                  <p className="font-semibold text-white">

                    {person.displayName}

                  </p>

                </div>

                <p className="mt-2 text-xs text-slate-400">

                  {person.role}

                </p>

                <p className="text-xs text-slate-400">

                  {person.department} • {person.batch}

                </p>

                {person.company && (

                  <p className="mt-1 text-xs text-cyan-300">

                    {person.company}

                  </p>

                )}

              </div>

              <button
                onClick={() => removeNode(person.id)}
                className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500/20"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default PersonList