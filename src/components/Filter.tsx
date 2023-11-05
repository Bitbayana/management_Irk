// Filter.tsx
import React, { useState } from "react";

interface FilterProps {
  text: string;
  onFilterChange: (value: string, field: string) => void;
}

const Filter: React.FC<FilterProps> = (props) => {
  const [filter, setFilter] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFilter(newValue);
    props.onFilterChange(newValue, props.text);
  };

  return (
    <input
      className="branch--select"
      type="text"
      placeholder={props.text}
      value={filter}
      onChange={handleChange}
    />
  );
}

export default Filter;
