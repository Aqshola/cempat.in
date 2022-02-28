import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import { Combobox } from "@headlessui/react";
type Props = {};

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];
export default function Search({}: Props) {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="absolute z-10 right-10 top-10">
      <div
        id="search"
        className="hidden p-2 w-96 h-12 md:flex bg-white shadow rounded relative"
      >
        {/* <input
        type="text"
        className="bg-transparent flex-grow h-full p-2 text-[#03C88E] placeholder:text-[#03C88E] placeholder:text-sm text-sm"
        placeholder="Cari lokasi"
      /> */}

        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
          <Combobox.Input
            placeholder="Cari lokasi"
            className="bg-transparent flex-grow h-full p-2 text-[#03C88E] placeholder:text-[#03C88E] placeholder:text-sm text-sm"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="bg-white border-2 rounded absolute top-12 left-0 w-96">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person}
                value={person}
                className="text-xs  p-2 hover:bg-[#03C88E] font-poppins hover:text-white transition-colors cursor-pointer"
              >
                {person}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
        <button className="mx-2">
          <BiSearch className="text-[#03C88E] w-5 h-5" />
        </button>
        <span className="w-[2px] bg-[#03C88E] opacity-30 h-full  block"></span>
        <button className="mx-2">
          <BiCurrentLocation className="text-[#03C88E] w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
