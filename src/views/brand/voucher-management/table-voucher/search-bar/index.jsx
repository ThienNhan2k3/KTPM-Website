import search from "@assets/images/search-icon.png";
import React from "react";

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="display-title">
      <div className="design-title">
        <img src={search} alt="" />
        <span>Tìm kiếm</span>
      </div>
      <div>
        <DebouncedInput
          value={value}
          onChange={onChange}
          className="search-box rounded-pill"
          placeholder="Search all columns..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
