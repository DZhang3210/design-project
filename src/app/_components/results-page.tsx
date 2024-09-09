import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, Star } from "lucide-react";
import Link from "next/link";

// Dummy data for medical providers
const providers = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "Primary Care",
    location: "New York, NY",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Cardiologist",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    specialty: "Pediatrician",
    location: "Chicago, IL",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Dr. David Wilson",
    specialty: "Orthopedic Surgeon",
    location: "Houston, TX",
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 5,
    name: "Dr. Lisa Chen",
    specialty: "Dermatologist",
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 112,
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Neurologist",
    location: "Boston, MA",
    rating: 4.8,
    reviews: 95,
  },
  {
    id: 7,
    name: "Dr. Maria Rodriguez",
    specialty: "OB/GYN",
    location: "Miami, FL",
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 8,
    name: "Dr. James Brown",
    specialty: "Psychiatrist",
    location: "Seattle, WA",
    rating: 4.6,
    reviews: 67,
  },
];

export default function ResultsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">MedConnect</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Find Medical Providers
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Refine your search to find the perfect healthcare match.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your location"
                    type="text"
                  />
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Medical condition"
                    type="text"
                  />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicare">Medicare</SelectItem>
                      <SelectItem value="medicaid">Medicaid</SelectItem>
                      <SelectItem value="private">Private Insurance</SelectItem>
                      <SelectItem value="uninsured">Uninsured</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Search Results
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {providers.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader>
                    <CardTitle>{provider.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">
                      {provider.specialty}
                    </p>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm">{provider.location}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(provider.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">
                        {provider.rating}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2023 MedConnect. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
