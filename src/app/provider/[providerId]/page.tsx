"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProviderFocusPage({
  params,
}: {
  params: { providerId: string };
}) {
  const router = useRouter();
  type Provider = {
    _id: string;
    properties: {
      "Provider First Name": string;
      "Provider Last Name": string;
      "Full Address": string;
      "Telephone Number": number;
    };
  };
  type ProviderSchedule = {
    start_datetime: string;
  };
  const [provider, setProvider] = useState<Provider | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Dummy data for the provider
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [providerSchedule, setProviderSchedule] = useState<ProviderSchedule[]>(
    []
  );

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProviderSchedule = async () => {
      const provider_schedule = await axios.get(
        `${process.env.NEXT_PUBLIC_OLIVER_BACKEND_URL}/provider_schedules/${params.providerId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      setProviderSchedule(
        provider_schedule.data.availability.map(
          (schedule: ProviderSchedule) => ({
            start_datetime: schedule.start_datetime,
          })
        )
      );
    };
    fetchProviderSchedule();
    const fetchProvider = async () => {
      const provider = await axios.get(
        `${process.env.NEXT_PUBLIC_ANDY_BACKEND_URL}/providers/search-provider?id=${params.providerId}`
      );
      setProvider(provider.data);
    };
    fetchProvider();
  }, []);
  useEffect(() => {
    console.log(providerSchedule);
  }, [providerSchedule]);

  const onSubmit = async () => {
    if (!selectedSchedule) {
      setError("Please select a time slot");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const content = {
      provider_id: params.providerId,
      start_datetime: selectedSchedule,
      reason: "I have a headache",
    };

    try {
      console.log(content);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_OLIVER_BACKEND_URL}/users/appointment`,
        content,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Handle successful booking
      console.log("Appointment booked:", response.data);
    } catch (err) {
      setError("Unable to book appointment. Please try again later.");
      console.error("Booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {provider?.properties["Provider First Name"]}{" "}
                    {provider?.properties["Provider Last Name"]}
                  </CardTitle>
                  {/* <CardDescription>{provider?.specialty}</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider?.properties["Full Address"]}</span>
                    </div>
                    {/* <div className="flex items-center">
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
                    </div> */}
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider?.properties["Telephone Number"]}</span>
                    </div>
                    {/* <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{provider.website}</span>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
              {/* <Card className="mt-6">
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
              </Card> */}
            </div>
            <Card className="w-full max-w-xl mx-auto">
              <CardHeader>
                <CardTitle>Schedule a time</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  {providerSchedule.map((schedule: ProviderSchedule, i) => (
                    <Button
                      key={i}
                      variant={
                        selectedSchedule === schedule.start_datetime
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-start text-left h-auto mt-2"
                      onClick={() =>
                        selectedSchedule === schedule.start_datetime
                          ? setSelectedSchedule(null)
                          : setSelectedSchedule(schedule.start_datetime)
                      }
                    >
                      <div className="flex flex-col items-start">
                        <div className="text-base font-medium">
                          {new Date(schedule.start_datetime).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration: 30 minutes
                        </div>
                      </div>
                    </Button>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  className="w-full"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book an appointment"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
