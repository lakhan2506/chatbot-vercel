import React, { useState, useEffect } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot", timestamp: new Date() },
  ]);
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
        const response = await fetch(`https://chatbot-backend-nu-sable.vercel.app/api/v1/chat/history/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add authorization header
          },
        });
        const chatHistory = await response.json();

        const formattedMessages = chatHistory.flatMap((msg) => {
          const userMsg = {
            text: msg.userMessage,
            sender: "user",
            timestamp: new Date(msg.timestamp),
          };
          const botMsg = {
            text: msg.botMessage,
            sender: "bot",
            timestamp: new Date(msg.timestamp),
          };
          const productMsgs = msg.filteredProducts.map((product) => ({
            text: (
              <div className="flex flex-col bg-gray-200 p-4 rounded-lg shadow text-black">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-700">Category: {product.category}</p>
                <p className="text-sm">{product.description}</p>
                <p className="text-sm text-green-600 font-semibold">Price: ${product.price}</p>
              </div>
            ),
            sender: "bot",
            timestamp: new Date(),
          }));

          return [userMsg, botMsg, ...productMsgs];
        });

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [userId]);



  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessage = e.target.elements.message.value;
    if (userMessage.trim() === "") return;

    const newUserMessage = { text: userMessage, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMessage]);

    e.target.elements.message.value = "";

    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from local storage
      const response = await fetch(`https://chatbot-backend-nu-sable.vercel.app/api/v1/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add authorization header
        },
        body: JSON.stringify({ userMessage, userId }),
      });

      const data = await response.json();

      const botMessage = { text: data.botMessage, sender: "bot", timestamp: new Date() };
      const productMessages = data.filteredProducts.map((product) => ({
        text: (
          <div className="flex flex-col bg-gray-200 p-4 rounded-lg shadow text-black">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-700">Category: {product.category}</p>
            <p className="text-sm">{product.description}</p>
            <p className="text-sm text-green-600 font-semibold">Price: ${product.price}</p>
          </div>
        ),
        sender: "bot",
        timestamp: new Date(),
      }));

      setMessages((prev) => [...prev, botMessage, ...productMessages]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = { text: "Sorry, something went wrong. Please try again later.", sender: "bot", timestamp: new Date() };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };



  return (
    <div className="w-4/5 h-[825px] flex flex-col bg-gray-100 mx-auto">
      <div className=" flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-lg shadow ${msg.sender === "user" ? "bg-blue-500 text-white text-[18px]" : "text-[18px] bg-gray-200 text-black"
                }`}
            >
              {typeof msg.text === "string" ? (
                <>
                  <p>{msg.text}</p>
                  <span className={`text-xs block mt-1 ${msg.sender === "user" ? "text-white" : "text-gray-500"}`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center p-4 bg-gray-200">
        <input
          name="message"
          type="text"
          placeholder="Explore Products..."
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
