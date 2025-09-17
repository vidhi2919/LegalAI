"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Folder, FileText, Star, Clock, Archive, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface DocumentFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedRisk: string
  onRiskChange: (risk: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

const categories = [
  { id: "all", name: "All Documents", icon: FileText, count: 24 },
  { id: "recent", name: "Recent", icon: Clock, count: 8 },
  { id: "favorites", name: "Favorites", icon: Star, count: 5 },
  { id: "contracts", name: "Contracts", icon: Folder, count: 12 },
  { id: "agreements", name: "Agreements", icon: Folder, count: 7 },
  { id: "legal-briefs", name: "Legal Briefs", icon: Folder, count: 3 },
  { id: "archived", name: "Archived", icon: Archive, count: 15 },
]

const riskLevels = [
  { id: "all", name: "All Risk Levels", icon: Info, count: 24 },
  { id: "high", name: "High Risk", icon: AlertTriangle, count: 5, color: "text-red-600" },
  { id: "medium", name: "Medium Risk", icon: AlertTriangle, count: 12, color: "text-yellow-600" },
  { id: "low", name: "Low Risk", icon: CheckCircle, count: 7, color: "text-green-600" },
]

const sortOptions = [
  { id: "recent", name: "Recently Added" },
  { id: "name", name: "Name (A-Z)" },
  { id: "size", name: "File Size" },
  { id: "risk", name: "Risk Level" },
  { id: "type", name: "Document Type" },
]

export function DocumentFilters({
  selectedCategory,
  onCategoryChange,
  selectedRisk,
  onRiskChange,
  sortBy,
  onSortChange,
}: DocumentFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              className="w-full justify-between"
              onClick={() => onCategoryChange(category.id)}
            >
              <div className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                <span className="text-sm">{category.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Risk Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Risk Level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {riskLevels.map((risk) => (
            <Button
              key={risk.id}
              variant={selectedRisk === risk.id ? "secondary" : "ghost"}
              className="w-full justify-between"
              onClick={() => onRiskChange(risk.id)}
            >
              <div className="flex items-center gap-2">
                <risk.icon className={`h-4 w-4 ${risk.color || ""}`} />
                <span className="text-sm">{risk.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {risk.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Sort Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              variant={sortBy === option.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSortChange(option.id)}
            >
              <span className="text-sm">{option.name}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
