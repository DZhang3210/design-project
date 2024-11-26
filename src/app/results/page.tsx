"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SearchBar from "../_components/search-bar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

// Dummy data for medical providers
type Provider = {
  _id: string;
  properties: {
    "Provider First Name": string;
    "Provider Last Name": string;
  };
};

export default function ResultsPage() {
  const [results, setResults] = useState<Provider[]>([]);

  const handleSubmit = (
    e: React.FormEvent,
    street: string,
    city: string,
    state: string,
    zip: string,
    radius: number,
    specialty: string | null,
    insurance: string | undefined
  ) => {
    e.preventDefault();

    // Trim whitespace from all string inputs
    const params = {
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      radius,
      specialty: specialty?.trim(),
      insurance: insurance?.trim(),
    };

    console.log(params);

    axios
      .get(`${process.env.NEXT_PUBLIC_ANDY_BACKEND_URL}/providers/search`, {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
      });
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                  Find Medical Providers
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Refine your search to find the perfect healthcare match.
                </p>
              </div>
              <SearchBar handleSubmit={handleSubmit} />
            </div>
          </div>
        </section>
        <section className="w-full pb-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8 text-primary">
              Search Results
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {results.map((provider: Provider) => (
                <Card key={provider._id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/provider/${provider._id}`}
                        className="hover:underline"
                      >
                        {provider["properties"]["Provider First Name"]}{" "}
                        {provider["properties"]["Provider Last Name"]}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="mt-1">
                      <Link
                        href={`/provider/${provider._id}`}
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
