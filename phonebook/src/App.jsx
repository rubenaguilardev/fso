import { useState, useEffect } from "react";
import PersonInfo from "./component/PersonInfo";
import PersonForm from "./component/PersonForm";
import Filter from "./component/Filter";
import numberService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    numberService.getAll().then((initialNumbers) => setPersons(initialNumbers));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase(),
        );
        const personObject = { ...existingPerson, number: newNum };
        numberService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person,
              ),
            );
          });
      }
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNum,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNum("");
  };

  const deleteNumber = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      numberService
        .deleteNum(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumChange = (e) => setNewNum(e.target.value);

  const handleSearch = (e) => setSearch(e.target.value);

  const personToShow = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        numValue={newNum}
        onNameChange={handleNameChange}
        onNumChange={handleNumChange}
        name={newName}
      />
      <h3>Numbers</h3>
      <div>
        {personToShow.map((person) => (
          <PersonInfo
            key={person.id}
            person={person}
            deleteNumber={() => deleteNumber(person.id, person.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
