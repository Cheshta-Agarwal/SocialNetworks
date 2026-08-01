type MetricCardProps = {
  label: string
  value: string | number
  helperText?: string
}

function MetricCard({ label, value, helperText }: MetricCardProps) {
  return (
    <div className="min-h-[132px] rounded-2xl border border-white/10 bg-slate-950/45 p-4 shadow-lg shadow-slate-950/20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold text-white">
        {value}
      </p>

      {helperText ? (
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

export default MetricCard