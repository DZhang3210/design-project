"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type Appointment = {
  id: string;
  provider_id: string;
  provider_name: {
    first: string;
    last: string;
  };
  start_datetime: string;
  reason: string;
};

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: {
      first: string;
      last: string;
    };
    appointments: Appointment[];
    email: string;
    insurance: string;
    avatar: string;
  }>({
    name: {
      first: "",
      last: "",
    },
    appointments: [],
    email: "",
    insurance: "",
    avatar: "",
  });

  const [token, setToken] = useState<string | null>(null);

  // Load token client-side only
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    setToken(token);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_OLIVER_BACKEND_URL}/users/`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [token]);

  const onDeleteAppointment = async (appointmentId: string) => {
    try {
      await axios
        .delete(
          `${process.env.NEXT_PUBLIC_OLIVER_BACKEND_URL}/users/appointment/${appointmentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          toast.success("Appointment cancelled");
          window.location.reload();
        })
        .catch((error) => {
          toast.error("Error cancelling appointment");
          console.error("Error deleting appointment:", error);
        });
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  // Dummy data for appointments and reviews
  const currentAppointments = user.appointments.filter(
    (appointment) => new Date(appointment.start_datetime) > new Date()
  );

  const pastAppointments = user.appointments.filter(
    (appointment) => new Date(appointment.start_datetime) < new Date()
  );

  const reviews = [
    {
      id: 1,
      doctor: "Dr. Emily Smith",
      rating: 5,
      comment: "Excellent care and very knowledgeable.",
      date: "2023-05-15",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Patel",
      rating: 4,
      comment: "Very friendly and attentive.",
      date: "2023-05-11",
    },
  ];

  return (
    <div className="w-full px-4 md:px-6 py-8 flex justify-center">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr] w-5/6">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage alt={user.name.first} src={user.avatar} />
              <AvatarFallback>{user.name.first}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold">{user.name.first}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">
                Insurance: {user.insurance}
              </p>
            </div>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="current"
                className="data-[state=active]:bg-white"
              >
                Current Appointments
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-white"
              >
                Past Appointments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <Card>
                <CardHeader>
                  <CardTitle>Current Appointments</CardTitle>
                  <CardDescription>
                    Your upcoming medical appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="mb-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">
                            <Link
                              href={`/provider/${appointment.provider_id}`}
                              className="hover:underline"
                            >
                              {appointment.provider_name.first}{" "}
                              {appointment.provider_name.last}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.reason}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDeleteAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {new Date(appointment.start_datetime).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                  <CardDescription>
                    Your previous medical appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pastAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="mb-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">
                            <Link
                              href={`/provider/${appointment.id}`}
                              className="hover:underline"
                            >
                              {appointment.provider_name.first}{" "}
                              {appointment.provider_name.last}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.reason}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            router.push(`/provider/${appointment.provider_id}`)
                          }
                        >
                          Reschedule
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {new Date(appointment.start_datetime).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Card>
            <CardHeader>
              <CardTitle>Your Reviews</CardTitle>
              <CardDescription>
                Reviews you&apos;ve left for healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.map((review) => (
                <div key={review.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{review.doctor}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Posted on {review.date}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
