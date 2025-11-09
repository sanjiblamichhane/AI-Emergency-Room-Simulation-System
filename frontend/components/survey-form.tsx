"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

export function SurveyForm() {
  const [ratings, setRatings] = useState({
    overallExperience: 0,
    waitTime: 0,
    staffProfessionalism: 0,
    cleanliness: 0,
    communication: 0,
  })
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null)
  const [comments, setComments] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleRating = (category: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="border-2 border-chart-3">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-3/10">
            <ThumbsUp className="h-8 w-8 text-chart-3" />
          </div>
          <CardTitle>{"Thank You for Your Feedback!"}</CardTitle>
          <CardDescription>
            {"Your input helps us improve our services and provide better care for all patients."}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const StarRating = ({ category, label }: { category: keyof typeof ratings; label: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRating(category, value)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                value <= ratings[category] ? "fill-chart-4 text-chart-4" : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Patient Satisfaction Survey"}</CardTitle>
        <CardDescription>{"Please rate your experience to help us improve our services"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StarRating category="overallExperience" label="Overall Experience" />
        <StarRating category="waitTime" label="Wait Time Satisfaction" />
        <StarRating category="staffProfessionalism" label="Staff Professionalism" />
        <StarRating category="cleanliness" label="Facility Cleanliness" />
        <StarRating category="communication" label="Communication Quality" />

        <div className="space-y-2">
          <Label>{"Would you recommend our facility to others?"}</Label>
          <RadioGroup value={wouldRecommend?.toString()} onValueChange={(val) => setWouldRecommend(val === "true")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="yes" />
              <Label htmlFor="yes" className="cursor-pointer font-normal">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {"Yes, I would recommend"}
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="no" />
              <Label htmlFor="no" className="cursor-pointer font-normal">
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4" />
                  {"No, I would not recommend"}
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">{"Additional Comments (Optional)"}</Label>
          <Textarea
            id="comments"
            placeholder="Share your thoughts, suggestions, or concerns..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full" size="lg">
          {"Submit Feedback"}
        </Button>
      </CardContent>
    </Card>
  )
}
