import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import SearchBar from "../_components/search-bar";
import { Button } from "@/components/ui/button";

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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center">
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
              <SearchBar />
            </div>
          </div>
        </section>
        <section className="w-full pb-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              Search Results
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {providers.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/provider/${provider.id}`}
                        className="hover:underline"
                      >
                        {provider.name}
                      </Link>
                    </CardTitle>
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
                    <Button variant="outline" className="mt-4">
                      <Link
                        href={`/provider/${provider.id}`}
                        className="text-sm text-primary"
                      >
                        Schedule Appointment
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
