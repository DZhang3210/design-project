"use client";
import { Input } from "@/components/ui/input";
import {
  Select as ReactSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { specialties } from "@/lib/specialties";
import { Search } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";

const SearchBar = ({
  handleSubmit,
}: {
  handleSubmit: (
    e: React.FormEvent,
    street: string,
    city: string,
    state: string,
    zip: string,
    radius: number,
    specialty: string | null,
    insurance: string | undefined
  ) => void;
}) => {
  // States for form fields
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(10);
  // const [specialty, _setSpecialty] = useState<string | null>(null);
  const specialty = null;
  const [insurance, setInsurance] = useState<string | undefined>(undefined);

  // Add error state
  const [error, setError] = useState<string | null>(null);

  // Add validation function
  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!street.trim()) {
      setError("Street address is required");
      return;
    }
    if (!city.trim()) {
      setError("City is required");
      return;
    }
    if (!state.trim()) {
      setError("State is required");
      return;
    }
    if (!zip.trim()) {
      setError("ZIP code is required");
      return;
    }
    if (!radius || radius <= 0) {
      setError("Please enter a valid radius");
      return;
    }

    setError(null);
    handleSubmit(e, street, city, state, zip, radius, specialty, insurance);
  };

  return (
    <div className="w-full space-y-2">
      {error && (
        <div className="text-red-500 text-sm text-center mb-2">{error}</div>
      )}
      <form
        className="grid grid-cols-11 gap-2 items-center justify-center max-w-2xl mx-auto"
        onSubmit={validateForm}
      >
        <Input
          className="bg-white p-2 text-black col-span-3"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          type="text"
        />
        <Input
          className="bg-white p-2 text-black col-span-3"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
        />
        <Input
          className="bg-white p-2 text-black col-span-2"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          type="text"
        />
        <Input
          className="bg-white p-2 text-black col-span-2"
          placeholder="Zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          type="text"
        />
        <Input
          className="bg-white p-2 text-black col-span-1"
          placeholder="Radius (miles)"
          type="number"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        />

        <div className="col-span-5">
          <Select
            options={specialties}
            // value={specialty}
            // onChange={(value) => setSpecialty(value)}
            className="text-black"
            instanceId="specialty"
          />
        </div>
        <ReactSelect
          value={insurance}
          onValueChange={(value) => setInsurance(value)}
        >
          <SelectTrigger className="bg-white text-gray-700 p-2 col-span-2">
            <SelectValue placeholder="Insurance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Blue Cross Blue Shield">
              Blue Cross Blue Shield
            </SelectItem>
            <SelectItem value="UnitedHealthcare">UnitedHealthcare</SelectItem>
            <SelectItem value="Aetna">Aetna</SelectItem>
            <SelectItem value="Cigna">Cigna</SelectItem>
            <SelectItem value="Humana">Humana</SelectItem>
            <SelectItem value="Kaiser Permanente">Kaiser Permanente</SelectItem>
            <SelectItem value="Molina Healthcare">Molina Healthcare</SelectItem>
            <SelectItem value="Centene">Centene</SelectItem>
            <SelectItem value="Oscar Health">Oscar Health</SelectItem>
          </SelectContent>
        </ReactSelect>

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
