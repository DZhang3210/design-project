"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { schedules } from "@/lib/schedules";
import { MapPin, Star, Clock, Phone, Mail, Globe } from "lucide-react";
import { useState } from "react";

export default function ProviderFocusPage({
  params,
}: {
  params: { providerId: string };
}) {
  // Dummy data for the provider
  const provider = {
    id: params.providerId,
    name: "Dr. Emily Johnson",
    specialty: "Primary Care",
    location: "123 Health St, New York, NY 10001",
    rating: 4.8,
    reviews: 124,
    education: "MD from Johns Hopkins University",
    experience: "15 years",
    languages: ["English", "Spanish"],
    phone: "(555) 123-4567",
    email: "dr.johnson@medconnect.com",
    website: "www.drjohnson.com",
    bio: "Dr. Emily Johnson is a board-certified primary care physician with over 15 years of experience. She specializes in preventive care, chronic disease management, and women's health. Dr. Johnson is known for her compassionate approach and dedication to patient education.",
  };

  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{provider.name}</CardTitle>
                  <CardDescription>{provider.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(provider.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 font-medium">
                        {provider.rating}
                      </span>
                      <span className="ml-2 text-gray-500">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider.experience} of experience</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider.website}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>About Dr. {provider.name.split(" ")[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{provider.bio}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold">Education</h4>
                    <p>{provider.education}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold">Languages</h4>
                    <p>{provider.languages.join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="w-full max-w-xl mx-auto">
              <CardHeader>
                <CardTitle>Schedule a time</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  {schedules.map((schedule, i) => (
                    <Button
                      key={i}
                      variant={selectedSchedule === i ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto mt-2"
                      onClick={() =>
                        selectedSchedule === i
                          ? setSelectedSchedule(null)
                          : setSelectedSchedule(i)
                      }
                    >
                      <div className="flex flex-col items-start">
                        <div className="text-base font-medium">
                          {schedule.startTime} on {schedule.date}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration: {schedule.timeLength} minutes
                        </div>
                      </div>
                    </Button>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book an appointment</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
