const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <span>{person.name} </span>
      <span>{person.number} </span>
      <button onClick={deletePerson}>delete</button>
    </div>
  );
};

export default Person;
