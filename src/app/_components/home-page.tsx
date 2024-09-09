import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Search, Shield, Clock, Star } from "lucide-react";
import Link from "next/link";
import SearchBar from "./search-bar";
import Footer from "./footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Find the Right Medical Provider for You
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Connect with healthcare professionals based on your location,
                  condition, and insurance.
                </p>
              </div>
              <SearchBar />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose MedConnect?
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Verified Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    All our healthcare providers are thoroughly vetted and
                    verified for your peace of mind.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MapPin className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Location-Based</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Find healthcare providers near you with our advanced
                    location-based search.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>Quick Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Book appointments quickly and easily with our streamlined
                    process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Healthcare Providers
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {["Primary Care", "Specialists", "Mental Health", "Dentists"].map(
                (provider) => (
                  <Card key={provider}>
                    <CardHeader>
                      <CardTitle>{provider}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Find top-rated {provider.toLowerCase()} in your area.
                      </p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  comment:
                    "MedConnect made it so easy to find a specialist that accepts my insurance. Highly recommended!",
                },
                {
                  name: "Sarah Lee",
                  comment:
                    "I was able to book an appointment with a great doctor in my area within minutes. Amazing service!",
                },
                {
                  name: "Michael Chen",
                  comment:
                    "As someone new to the city, MedConnect helped me find all the healthcare providers I needed. Thank you!",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>
                      <Star className="w-4 h-4 text-yellow-400 inline" />
                      <Star className="w-4 h-4 text-yellow-400 inline" />
                      <Star className="w-4 h-4 text-yellow-400 inline" />
                      <Star className="w-4 h-4 text-yellow-400 inline" />
                      <Star className="w-4 h-4 text-yellow-400 inline" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Find Your Healthcare Provider?
                </h2>
                <p className="mx-auto max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied users who have found the perfect
                  healthcare match.
                </p>
              </div>
              <Button className="bg-white text-primary hover:bg-white/90">
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
