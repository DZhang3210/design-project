"use client";
import { Button } from "@/components/ui/button";
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
  const [condition, setCondition] = useState("");
  const [insurance, setInsurance] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Handle form submission logic (e.g., API request or search logic)
    console.log("Location:", location);
    console.log("Medical Condition:", condition);
    console.log("Insurance:", insurance);

    alert(
      `Form submitted!\nLocation: ${location}\nCondition: ${condition}\nInsurance: ${insurance}`
    );
  };

  return (
    <div className="w-full space-y-2 max-w-xl">
      <form
        className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-2">
          <Input
            className="max-w-lg flex-1 bg-white p-2"
            placeholder="Enter your location"
            type="text"
          />
          <Input
            className="max-w-lg flex-1 bg-white p-2"
            placeholder="Radius (miles)"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            className="max-w-lg flex-1 bg-white p-2"
            placeholder="Medical condition"
            type="text"
          />
          <Select>
            <SelectTrigger className="bg-white text-gray-700 p-2">
              <SelectValue placeholder="Insurance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medicare">Medicare</SelectItem>
              <SelectItem value="medicaid">Medicaid</SelectItem>
              <SelectItem value="private">Private Insurance</SelectItem>
              <SelectItem value="uninsured">Uninsured</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="bg-white text-primary hover:bg-white/90 h-full"
        >
          <Search className="" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
