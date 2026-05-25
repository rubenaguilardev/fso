import { useState, useEffect } from "react";
import Contact from "./component/Contact";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSerach] = useState();

  useEffect(() => {
    personServices.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (persons.includes(person)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old nunber with a new one?`,
        )
      ) {
        personServices
          .update({ ...person, number: newNumber })
          .then((updatedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person,
              ),
            ),
          );
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personServices
      .create(personObject)
      .then((newPerson) => setPersons(persons.concat(newPerson)));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleSearchChange = (e) => setSerach(e.target.value);

  const peopleToShow = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      )
    : persons;

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!window.confirm(`Delete ${person.name}`)) return;
    personServices
      .deletePerson(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {peopleToShow.map((person) => (
        <div key={person.name}>
          <Contact
            person={person}
            handleDelete={() => handleDelete(person.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default App;
