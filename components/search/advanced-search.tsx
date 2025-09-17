"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, X } from "lucide-react"

interface AdvancedSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filters: any
  onFiltersChange: (filters: any) => void
}

const documentTypes = ["PDF", "DOCX", "DOC"]
const riskLevels = ["High", "Medium", "Low"]
const categories = ["Contracts", "Agreements", "Legal Briefs", "NDAs"]

export function AdvancedSearch({ searchQuery, onSearchChange, filters, onFiltersChange }: AdvancedSearchProps) {
  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    const currentValues = filters[filterType] || []
    const newValues = checked ? [...currentValues, value] : currentValues.filter((v: string) => v !== value)

    onFiltersChange({
      ...filters,
      [filterType]: newValues,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      documentTypes: [],
      riskLevels: [],
      dateRange: null,
      categories: [],
    })
  }

  const hasActiveFilters = Object.values(filters).some((filter: any) =>
    Array.isArray(filter) ? filter.length > 0 : filter !== null,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search for specific terms, clauses, or content</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="e.g., 'termination clause', 'non-compete', 'confidentiality'"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Document Types */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Document Types</Label>
            <div className="space-y-2">
              {documentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.documentTypes?.includes(type)}
                    onCheckedChange={(checked) => handleFilterChange("documentTypes", type, checked as boolean)}
                  />
                  <Label htmlFor={`type-${type}`} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Levels */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Risk Levels</Label>
            <div className="space-y-2">
              {riskLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`risk-${level}`}
                    checked={filters.riskLevels?.includes(level)}
                    onCheckedChange={(checked) => handleFilterChange("riskLevels", level, checked as boolean)}
                  />
                  <Label htmlFor={`risk-${level}`} className="text-sm">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Categories</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${category}`}
                    checked={filters.categories?.includes(category)}
                    onCheckedChange={(checked) => handleFilterChange("categories", category, checked as boolean)}
                  />
                  <Label htmlFor={`cat-${category}`} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Actions</Label>
            <div className="space-y-2">
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full bg-transparent">
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Save Search
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
