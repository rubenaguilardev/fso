const PersonForm = ({
  newName,
  newNumber,
  onSubmit,
  onNameChange,
  onNumChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input value={newName} onChange={onNameChange} />
        number:
        <input type="tel" value={newNumber} onChange={onNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
