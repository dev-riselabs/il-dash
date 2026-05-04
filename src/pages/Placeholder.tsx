interface Props {
  title: string
  description?: string
}

export default function Placeholder({ title, description }: Props) {
  return (
    <div className="card flex flex-col items-center justify-center min-h-[400px] text-center">
      <h1 className="text-2xl font-medium text-white">{title}</h1>
      <p className="text-sm text-slate-500 mt-2 max-w-md">
        {description ?? 'This module will be implemented in the next build phase.'}
      </p>
    </div>
  )
}
