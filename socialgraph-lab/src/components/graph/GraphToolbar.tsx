import { Download, Upload } from 'lucide-react'
import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { useGraphStore } from '../../store/graphStore'
import type { Graph } from '../../types/graph'

function GraphToolbar() {
  const { graph, setGraph } = useGraphStore()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleExport() {
    const json = JSON.stringify(graph, null, 2)

    const blob = new Blob([json], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'social-network.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const importedGraph = JSON.parse(reader.result as string) as Graph
        setGraph(importedGraph)
      } catch {
        alert('Invalid graph file.')
      }
    }

    reader.readAsText(file)

    event.target.value = ''
  }

  return (
    <div className="flex justify-end gap-3">

      <input
        ref={inputRef}
        type="file"
        accept=".json"
        hidden
        onChange={handleImport}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
      >
        <Upload className="h-4 w-4" />
        Import
      </button>

      <button
        onClick={handleExport}
        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
      >
        <Download className="h-4 w-4" />
        Export
      </button>

    </div>
  )
}

export default GraphToolbar