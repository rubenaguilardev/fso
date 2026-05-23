const PersonForm = ({
  onSubmit,
  nameValue,
  numValue,
  onNameChange,
  onNumChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
        number: <input value={numValue} onChange={onNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
