"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NewJobPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    status: "active",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Add logic to save job
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/jobs"
    }, 500)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-4 md:p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Post New Job</h1>
      </div>
      <Card className="max-w-xl mx-auto border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Job Title</Label>
              <Input value={formData.title} onChange={e => handleChange("title", e.target.value)} required />
            </div>
            <div>
              <Label>Company</Label>
              <Input value={formData.company} onChange={e => handleChange("company", e.target.value)} required />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={formData.location} onChange={e => handleChange("location", e.target.value)} required />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={formData.type} onValueChange={value => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Salary</Label>
              <Input value={formData.salary} onChange={e => handleChange("salary", e.target.value)} required />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={value => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
