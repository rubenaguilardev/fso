const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="flex items-center gap-2">
      <p className="text-gray-600">{note.content}</p>
      <button
        className="border border-gray-200 font-bold text-sm px-4 py-1 rounded-lg cursor-pointer"
        onClick={toggleImportance}
      >
        {label}
      </button>
    </li>
  );
};

export default Note;
