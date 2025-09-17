"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, MessageSquare, FileText, Search } from "lucide-react"

const actions = [
  {
    title: "Upload New Document",
    description: "Drag & drop or browse files",
    icon: Upload,
    href: "/dashboard/upload",
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "Ask AI Assistant",
    description: "Get instant answers about your contracts",
    icon: MessageSquare,
    href: "/dashboard/chat",
    color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    title: "View Documents",
    description: "Browse your document library",
    icon: FileText,
    href: "/dashboard/documents",
    color: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
  {
    title: "Search Documents",
    description: "Find specific clauses or terms",
    icon: Search,
    href: "/dashboard/search",
    color: "bg-accent text-accent-foreground hover:bg-accent/80",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 text-left bg-transparent"
              asChild
            >
              <a href={action.href}>
                <action.icon className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
