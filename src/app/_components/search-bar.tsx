"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";
import { useState } from "react";

const SearchBar = () => {
  // States for form fields
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(10);
  const [specialty, setSpecialty] = useState("");
  const [insurance, setInsurance] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Handle form submission logic (e.g., API request or search logic)
    console.log("Location:", location);
    console.log("Medical Condition:", specialty);
    console.log("Insurance:", insurance);

    alert(
      `Form submitted!\nLocation: ${location}\nCondition: ${specialty}\nInsurance: ${insurance}`
    );
  };

  return (
    <div className="w-full space-y-2">
      <form
        className="grid grid-cols-11 gap-2 items-center justify-center max-w-2xl mx-auto"
        onSubmit={handleSubmit}
      >
        <Input
          className="bg-white p-2 text-black col-span-4"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
        />
        <Input
          className="bg-white p-2 text-black col-span-1"
          placeholder="Radius (miles)"
          type="number"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        />

        <Input
          className=" bg-white p-2 text-black col-span-3"
          placeholder="Medical condition"
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <Select
          value={insurance}
          onValueChange={(value) => setInsurance(value)}
        >
          <SelectTrigger className="bg-white text-gray-700 p-2 col-span-2">
            <SelectValue placeholder="Insurance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="medicare">Medicare</SelectItem>
            <SelectItem value="medicaid">Medicaid</SelectItem>
            <SelectItem value="private">Private Insurance</SelectItem>
            <SelectItem value="uninsured">Uninsured</SelectItem>
          </SelectContent>
        </Select>

        <button
          type="submit"
          className="bg-white text-primary hover:bg-white/90 h-full flex items-center justify-center rounded-md"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
