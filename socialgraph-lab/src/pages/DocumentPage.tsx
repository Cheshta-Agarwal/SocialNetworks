import { docPages } from '../data/siteContent'

function DocumentPage() {
  const pages = Object.values(docPages)

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-slate-900/40 to-indigo-400/10 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          Project Documentation
        </p>

        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          PlacementConnect
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          This page brings together the complete project documentation,
          including the vision, architecture, functional requirements, and
          development roadmap in one place.
        </p>
      </section>

      {pages.map((page) => (
        <section key={page.title} className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
              {page.eyebrow}
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-white">
              {page.title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              {page.summary}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {page.sections.map((section) => (
              <article
                key={section.heading}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20"
              >
                <h3 className="text-lg font-semibold text-white">
                  {section.heading}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default DocumentPage