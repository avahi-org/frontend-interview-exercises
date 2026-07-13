import { Link } from 'react-router-dom'
import { ArrowRight, Bug, KanbanSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'

const exercises = [
  {
    to: '/cart-debug',
    icon: Bug,
    label: 'Exercise 1',
    title: 'Debug the Storefront',
    description:
      'A complete shopping cart with a handful of bugs. Reproduce, triage, and fix them — talk through your reasoning as you go.',
  },
  {
    to: '/board',
    icon: KanbanSquare,
    label: 'Exercise 2',
    title: 'Build the Board',
    description:
      'A working Kanban board missing one key feature: drag-and-drop. The data layer is done — wire up dragging cards between and within columns however you like.',
  },
]

export function Home() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Frontend Interview Exercises</h2>
        <p className="text-sm text-muted-foreground">Pick an exercise to begin.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {exercises.map((exercise) => {
          const Icon = exercise.icon
          return (
            <Link key={exercise.to} to={exercise.to} className="group">
              <Card className="h-full transition-colors group-hover:border-foreground/30">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {exercise.label}
                  </p>
                  <CardTitle className="flex items-center gap-2">
                    {exercise.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{exercise.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
