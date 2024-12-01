"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    date_of_birth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = {
      name: { first: formData.first, last: formData.last },
      email: formData.email,
      password: formData.password,
      date_of_birth: new Date(formData.date_of_birth).toISOString(), // Convert to ISO
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_OLIVER_BACKEND_URL}/users/`, content, {
        headers: { "Content-Type": "application/json" },
      }) // Use NEXT_PUBLIC_ for env variables
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        router.push("/results");
      })
      .catch((err) => {
        toast.error(
          "Unable to sign up. Please try again later.",
          err.message || err.response?.data
        );
        console.error("Error:", err.response?.data || err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Please enter your details to sign up.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first">First name</Label>
              <Input
                id="first"
                name="first"
                value={formData.first}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last">Last name</Label>
              <Input
                id="last"
                name="last"
                value={formData.last}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start justify-start">
            <Button type="submit" className="w-full">
              Sign up
            </Button>
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:underline"
            >
              Log in
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
