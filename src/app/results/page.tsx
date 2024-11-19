import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SearchBar from "../_components/search-bar";
import { Button } from "@/components/ui/button";
import { providers } from "@/lib/providers";

// Dummy data for medical providers

export default function ResultsPage() {
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
              <SearchBar />
            </div>
          </div>
        </section>
        <section className="w-full pb-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-8 text-primary">
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
                    <Button variant="outline" className="mt-1">
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
