const Message = ({ message }) => {
  return (
    <div className="message p-2">
      <div className="user-message font-bold">{message.userMessage}</div>
      <div className="bot-message text-gray-600">{message.botMessage}</div>
      <div className="timestamp text-xs text-gray-400">
        {new Date(message.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default Message;
