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

export default function NewFreelancerPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    rating: "4.9",
    status: "available",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Add logic to save freelancer
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/freelancers"
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
          <Link href="/freelancers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add New Freelancer</h1>
      </div>
      <Card className="max-w-xl mx-auto border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Freelancer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => handleChange("name", e.target.value)} required />
            </div>
            <div>
              <Label>Skills</Label>
              <Input value={formData.skills} onChange={e => handleChange("skills", e.target.value)} required />
            </div>
            <div>
              <Label>Rating</Label>
              <Select value={formData.rating} onValueChange={value => handleChange("rating", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.9">4.9</SelectItem>
                  <SelectItem value="4.8">4.8</SelectItem>
                  <SelectItem value="4.7">4.7</SelectItem>
                  <SelectItem value="4.6">4.6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={value => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
