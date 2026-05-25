const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      <span>filter shown with</span>
      <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
