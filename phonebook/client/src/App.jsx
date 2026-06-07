import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPeople) => setPersons(initialPeople));
  }, []);

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      const person = persons.find(
        (p) => p.name.toLowerCase() === newName.toLowerCase(),
      );
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        personService
          .update({ ...person, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p,
              ),
            );
            notify(`${person.name} has been updated`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            notify(
              `Information of ${person.name} has already been removed from server`,
            );
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((person) => {
      setPersons(persons.concat(person));
      notify(`Added ${person.name}`);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const displayPeople = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={search} search={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {displayPeople.map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
