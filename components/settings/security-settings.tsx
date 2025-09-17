"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle } from "lucide-react"

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const activeSessions = [
    {
      id: "1",
      device: "MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "Current session",
      isCurrent: true,
    },
    {
      id: "2",
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "3 days ago",
      isCurrent: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password
          </CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            />
          </div>

          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-muted-foreground">Use an authenticator app to generate verification codes</p>
            </div>
            <div className="flex items-center gap-2">
              {twoFactorEnabled && <Badge variant="secondary">Enabled</Badge>}
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>
          </div>

          {!twoFactorEnabled && (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Recommended Security Enhancement</p>
                  <p className="text-sm text-muted-foreground">
                    Enable two-factor authentication to significantly improve your account security.
                  </p>
                </div>
              </div>
            </div>
          )}

          {twoFactorEnabled && (
            <div className="space-y-3">
              <Button variant="outline">View Recovery Codes</Button>
              <Button variant="outline">Regenerate Codes</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>Manage your active sessions across different devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSessions.map((session, index) => (
              <div key={session.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{session.device}</p>
                      {session.isCurrent && <Badge variant="secondary">Current</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                  {!session.isCurrent && (
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  )}
                </div>
                {index < activeSessions.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="destructive" size="sm">
              Sign Out All Other Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
