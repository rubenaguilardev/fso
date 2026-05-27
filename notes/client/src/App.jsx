import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  useEffect(() => {
    noteServices.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteServices.create(noteObject).then((initialNotes) => {
      setNotes(notes.concat(initialNotes));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => setNewNote(e.target.value);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteServices
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content} was already removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div className="space-y-4 p-2">
      <h1 className="text-4xl italic text-green-700">Notes</h1>
      <Notification message={errorMessage} />
      <button
        className="border border-gray-200 font-bold text-sm px-4 py-1 rounded-lg cursor-pointer"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "show important" : "show all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <div className="flex gap-1">
          <input
            value={newNote}
            onChange={handleNoteChange}
            className="border border-gray-300 rounded-lg"
          />
          <button
            className="border border-gray-200 font-bold text-sm px-4 py-1 rounded-lg cursor-pointer"
            type="submit"
          >
            save
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default App;
