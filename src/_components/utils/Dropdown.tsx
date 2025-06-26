import React from "react";

type Option = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
};

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options }) => {
  return (
    <select
      className="bg-gray-800 text-lg font-medium text-gray-200 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      {options.map(({ label, value: val }) => (
        <option key={val} value={val}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
