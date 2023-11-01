// Filter.tsx
import React from "react";

interface FilterProps {
  text: string;
  onFilterChange: (value: string) => void; // Define the callback function
}

const Filter: React.FC<FilterProps> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // When the input value changes, call the callback function
    props.onFilterChange(event.target.value);
  };

  return (
    <input
      className="branch--select"
      type="text"
      placeholder={props.text}
      onChange={handleChange} // Attach the onChange event handler
    />
  );
}

export default Filter;
