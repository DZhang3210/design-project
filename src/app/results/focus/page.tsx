"use client";
import CalenderComponent from "@/app/_components/calender-component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Star, Clock, Phone, Mail, Globe } from "lucide-react";
import { useState } from "react";

export default function ProviderFocusPage() {
  // Dummy data for the provider
  const provider = {
    id: 1,
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
            <div>
              <CalenderComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
