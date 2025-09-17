"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Globe, Palette, FileText, Zap } from "lucide-react"

export function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "America/Los_Angeles",
    theme: "system",
    documentView: "split",
    autoSave: true,
    aiSuggestions: true,
    compactMode: false,
    showRiskColors: true,
  })

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Region
          </CardTitle>
          <CardDescription>Set your language and regional preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={preferences.timezone} onValueChange={(value) => handlePreferenceChange("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of your interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">Use smaller spacing and elements</p>
              </div>
              <Switch
                checked={preferences.compactMode}
                onCheckedChange={(value) => handlePreferenceChange("compactMode", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Show Risk Colors</Label>
                <p className="text-sm text-muted-foreground">Display color-coded risk indicators</p>
              </div>
              <Switch
                checked={preferences.showRiskColors}
                onCheckedChange={(value) => handlePreferenceChange("showRiskColors", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Preferences
          </CardTitle>
          <CardDescription>Configure how documents are displayed and handled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Default Document View</Label>
              <Select
                value={preferences.documentView}
                onValueChange={(value) => handlePreferenceChange("documentView", value)}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="split">Split View</SelectItem>
                  <SelectItem value="full">Full Document</SelectItem>
                  <SelectItem value="analysis">Analysis Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto-save</Label>
                <p className="text-sm text-muted-foreground">Automatically save document annotations</p>
              </div>
              <Switch
                checked={preferences.autoSave}
                onCheckedChange={(value) => handlePreferenceChange("autoSave", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Assistant
          </CardTitle>
          <CardDescription>Configure AI behavior and suggestions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>AI Suggestions</Label>
                <p className="text-sm text-muted-foreground">Show proactive AI recommendations</p>
              </div>
              <Switch
                checked={preferences.aiSuggestions}
                onCheckedChange={(value) => handlePreferenceChange("aiSuggestions", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
