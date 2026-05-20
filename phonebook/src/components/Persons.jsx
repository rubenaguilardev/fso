const Persons = ({ persons, search }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase()),
    )
    .map((person) => (
      <div key={person.id}>
        <span>{person.name} </span>
        <span>{person.number}</span>
      </div>
    ));
};

export default Persons;
