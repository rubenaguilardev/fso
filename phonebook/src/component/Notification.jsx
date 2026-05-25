const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const messageColor = message.includes("Added")
    ? "text-green-600"
    : "text-red-600";

  return (
    <div
      className={`${messageColor} text-3xl border-3 border-current bg-gray-300 p-2`}
    >
      {message}
    </div>
  );
};

export default Notification;
