const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="text-green-600 text-3xl border-3 border-green-600 bg-gray-300 p-2">
      {message}
    </div>
  );
};

export default Notification;
