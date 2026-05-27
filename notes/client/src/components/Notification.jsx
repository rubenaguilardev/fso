const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="p-2 text-2xl text-red-500 bg-gray-300 border-3 border-red-500">
      {message}
    </div>
  );
};

export default Notification;
