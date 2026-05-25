const Contact = ({ person, handleDelete }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-gray-600">{person.name}</span>
      <span className="text-gray-600">{person.number}</span>
      <button
        className="text-sm font-bold border border-gray-300 px-4 py-1 rounded-lg cursor-pointer"
        onClick={handleDelete}
      >
        delete
      </button>
    </div>
  );
};

export default Contact;
