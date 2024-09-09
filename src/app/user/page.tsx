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
import { CalendarDays, MapPin, Star } from "lucide-react";

export default function UserPage() {
  // Dummy user data
  const user = {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 32,
    avatar: "/placeholder.svg?height=100&width=100",
  };

  // Dummy appointment data
  const currentAppointments = [
    {
      id: 1,
      doctor: "Dr. Emily Smith",
      specialty: "Cardiologist",
      date: "2023-06-15",
      time: "10:00 AM",
      location: "Heart Health Clinic",
    },
    {
      id: 2,
      doctor: "Dr. Michael Lee",
      specialty: "Dermatologist",
      date: "2023-06-20",
      time: "2:30 PM",
      location: "Skin Care Center",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Sarah Patel",
      specialty: "General Practitioner",
      date: "2023-05-10",
      time: "11:15 AM",
      location: "City Medical Center",
    },
    {
      id: 4,
      doctor: "Dr. David Wilson",
      specialty: "Orthopedist",
      date: "2023-04-22",
      time: "3:00 PM",
      location: "Joint & Bone Clinic",
    },
  ];

  // Dummy review data
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
              <AvatarImage alt={user.name} src={user.avatar} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-500">Age: {user.age}</p>
            </div>
            <Button>Edit Profile</Button>
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
                            {appointment.doctor}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.specialty}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {appointment.date} at {appointment.time}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPin className="mr-2 h-4 w-4" />
                        {appointment.location}
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
                            {appointment.doctor}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.specialty}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {appointment.date} at {appointment.time}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPin className="mr-2 h-4 w-4" />
                        {appointment.location}
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
                Reviews you've left for healthcare providers
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
