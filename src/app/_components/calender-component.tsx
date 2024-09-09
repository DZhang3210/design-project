"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";

const CalenderComponent = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schedule an Appointment</CardTitle>
        <CardDescription>Select a date for your appointment</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="mt-4 w-full">
          <Button className="w-full" disabled={!date}>
            {date ? `Book for ${date.toDateString()}` : "Select a Date"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalenderComponent;
