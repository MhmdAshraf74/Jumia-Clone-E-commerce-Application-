import { Label, Select } from "flowbite-react";
import { useState } from "react";

const EgyptGovernorates = [
  {
    name: "Cairo",
    areas: ["Downtown", "Giza", "Maadi", "Heliopolis", "Nasr City", "Zamalek"],
  },
  {
    name: "Alexandria",
    areas: ["Gleem", "Montaza", "Smouha", "Sidi Gaber", "Stanley"],
  },
  {
    name: "Aswan",
    areas: ["Aswan City", "Elephantine Island", "New Kalabsha"],
  },
  // Add more governorates with their respective areas as needed
];
function SelectInputField({ governorates, lableValue, value, onChange, name }) {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="countries" value={lableValue} />
      </div>
      <Select
        id="countries"
        variant="outlined"
        color="error"
        name={name}
        value={value}
        onChange={onChange}
        required
        className="rounded-lg  border-grey-500    focus:border-red-900   "
      >
        {governorates.map((governorate) => {
          return <option key={governorate}>{governorate}</option>;
        })}
      </Select>
    </div>
  );
}

export default SelectInputField;
