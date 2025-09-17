"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Save, X } from "lucide-react"

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: "TechCorp Inc.",
    jobTitle: "Senior Legal Counsel",
    phone: "+1 (555) 123-4567",
    bio: "Experienced legal professional specializing in contract law and corporate governance.",
    location: "San Francisco, CA",
  })

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and professional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?key=profile" alt="Profile" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0" disabled={!isEditing}>
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-muted-foreground">{formData.jobTitle}</p>
              <Badge variant="secondary">Pro Plan</Badge>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
          <CardDescription>Your usage and activity summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Documents Analyzed</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">AI Conversations</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-bold text-primary">89%</div>
              <div className="text-sm text-muted-foreground">Risk Reduction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
