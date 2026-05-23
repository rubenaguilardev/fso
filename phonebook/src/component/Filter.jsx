const Filter = ({ search, onChange }) => {
  return (
    <div>
      <span>filter shown with</span>
      <input value={search} onChange={onChange} />
    </div>
  );
};

export default Filter;
