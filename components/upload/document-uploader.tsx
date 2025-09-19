"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  file: File
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  error?: string
}

interface DocumentUploaderProps {
  onUploadComplete?: (document: { name: string; size: string; id: string }) => void
}

export function DocumentUploader({ onUploadComplete }: DocumentUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: "uploading" as const,
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id)
    })
  }, [])

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (file.status === "uploading") {
              const newProgress = Math.min(file.progress + Math.random() * 20, 100)
              if (newProgress >= 100) {
                return { ...file, status: "processing", progress: 0 }
              }
              return { ...file, progress: newProgress }
            } else if (file.status === "processing") {
              const newProgress = Math.min(file.progress + Math.random() * 15, 100)
              if (newProgress >= 100) {
                clearInterval(interval)
                const completedFile = { ...file, status: "completed" as const, progress: 100 }
                if (onUploadComplete) {
                  onUploadComplete({
                    name: file.file.name,
                    size: `${(file.file.size / (1024 * 1024)).toFixed(1)} MB`,
                    id: file.id,
                  })
                }
                return completedFile
              }
              return { ...file, progress: newProgress }
            }
          }
          return file
        }),
      )
    }, 500)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Legal Documents</CardTitle>
          <CardDescription>Supported formats: PDF, DOCX, DOC (Max size: 10MB per file)</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{isDragActive ? "Drop files here" : "Drag & drop files here"}</h3>
                <p className="text-muted-foreground">
                  or{" "}
                  <Button variant="link" className="p-0 h-auto">
                    browse files
                  </Button>{" "}
                  from your computer
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
            <CardDescription>Track the status of your document uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{uploadedFile.file.name}</p>
                      <div className="flex items-center space-x-2">
                        {uploadedFile.status === "completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {uploadedFile.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                        <Badge
                          variant={
                            uploadedFile.status === "completed"
                              ? "default"
                              : uploadedFile.status === "error"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {uploadedFile.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {uploadedFile.status === "uploading"
                            ? "Uploading..."
                            : uploadedFile.status === "processing"
                              ? "Processing with AI..."
                              : uploadedFile.status === "completed"
                                ? "Analysis complete"
                                : "Upload failed"}
                        </span>
                        <span>{Math.round(uploadedFile.progress)}%</span>
                      </div>
                      <Progress value={uploadedFile.progress} className="h-2" />
                    </div>

                    {uploadedFile.error && <p className="text-xs text-destructive">{uploadedFile.error}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
