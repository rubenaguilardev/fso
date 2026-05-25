import { useState, useEffect } from "react";
import Contact from "./component/Contact";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import personServices from "./services/persons";
import Notification from "./component/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSerach] = useState();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personServices.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  useEffect(() => {
    console.log("App mounted");
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old nunber with a new one?`,
        )
      ) {
        personServices
          .update({ ...person, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p,
              ),
              setMessage(`Updated ${person.name}'s details`),
              setTimeout(() => {
                setMessage(null);
              }, 3000),
            );
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personServices.create(personObject).then((person) => {
      setPersons(persons.concat(person));
      setMessage(`Added ${person.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setNewName("");
      setNewNumber("");
    });
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
    <div className="p-2 space-y-4">
      <h2 className="text-3xl font-bold">Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2 className="text-2xl font-bold">add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2 className="text-2xl font-bold">Numbers</h2>
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
