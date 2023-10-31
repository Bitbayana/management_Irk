import React from "react";

interface FilterProps {
  text: string;
}

const Filter: React.FC<FilterProps> = (props) => {
  return (
    <input
      className="branch--select"
      type="text"
      placeholder={props.text}
    />
  );
}

export default Filter;