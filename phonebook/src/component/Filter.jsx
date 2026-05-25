const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      <span>filter shown with </span>
      <input
        value={search}
        onChange={handleSearchChange}
        className="border border-gray-300"
      />
    </div>
  );
};

export default Filter;
