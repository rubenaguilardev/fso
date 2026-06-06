const Filter = ({ value, search }) => {
  return (
    <div>
      <span>filter shown with </span>
      <input value={value} onChange={search} />
    </div>
  );
};

export default Filter;
