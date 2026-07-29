import type { PageDefinition } from '../data/siteContent'

type DocumentPageProps = {
  page: PageDefinition
}

function DocumentPage({ page }: DocumentPageProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/70">
          {page.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {page.title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">{page.summary}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {page.sections.map((section) => (
          <article key={section.heading} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">{section.heading}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default DocumentPage