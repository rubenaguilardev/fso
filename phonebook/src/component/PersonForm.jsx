const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson} className="flex flex-col">
      <div className="flex flex-col gap-1">
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            className="border border-gray-300 "
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
            className="border border-gray-300"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="border border-gray-300 py-1 px-4 rounded-lg font-bold text-sm"
        >
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
