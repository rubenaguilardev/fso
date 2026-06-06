const PersonForm = ({ addPerson, name, nameChange, number, numberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <span>name: </span>
        <input value={name} onChange={nameChange} />
        <span> number: </span>
        <input value={number} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
