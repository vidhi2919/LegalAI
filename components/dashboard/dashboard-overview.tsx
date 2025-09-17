"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Documents",
    value: "24",
    description: "3 uploaded this week",
    icon: FileText,
    color: "text-primary",
  },
  {
    title: "Processing",
    value: "2",
    description: "AI analysis in progress",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "High Risk Items",
    value: "5",
    description: "Require attention",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Completed",
    value: "17",
    description: "Ready for review",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Overview</h2>
        <p className="text-muted-foreground">Your document analysis summary</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processing Status */}
      <Card>
        <CardHeader>
          <CardTitle>Document Processing Status</CardTitle>
          <CardDescription>Current analysis progress for your uploaded documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Employment Contract - TechCorp.pdf</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>NDA Agreement - ClientX.docx</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
